import React from "react";
import { useState } from "react";
import RightSidebarButton from "./RightSidebarButton";

export default function RegistroLogin(){
    const [logIn, setLogIn] = useState(true);

    return(
        <div className="form_general">
            <div className={`form_box ${!logIn && "register_scroll"}`}>
                <div className={`button_box ${logIn ? "" : "register_active"}`}>
                    <div className="btn"></div>
                        <button type="button" onClick={() => setLogIn(true)} className="toggle-btn">Iniciar sesion</button>
                        <button type="button" onClick={() => setLogIn(false)} className="toggle-btn">Registrarse</button>
                </div>
                {logIn && <form className="log-in">
                    <div className="form_general_group">
                        <label htmlFor="email" className="form_general_label">Correo electronico:</label>
                        <input name="email" type={"email"} id="email" className="form_general_input"/>
                    </div>
                    <div className="form_general_group">
                        <label htmlFor="password" className="form_general_label">Contraseña:</label>
                        <input name="password" id="password" type={"password"} className="form_general_input"/>
                    </div>
                    <div className="button_margin">
                        <RightSidebarButton text={"Iniciar Sesion"} icon={"log-in"} color={"#2196f3"}/>
                    </div>
                </form>}
                {!logIn && <form className={`register`}>
                    <div className="form_general_group">
                        <label htmlFor="nombre" className="form_general_label">Nombre:</label>
                        <input name="nombre" id="nombre" className="form_general_input"/>
                    </div>
                    <div className="form_general_group">
                        <label htmlFor="email" className="form_general_label">Correo electronico:</label>
                        <input name="email" id="email" className="form_general_input"/>
                    </div>
                    <div className="form_general_double">
                        <div className="form_general_group">
                            <label htmlFor="password" className="form_general_label">Contraseña:</label>
                            <input name="password" id="password" type={"password"} className="form_general_input"/>
                        </div>
                        <div className="form_general_group">
                            <label htmlFor="password" className="form_general_label">Confirmar contraseña:</label>
                            <input name="password" id="password" type={"password"} className="form_general_input"/>
                        </div>
                    </div>
                    <div className="form_general_group">
                        <label htmlFor="email" className="form_general_label">Domicilio:</label>
                        <input name="email" id="email" className="form_general_input"/>
                    </div>
                    <div className="form_general_double">
                        <div className="form_general_group">
                            <label htmlFor="password" className="form_general_label">Telefono:</label>
                            <input name="password" id="password" type={"password"} className="form_general_input"/>
                        </div>
                        <div className="form_general_group">
                            <label htmlFor="password" className="form_general_label">Localidad:</label>
                            <input name="password" id="password" type={"password"} className="form_general_input"/>
                        </div>
                    </div>
                    <div className="button_margin">
                        <RightSidebarButton text={"Registrarse"} icon={"log-in"} color={"#2196f3"} whiteBG={true}/>
                    </div>
                </form>}
            </div>
        </div>
    )
}