import React from "react";
import defaultAvatar from "../assets/default-avatar.jpg"
import RightSidebarButton from "./RightSidebarButton";

export default function SidebarUserInfo(){
    return(
        <div className="sidebar_user_info">
            <div className="sidebar_user_info_img">
                <img src={defaultAvatar}/>
            </div>
            <div className="sidebar_user_info_content">
                <div className="sidebar_user_info_group">
                    <h4>Nombre:</h4>
                    <p>Castañeda Godinez Brandon Yahir</p>
                </div>
                <div className="sidebar_user_info_group">
                    <h4>ID:</h4>
                    <p>124236235435432</p>
                </div>
                <div className="sidebar_user_info_group">
                    <h4>Direccion:</h4>
                    <p>Alguna calle 123</p>
                </div>
                <div className="sidebar_user_info_group">
                    <h4>Telefono:</h4>
                    <p>3311331133</p>
                </div>
                <div className="sidebar_user_info_group">
                    <h4>Correo Electronico:</h4>
                    <p>testyes1234@gmail.com</p>
                </div>
                <div className="sidebar_user_info_group">
                    <h4>Localidad:</h4>
                    <p>Guadalajara, Jalisco</p>
                </div>
                <div className="sidebar_disable_button">
                    <RightSidebarButton icon={"person-remove-sharp"} text={"Desactivar Usuario"} whiteBG={false} color={"#b145e9"}/>
                </div>
            </div>
        </div>
    )
}