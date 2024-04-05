import React from "react";
import bookExample from "../assets/book_example.png"
import RightSidebarButton from "./RightSidebarButton";
import useSidebar from "../hooks/useSidebar";

export default function SidebarBookInfo(){

    const { bookShow } = useSidebar();

    return(
        <>
            <div className="sidebar_book_image">
                <img src={bookShow?.image}/>
            </div>
            <h3 className="sidebar_book_title">{bookShow.titulo}</h3>
            <p className="sidebar_book_autores">{bookShow.autores}</p>
            <p className="sidebar_book_editorial">Editorial: {bookShow.editorial}</p>
            <div onClick={() => {if(admin == true){changeSidebar("bookShow"); setBookShow(book); setBookShowOption(true)}}} className="book_categorias book_sidebar_categorias_content">
                { bookShow?.etiquetas.map(etiqueta => <h3 key={etiqueta.id} className="book_categoria book_sidebar_categoria">{etiqueta.nombre}</h3>) }
            </div>
            <div className="sidebar_quickinfo">
                <div className="sidebar_quickinfo_card">
                    <h5 className="sidebar_book_edicion_text">Edicion:</h5>
                    <p className="sidebar_book_edicion_info">{bookShow.edicion}</p>
                </div>
                <div className="sidebar_quickinfo_card">
                    <h5 className="sidebar_book_edicion_text">Publicado:</h5>
                    <p className="sidebar_book_edicion_info">{new Date (bookShow.fecha_publicacion.split("T")[0]).toLocaleDateString("es-MX")}</p>
                </div>
                <div className="sidebar_quickinfo_card">
                    <h5 className="sidebar_book_edicion_text">Paginas:</h5>
                    <p className="sidebar_book_edicion_info">{bookShow.paginas}</p>
                </div>
            </div>
            <p className="sidebar_book_sinopsis">{bookShow.sinopsis}</p>

            <p className="sidebar_book_stock">{bookShow.stock} Disponibles</p>
            <RightSidebarButton text={"Reservar"} color={"#ffa117"} icon={"push"}/>
        </>
    )
}