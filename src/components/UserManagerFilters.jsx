import React from "react";

export default function UserManagerFilters(){
    return(
        <form className={`book_filters usuarios_filters`}>
            <div className="book_filters_input_container user_manager_group">
                <label htmlFor="nombre" className="book_filters_label">Nombre:</label>
                <input name="nombre" id="nombre" className="book_filters_input"/>
            </div>
            <div className="book_filters_input_container user_manager_group">
                <label htmlFor="autor" className="book_filters_label">Correo:</label>
                <input name="autor" id="autor" className="book_filters_input"/>
            </div>
            <div className="book_filters_input_container user_manager_group">
                <label htmlFor="autor" className="book_filters_label">ID:</label>
                <input name="autor" id="autor" className="book_filters_input"/>
            </div>
        </form>
    )
}