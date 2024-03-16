import React from "react";

export default function BookFilters({admin}){
    return(
        <form className={`book_filters ${admin && "skyblue"}`}>
            <div className="book_filters_input_container">
                <label htmlFor="nombre" className="book_filters_label">Nombre:</label>
                <input name="nombre" id="nombre" className="book_filters_input"/>
            </div>
            <div className="book_filters_input_container">
                <label htmlFor="autor" className="book_filters_label">Autor:</label>
                <input name="autor" id="autor" className="book_filters_input"/>
            </div>
            <div className="book_filters_input_container">
                <label htmlFor="nombre" className="book_filters_label">Categoria:</label>
                <select name="nombre" id="nombre" className="book_filters_input">
                    <option>No ficcion</option>
                    <option>Ficcion</option>
                </select>
            </div>
        </form>
    )
}