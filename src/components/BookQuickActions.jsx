import React from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import clienteAxios from '../../config/clienteAxios';

export default function BookQuickActions({bookSelectedId, book, changeSidebar, setBookShow, setBookShowOption, setBookSelectedId, setBookComprar}) {

  const navigate = useNavigate();
  const { auth } = useAuth();

  const solicitarCompra = () => {
    let libroCompra = {
        bookId: book.id,
        titulo: book.titulo,
        cantidad: 1,
        metodo: "card",
        stock: book.stock
    }
    changeSidebar("bookBuy");
    setBookComprar(libroCompra);
  }

  const solicitarBook = async () => {
      try{
          const respuesta = await clienteAxios.post("/prestamos", {
              bookId: book.id
          });
          bookSelectedId == book.id && setBookShow({...book, stock: book.stock-1});
          Swal.fire({
              icon: "success",
              title: "Reserva confirmada",
              text: respuesta.data.message,
              showConfirmButton: true,
              customClass: {
                  title: "swal_title",
                  icon: "swal_icon",
                  htmlContainer: "swal_text",
                  confirmButton: "swal_confirm"
              }
          });
      } catch(error){
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

  const preguntarSolicitud = accion => {
      if(!auth?.id){
          navigate("/iniciar-sesion");
          Swal.fire({
              icon: "error",
              title: "Inicia Sesion",
              text: "Se necesita una cuenta para realizar pedidos",
              showConfirmButton: true,
              customClass: {
                  title: "swal_title",
                  icon: "swal_icon",
                  htmlContainer: "swal_text",
                  confirmButton: "swal_confirm"
              }
          });
          return;
      }
      if(book.stock < 1){
          Swal.fire({
              icon: "error",
              title: "Solo clientes",
              text: "Este libro esta agotado, intenta mas tarde",
              showConfirmButton: true,
              customClass: {
                  title: "swal_title",
                  icon: "swal_icon",
                  htmlContainer: "swal_text",
                  confirmButton: "swal_confirm"
              }
          });  
          return;
      }
      if(auth?.rol != "Cliente"){
          Swal.fire({
              icon: "error",
              title: "Solo clientes",
              text: "Los administradores no pueden realizar pedidos",
              showConfirmButton: true,
              customClass: {
                  title: "swal_title",
                  icon: "swal_icon",
                  htmlContainer: "swal_text",
                  confirmButton: "swal_confirm"
              }
          });
          return;
      }
      switch(accion){
            case "comprar":
                solicitarCompra();
                break;
            case "pedir":
              Swal.fire({
                title: "Solicitar Libro",
                icon: "question",
                text: `Estas seguro de que deseas solicitar prestado el libro '${book.titulo}'`,
                customClass: {
                    title: "swal_title",
                    icon: "swal_icon",
                    htmlContainer: "swal_text",
                    confirmButton: "swal_confirm"
                },
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonText: "Reservar",
                allowOutsideClick: () => !Swal.isLoading()
              }).then((result) => {
                if (result.isConfirmed) {
                    solicitarBook();
                }
            });
            break;
      }
  }

  return (
    <div className='book_extra_actions'>
        <div className='actions_books'>
            <button onClick={() => preguntarSolicitud('pedir')} className="adminInfo_acciones_eliminar admin_pedidos adminBooks_acciones">Solicitar Prestamo</button>
            <button onClick={() => preguntarSolicitud('comprar')} className="adminInfo_acciones_eliminar admin_pedidos adminBooks_acciones">Comprar</button>
            <button onClick={() => {changeSidebar("bookShow"); setBookShow(book); setBookShowOption(true); setBookSelectedId(book?.id)}} className="adminInfo_acciones_eliminar admin_pedidos adminBooks_acciones">Ver detalles</button>
        </div>
    </div>
  )
}
