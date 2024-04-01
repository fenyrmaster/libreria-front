import React from "react";
import RightSidebarButton from "./RightSidebarButton";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../../config/clienteAxios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useState } from "react";
import { isEmail } from "validator";

export default function UserProfileForm(){

    const { auth, setAuth } = useAuth();

    const [changeData, setChangeData] = useState({
        nombre: auth?.nombre,
        domicilio: auth?.domicilio,
        localidad: auth?.localidad,
        telefono: auth?.telefono
    });

    const [changeContrasena, setChangeContrasena] = useState({
        contrasena: "",
        contrasena_repetida: "",
        new_contrasena: ""
    })

    const [ changeEmail, setChangeEmail ] = useState("");

    const [normalDataCargando, setNormalDataCargando] = useState(false);
    const [passwordDataCargando, setPasswordDataCargando] = useState(false);
    const [mailDataCargando, setMailDataCargando] = useState(false);

    const changeDataUser = async e => {
        e.preventDefault();
        setNormalDataCargando(true);
        if(changeData.nombre.trim() == "" || changeData.domicilio.trim() == "" || changeData.localidad.trim() == "" || changeData.telefono.trim() == ""){
            setNormalDataCargando(false);
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
            let token = Cookies.get("jwt2");
            const respuesta = await clienteAxios.patch(`/usuarios/changeData/${auth.id}?jwt=${token}`, {
                nombre: changeData.nombre,
                domicilio: changeData.domicilio,
                localidad: changeData.localidad,
                telefono: changeData.telefono
            });
            setNormalDataCargando(false);
            setAuth(respuesta.data.data.user);
            Swal.fire({
                icon: "success",
                title: "Informacion Modificada",
                text: "La informacion de tu cuenta ha sido modificada con exito",
                showConfirmButton: true,
                customClass: {
                    title: "swal_title",
                    icon: "swal_icon",
                    htmlContainer: "swal_text",
                    confirmButton: "swal_confirm"
                }
            });

        } catch(error){
            setNormalDataCargando(false);
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

    const changePassword = async e => {
        e.preventDefault();
        setPasswordDataCargando(true);
        if(changeContrasena.contrasena_repetida.trim() == "" || changeContrasena.contrasena.trim() == "" || changeContrasena.new_contrasena.trim() == ""){
            setPasswordDataCargando(false);
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
        if(changeContrasena.new_contrasena.length < 6){
            setPasswordDataCargando(false);
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
        if(changeContrasena.contrasena_repetida != changeContrasena.new_contrasena){
            setPasswordDataCargando(false);
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
            let token = Cookies.get("jwt2");
            await clienteAxios.patch(`/usuarios/changePassword/${auth.id}?jwt=${token}`, {
                contrasena: changeContrasena.contrasena,
                new_contrasena: changeContrasena.new_contrasena,
                contrasena_repetida: changeContrasena.contrasena_repetida
            });
            setPasswordDataCargando(false);
            setChangeContrasena({
                contrasena: "",
                contrasena_repetida: "",
                new_contrasena: ""
            })
            Swal.fire({
                icon: "success",
                title: "Contraseña Cambiada",
                text: "La contraseña de tu cuenta ha sido modificada con exito",
                showConfirmButton: true,
                customClass: {
                    title: "swal_title",
                    icon: "swal_icon",
                    htmlContainer: "swal_text",
                    confirmButton: "swal_confirm"
                }
            });

        } catch(error){
            setPasswordDataCargando(false);
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

    const changeEmailUser = async e => {
        e.preventDefault();
        setMailDataCargando(true);
        if(changeEmail.trim() == ""){
            setMailDataCargando(false);
            Swal.fire({
                icon: "warning",
                title: "Advertencia",
                text: "Coloca el nuevo correo electronico",
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
        if(!isEmail(changeEmail.trim())){
            setMailDataCargando(false);
            Swal.fire({
                icon: "warning",
                title: "Advertencia",
                text: "El correo colocado no es valido",
                showConfirmButton: true,
                customClass: {
                    title: "swal_title",
                    htmlContainer: "swal_text",
                    icon: "swal_icon",
                    confirmButton: "swal_confirm"
                }
            });
            return;
        }
        try{
            let token = Cookies.get("jwt2");
            await clienteAxios.patch(`/usuarios/changeEmail/${auth.id}?jwt=${token}`, {
                correo_electronico: changeEmail
            });
            setMailDataCargando(false);
            setChangeEmail("");
            Swal.fire({
                icon: "success",
                title: "Correo Cambiada",
                text: "Revisa el correo electronico que colocaste",
                showConfirmButton: true,
                customClass: {
                    title: "swal_title",
                    icon: "swal_icon",
                    htmlContainer: "swal_text",
                    confirmButton: "swal_confirm"
                }
            });

        } catch(error){
            setMailDataCargando(false);
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
        <>
            <form onSubmit={e => changeDataUser(e)} className="sidebar_book_form">
                <h2>Datos personales</h2>
                <div className="sidebar_book_form_group sidebar_user_green">
                    <label htmlFor="nombre_change">Nombre:</label>
                    <input id="nombre_change" onChange={e => setChangeData({...changeData, [e.target.name]: e.target.value})} value={changeData.nombre} name="nombre" placeholder="Nombre..." className="sidebar_book_input"/>
                </div>
                <div className="sidebar_book_form_group sidebar_user_green">
                    <label htmlFor="domicilio_change">Domicilio:</label>
                    <input id="domicilio_change" onChange={e => setChangeData({...changeData, [e.target.name]: e.target.value})} value={changeData.domicilio} placeholder="Domicilio..." className="sidebar_book_input" name="domicilio"/>
                </div>
                <div className="sidebar_book_form_group sidebar_user_green">
                    <label htmlFor="localidad_change">Localidad:</label>
                    <input id="localidad_change" onChange={e => setChangeData({...changeData, [e.target.name]: e.target.value})} value={changeData.localidad} placeholder="Localidad..." className="sidebar_book_input" name="localidad"/>
                </div>
                <div className="sidebar_book_form_group sidebar_user_green">
                    <label htmlFor="telefono_change">Telefono:</label>
                    <input id="telefono_change" onChange={e => setChangeData({...changeData, [e.target.name]: e.target.value})} value={changeData.telefono} placeholder="Telefono..." type={"tel"} className="sidebar_book_input" name="telefono"/>
                </div>
                <div className="button_form_user">
                    <RightSidebarButton text={normalDataCargando ? "Actualizando datos" : "Actualizar Datos"} color={"#0fc70f"} icon={"settings-sharp"} disabled_btn={normalDataCargando} whiteBG={false}/>
                </div>    
            </form>
            <form onSubmit={e => changeEmailUser(e)} className="sidebar_book_form">
                <h2>Cambiar Correo</h2>
                <div className="sidebar_book_form_group sidebar_user_green">
                    <label htmlFor="email_change">Nuevo correo electronico:</label>
                    <input id="email_change" onChange={e => setChangeEmail(e.target.value)} placeholder="Correo..." className="sidebar_book_input" name="email_cambiar"/>
                </div>
                <div className="button_form_user">
                    <RightSidebarButton text={"Actualizar Correo"} color={"#0fc70f"} icon={"settings-sharp"} whiteBG={false}/>
                </div>    
            </form>
            <form onSubmit={e => changePassword(e)} className="sidebar_book_form">
                <h2>Cambiar contraseña</h2>
                <div className="sidebar_book_form_group sidebar_user_green">
                    <label htmlFor="new_password">Contraseña Actual:</label>
                    <input id="new_password" value={changeContrasena.contrasena} onChange={e => setChangeContrasena({...changeContrasena, [e.target.name]: e.target.value})} placeholder="Contraseña actual..." className="sidebar_book_input" type={"password"} name="contrasena"/>
                </div>
                <div className="sidebar_book_form_group sidebar_user_green">
                    <label htmlFor="old_password">Contraseña nueva:</label>
                    <input id="old_password" value={changeContrasena.new_contrasena} onChange={e => setChangeContrasena({...changeContrasena, [e.target.name]: e.target.value})} placeholder="Nueva contraseña..." className="sidebar_book_input" type={"password"} name="new_contrasena"/>
                </div>
                <div className="sidebar_book_form_group sidebar_user_green">
                    <label htmlFor="new_password_repeat">Repite nueva contraseña:</label>
                    <input id="new_password_repeat" value={changeContrasena.contrasena_repetida} onChange={e => setChangeContrasena({...changeContrasena, [e.target.name]: e.target.value})} placeholder="Repite la nueva contraseña..." className="sidebar_book_input" type={"password"} name="contrasena_repetida"/>
                </div>
                <div className="button_form_user">
                <RightSidebarButton text={passwordDataCargando ? "Actualizando" : "Actualizar Contraseña"} color={"#0fc70f"} icon={"settings-sharp"} disabled_btn={passwordDataCargando} whiteBG={false}/>
                </div>    
            </form>
        </>
    )
}