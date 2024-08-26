import React, {useState, useEffect} from 'react'
import CompraFilters from './CompraFilters'
import useAuth from '../hooks/useAuth';
import clienteAxios from '../../config/clienteAxios';
import Swal from 'sweetalert2';
import useSidebar from '../hooks/useSidebar';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import CompraCard from './CompraCard';
import CompraCardAdmin from './CompraCardAdmin';

export default function ComprasAdmin() {

  const [ compras, setCompras ] = useState([]);
  const [ cargando, setCargando ] = useState(false);
  const { compraManagerReload, setCompraManagerReload } = useSidebar();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [ compraFilterData, setCompraFilterData ] = useState({
    nombre: "",
    estado: ""
})

  const cargarPrestamos = async () => {
      setCargando(true);
      const compras = await clienteAxios.post("/compras/get-all", compraFilterData);
      setCompras(compras.data.compras);
      setCargando(false);
  }

  useEffect(() =>{
    if(Object.keys(auth).length === 0){
        Swal.fire({
            icon: "error",
            title: "Sin permiso",
            text: "Para usar este sitio, crea una cuenta",
            showConfirmButton: true,
            customClass: {
                title: "swal_title",
                icon: "swal_icon",
                htmlContainer: "swal_text",
                confirmButton: "swal_confirm"
            }
        });
        navigate("/iniciar-sesion");
    } else if(auth.rol != "Administrador"){
        Swal.fire({
            icon: "error",
            title: "Sin permiso",
            text: "No tienes permiso para acceder a esta pagina",
            showConfirmButton: true,
            customClass: {
                title: "swal_title",
                icon: "swal_icon",
                htmlContainer: "swal_text",
                confirmButton: "swal_confirm"
            }
        });
        navigate("/libros");
    }
    setCompraFilterData({
        nombre: "",
        estado: ""
    });
    cargarPrestamos();
}, []);

useEffect(() => {
  if(compraManagerReload){
      cargarPrestamos();
      setCompraManagerReload(false);
  }
}, [compraManagerReload]);

const cancelarCompra = async (pedidoId, libroId) => {
  try{
      const respuesta = await clienteAxios.patch(`/compras/cancelar-compra-admin/${pedidoId}`, {
          bookId: libroId
      });
      Swal.fire({
          icon: "success",
          title: "Compra cancelada",
          text: respuesta.data.message,
          showConfirmButton: true,
          customClass: {
              title: "swal_title",
              icon: "swal_icon",
              htmlContainer: "swal_text",
              confirmButton: "swal_confirm"
          }
      });
      setCompraManagerReload(true);
  } catch(error){
      console.log(error);
      Swal.fire({
          icon: "error",
          title: "Algo salio mal",
          text: error.response.data.message,
          showConfirmButton: true,
          customClass: {
              title: "swal_title",
              icon: "swal_icon",
              htmlContainer: "swal_text",
              confirmButton: "swal_confirm"
          }
      });
  }
}

const cancelarCompraQuestion = (pedidoId, libroId, libroNombre, e, nombre) => {
  e.preventDefault();
  Swal.fire({
      title: "Cancelar Pedido",
      icon: "question",
      text: `Estas seguro de que deseas cancelar la compra de '${libroNombre}' del usuario '${nombre}'`,
      customClass: {
          title: "swal_title",
          icon: "swal_icon",
          htmlContainer: "swal_text",
          confirmButton: "swal_confirm"
      },
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
          cancelarCompra(pedidoId, libroId)
      }
    });
}

const libroCompradoEfectivo = async (pedidoId, libroId) => {
  try{
      const respuesta = await clienteAxios.patch(`/compras/pedido-comprado-recogido/${pedidoId}`);
      Swal.fire({
          icon: "success",
          title: "Compra completada",
          text: respuesta.data.message,
          showConfirmButton: true,
          customClass: {
              title: "swal_title",
              icon: "swal_icon",
              htmlContainer: "swal_text",
              confirmButton: "swal_confirm"
          }
      });
      setCompraManagerReload(true);
  } catch(error){
      console.log(error);
      Swal.fire({
          icon: "error",
          title: "Algo salio mal",
          text: error.response.data.message,
          showConfirmButton: true,
          customClass: {
              title: "swal_title",
              icon: "swal_icon",
              htmlContainer: "swal_text",
              confirmButton: "swal_confirm"
          }
      });
  }
}

const libroCompradoQuestion = (pedidoId, libroId, libroNombre, e, nombre) => {
  e.preventDefault();
  Swal.fire({
      title: "Completar Compra",
      icon: "question",
      text: `Estas seguro de que deseas marcar el pedido del usuario '${nombre}' del libro '${libroNombre}' como completado?`,
      customClass: {
          title: "swal_title",
          icon: "swal_icon",
          htmlContainer: "swal_text",
          confirmButton: "swal_confirm"
      },
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
          libroCompradoEfectivo(pedidoId, libroId)
      }
    });
} 

  return (
    <div className="book_content compras_background">
    <CompraFilters admin={true} compraFilterData={compraFilterData} setCompraFilterData={setCompraFilterData}/>
        <div className="books prestamos_contenido">
          { cargando ? <Spinner/> : (compras.length <= 0 ? <h3 className="no_users_alert alert_orange">No hay compras realizadas</h3> : compras.map(compra => <CompraCardAdmin libroCompradoQuestion={libroCompradoQuestion} cancelarCompraQuestion={cancelarCompraQuestion} key={compra.id} compra={compra} estado={compra.estado}/>)) }
        </div>
    </div>
  )
}
