import React from "react";
import { useState } from "react";
import Book from "./Book";
import useSidebar from "../hooks/useSidebar";

export default function PrestamoAdmin({estado, prestamo, cancelPrestamo, recogidoPrestamo, devueltoPrestamo, noDevueltoPrestamo, eliminarPrestamo}){

    const { changeSidebar, setUserManage } = useSidebar();

    const [ usuario, setUsuario ] = useState({
        nombre: prestamo.nombre,
        correo_electronico: prestamo.correo_electronico,
        id: prestamo.user_id,
        localidad: prestamo.localidad,
        rol: prestamo.rol,
        domicilio: prestamo.domicilio,
        telefono: prestamo.telefono,
        image: prestamo.image,
        active: prestamo.active
    })

    return(
        <div className={`prestamo_datos prestamo_${(estado == "Cancelado" ? "cancelado" : (estado == "Reservado" ? "reservado" : (estado == "Recogido" ? "recogido" : (estado == "Devuelto" ? "devuelto" : (estado == "No Devuelto" ? "sin_devolver" : "")))))}`}>
            <div className={`prestamo_info`}>
                { estado == "Cancelado"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Prestamo cancelado</h3>
                    <p className="prestamo_descripcion">El prestamo fue cancelado el <span>{new Date(prestamo.fecha_entrega.split("T")[0]).toLocaleDateString("es-MX", {timeZone: "Europe/London"})}</span></p>
                </div> 
                }
                { estado == "Reservado"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Listo para recoger</h3>
                    <p className="prestamo_descripcion">El usuario debe recoger el libro a mas tardar el <span>{new Date(prestamo.fecha_entrega.split("T")[0]).toLocaleDateString("es-MX", {timeZone: "Europe/London"})}</span></p>
                </div> 
                }
                { estado == "Recogido"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Libro Recogido</h3>
                    <p className="prestamo_descripcion">El usuario debe devolver el libro a mas tardar el <span>{new Date(prestamo.fecha_vencimiento.split("T")[0]).toLocaleDateString("es-MX", {timeZone: "Europe/London"})}</span></p>
                </div> 
                }
                { estado == "Devuelto"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Libro Devuelto</h3>
                    <p className="prestamo_descripcion">El usuario devolvio el libro el <span>{new Date(prestamo.fecha_entrega.split("T")[0]).toLocaleDateString("es-MX", {timeZone: "Europe/London"})}</span>, no olvides ser amable!</p>
                </div> 
                }
                { estado == "No Devuelto"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Libro no devuelto</h3>
                    <p className="prestamo_descripcion">El usuario no devolvio el libro con limite de <span>{new Date(prestamo.fecha_entrega.split("T")[0]).toLocaleDateString("es-MX", {timeZone: "Europe/London"})}</span>, contacta al usuario</p>
                </div> 
                }
                <div onClick={() => {changeSidebar("userData"); setUserManage(usuario);}} className="admin_prestamo_usuario">
                    <h4>Usuario:</h4>
                    <p>Nombre: {usuario.nombre}</p>
                    <p>ID: {usuario.id}</p>
                </div>
            </div>
            <div className="prestamo_libro">
                <p className="prestamo_libro_texto">Libro:</p>
                <Book book={prestamo.libro} admin={false}/>
            </div>
            { (estado == "No Devuelto" || estado == "Devuelto" || estado == "Cancelado") && <form onSubmit={(e => eliminarPrestamo(prestamo.id, prestamo.libro.titulo, e, prestamo.nombre))} className="cancelar_pedido_button"><button className="adminInfo_acciones_eliminar admin_pedidos">Eliminar Prestamo</button></form> }
            { estado == "Reservado" && <div className="adminInfo_acciones admin_prestamos_recogido">
                    <button onClick={e => recogidoPrestamo(prestamo.id, prestamo.libro.id, prestamo.libro.titulo, e, prestamo.nombre)} className="adminInfo_acciones_editar">Recogido</button>
                    <button onClick={e => cancelPrestamo(prestamo.id, prestamo.libro.id, prestamo.libro.titulo, e, prestamo.nombre)} className="adminInfo_acciones_eliminar">Cancelar</button>
                </div> 
            }
            { estado == "Recogido" && <div className="adminInfo_acciones admin_prestamos_recogido">
                    <button onClick={e => devueltoPrestamo(prestamo.id, prestamo.libro.id, prestamo.libro.titulo, e, prestamo.nombre)} className="adminInfo_acciones_editar">Devuelto</button>
                    <button onClick={e => noDevueltoPrestamo(prestamo.id, prestamo.libro.id, prestamo.libro.titulo, e, prestamo.nombre)} className="adminInfo_acciones_eliminar">No Devuelto</button>
                </div> 
            }
        </div>
    )
}