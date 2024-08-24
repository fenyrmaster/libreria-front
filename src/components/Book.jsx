import React from "react";
import BookAdminInfo from "./BookAdminInfo";
import BookQuickActions from "./BookQuickActions";
import useSidebar from "../hooks/useSidebar";

export default function Book({admin, book, deleteEtiquetaFn}){

    const { changeSidebar, setBookShow, setBookShowOption, bookSelectedId, setBookSelectedId, setBookDiscountData, setBookComprar } = useSidebar();

    const currentDate = new Date().getTime();
    const startDate = new Date(book?.oferta_inicio);
    const endDate = new Date(book?.oferta_fin);

    const handleDiscounts = () => {
        console.log(currentDate)
        changeSidebar("bookDiscount");
        setBookDiscountData({
            oferta_fin: book?.oferta_fin.split('T')[0],
            oferta_inicio: book?.oferta_inicio.split('T')[0],
            descuento: book?.descuento,
            bookId: book?.id,
            titulo: book?.titulo
        })
    }

    return(
        <div className={`book ${admin && "book_blue"} ${bookSelectedId == book?.id && "book_selected"}`}>
            <img onClick={() => {changeSidebar("bookShow"); setBookShow(book); setBookShowOption(true); setBookSelectedId(book?.id)}}  className="book_image" src={book?.image}/>
            <div onClick={() => {changeSidebar("bookShow"); setBookShow(book); setBookShowOption(true); setBookSelectedId(book?.id)}} className="book_categorias">
                { book?.etiquetas.map(etiqueta => <h3 key={etiqueta.id} className="book_categoria">{etiqueta.nombre}</h3>) }
            </div>
            <h4 onClick={() => {changeSidebar("bookShow"); setBookShow(book); setBookShowOption(true); setBookSelectedId(book?.id)}} className="book_titulo">{book?.titulo}</h4>
            <p onClick={() => {changeSidebar("bookShow"); setBookShow(book); setBookShowOption(true); setBookSelectedId(book?.id)}} className="book_autores">{book?.autores}</p>
            {!admin && <BookQuickActions setBookComprar={setBookComprar} bookSelectedId={bookSelectedId} book={book} changeSidebar={changeSidebar} setBookShow={setBookShow} setBookShowOption={setBookShowOption} setBookSelectedId={setBookSelectedId}/>}
            <div className="book_precio">
                {(currentDate > startDate  && currentDate < endDate) && <p className="book_precio_descuento">{book?.descuento}%</p>}
                <div className="book_precio_precios">
                    <p className="book_precio_precio_original">{(currentDate > startDate  && currentDate < endDate) ? `$ ${book?.precio}` : ""}</p>
                    <p className="book_precio_precio_descuento">$ {(currentDate > startDate  && currentDate < endDate) ? ((book?.precio*(100-book?.descuento))/100).toFixed(3) : book?.precio}</p>
                </div>
            </div>
            {admin && <BookAdminInfo deleteEtiquetaFn={deleteEtiquetaFn} book={book}/>}
            {admin && <button onClick={() => handleDiscounts()} className="admin_descuento"><ion-icon name='wallet'></ion-icon> Agregar descuento</button>}
        </div>
    )
}