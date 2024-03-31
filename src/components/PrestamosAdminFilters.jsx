import React from "react";

export default function PrestamosAdminFilters(){
    return(
        <form className={`book_filters admin_prestamos_filter`}>
        <div className="book_filters_input_container admin_filters_prestamo_group">
            <label htmlFor="nombre" className="book_filters_label">Nombre de Usuario:</label>
            <input name="nombre" id="nombre" className="book_filters_input"/>
        </div>
        <div className="book_filters_input_container admin_filters_prestamo_group">
            <label htmlFor="autor" className="book_filters_label">ID de usuario:</label>
            <input name="autor" id="autor" className="book_filters_input"/>
        </div>
        <div className="book_filters_input_container admin_filters_prestamo_group">
            <label htmlFor="nombre" className="book_filters_label">Estado de Pedido:</label>
            <select name="nombre" id="nombre" className="book_filters_input">
                <option>Todos</option>
                <option>Cancelados</option>
                <option>Reservados</option>
                <option>Recogidos</option>
                <option>Devueltos</option>
                <option>No devueltos</option>
            </select>
        </div>
    </form>
    )
}