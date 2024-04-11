import React from "react";
import useSidebar from "../hooks/useSidebar";

export default function AuditoriaFilters(){

    const { setAuditoriaManagerReload, auditoriaFilters, setAuditoriaFilters } = useSidebar();

    return(
        <form className={`book_filters admin_auditorias_filter`}>
        <div className="book_filters_input_container admin_filters_auditorias">
            <label htmlFor="tabla" className="book_filters_label">Tabla:</label>
            <select onBlur={() => setAuditoriaManagerReload(true)} onChange={e => setAuditoriaFilters({...auditoriaFilters, [e.target.name]: e.target.value})} value={auditoriaFilters.tabla} name="tabla" id="tabla" className="book_filters_input">
                <option value={""}>Todas</option>
                <option value={"Prestamos"}>Prestamos</option>
                <option value={"Libros"}>Libros</option>
                <option value={"Etiquetas"}>Etiquetas</option>
            </select>
        </div>
        <div className="book_filters_input_container admin_filters_auditorias">
            <label htmlFor="accion" className="book_filters_label">Accion realizada:</label>
            <select onBlur={() => setAuditoriaManagerReload(true)} onChange={e => setAuditoriaFilters({...auditoriaFilters, [e.target.name]: e.target.value})} value={auditoriaFilters.accion} name="accion" id="accion" className="book_filters_input">
                <option value={""}>Todas</option>
                <option value={"Update"}>Actualizar</option>
                <option value={"Insert"}>Insertar</option>
                <option value={"Delete"}>Eliminar</option>
            </select>
        </div>
    </form>
    )
}