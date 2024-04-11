import React, { useEffect } from "react";
import Swal from "sweetalert2";
import useSidebar from "../hooks/useSidebar";
import useAuth from "../hooks/useAuth";
import BookFilters from "./BookFilters";
import Book from "./Book";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/clienteAxios";
import { useState } from "react";
import Spinner from "./Spinner";

export default function BookAdminPage(){

    const { auth } = useAuth();
    const { bookManagerReload, setBookManagerReload, filterBooks, setFilterBooks } = useSidebar();
    const [ cargando, setCargando ] = useState(false);
    const [ books, setBooks ] = useState([]);
    const navigate = useNavigate();

    const cargarLibros = async () => {
        setCargando(true);
        const libros = await clienteAxios.post("/libros/get-all?stockout=true", filterBooks);
        setBooks(libros.data.libros);
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
                text: "Solo los administradores tienen acceso a este sitio",
                showConfirmButton: true,
                customClass: {
                    title: "swal_title",
                    icon: "swal_icon",
                    htmlContainer: "swal_text",
                    confirmButton: "swal_confirm"
                }
            });
            navigate("/");
        }
        setFilterBooks({
            titulo: "",
            categoria: "",
            autores: ""
        })
        cargarLibros();
    }, []);

    useEffect(() => {
        if(bookManagerReload){
            cargarLibros();
            setBookManagerReload(false);
        }
    }, [bookManagerReload]);

    const queryDeleteBook = async id => {
        try{
            const respuesta = await clienteAxios.delete(`/libros/${id}`);
            setBookManagerReload(true);
            Swal.fire({
                icon: "success",
                title: "Libro Eliminado eliminada",
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

    const deleteEtiquetaFn = async (id, nombre) => {
        Swal.fire({
            title: "Eliminar Libro",
            icon: "question",
            text: `Estas seguro de que deseas eliminar el libro '${nombre}'`,
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
                queryDeleteBook(id);
            }
          });
    }

    return(

        <div className={`book_content book_content_skyblue`}>
            <BookFilters admin={true}/>
            <div className="books">
                { cargando ? <Spinner/> : (books.length > 0 ? books.map(book => <Book deleteEtiquetaFn={deleteEtiquetaFn} admin={true} key={book.id} book={book}/>) : <h3 className="no_users_alert alert_skyblue">No hay libros</h3>)}
            </div>
        </div>

    )
}