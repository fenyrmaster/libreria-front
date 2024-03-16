import React from "react"

export default function BookAdminInfo(){
    return(
        <div className="adminInfo">
            <p className="adminInfo_stock">Stock: 5</p>
            <div className="adminInfo_acciones">
                <button className="adminInfo_acciones_editar">Editar</button>
                <button className="adminInfo_acciones_eliminar">Eliminar</button>
            </div>
        </div>
    )
}