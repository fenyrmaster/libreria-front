import React from "react";
import Book from "./Book";
import RightSidebarButton from "./RightSidebarButton";

export default function Prestamo({estado, prestamo, cancelPedido}){
    return(
        <div className={`prestamo_datos prestamo_${(estado == "Cancelado" ? "cancelado" : (estado == "Reservado" ? "reservado" : (estado == "Recogido" ? "recogido" : (estado == "Devuelto" ? "devuelto" : (estado == "No Devuelto" ? "sin_devolver" : "")))))}`}>
            <div className={`prestamo_info`}>
                { estado == "Cancelado"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Pedido cancelado</h3>
                    <p className="prestamo_descripcion">Has cancelado o fue cancelado este pedido el <span>{new Date(prestamo.fecha_entrega.split("T")[0]).toLocaleDateString("es-MX", {timeZone: "Europe/London"})}</span></p>
                 </div> 
                }
                { estado == "Reservado"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Listo para recoger</h3>
                    <p className="prestamo_descripcion">Puedes recoger tu libro hasta el <span>{new Date(prestamo.fecha_entrega.split("T")[0]).toLocaleDateString("es-MX", {timeZone: "Europe/London"})}</span></p>
                 </div> 
                }
                { estado == "Recogido"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Libro Recogido</h3>
                    <p className="prestamo_descripcion">Debes devolver este libro antes del <span>{new Date(prestamo.fecha_vencimiento.split("T")[0]).toLocaleDateString("es-MX", {timeZone: "Europe/London"})}</span></p>
                 </div> 
                }
                { estado == "Devuelto"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Libro Devuelto</h3>
                    <p className="prestamo_descripcion">Has devuelto este libro el <span>{new Date(prestamo.fecha_entrega.split("T")[0]).toLocaleDateString("es-MX", {timeZone: "Europe/London"})}</span>, gracias por ser puntual</p>
                 </div> 
                }
                { estado == "No Devuelto"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Libro no devuelto</h3>
                    <p className="prestamo_descripcion">No devolviste el libro antes del <span>{new Date(prestamo.fecha_entrega.split("T")[0]).toLocaleDateString("es-MX", {timeZone: "Europe/London"})}</span>, contactate con la libreria</p>
                 </div> 
                }
            </div>
            <div className="prestamo_libro prestamo_clientes">
                <p className="prestamo_libro_texto">Libro:</p>
                <Book admin={false} book={prestamo.libro}/>
            </div>
            { estado == "Reservado" && <form onSubmit={(e => cancelPedido(prestamo.id, prestamo.libro.id, prestamo.libro.titulo, e))} className="cancelar_pedido_button"><button className="adminInfo_acciones_eliminar admin_pedidos">Cancelar Pedido</button></form> }
        </div>
    )
}