import React, { useEffect, useState } from "react";
import RightSidebarButton from "./RightSidebarButton";
import Tag from "./Tag";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useSidebar from "../hooks/useSidebar";
import clienteAxios from "../../config/clienteAxios";
import Spinner from "./Spinner";

export default function TagsAdmin(){

    const { auth } = useAuth();
    const { changeSidebar, etiquetasManagerReload, setEtiquetasManagerReload } = useSidebar();

    const [ etiquetas, setEtiquetas ] = useState([]);
    const [ deleteEtiqueta, setDeleteEtiqueta ] = useState("");
    const [ cargando, setCargando ] = useState(false);

    const cargarEtiquetas = async () => {
        setCargando(true);
        const respuesta = await clienteAxios.get("/etiquetas");
        setEtiquetas(respuesta.data.etiquetas);
        setCargando(false);
    }

    const queryDeleteEtiqueta = async id => {
        try{
            const respuesta = await clienteAxios.delete(`/etiquetas/${id}`);
            setEtiquetasManagerReload(true);
            Swal.fire({
                icon: "success",
                title: "Etiqueta eliminada",
                text: respuesta.data.message,
                showConfirmButton: true,
                customClass: {
                    title: "swal_title",
                    icon: "swal_icon",
                    htmlContainer: "swal_text",
                    confirmButton: "swal_confirm"
                }
            });
        } catch(error){
            console.log(error);
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

    const deleteEtiquetaFn = async (id, nombre) => {
        Swal.fire({
            title: "Eliminar Etiqueta",
            icon: "question",
            text: `Estas seguro de que deseas eliminar la etiqueta '${nombre}'`,
            customClass: {
                title: "swal_title",
                icon: "swal_icon",
                htmlContainer: "swal_text",
                confirmButton: "swal_confirm"
            },
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Eliminar",
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
                queryDeleteEtiqueta(id);
            }
          });
    }

    useEffect(() =>{
        if(Object.keys(auth).length === 0){
            Swal.fire({
                icon: "error",
                title: "Sin permiso",
                text: "Para usar este sitio, crea una cuenta",
                showConfirmButton: true,
                customClass: {
                    title: "swal_title",
                    icon: "swal_icon",
                    htmlContainer: "swal_text",
                    confirmButton: "swal_confirm"
                }
            });
            navigate("/iniciar-sesion");
        } else if(auth.rol != "Administrador"){
            Swal.fire({
                icon: "error",
                title: "Sin permiso",
                text: "Solo los administradores tienen acceso a este sitio",
                showConfirmButton: true,
                customClass: {
                    title: "swal_title",
                    icon: "swal_icon",
                    htmlContainer: "swal_text",
                    confirmButton: "swal_confirm"
                }
            });
            navigate("/");
        }
        cargarEtiquetas();
    }, []);
    
    useEffect(() => {
        if(etiquetasManagerReload){
            cargarEtiquetas();
            setEtiquetasManagerReload(false);
        }
    }, [etiquetasManagerReload])

    return(
    <div className="book_content tags_content">
        <div onClick={() => changeSidebar("etiquetaForm")} className={"tags_add_button"}>
            <RightSidebarButton text={"Agregar Etiqueta"} color={"#e12e13"} icon={"add-circle"} whiteBG={true}/>
        </div>
        <div className="books tags">
            { cargando ? <Spinner/> : etiquetas.length > 0 ? etiquetas.map(etiqueta => <Tag deleteEtiquetaFn={deleteEtiquetaFn} key={etiqueta.id} tag={etiqueta}/>) : <h3 className="no_users_alert alert_red">No hay etiquetas</h3> }
        </div>
    </div>
    )
}