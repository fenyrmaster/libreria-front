import React, { useState, useEffect } from "react";
import useSidebar from "../hooks/useSidebar";
import BookFilters from "./BookFilters";
import Book from "./Book";
import clienteAxios from "../../config/clienteAxios";
import Spinner from "./Spinner";

export default function BookPage(){

    const { bookManagerReload, setBookManagerReload, filterBooks, setFilterBooks, searchUniversal, setSearchUniversal } = useSidebar();
    const [ cargando, setCargando ] = useState(false);
    const [ books, setBooks ] = useState([]);
    const [ universalEnabled, setUniversalEnabled ] = useState(true);

    const cargarLibros = async () => {
        setCargando(true);
        const libros = await clienteAxios.post(`/libros/get-all?stockout=false&${(searchUniversal != "" && universalEnabled) ? `name=${searchUniversal}` : ""}`, filterBooks);
        setBooks(libros.data.libros);
        setCargando(false);
    }

    useEffect(() => {
        setFilterBooks({
            titulo: "",
            categoria: "",
            autores: ""
        });
        cargarLibros();
        setUniversalEnabled(false);
        setSearchUniversal("");
    }, []);

    useEffect(() => {
        if(bookManagerReload){
            cargarLibros();
            setBookManagerReload(false);
        }
    }, [bookManagerReload]);

    return(

        <div className="book_content">
            <BookFilters/>
            <div className="books">
            { cargando ? <Spinner/> : (books.length > 0 ? books.map(book => <Book admin={false} key={book.id} book={book}/>) : <h3 className="no_users_alert alert_orange">No hay libros</h3>)}
            </div>
        </div>

    )
}