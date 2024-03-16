import React from "react";
import bookExample from "../assets/book_example.png"
import BookAdminInfo from "./BookAdminInfo";

export default function Book({admin}){
    return(
        <div className={`book ${admin && "book_blue"}`}>
            <img className="book_image" src={bookExample}/>
            <div className="book_categorias">
                <h3 className="book_categoria">Cocina</h3>
                <h3 className="book_categoria">Ciencia</h3>
            </div>
            <h4 className="book_titulo">La ciencia de las especias</h4>
            <p className="book_autores">Stuart Farrimond</p>
            {admin && <BookAdminInfo/>}
        </div>
    )
}