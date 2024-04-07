import React from "react";
import useSidebar from "../hooks/useSidebar";

export default function PedidoFilters({admin}){

    const { prestamoFilterData, setPrestamoFilterData, setPrestamoManagerReload } = useSidebar();
    
    return(
        <form className={`book_filters pedido_filters ${admin && "skyblue"}`}>
            <div className="book_filters_input_container pedido_filters_container">
                <label htmlFor="estado" className="book_filters_label">Estado de Pedido:</label>
                <select onBlur={() => setPrestamoManagerReload(true)} onChange={e => setPrestamoFilterData({...prestamoFilterData, [e.target.name]: e.target.value})} name="estado" id="estado" className="book_filters_input">
                    <option value={""}>Todos</option>
                    <option value={"Cancelado"}>Cancelados</option>
                    <option value={"Reservado"}>Reservados</option>
                    <option value={"Recogido"}>Recogidos</option>
                    <option value={"Devuelto"}>Devueltos</option>
                    <option value={"No Devuelto"}>No devueltos</option>
                </select>
            </div>
            {admin && <button className="book_add" type="button">+</button>}
        </form>
    )
}