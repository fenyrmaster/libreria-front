import React from "react";
import useSidebar from "../hooks/useSidebar";

export default function TagsBookForm({selectedEtiqueta, tag}){

    const { tagsBookFormSelected } = useSidebar();

    return(
        <>
        { tagsBookFormSelected.includes(tag.id) 
        ?<p onClick={() => selectedEtiqueta(tag.id)} className={`tag_book_form tag_book_form_selected`} key={tag.id}>{tag.nombre}</p>
        :<p onClick={() => selectedEtiqueta(tag.id)} className={`tag_book_form`} key={tag.id}>{tag.nombre}</p>
        }
        </>
    )
}