import React from "react";
import { useState, useEffect } from "react";
import clienteAxios from "../../config/clienteAxios";
import useSidebar from "../hooks/useSidebar";

export default function BookFilters({admin}){

    const { changeSidebar, filterBooks, setFilterBooks, setBookManagerReload } = useSidebar();
    const [ categorias, setCategorias ] = useState([]);

    const getTags = async () => {
        const categoriasQuery = await clienteAxios.get("/etiquetas");
        setCategorias(categoriasQuery.data.etiquetas);
    }

    useEffect(() => {
        getTags();
    }, [])

    return(
        <form onSubmit={e => e.preventDefault()} className={`book_filters ${admin && "skyblue"}`}>
            <div className="book_filters_input_container">
                <label htmlFor="titulo" className="book_filters_label">Nombre:</label>
                <input onBlur={() => setBookManagerReload(true)} onChange={e => setFilterBooks({...filterBooks, [e.target.name]: e.target.value})} value={filterBooks.nombre} name="titulo" id="titulo" className="book_filters_input"/>
            </div>
            <div className="book_filters_input_container">
                <label htmlFor="autores" className="book_filters_label">Autor:</label>
                <input onBlur={() => setBookManagerReload(true)} onChange={e => setFilterBooks({...filterBooks, [e.target.name]: e.target.value})} value={filterBooks.autor} name="autores" id="autores" className="book_filters_input"/>
            </div>
            <div className="book_filters_input_container">
                <label htmlFor="categoria" className="book_filters_label">Categoria:</label>
                <select onBlur={() => setBookManagerReload(true)} onChange={e => setFilterBooks({...filterBooks, [e.target.name]: e.target.value})} value={filterBooks.categoria} name="categoria" id="categoria" className="book_filters_input">
                    <option value={""}>Todos</option>
                    { categorias?.map(categoria => <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>) }
                </select>
            </div>
            {admin && <button onClick={() => changeSidebar("bookForm")} className="book_add" type={"button"}>+</button>}
        </form>
    )
}