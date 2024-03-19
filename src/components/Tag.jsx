import React from "react";

export default function Tag(){
    return(
        <div className="tag">
            <h3 className="tag_name">Ficcion</h3>
            <h3 className="tag_type">Categoria</h3>
            <div className="adminInfo_acciones">
                <button className="adminInfo_acciones_editar">Editar</button>
                <button className="adminInfo_acciones_eliminar">Eliminar</button>
            </div>
        </div>
    )
}