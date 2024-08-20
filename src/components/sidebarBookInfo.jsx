import React, { useState } from "react";
import bookExample from "../assets/book_example.png"
import RightSidebarButton from "./RightSidebarButton";
import useSidebar from "../hooks/useSidebar";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth"
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/clienteAxios";

export default function SidebarBookInfo(){

    const { bookShow, setBookShow } = useSidebar();
    const { auth } = useAuth();
    const [ cargando, setCargando ] = useState(false);
    const navigate = useNavigate();

    const solicitarBook = async () => {
        try{
            setCargando(true);
            const respuesta = await clienteAxios.post("/prestamos", {
                bookId: bookShow.id
            });
            setCargando(false);
            setBookShow({ ...bookShow, stock: bookShow.stock-1 });
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
            setCargando(false);
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

    const preguntarSolicitud = () => {
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
        if(bookShow.stock < 1){
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

        Swal.fire({
            title: "Solicitar Libro",
            icon: "question",
            text: `Estas seguro de que deseas solicitar el libro '${bookShow.titulo}'`,
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
    }

    return(
        <>
            <div className="sidebar_book_image">
                <img src={bookShow?.image}/>
            </div>
            <h3 className="sidebar_book_title">{bookShow.titulo}</h3>
            <p className="sidebar_book_autores">{bookShow.autores}</p>
            <p className="sidebar_book_editorial">Editorial: {bookShow.editorial}</p>
            <div onClick={() => {if(admin == true){changeSidebar("bookShow"); setBookShow(book); setBookShowOption(true)}}} className="book_categorias book_sidebar_categorias_content">
                { bookShow?.etiquetas.map(etiqueta => <h3 key={etiqueta.id} className="book_categoria book_sidebar_categoria">{etiqueta.nombre}</h3>) }
            </div>
            <div className="sidebar_quickinfo">
                <div className="sidebar_quickinfo_card">
                    <h5 className="sidebar_book_edicion_text">Edicion:</h5>
                    <p className="sidebar_book_edicion_info">{bookShow.edicion}</p>
                </div>
                <div className="sidebar_quickinfo_card">
                    <h5 className="sidebar_book_edicion_text">Publicado:</h5>
                    <p className="sidebar_book_edicion_info">{new Date (bookShow.fecha_publicacion.split("T")[0]).toLocaleDateString("es-MX")}</p>
                </div>
                <div className="sidebar_quickinfo_card">
                    <h5 className="sidebar_book_edicion_text">Paginas:</h5>
                    <p className="sidebar_book_edicion_info">{bookShow.paginas}</p>
                </div>
            </div>
            <p className="sidebar_book_sinopsis">{bookShow.sinopsis}</p>

            <p className={bookShow.stock > 0 ? "sidebar_book_stock" : "sidebar_book_stock agotado"}>{bookShow.stock > 0 ? `${bookShow.stock} Disponibles` : `Agotado`}</p>
            <div onClick={() => preguntarSolicitud()}>
                <RightSidebarButton disabled_btn={cargando} text={cargando ? "Reservando..." : "Reservar"} color={"#ffa117"} icon={"push"}/>
            </div>
            <div className="book_sidebar_buy">
                <RightSidebarButton disabled_btn={cargando} text={cargando ? "Comprando..." : "Comprar"} color={"#ffa117"} icon={"cash"}/>
            </div>
        </>
    )
}