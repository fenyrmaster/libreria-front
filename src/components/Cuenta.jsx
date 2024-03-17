import React from "react";
import defaultAvatar from "../assets/default-avatar.jpg"
import RightSidebarButton from "./RightSidebarButton";

export default function Cuenta(){
    
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
                            <p className="user_data_box_data_content">Brandon Castañeda</p>
                        </div>
                        <div className="user_data_box_data">
                            <h4 className="user_data_box_data_label">Domicilio:</h4>
                            <p className="user_data_box_data_content">Una calle 123</p>
                        </div>
                        <div className="user_data_box_data">
                            <h4 className="user_data_box_data_label">Correo Electronico:</h4>
                            <p className="user_data_box_data_content">test1234@gmail.com</p>
                        </div>
                        <div className="user_data_box_data">
                            <h4 className="user_data_box_data_label">Localidad:</h4>
                            <p className="user_data_box_data_content">Guadalajara, Jalisco</p>
                        </div>
                        <div className="user_data_box_data">
                            <h4 className="user_data_box_data_label">Telefono:</h4>
                            <p className="user_data_box_data_content">3311331133</p>
                        </div>
                    </div>
                    <div className="button_full_width">
                        <RightSidebarButton text={"Cambiar Informacion"} color={"#0fc70f"} icon={"settings-sharp"} whiteBG={true}/>
                    </div>
                </div>
            </div>
        </div>
    )
}