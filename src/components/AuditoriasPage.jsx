import React, {useState, useEffect} from "react";
import Spinner from "./Spinner";
import useSidebar from "../hooks/useSidebar";
import Swal from "sweetalert2";
import clienteAxios from "../../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import AuditoriaFilters from "./AuditoriaFilters";
import Auditoria from "./Auditoria";

export default function AuditoriasPage(){

    const { auditoriaManagerReload, setAuditoriaManagerReload, auditoriaFilters, setAuditoriaFilters } = useSidebar();
    const { auth } = useAuth();

    const [ prestamosA, setPrestamosA ] = useState([]);
    const [ librosA, setLibrosA ] = useState([]);
    const [ etiquetasA, setEtiquetasA ] = useState([]);
    const [ cargando, setCargando ] = useState(false);

    const obtenerAuditorias = async () => {
        try{
            setCargando(true);
            const respuesta = await clienteAxios.post("/auditorias", auditoriaFilters);
            console.log(respuesta.data);
            setLibrosA(respuesta.data.libros);
            setEtiquetasA(respuesta.data.etiquetas);
            setPrestamosA(respuesta.data.prestamos);
            setAuditoriaManagerReload(false);
            setCargando(false);
        } catch(error){
            console.log(error);
        }
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
        setAuditoriaFilters({
            accion: "",
            tabla: ""
        })
        obtenerAuditorias();
    }, []);

    useEffect(() => {
        if(auditoriaManagerReload){
            obtenerAuditorias();
        }
    }, [auditoriaManagerReload]);

    return(
        <div className={`book_content auditorias_content`}>
        <AuditoriaFilters/>
        <div className="auditorias_content">
            { cargando ? <Spinner/> : 
            ((prestamosA.length <= 0 && librosA.length <= 0 && etiquetasA.length <= 0) && <h3 className="no_users_alert alert_orange">No hay acciones realizadas</h3>)}
            { !cargando && librosA.length > 0 && <h2>Libros:</h2> }
            { !cargando && librosA.length > 0 && librosA.map(libroA => <Auditoria auditoria={libroA} tipo={"Libro"}/>) }
            { !cargando && etiquetasA.length > 0 && <h2>Etiquetas:</h2> }
            { !cargando && etiquetasA.length > 0 && etiquetasA.map(etiquetaA => <Auditoria auditoria={etiquetaA} tipo={"Etiqueta"}/>) }
            { !cargando && prestamosA.length > 0 && <h2>Prestamos:</h2> }
            { !cargando && prestamosA.length > 0 && prestamosA.map(prestamoA => <Auditoria auditoria={prestamoA} tipo={"Prestamo"}/>) }
            </div>
        </div>
    )
}