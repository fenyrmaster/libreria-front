import React from "react";

export default function PedidoFilters({admin}){
    return(
        <form className={`book_filters pedido_filters ${admin && "skyblue"}`}>
            <div className="book_filters_input_container pedido_filters_container">
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
            {admin && <button className="book_add" type="button">+</button>}
        </form>
    )
}