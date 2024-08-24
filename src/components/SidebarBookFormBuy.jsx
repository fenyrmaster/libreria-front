import React, { useState, useEffect } from "react";
import RightSidebarButton from "./RightSidebarButton";
import useSidebar from "../hooks/useSidebar";
import clienteAxios from "../../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function SidebarBookFormBuy(){

    const [cargando, setCargando] = useState();
    const { bookComprar, setBookComprar, setBookManagerReload, closeAll } = useSidebar();
    const navigate = useNavigate();

    const handleDiscountChange = async e => {
        e.preventDefault();
        setCargando(true);
        try{
            if(bookComprar.metodo == "card"){
                const respuesta = await clienteAxios.post(`/libros/comprarLibro`, {
                    id: bookComprar.bookId,
                    cantidad: bookComprar.cantidad
                });
                window.location.href = respuesta.data.url;
            } else if(bookComprar.metodo == "cash"){
                const respuesta = await clienteAxios.post(`/libros/comprarLibroEfectivo`, {
                    id: bookComprar.bookId,
                    cantidad: bookComprar.cantidad
                });
                setBookManagerReload(true);
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
                closeAll();
            }
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
        } finally{
            setCargando(false);
        }
    };

    return(
        <form onSubmit={e => handleDiscountChange(e)} className="sidebar_book_form">
            <h2>{`Comprar libro '${bookComprar.titulo}'`}</h2>
            <div className="sidebar_book_form_group last_discount_input">
                <label htmlFor="metodo">Metodo de compra:</label>
                <select onChange={e => setBookComprar({...bookComprar, [e.target.name]: e.target.value})} value={bookComprar.metodo} type={"number"} id="metodo" className="sidebar_book_input book_input_orange" name="metodo">
                    <option value={'card'}>Tarjeta Bancaria</option>
                    <option value={'cash'}>Efectivo</option>
                </select>
            </div>
            <div className="sidebar_book_form_group last_discount_input">
                <label htmlFor="cantidad">Unidades a comprar:</label>
                <input onChange={e => setBookComprar({...bookComprar, [e.target.name]: e.target.value})} min='1' max={bookComprar.stock} value={bookComprar.cantidad} placeholder="Cantidad..." type={"number"} id="cantidad" className="sidebar_book_input book_input_orange" name="cantidad"/>
            </div>
            <RightSidebarButton text={cargando ? 'Comprando...' : 'Comprar'} color={"#ffaa00"} disabled_btn={cargando} icon={"cash"}/>
        </form>
    )
}