import React from "react";
import PrestamoAdmin from "./PrestamoAdmin";
import PrestamosAdminFilters from "./PrestamosAdminFilters";

export default function PrestamosAdminPage(){
    return(
        <div className="book_content admin_prestamos_content">
            <PrestamosAdminFilters/>
            <div className="books admin_prestamos_all">
                <PrestamoAdmin estado={"cancelado"}/>
                <PrestamoAdmin estado={"reservado"}/>
                <PrestamoAdmin estado={"recogido"}/>
                <PrestamoAdmin estado={"devuelto"}/>
                <PrestamoAdmin estado={"sin_devolver"}/>
            </div>
        </div>
    )
}