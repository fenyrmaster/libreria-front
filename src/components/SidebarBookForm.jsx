import React from "react";
import RightSidebarButton from "./RightSidebarButton";

export default function SidebarBookForm(){
    return(
        <form className="sidebar_book_form">
            <h2>Agregar Libros</h2>
            <div className="sidebar_book_form_group">
                <label>Titulo</label>
                <input placeholder="Titulo..." className="sidebar_book_input" name="titulo"/>
            </div>
            <div className="sidebar_book_form_group">
                <label>Titulo</label>
                <input placeholder="Editorial..." className="sidebar_book_input" name="editorial"/>
            </div>
            <div className="sidebar_book_form_group">
                <label>Titulo</label>
                <input placeholder="Autores..." className="sidebar_book_input" name="autores"/>
            </div>
            <div className="sidebar_book_form_group">
                <label>Titulo</label>
                <input placeholder="Fecha de publicacion..." type={"date"} className="sidebar_book_input" name="fecha_publicacion"/>
            </div>
            <div className="sidebar_book_form_group">
                <label>Titulo</label>
                <input placeholder="Edicion..." className="sidebar_book_input" name="edicion"/>
            </div>
            <div className="sidebar_book_form_group">
                <label>Paginas</label>
                <input placeholder="No. de paginas..." className="sidebar_book_input" name="paginas"/>
            </div>
            <div className="sidebar_book_form_group">
                <label>Stock</label>
                <input placeholder="Cantidad disponible..." className="sidebar_book_input" name="stock"/>
            </div>
            <div className="sidebar_book_form_group">
                <label>Imagen:</label>
                <input placeholder="Ingresa la imagen a utilizar" type={"file"} className="sidebar_book_input" name="stock"/>
            </div>
            <div className="sidebar_book_form_group">
                <label>Sinopsis:</label>
                <textarea placeholder="Aqui va la sinopsis" className="sidebar_book_textarea" name="stock"></textarea>
            </div>
            <RightSidebarButton text={"Crear"} color={"#1EEAC8"} icon={"add-circle-sharp"}/>
        </form>
    )
}