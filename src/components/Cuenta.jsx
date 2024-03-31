import React from "react";
import defaultAvatar from "../assets/default-avatar.jpg"
import RightSidebarButton from "./RightSidebarButton";
import useAuth from "../hooks/useAuth";
import useSidebar from "../hooks/useSidebar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function Cuenta(){

    const { auth } = useAuth();
    const { changeSidebar } = useSidebar();
    const navigate = useNavigate();

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
        }
    }, []);
    
    return(
        <div className="user_profile">
            <div className="user_data">
                <div className="user_data_img_box">
                    <img className="user_data_img" src={defaultAvatar}/>
                </div>
                <div className="user_data_container">
                    <h2 className="user_data_container_h2">Datos del usuario:</h2>
                    <div className="user_data_box">
                        <div className="user_data_box_data">
                            <h4 className="user_data_box_data_label">Nombre:</h4>
                            <p className="user_data_box_data_content">{auth?.nombre}</p>
                        </div>
                        <div className="user_data_box_data">
                            <h4 className="user_data_box_data_label">Domicilio:</h4>
                            <p className="user_data_box_data_content">{auth?.domicilio}</p>
                        </div>
                        <div className="user_data_box_data">
                            <h4 className="user_data_box_data_label">Correo Electronico:</h4>
                            <p className="user_data_box_data_content">{auth?.correo_electronico}</p>
                        </div>
                        <div className="user_data_box_data">
                            <h4 className="user_data_box_data_label">Localidad:</h4>
                            <p className="user_data_box_data_content">{auth?.localidad}</p>
                        </div>
                        <div className="user_data_box_data">
                            <h4 className="user_data_box_data_label">Telefono:</h4>
                            <p className="user_data_box_data_content">{auth?.telefono}</p>
                        </div>
                    </div>
                    <div onClick={() => changeSidebar("userInfo")} className="button_full_width">
                        <RightSidebarButton text={"Cambiar Informacion"} color={"#0fc70f"} icon={"settings-sharp"} whiteBG={true}/>
                    </div>
                </div>
            </div>
        </div>
    )
}