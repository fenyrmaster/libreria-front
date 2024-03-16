import React from "react";
import bookExample from "../assets/book_example.png"
import RightSidebarButton from "./RightSidebarButton";

export default function SidebarBookInfo(){
    return(
        <>
            <div className="sidebar_book_image">
                <img src={bookExample}/>
            </div>
            <h3 className="sidebar_book_title">La ciencia de las especias</h3>
            <p className="sidebar_book_autores">Stuart Farrimond</p>
            <p className="sidebar_book_editorial">Editorial: DK</p>
            <div className="sidebar_quickinfo">
                <div className="sidebar_quickinfo_card">
                    <h5 className="sidebar_book_edicion_text">Edicion:</h5>
                    <p className="sidebar_book_edicion_info">2da</p>
                </div>
                <div className="sidebar_quickinfo_card">
                    <h5 className="sidebar_book_edicion_text">Publicado:</h5>
                    <p className="sidebar_book_edicion_info">24/04/2022</p>
                </div>
                <div className="sidebar_quickinfo_card">
                    <h5 className="sidebar_book_edicion_text">Paginas:</h5>
                    <p className="sidebar_book_edicion_info">224</p>
                </div>
            </div>
            <p className="sidebar_book_sinopsis">Cocineros aventureros, foodies curiosos, y fans de recetas lles de especias: abríos paso como ningún otro gracias a este libro de especias. Explora las mejores especias del mundo, descubre por qué algus de ellas funcion al cocirlas juntas y cómo utilizarlas de forma creativa. Inspírate y haz tus propias mezclas. Lleva tus recetas a un nuevo nivel. La ciencia de las especias es un acompañante indispensable en tu coci que hará de las comidas caseras algo de lo que aprenderás y en lo que querrás innovar. </p>

            <p className="sidebar_book_stock">5 Disponibles</p>
            <RightSidebarButton text={"Reservar"} color={"#ffa117"} icon={"push"}/>
        </>
    )
}