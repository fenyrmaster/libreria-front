import React from "react";

export default function Auditoria({tipo, auditoria}){
    return(
        <div className="auditoria_cuadro">
            { tipo == "Libro" && <p className={`auditoria_${auditoria.accion}`}>'{auditoria?.nombre}' ha {auditoria?.accion == "Insert" ? "Insertado" : (auditoria?.accion == "Update" ? "Modificado" : (auditoria?.accion) == "Delete" ? "Eliminado" : "")} el libro '{auditoria?.nombre_libro}' el {new Date(auditoria?.fecha).toLocaleDateString("es-MX", {timeZone: "Etc/GMT+12", hour: "2-digit", minute: "2-digit", hour12: true})}</p> }
            { tipo == "Etiqueta" && <p className={`auditoria_${auditoria.accion}`}>'{auditoria?.nombre}' ha {auditoria?.accion == "Insert" ? "Insertado" : (auditoria?.accion == "Update" ? "Modificado" : (auditoria?.accion) == "Delete" ? "Eliminado" : "")} la etiqueta '{auditoria?.nombre_etiqueta}' el {new Date(auditoria?.fecha).toLocaleDateString("es-MX", {timeZone: "Etc/GMT+12", hour: "2-digit", minute: "2-digit", hour12: true})}</p> }
            { tipo == "Prestamo" && <p className={`auditoria_${auditoria.accion}`}>{!auditoria?.nombre ? `Se ha ${auditoria?.accion == "Insert" ? "Insertado" : (auditoria?.accion == "Update" ? "Modificado" : (auditoria?.accion) == "Delete" ? "Eliminado" : "")} un prestamo del usuario '${auditoria?.nombre_usuario_prestamo}' en automatico ` : `'${auditoria?.nombre}' ha ${auditoria?.accion == "Insert" ? "Insertado" : (auditoria?.accion == "Update" ? "Modificado" : (auditoria?.accion) == "Delete" ? "Eliminado" : "")} un prestamo del usuario '${auditoria?.nombre_usuario_prestamo}'`} el {new Date(auditoria?.fecha).toLocaleDateString("es-MX", {timeZone: "Etc/GMT+12", hour: "2-digit", minute: "2-digit", hour12: true})}</p> }
        </div>
    )
}