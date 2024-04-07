import React, { useState, useEffect } from "react";
import PrestamoAdmin from "./PrestamoAdmin";
import PrestamosAdminFilters from "./PrestamosAdminFilters";
import clienteAxios from "../../config/clienteAxios";
import Swal from "sweetalert2";
import useSidebar from "../hooks/useSidebar";
import useAuth from "../hooks/useAuth";
import Spinner from "./Spinner";

export default function PrestamosAdminPage(){

    const [ prestamos, setPrestamos ] = useState([]);
    const [ cargando, setCargando ] = useState(false);
    const { prestamoManagerReload, prestamoFilterData, setPrestamoManagerReload, setPrestamoFilterData } = useSidebar();
    const { auth } = useAuth();

    const cargarPrestamos = async () => {
        setCargando(true);
        const prestamos = await clienteAxios.post("/prestamos/get-all?oneuser=false", prestamoFilterData);
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
            const respuesta = await clienteAxios.patch(`/prestamos/cancelar-pedido-admin/${pedidoId}`, {
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

    const cancelarPedidoQuestion = (pedidoId, libroId, libroNombre, e, nombre) => {
        e.preventDefault();
        Swal.fire({
            title: "Cancelar Pedido",
            icon: "question",
            text: `Estas seguro de que deseas cancelar el prestamo de '${libroNombre}' del usuario '${nombre}'`,
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
                cancelarPedido(pedidoId, libroId)
            }
          });
    } 

    const recogerPedido = async (pedidoId, libroId, nombre) => {
        try{
            const respuesta = await clienteAxios.patch(`/prestamos/pedido-recogido/${pedidoId}`, {
                bookId: libroId,
                bookName: nombre
            });
            Swal.fire({
                icon: "success",
                title: "Libro recogido",
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

    const marcarRecogidoQuestion = (pedidoId, libroId, libroNombre, e, nombre) => {
        e.preventDefault();
        Swal.fire({
            title: "Libro recogido",
            icon: "question",
            text: `Estas seguro de marcar el libro '${libroNombre}' como recogido del usuario '${nombre}'`,
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
                recogerPedido(pedidoId, libroId, libroNombre)
            }
          });
    } 

    return(
        <div className="book_content admin_prestamos_content">
            <PrestamosAdminFilters/>
            <div className="books admin_prestamos_all">
                { cargando ? <Spinner/> : (prestamos.length > 0) ? prestamos.map(prestamo => <PrestamoAdmin recogidoPrestamo={marcarRecogidoQuestion} cancelPrestamo={cancelarPedidoQuestion} prestamo={prestamo} key={prestamo.id} estado={prestamo.estado}/>) :  <h3 className="no_users_alert alert_red">No hay prestamos</h3>}
            </div>
        </div>
    )
}