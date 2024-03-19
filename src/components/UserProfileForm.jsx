import React from "react";
import RightSidebarButton from "./RightSidebarButton";

export default function UserProfileForm(){
    return(
        <>
            <form className="sidebar_book_form">
                <h2>Datos personales</h2>
                <div className="sidebar_book_form_group sidebar_user_green">
                    <label>Nombre:</label>
                    <input placeholder="Nombre..." className="sidebar_book_input" name="titulo"/>
                </div>
                <div className="sidebar_book_form_group sidebar_user_green">
                    <label>Domicilio:</label>
                    <input placeholder="Domicilio..." className="sidebar_book_input" name="editorial"/>
                </div>
                <div className="sidebar_book_form_group sidebar_user_green">
                    <label>Localidad:</label>
                    <input placeholder="Localidad..." className="sidebar_book_input" name="autores"/>
                </div>
                <div className="sidebar_book_form_group sidebar_user_green">
                    <label>Telefono:</label>
                    <input placeholder="Telefono..." type={"tel"} className="sidebar_book_input" name="fecha_publicacion"/>
                </div>
                <div className="button_form_user">
                    <RightSidebarButton text={"Actualizar Datos"} color={"#0fc70f"} icon={"settings-sharp"} whiteBG={false}/>
                </div>    
            </form>
            <form className="sidebar_book_form">
                <h2>Cambiar Correo</h2>
                <div className="sidebar_book_form_group sidebar_user_green">
                    <label>Nuevo correo electronico:</label>
                    <input placeholder="Correo..." className="sidebar_book_input" name="titulo"/>
                </div>
                <div className="button_form_user">
                    <RightSidebarButton text={"Actualizar Correo"} color={"#0fc70f"} icon={"settings-sharp"} whiteBG={false}/>
                </div>    
            </form>
            <form className="sidebar_book_form">
                <h2>Cambiar contraseña</h2>
                <div className="sidebar_book_form_group sidebar_user_green">
                    <label>Contraseña Actual:</label>
                    <input placeholder="Contraseña actual..." className="sidebar_book_input" name="titulo"/>
                </div>
                <div className="sidebar_book_form_group sidebar_user_green">
                    <label>Contraseña nueva:</label>
                    <input placeholder="Nueva contraseña..." className="sidebar_book_input" name="editorial"/>
                </div>
                <div className="sidebar_book_form_group sidebar_user_green">
                    <label>Repite nueva contraseña:</label>
                    <input placeholder="Repite la nueva contraseña..." className="sidebar_book_input" name="autores"/>
                </div>
                <div className="button_form_user">
                    <RightSidebarButton text={"Actualizar Contraseña"} color={"#0fc70f"} icon={"settings-sharp"} whiteBG={false}/>
                </div>    
            </form>
        </>
    )
}