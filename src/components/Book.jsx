import React from "react";
import bookExample from "../assets/book_example.png"

export default function Book(){
    return(
        <div className="book book_orange">
            <img className="book_image" src={bookExample}/>
            <div className="book_categorias">
                <h3 className="book_categoria">Cocina</h3>
                <h3 className="book_categoria">Ciencia</h3>
            </div>
            <h4 className="book_titulo">La ciencia de las especias</h4>
            <p className="book_autores">Stuart Farrimond</p>
        </div>
    )
}