import React, { useState } from "react";
import RightSidebarButton from "./RightSidebarButton";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import clienteAxios from "../../config/clienteAxios";

export default function ResetPassword(){

    const [cargando, setCargando] = useState(false);
    const [ passwordNew, setPasswordNew ] = useState({
        contrasena: "",
        repetir_contrasena: ""
    })

    const { codigo } = useParams();
    const navigate = useNavigate();

    const restablecerContrasena = async e => {
        e.preventDefault();
        setCargando(true);
        if(passwordNew.repetir_contrasena.trim() == "" || passwordNew.contrasena.trim() == ""){
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
        if(passwordNew.contrasena.length < 6){
            setCargando(false);
            Swal.fire({
                icon: "warning",
                title: "Advertencia",
                text: "Las contraseñas deben tener al menos 6 caracteres",
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
        if(passwordNew.repetir_contrasena != passwordNew.contrasena){
            setCargando(false);
            Swal.fire({
                icon: "warning",
                title: "Advertencia",
                text: "Las contraseñas no coinciden",
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
            await clienteAxios.patch(`/usuarios/resetPassword/${codigo}`, {
                contrasena: passwordNew.contrasena,
                repetir_contrasena: passwordNew.repetir_contrasena
            });
            setCargando(false);
            navigate("/iniciar-sesion");
            Swal.fire({
                icon: "success",
                title: "Contraseña Cambiada",
                text: "La contraseña de tu cuenta ha sido modificada con exito, inicia sesion",
                showConfirmButton: true,
                customClass: {
                    title: "swal_title",
                    icon: "swal_icon",
                    htmlContainer: "swal_text",
                    confirmButton: "swal_confirm"
                }
            });

        } catch(error){
            setCargando(false);
            Swal.fire({
                icon: "warning",
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

    return(
        <div className="form_general">
            <div className={`form_box register_scroll`}>
                <form onSubmit={e => restablecerContrasena(e)} className="log-in">
                    <h2 className="recover_h2">Recuperar Cuenta</h2>
                    <div className="form_general_group">
                        <label htmlFor="contrasena_recover" className="form_general_label">Contraseña:</label>
                        <input onChange={e => setPasswordNew({...passwordNew, [e.target.name]: e.target.value})} name="contrasena" id="contrasena_recover" type={"password"} className="form_general_input"/>
                    </div>
                    <div className="form_general_group">
                        <label htmlFor="contrasena_repetir_recover" className="form_general_label">Repetir contraseña:</label>
                        <input onChange={e => setPasswordNew({...passwordNew, [e.target.name]: e.target.value})} name="repetir_contrasena" id="contrasena_repetir_recover" type={"password"} className="form_general_input"/>
                    </div>
                    <div className="button_margin">
                        <RightSidebarButton text={cargando ? "Recuperando" : "Recuperar Cuenta"} disabled_btn={cargando} icon={"log-in"} color={"#2196f3"} whiteBG={true}/>
                    </div>
                </form>
            </div>
        </div>
    )
}