import React, { useState } from "react";
import defaultAvatar from "../assets/default-avatar.jpg"
import RightSidebarButton from "./RightSidebarButton";
import useSidebar from "../hooks/useSidebar";
import Swal from "sweetalert2";
import clienteAxios from "../../config/clienteAxios";

export default function SidebarUserInfo(){

    const { userManage, setUserManage, setUserManagerReload } = useSidebar();

    const setUserType = async () => {
        try{
            const respuesta = await clienteAxios.post(`usuarios/changeActivity/${userManage.id}`, {
                active: userManage.active ? "true" : "false"
            });
            setUserManage({ ...userManage, active: userManage.active ? false : true });
            setUserManagerReload(true);
            Swal.fire({
                icon: "success",
                title: "Operacion exitosa",
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
            })            
        }
    }
    
    const setUserActivity = async () => {
        Swal.fire({
            icon: "info",
            title: userManage.active ? "Desactivar usuario" : "Activar usuario",
            text: userManage.active ? "Estas seguro que deseas desactivar este usuario?" : "Estas seguro que deseas activar este usuario?",
            showConfirmButton: true,
            confirmButtonText: "Si",
            showCancelButton: true,
            cancelButtonText: "No",
            customClass: {
                title: "swal_title",
                icon: "swal_icon",
                htmlContainer: "swal_text",
                confirmButton: "swal_confirm"
            }
        }).then((result) => {
            if (result.isConfirmed) {
                setUserType();
            };
        })
        }
    return(
        <div className="sidebar_user_info">
            <div className="sidebar_user_info_img">
                <img src={userManage?.image == null ? defaultAvatar : userManage?.image}/>
            </div>
            <div className="sidebar_user_info_content">
                <div className="sidebar_user_info_group">
                    <h4>Nombre:</h4>
                    <p>{userManage?.nombre}</p>
                </div>
                <div className="sidebar_user_info_group">
                    <h4>ID:</h4>
                    <p>{userManage?.id}</p>
                </div>
                <div className="sidebar_user_info_group">
                    <h4>Direccion:</h4>
                    <p>{userManage?.domicilio}</p>
                </div>
                <div className="sidebar_user_info_group">
                    <h4>Telefono:</h4>
                    <p>{userManage?.telefono}</p>
                </div>
                <div className="sidebar_user_info_group">
                    <h4>Correo Electronico:</h4>
                    <p>{userManage?.correo_electronico}</p>
                </div>
                <div className="sidebar_user_info_group">
                    <h4>Localidad:</h4>
                    <p>{userManage?.localidad}</p>
                </div>
                { !userManage?.active && <div className="sidebar_user_info_group sidebar_user_info_disabled">
                    <h4>Este usuario esta desactivado!</h4>
                </div>}
                <div onClick={() => setUserActivity()} className="sidebar_disable_button">
                    <RightSidebarButton icon={userManage?.active ? "person-remove-sharp" : "person-add-sharp"} text={userManage?.active ? "Desactivar Usuario" : "Activar Usuario"} whiteBG={false} color={"#b145e9"}/>
                </div>
            </div>
        </div>
    )
}