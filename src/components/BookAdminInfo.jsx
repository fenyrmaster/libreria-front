import React from "react"
import useSidebar from "../hooks/useSidebar"

export default function BookAdminInfo({book, deleteEtiquetaFn}){

    const { changeSidebar, setBookFormData, setTagsBookFormSelected } = useSidebar();

    const retrieveIds = () => {
        let tags = [];
        book.etiquetas.map(etiqueta => {
            tags.push(etiqueta.id);
        });
        setTagsBookFormSelected(tags);
    }

    return(
        <div className="adminInfo">
            <p className={book?.stock > 0 ? "adminInfo_stock" : "adminInfo_stock agotado"}>{book?.stock > 0 ? `Stock: ${book?.stock}` : "Agotado"}</p>
            <div className="adminInfo_acciones">
                <button onClick={() => {changeSidebar("bookForm"); retrieveIds(); setBookFormData({ id: book.id, titulo: book.titulo, sinopsis: book.sinopsis, stock: book.stock, edicion: book.edicion, precio: book.precio, autores: book.autores, editorial: book.editorial, fecha_publicacion: book.fecha_publicacion.split("T")[0], paginas: book.paginas, imagen_portada: null})}} className="adminInfo_acciones_editar">Editar</button>
                <button onClick={() => deleteEtiquetaFn(book.id, book.titulo)} className="adminInfo_acciones_eliminar">Eliminar</button>
            </div>
        </div>
    )
}