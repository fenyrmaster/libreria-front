import React from "react";
import RightSidebarButton from "./RightSidebarButton";

export default function RightSidebarTagForm(){
    return(
        <form className="sidebar_book_form">
            <h2>Crear Etiqueta</h2>
            <div className="sidebar_book_form_group tags_red">
                <label>Nombre:</label>
                <input placeholder="Nombre..." className="sidebar_book_input" name="titulo"/>
            </div>
            <div className="sidebar_book_form_group tags_red">
                <label>Type:</label>
                <select placeholder="Tipo..." className="sidebar_book_input" name="editorial">
                    <option>Categoria</option>
                    <option>Genero</option>
                </select>
            </div>
            <div className="button_form_user">
                <RightSidebarButton text={"Agregar Etiqueta"} color={"#e12e13"} icon={"add-circle-sharp"} whiteBG={false}/>
            </div>    
        </form>
    )
}