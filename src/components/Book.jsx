import React from "react";
import BookAdminInfo from "./BookAdminInfo";
import useSidebar from "../hooks/useSidebar";

export default function Book({admin, book, deleteEtiquetaFn}){

    const { changeSidebar, setBookShow, setBookShowOption, bookSelectedId, setBookSelectedId } = useSidebar();

    return(
        <div onClick={() => {if(admin == false){changeSidebar("bookShow"); setBookShow(book); setBookShowOption(true); setBookSelectedId(book?.id)}}} className={`book ${admin && "book_blue"} ${bookSelectedId == book?.id && "book_selected"}`}>
            <img onClick={() => {if(admin == true){changeSidebar("bookShow"); setBookShow(book); setBookShowOption(true); setBookSelectedId(book?.id)}}}  className="book_image" src={book?.image}/>
            <div onClick={() => {if(admin == true){changeSidebar("bookShow"); setBookShow(book); setBookShowOption(true); setBookSelectedId(book?.id)}}} className="book_categorias">
                { book?.etiquetas.map(etiqueta => <h3 key={etiqueta.id} className="book_categoria">{etiqueta.nombre}</h3>) }
            </div>
            <h4 onClick={() => {if(admin == true){changeSidebar("bookShow"); setBookShow(book); setBookShowOption(true); setBookSelectedId(book?.id)}}} className="book_titulo">{book?.titulo}</h4>
            <p onClick={() => {if(admin == true){changeSidebar("bookShow"); setBookShow(book); setBookShowOption(true); setBookSelectedId(book?.id)}}} className="book_autores">{book?.autores}</p>
            {admin && <BookAdminInfo deleteEtiquetaFn={deleteEtiquetaFn} book={book}/>}
        </div>
    )
}