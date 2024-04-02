import React from "react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import RightSidebarButton from "./RightSidebarButton";
import clienteAxios from "../../config/clienteAxios";
import validator, { isEmail } from "validator";
import { useNavigate } from "react-router-dom" 
import Cookies from "js-cookie";
import useAuth from "../hooks/useAuth";

export default function RegistroLogin(){
    const [logIn, setLogIn] = useState(true);
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const { setAuth } = useAuth();

    const [registerData, setRegisterData] = useState({
        correo_electronico: "",
        contrasena: "",
        contrasena_repetida: "",
        nombre: "",
        domicilio: "",
        localidad: "",
        telefono: ""
    });
    const [loginData, setLoginData] = useState({
        correo_login: "",
        contrasena_login: ""
    })

    const [restorePasswordForm, setRestorePasswordForm] = useState(false);

    const createCookie = token => {
        Cookies.set("jwt2", token, { expires: 15 });
    }

    const sendForgotRequest = async mail => {
        try{
            await clienteAxios.patch(`/usuarios/forgotPassword`, {
                correo_electronico: mail
            });
            Swal.fire({
                icon: "success",
                title: "Correo enviado",
                text: "Revisa tu correo electronico para recibir instrucciones.",
                showConfirmButton: true,
                customClass: {
                    title: "swal_title",
                    icon: "swal_icon",
                    htmlContainer: "swal_text",
                    confirmButton: "swal_confirm"
                }
            });
        }catch(error){
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

    useEffect(() => {
        const contrasena_olvidada = async () => {
            if(restorePasswordForm){
                Swal.fire({
                    title: "Coloca el correo electronico a recuperar",
                    input: "text",
                    inputAttributes: {
                      autocapitalize: "off"
                    },
                    customClass: {
                        title: "swal_title",
                        icon: "swal_icon",
                        htmlContainer: "swal_text",
                        confirmButton: "swal_confirm"
                    },
                    showCancelButton: true,
                    cancelButtonText: "Cancelar",
                    confirmButtonText: "Recuperar cuenta",
                    allowOutsideClick: () => !Swal.isLoading()
                  }).then((result) => {
                    if (result.isConfirmed) {
                        setRestorePasswordForm(false);
                        sendForgotRequest(result.value)
                    }
                    if(result.dismiss){
                        setRestorePasswordForm(false);
                    }
                  });
              }
        }
        contrasena_olvidada();
    }, [restorePasswordForm])
    

    const register = async e => {
        e.preventDefault();
        setCargando(true);
        if(registerData.correo_electronico.trim() == "" || registerData.contrasena.trim() == "" || registerData.contrasena_repetida.trim() == "" || registerData.nombre.trim() == "" || registerData.domicilio.trim() == "" || registerData.localidad.trim() == "" || registerData.telefono.trim() == ""){
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
        if(!isEmail(registerData.correo_electronico.trim())){
            setCargando(false);
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
        if(registerData.contrasena.length < 6){
            setCargando(false);
            Swal.fire({
                icon: "warning",
                title: "Advertencia",
                text: "La contraseña debe tener al menos 6 caracteres",
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
        if(registerData.contrasena != registerData.contrasena_repetida){
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
            const respuesta =await clienteAxios.post("/usuarios/signup", {
                nombre: registerData.nombre,
                contrasena: registerData.contrasena,
                contrasena_repetida: registerData.contrasena_repetida,
                correo_electronico: registerData.correo_electronico,
                telefono: registerData.telefono,
                domicilio: registerData.domicilio,
                localidad: registerData.localidad
            });
            setCargando(false);
            createCookie(respuesta.data.token);
            setAuth(respuesta.data.data.user);
            navigate("/cuenta")
            Swal.fire({
                icon: "success",
                title: "Cuenta creada",
                text: "Tu cuenta ha sido creada con exito, revisa tu correo electronico para confirmarla",
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
                    confirmButton: "swal_confirm",
                    cancelButton: "swal_confirm"
                }
            });
        }
    }

    const iniciarSesion = async e => {
        e.preventDefault();
        setCargando(true);
        if(loginData.correo_login == "" || loginData.contrasena_login == ""){
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
        if(!isEmail(loginData.correo_login.trim())){
            setCargando(false);
            Swal.fire({
                icon: "warning",
                title: "Advertencia",
                text: "El correo colocado no es valido",
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
            const respuesta =await clienteAxios.post("/usuarios/log-in", {
                contrasena: loginData.contrasena_login,
                correo_electronico: loginData.correo_login,
            });
            setCargando(false);
            createCookie(respuesta.data.token);
            setAuth(respuesta.data.data.user);
            navigate("/cuenta")
            Swal.fire({
                icon: "success",
                title: "Sesion iniciada",
                text: "Has accedido a tu cuenta",
                showConfirmButton: true,
                customClass: {
                    icon: "swal_icon",
                    title: "swal_title",
                    htmlContainer: "swal_text",
                    confirmButton: "swal_confirm"
                }
            });
        }catch(error){
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
            <div className={`form_box ${!logIn && "register_scroll"}`}>
                <div className={`button_box ${logIn ? "" : "register_active"}`}>
                    <div className="btn"></div>
                        <button type="button" onClick={() => setLogIn(true)} className="toggle-btn">Iniciar sesion</button>
                        <button type="button" onClick={() => setLogIn(false)} className="toggle-btn">Registrarse</button>
                </div>
                {logIn && <form onSubmit={e => iniciarSesion(e)} className="log-in">
                    <div className="form_general_group">
                        <label htmlFor="correo_login" className="form_general_label">Correo electronico:</label>
                        <input onChange={e => setLoginData({...loginData, [e.target.name]: e.target.value})} name="correo_login" type={"email"} id="correo_login" className="form_general_input"/>
                    </div>
                    <div className="form_general_group">
                        <label htmlFor="contrasena_login" className="form_general_label">Contraseña:</label>
                        <input onChange={e => setLoginData({...loginData, [e.target.name]: e.target.value})} name="contrasena_login" id="contrasena_login" type={"password"} className="form_general_input"/>
                    </div>
                    <div className="button_margin">
                        <RightSidebarButton text={cargando ? "Validando" : "Iniciar Sesion"} disabled_btn={cargando ? true : false} icon={"log-in"} color={"#2196f3"} whiteBG={true}/>
                    </div>
                    <div className="lost_passwd">
                        <p>No recuerdas tu contraseña?: </p>
                        <button onClick={() => setRestorePasswordForm(true)} type={"button"}>Recuperar contraseña</button>
                    </div>
                </form>}
                {!logIn && <form onSubmit={e => register(e)} className={`register`}>
                    <div className="form_general_group">
                        <label htmlFor="nombre" className="form_general_label">Nombre:</label>
                        <input onChange={e => setRegisterData({...registerData, [e.target.name]: e.target.value})} name="nombre" id="nombre" className="form_general_input"/>
                    </div>
                    <div className="form_general_group">
                        <label htmlFor="correo_electronico" className="form_general_label">Correo electronico:</label>
                        <input onChange={e => setRegisterData({...registerData, [e.target.name]: e.target.value})}  name="correo_electronico" id="correo_electronico" className="form_general_input"/>
                    </div>
                    <div className="form_general_double">
                        <div className="form_general_group">
                            <label htmlFor="password" className="form_general_label">Contraseña:</label>
                            <input onChange={e => setRegisterData({...registerData, [e.target.name]: e.target.value})} name="contrasena" id="password" type={"password"} className="form_general_input"/>
                        </div>
                        <div className="form_general_group">
                            <label htmlFor="contrasena_repetida" className="form_general_label">Confirmar contraseña:</label>
                            <input onChange={e => setRegisterData({...registerData, [e.target.name]: e.target.value})} name="contrasena_repetida" id="contrasena_repetida" type={"password"} className="form_general_input"/>
                        </div>
                    </div>
                    <div className="form_general_group">
                        <label htmlFor="domicilio" className="form_general_label">Domicilio:</label>
                        <input onChange={e => setRegisterData({...registerData, [e.target.name]: e.target.value})} name="domicilio" id="domicilio" className="form_general_input"/>
                    </div>
                    <div className="form_general_double">
                        <div className="form_general_group">
                            <label htmlFor="telefono" className="form_general_label">Telefono:</label>
                            <input onChange={e => setRegisterData({...registerData, [e.target.name]: e.target.value})} name="telefono" id="telefono" type={"tel"} className="form_general_input"/>
                        </div>
                        <div className="form_general_group">
                            <label htmlFor="localidad" className="form_general_label">Localidad:</label>
                            <input onChange={e => setRegisterData({...registerData, [e.target.name]: e.target.value})} name="localidad" id="localidad" type={"text"} className="form_general_input"/>
                        </div>
                    </div>
                    <div className="button_margin">
                        <RightSidebarButton disabled_btn={cargando ? true : false} text={cargando ? "Registrando" : "Registrarse"} icon={"log-in"} color={"#2196f3"} whiteBG={true}/>
                    </div>
                </form>}
            </div>
        </div>
    )
}