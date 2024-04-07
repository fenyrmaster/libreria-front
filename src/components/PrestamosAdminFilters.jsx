import React from "react";
import useSidebar from "../hooks/useSidebar";

export default function PrestamosAdminFilters(){

    const { prestamoFilterData, setPrestamoFilterData, setPrestamoManagerReload } = useSidebar();

    return(
        <form className={`book_filters admin_prestamos_filter`}>
        <div className="book_filters_input_container admin_filters_prestamo_group">
            <label htmlFor="nombre" className="book_filters_label">Nombre de Usuario:</label>
            <input onBlur={() => setPrestamoManagerReload(true)}  onChange={e => setPrestamoFilterData({...prestamoFilterData, [e.target.name]: e.target.value})} value={prestamoFilterData.nombre} name="nombre" id="nombre" className="book_filters_input"/>
        </div>
        <div className="book_filters_input_container admin_filters_prestamo_group">
            <label htmlFor="estado" className="book_filters_label">Estado de Pedido:</label>
            <select onBlur={() => setPrestamoManagerReload(true)} onChange={e => setPrestamoFilterData({...prestamoFilterData, [e.target.name]: e.target.value})} value={prestamoFilterData.estado} name="estado" id="estado" className="book_filters_input">
                <option value={""}>Todos</option>
                <option value={"Cancelado"}>Cancelados</option>
                <option value={"Reservado"}>Reservados</option>
                <option value={"Recogido"}>Recogidos</option>
                <option value={"Devuelto"}>Devueltos</option>
                <option value={"No Devuelto"}>No devueltos</option>
            </select>
        </div>
    </form>
    )
}