import React from "react";
import RightSidebarButton from "./RightSidebarButton";
import Tag from "./Tag";

export default function TagsAdmin(){
    return(
    <div className="book_content tags_content">
        <div className={"tags_add_button"}>
            <RightSidebarButton text={"Agregar Etiqueta"} color={"#e12e13"} icon={"add-circle"} whiteBG={true}/>
        </div>
        <div className="books tags">
            <Tag/>
            <Tag/>
            <Tag/>
            <Tag/>
            <Tag/>
            <Tag/>
            <Tag/>
            <Tag/>
            <Tag/>
            <Tag/>
            <Tag/>
            <Tag/>
            <Tag/>
            <Tag/>
            <Tag/>
            <Tag/>
            <Tag/>
            <Tag/>
            <Tag/>
            <Tag/>
            <Tag/>
            <Tag/>
        </div>
    </div>
    )
}