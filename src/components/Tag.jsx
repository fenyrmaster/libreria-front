import React from "react";
import useSidebar from "../hooks/useSidebar";

export default function Tag({tag, deleteEtiquetaFn}){

    const { changeSidebar, setEtiquetaFormData } = useSidebar();

    return(
        <div className="tag">
            <h3 className="tag_name">{tag.nombre}</h3>
            <h3 className="tag_type">{tag.tipo}</h3>
            <div className="adminInfo_acciones">
                <button onClick={() => {changeSidebar("etiquetaForm"); setEtiquetaFormData({ id: tag.id, nombre: tag.nombre, tipo: tag.tipo })}} className="adminInfo_acciones_editar">Editar</button>
                <button onClick={() => deleteEtiquetaFn(tag.id, tag.nombre)} className="adminInfo_acciones_eliminar">Eliminar</button>
            </div>
        </div>
    )
}