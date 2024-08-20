import React, { useState, useEffect } from "react";
import RightSidebarButton from "./RightSidebarButton";
import useSidebar from "../hooks/useSidebar";
import clienteAxios from "../../config/clienteAxios";
import Spinner from "./Spinner";
import TagsBookForm from "./TagsBookForm";
import Swal from "sweetalert2";

export default function SidebarBookForm(){

    const { tagsBookFormLoad, setTagsBookFormLoad, tagsBookFormSelected, setTagsBookFormSelected, bookFormData, setBookFormData, setBookManagerReload } = useSidebar();
    const [ tagsChoice, setTagsChoice ] = useState([]);
    const [ tagsLoading, setTagsLoading ] = useState(false);
    const [ cargando, setCargando ] = useState(false);

    const cargarEtiquetas = async () => {
        setTagsLoading(true);
        const respuesta = await clienteAxios.get("/etiquetas");
        setTagsChoice(respuesta.data.etiquetas);
        setTagsBookFormLoad(false);
        setTagsLoading(false);
    }

    const selectedEtiqueta = tagID => {
        let tags = tagsBookFormSelected.slice();
        if(tags.includes(tagID)){
            let indexTag = tags.indexOf(tagID);
            tags.splice(indexTag, 1);
        } else{
            tags.push(tagID);
        }
        console.log(tags);
        setTagsBookFormSelected(tags);
    }

    useEffect(() => {
        cargarEtiquetas();
    }, [tagsBookFormLoad]);

    const subirImagen = e => {
        setBookFormData({...bookFormData, imagen_portada: e.target.files});
    }

    const gestionarBook = async e => {
        e.preventDefault();
        setCargando(true);
        if(bookFormData.titulo.trim() == "" || bookFormData.sinopsis.trim() == "" || bookFormData.edicion.trim() == "" || bookFormData.autores.trim() == "" || bookFormData.fecha_publicacion.trim() == "" || bookFormData.editorial.trim() == "" || bookFormData.paginas <= -1 || bookFormData.stock <= -1){
            setCargando(false);
            Swal.fire({
                icon: "warning",
                title: "Advertencia",
                text: "Todos los campos son obligatorios",
                showConfirmButton: true,
                customClass: {
                    title: "swal_title",
                    icon: "swal_icon",
                    htmlContainer: "swal_text",
                    confirmButton: "swal_confirm"
                }
            });
            return;
        }
        if(tagsBookFormSelected.length < 1){
            setCargando(false);
            Swal.fire({
                icon: "warning",
                title: "Advertencia",
                text: "Selecciona por lo menos 1 etiqueta",
                showConfirmButton: true,
                customClass: {
                    title: "swal_title",
                    icon: "swal_icon",
                    htmlContainer: "swal_text",
                    confirmButton: "swal_confirm"
                }
            });
            return;
        }
        try{
            if(bookFormData.id == ""){
                if(!bookFormData.imagen_portada || !bookFormData.imagen_portada[0]){
                    setCargando(false);
                    Swal.fire({
                        icon: "warning",
                        title: "Advertencia",
                        text: "Debes subir al menos una imagen",
                        showConfirmButton: true,
                        customClass: {
                            title: "swal_title",
                            icon: "swal_icon",
                            htmlContainer: "swal_text",
                            confirmButton: "swal_confirm"
                        }
                    });
                    return;
                }
                let formData = new FormData();
                formData.append("titulo", bookFormData.titulo);
                formData.append("sinopsis", bookFormData.sinopsis);
                formData.append("stock", bookFormData.stock);
                formData.append("edicion", bookFormData.edicion);
                formData.append("autores", bookFormData.autores);
                formData.append("fecha_publicacion", bookFormData.fecha_publicacion);
                formData.append("paginas", bookFormData.paginas);
                formData.append("imagen_portada", bookFormData.imagen_portada[0]);
                formData.append("etiquetas", tagsBookFormSelected);
                formData.append("precio", bookFormData.precio);
                formData.append("editorial", bookFormData.editorial);
                const respuesta = await clienteAxios.post("/libros", formData);
                setCargando(false);
                setTagsBookFormSelected([]);
                setBookManagerReload(true);
                setBookFormData({
                    id: "",
                    titulo: "",
                    sinopsis: "",
                    stock: 0,
                    edicion: "",
                    autores: "",
                    fecha_publicacion: "",
                    editorial: "",
                    paginas: 0,
                    precio: 0,
                    imagen_portada: null
                })
                Swal.fire({
                    icon: "success",
                    title: "Libro agregado",
                    text: respuesta.data.message,
                    showConfirmButton: true,
                    customClass: {
                        title: "swal_title",
                        icon: "swal_icon",
                        htmlContainer: "swal_text",
                        confirmButton: "swal_confirm"
                    }
                });
            } else{
                let formData = new FormData();
                if(bookFormData.imagen_portada || bookFormData.imagen_portada){
                    formData.append("imagen_portada", bookFormData.imagen_portada[0]);
                }
                formData.append("titulo", bookFormData.titulo);
                formData.append("sinopsis", bookFormData.sinopsis);
                formData.append("stock", bookFormData.stock);
                formData.append("edicion", bookFormData.edicion);
                formData.append("autores", bookFormData.autores);
                formData.append("fecha_publicacion", bookFormData.fecha_publicacion);
                formData.append("paginas", bookFormData.paginas);
                formData.append("etiquetas", tagsBookFormSelected);
                formData.append("precio", bookFormData.precio);
                formData.append("editorial", bookFormData.editorial);
                const respuesta = await clienteAxios.patch(`/libros/${bookFormData.id}`, formData);
                setCargando(false);
                setTagsBookFormSelected([]);
                setBookManagerReload(true);
                setBookFormData({
                    id: "",
                    titulo: "",
                    sinopsis: "",
                    stock: 0,
                    edicion: "",
                    autores: "",
                    fecha_publicacion: "",
                    editorial: "",
                    paginas: 0,
                    precio: 0,
                    imagen_portada: null
                })
                Swal.fire({
                    icon: "success",
                    title: "Libro modificado",
                    text: respuesta.data.message,
                    showConfirmButton: true,
                    customClass: {
                        title: "swal_title",
                        icon: "swal_icon",
                        htmlContainer: "swal_text",
                        confirmButton: "swal_confirm"
                    }
                });
            }
        }catch(error){
            setCargando(false);
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Algo salio mal",
                text: error,
                showConfirmButton: true,
                customClass: {
                    title: "swal_title",
                    icon: "swal_icon",
                    htmlContainer: "swal_text",
                    confirmButton: "swal_confirm"
                }
            });
        }
    }

    return(
        <form onSubmit={e => gestionarBook(e)} className="sidebar_book_form">
            <h2>{bookFormData.id != "" ? `Modificar Libro '${bookFormData.titulo}'` : "Agregar Libros"}</h2>
            <div className="sidebar_book_form_group">
                <label htmlFor="titulo">Titulo:</label>
                <input onChange={e => setBookFormData({...bookFormData, [e.target.name]: e.target.value})} value={bookFormData.titulo} placeholder="Titulo..." id="titulo" className="sidebar_book_input" name="titulo"/>
            </div>
            <div className="sidebar_book_form_group">
                <label htmlFor="editorial">Editorial:</label>
                <input onChange={e => setBookFormData({...bookFormData, [e.target.name]: e.target.value})} value={bookFormData.editorial} placeholder="Editorial..." id="editorial" className="sidebar_book_input" name="editorial"/>
            </div>
            <div className="sidebar_book_form_group">
                <label htmlFor="autores">Autores:</label>
                <input onChange={e => setBookFormData({...bookFormData, [e.target.name]: e.target.value})} value={bookFormData.autores} placeholder="Autores..." id="autores" className="sidebar_book_input" name="autores"/>
            </div>
            <div className="sidebar_book_form_group">
                <label htmlFor="fecha_publicacion">Fecha Publicado:</label>
                <input onChange={e => setBookFormData({...bookFormData, [e.target.name]: e.target.value})} value={bookFormData.fecha_publicacion} placeholder="Fecha de publicacion..." id="fecha_publicacion" type={"date"} className="sidebar_book_input" name="fecha_publicacion"/>
            </div>
            <div className="sidebar_book_form_group">
                <label htmlFor="edicion">Edicion:</label>
                <input onChange={e => setBookFormData({...bookFormData, [e.target.name]: e.target.value})} value={bookFormData.edicion} placeholder="Edicion..." id="edicion" className="sidebar_book_input" name="edicion"/>
            </div>
            <div className="sidebar_book_form_group">
                <label htmlFor="paginas">Paginas:</label>
                <input onChange={e => setBookFormData({...bookFormData, [e.target.name]: e.target.value})} value={bookFormData.paginas} placeholder="No. de paginas..." type={"number"} id="paginas" className="sidebar_book_input" name="paginas"/>
            </div>
            <div className="sidebar_book_form_group">
                <label htmlFor="precio">Precio:</label>
                <input onChange={e => setBookFormData({...bookFormData, [e.target.name]: e.target.value})} value={bookFormData.precio} placeholder="Precio..." type={"number"} id="precio" className="sidebar_book_input" name="precio"/>
            </div>
            <div className="sidebar_book_form_group">
                <label htmlFor="stock">Stock:</label>
                <input onChange={e => setBookFormData({...bookFormData, [e.target.name]: e.target.value})} value={bookFormData.stock} placeholder="Cantidad disponible..." id="stock" type={"number"} className="sidebar_book_input" name="stock"/>
            </div>
            <div className="sidebar_book_form_group">
                <label htmlFor="imagen_portada">Imagen:</label>
                <input onChange={e => subirImagen(e)} placeholder="Ingresa la imagen a utilizar" type={"file"} id="imagen_portada" className="sidebar_book_input" name="imagen_portada"/>
            </div>
            <div className="sidebar_book_form_group">
                <label htmlFor="sinopsis">Sinopsis:</label>
                <textarea onChange={e => setBookFormData({...bookFormData, [e.target.name]: e.target.value})} value={bookFormData.sinopsis} placeholder="Aqui va la sinopsis" id="sinopsis" className="sidebar_book_textarea" name="sinopsis"></textarea>
            </div>
            <h4 className="sidebar_book_form_tags_h4">Etiquetas:</h4>
            <div className="sidebar_book_form_tags_group">
                { tagsLoading ? <Spinner/> : tagsChoice.map(tag => <TagsBookForm key={`${tag.id}-form`} selectedEtiqueta={selectedEtiqueta} tag={tag}/>) }
            </div>
            <RightSidebarButton text={cargando ? (bookFormData.id != "" ? "Modificando..." : "Creando...") : (bookFormData.id != "" ? "Modificar" : "Crear")} color={"#1EEAC8"} disabled_btn={cargando} icon={"add-circle-sharp"}/>
        </form>
    )
}