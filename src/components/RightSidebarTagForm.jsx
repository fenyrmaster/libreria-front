import React from "react";
import RightSidebarButton from "./RightSidebarButton";
import Swal from "sweetalert2";
import useSidebar from "../hooks/useSidebar";
import clienteAxios from "../../config/clienteAxios";
import { useState, useEffect } from "react";

export default function RightSidebarTagForm(){

    const { etiquetaFormData, setEtiquetaFormData, setEtiquetasManagerReload } = useSidebar();
    const [ cargando, setCargando ] = useState(false);

    const gestionarEtiqueta = async e => {
        e.preventDefault();
        setCargando(true);
        if(etiquetaFormData.nombre == "" || etiquetaFormData.tipo == ""){
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
        try{
            if(etiquetaFormData.id == ""){
                const respuesta = await clienteAxios.post("/etiquetas", {
                    nombre: etiquetaFormData.nombre,
                    tipo: etiquetaFormData.tipo
                });
                setCargando(false);
                setEtiquetaFormData({
                    id: "",
                    nombre: "",
                    tipo: "Categoria"
                });
                setEtiquetasManagerReload(true);
                Swal.fire({
                    icon: "success",
                    title: "Etiqueta agregada",
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
                const respuesta = await clienteAxios.patch(`/etiquetas/${etiquetaFormData.id}`, {
                    nombre: etiquetaFormData.nombre,
                    tipo: etiquetaFormData.tipo
                });
                setCargando(false);
                setEtiquetaFormData({
                    id: "",
                    nombre: "",
                    tipo: "Categoria"
                });
                setEtiquetasManagerReload(true);
                Swal.fire({
                    icon: "success",
                    title: "Etiqueta modificada",
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
        } catch(error){
            setCargando(false);
            Swal.fire({
                icon: "error",
                title: "Algo salio mal",
                text: error.response.data.message,
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

    useEffect(() => {

    })

    return(
        <form onSubmit={e => gestionarEtiqueta(e)} className="sidebar_book_form">
            <h2>{etiquetaFormData.id == "" ? "Crear Etiqueta" : `Modificar etiqueta '${etiquetaFormData.nombre}'`}</h2>
            <div className="sidebar_book_form_group tags_red">
                <label htmlFor="nombre">Nombre:</label>
                <input onChange={e => setEtiquetaFormData({...etiquetaFormData, [e.target.name]: e.target.value})} value={etiquetaFormData.nombre} placeholder="Nombre..." className="sidebar_book_input" name="nombre" id="nombre"/>
            </div>
            <div className="sidebar_book_form_group tags_red">
                <label htmlFor="tipo">Tipo:</label>
                <select onChange={e => setEtiquetaFormData({...etiquetaFormData, [e.target.name]: e.target.value})} value={etiquetaFormData.tipo} placeholder="Tipo..." className="sidebar_book_input" name="tipo" id="tipo">
                    <option>Categoria</option>
                    <option>Genero</option>
                </select>
            </div>
            <div className="button_form_user">
                <RightSidebarButton text={cargando ? (etiquetaFormData.id == "" ? "Agregando..." : "Actualizando...") : (etiquetaFormData.id == "" ? "Agregar Etiqueta" : "Actualizar Etiqueta")} color={"#e12e13"} disabled_btn={cargando} icon={"add-circle-sharp"} whiteBG={false}/>
            </div>    
        </form>
    )
}