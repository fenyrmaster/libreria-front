import React from "react";
import Prestamo from "./Prestamo";
import PedidoFilters from "./PedidoFilters";

export default function PrestamosPage(){
    return(
        <div className="book_content prestamos">
            <PedidoFilters admin={false}/>
            <div className="books prestamos_contenido">
                <Prestamo estado={"cancelado"}/>
                <Prestamo estado={"reservado"}/>
                <Prestamo estado={"recogido"}/>
                <Prestamo estado={"devuelto"}/>
                <Prestamo estado={"sin_devolver"}/>
            </div>
        </div>
    )
}