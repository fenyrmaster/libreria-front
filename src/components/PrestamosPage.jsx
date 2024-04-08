import React, {useState, useEffect} from "react";
import Prestamo from "./Prestamo";
import useSidebar from "../hooks/useSidebar";
import Swal from "sweetalert2";
import clienteAxios from "../../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import Spinner from "./Spinner";
import PedidoFilters from "./PedidoFilters";

export default function PrestamosPage(){

    const [ prestamos, setPrestamos ] = useState([]);
    const [ cargando, setCargando ] = useState(false);
    const { prestamoManagerReload, prestamoFilterData, setPrestamoManagerReload, setPrestamoFilterData } = useSidebar();
    const { auth } = useAuth();

    const cargarPrestamos = async () => {
        setCargando(true);
        const prestamos = await clienteAxios.post("/prestamos/get-all-user?oneuser=true", prestamoFilterData);
        setPrestamos(prestamos.data.prestamos);
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
        } else if(auth.rol != "Cliente"){
            Swal.fire({
                icon: "error",
                title: "Sin permiso",
                text: "Los administradores no pueden tener prestamos",
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
        setPrestamoFilterData({
            nombre: "",
            estado: ""
        });
        cargarPrestamos();
    }, []);

    useEffect(() => {
        if(prestamoManagerReload){
            cargarPrestamos();
            setPrestamoManagerReload(false);
        }
    }, [prestamoManagerReload]);

    const cancelarPedido = async (pedidoId, libroId) => {
        try{
            const respuesta = await clienteAxios.patch(`/prestamos/cancelar-pedido-user/${pedidoId}`, {
                bookId: libroId
            });
            Swal.fire({
                icon: "success",
                title: "Prestamo cancelado",
                text: respuesta.data.message,
                showConfirmButton: true,
                customClass: {
                    title: "swal_title",
                    icon: "swal_icon",
                    htmlContainer: "swal_text",
                    confirmButton: "swal_confirm"
                }
            });
            setPrestamoManagerReload(true);
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

    const cancelarPedidoQuestion = (pedidoId, libroId, libroNombre, e) => {
        e.preventDefault();
        Swal.fire({
            title: "Cancelar Pedido",
            icon: "question",
            text: `Estas seguro de que deseas cancelar el pedido de '${libroNombre}'`,
            customClass: {
                title: "swal_title",
                icon: "swal_icon",
                htmlContainer: "swal_text",
                confirmButton: "swal_confirm"
            },
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Eliminar",
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
                cancelarPedido(pedidoId, libroId)
            }
          });
    } 

    return(
        <div className="book_content prestamos">
            <PedidoFilters admin={false}/>
            <div className="books prestamos_contenido">
                { cargando ? <Spinner/> : (prestamos.length > 0) ? prestamos.map(prestamo => <Prestamo cancelPedido={cancelarPedidoQuestion} prestamo={prestamo} key={prestamo.id} estado={prestamo.estado}/>) :  <h3 className="no_users_alert alert_red">No hay prestamos</h3>}
            </div>
        </div>
    )
}