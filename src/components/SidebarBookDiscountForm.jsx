import React, { useState } from "react";
import RightSidebarButton from "./RightSidebarButton";
import useSidebar from "../hooks/useSidebar";
import clienteAxios from "../../config/clienteAxios";
import Swal from "sweetalert2";

export default function SidebarBookDiscountForm(){

    const { bookDiscountData, setBookDiscountData, setBookManagerReload } = useSidebar();
    const [ cargando, setCargando ] = useState(false);

    const handleDiscountChange = async e => {
        e.preventDefault();
        setCargando(true);
        try{
            const respuesta = await clienteAxios.patch(`/libros/modificarDescuento/${bookDiscountData?.bookId}`, {
                oferta_fin: bookDiscountData.oferta_fin,
                oferta_inicio: bookDiscountData.oferta_inicio,
                descuento: bookDiscountData.descuento
            });
            Swal.fire({
                icon: "success",
                title: "Exito",
                text: respuesta.data.message,
                showConfirmButton: true,
                customClass: {
                    title: "swal_title",
                    icon: "swal_icon",
                    htmlContainer: "swal_text",
                    confirmButton: "swal_confirm"
                }
            });
            setBookManagerReload(true);
        } catch(error){
            Swal.fire({
                icon: "error",
                title: "Algo salio mal",
                text: error,
                showConfirmButton: true,
                customClass: {
                    title: "swal_title",
                    icon: "swal_icon",
                    htmlContainer: "swal_text",
                    confirmButton: "swal_confirm"
                }
            });
        } finally{
            setCargando(false);
        }
    };

    return(
        <form onSubmit={e => handleDiscountChange(e)} className="sidebar_book_form">
            <h2>{`Modificar descuento en libro '${bookDiscountData?.titulo}'`}</h2>
            <div className="sidebar_book_form_group">
                <label htmlFor="oferta_inicio">Inicio de la oferta:</label>
                <input onChange={e => setBookDiscountData({...bookDiscountData, [e.target.name]: e.target.value})} value={bookDiscountData.oferta_inicio} placeholder="Fecha de inicio..." id="oferta_inicio" type={"date"} className="sidebar_book_input" name="oferta_inicio"/>
            </div>
            <div className="sidebar_book_form_group">
                <label htmlFor="oferta_fin">Fin de la oferta:</label>
                <input onChange={e => setBookDiscountData({...bookDiscountData, [e.target.name]: e.target.value})} value={bookDiscountData.oferta_fin} placeholder="Fecha de publicacion..." id="oferta_fin" type={"date"} className="sidebar_book_input" name="oferta_fin"/>
            </div>
            <div className="sidebar_book_form_group last_discount_input">
                <label htmlFor="descuento">Porcentaje de descuento:</label>
                <input onChange={e => setBookDiscountData({...bookDiscountData, [e.target.name]: e.target.value})} min='0' max='100' value={bookDiscountData.descuento} placeholder="No. de descuento..." type={"number"} id="descuento" className="sidebar_book_input" name="descuento"/>
            </div>
            <RightSidebarButton text={cargando ? 'Modificando...' : 'Modificar'} color={"#1EEAC8"} disabled_btn={cargando} icon={"add-circle-sharp"}/>
        </form>
    )
}