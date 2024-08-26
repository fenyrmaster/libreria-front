import React from "react";
import useSidebar from "../hooks/useSidebar";

export default function CompraFilters({admin, compraFilterData, setCompraFilterData}){

    const { setCompraManagerReload } = useSidebar();
    
    return(
        <form className={`book_filters compra_filters`}>
            { admin && <div className="book_filters_input_container compra_filters_group">
                <label htmlFor="nombre" className="book_filters_label">Nombre de Usuario:</label>
                <input onBlur={() => setCompraManagerReload(true)}  onChange={e => setCompraFilterData({...compraFilterData, [e.target.name]: e.target.value})} value={compraFilterData.nombre} name="nombre" id="nombre" className="book_filters_input"/>
            </div> }
            <div className="book_filters_input_container compra_filters_group">
                <label htmlFor="estado" className="book_filters_label">Estado de la compra:</label>
                <select onBlur={() => setCompraManagerReload(true)} onChange={e => setCompraFilterData({...compraFilterData, [e.target.name]: e.target.value})} name="estado" id="estado" className="book_filters_input">
                    <option value={""}>Todos</option>
                    <option value={"Cancelado"}>Cancelados</option>
                    <option value={"Reservado"}>Reservados</option>
                    <option value={"Pagado"}>Comprados</option>
                    <option value={"Entregado"}>Entregados</option>
                </select>
            </div>
        </form>
    )
}