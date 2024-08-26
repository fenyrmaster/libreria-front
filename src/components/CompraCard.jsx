import React from "react";
import Book from "./Book";

export default function CompraCard({estado, compra, cancelPedido}){
    return(
        <div className={`prestamo_datos compra_${(estado == "Cancelado" ? "cancelado" : (estado == "Reservado" ? "reservado" : (estado == "Pagado" ? "pagado" : (estado == "Entregado" ? "entregado" :  '' ))))}`}>
            <div className={`prestamo_info`}>
                { estado == "Cancelado"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Pedido cancelado</h3>
                    <p className="prestamo_descripcion">Has cancelado o fue cancelado esta compra el <span>{new Date(compra.fecha_entrega.split("T")[0]).toLocaleDateString("es-MX", {timeZone: "Europe/London"})}</span></p>
                 </div> 
                }
                { estado == "Reservado"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Listo para recoger y pagar</h3>
                    <p className="prestamo_descripcion">Puedes recoger tu libro hasta el <span>{new Date(compra.fecha_entrega.split("T")[0]).toLocaleDateString("es-MX", {timeZone: "Europe/London"})}</span></p>
                 </div> 
                }
                { estado == "Pagado"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Libro Comprado</h3>
                    <p className="prestamo_descripcion">Ya puedes reconger tu libro en la libreria</p>
                 </div> 
                }
                { estado == "Entregado"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Libro Entregado</h3>
                    <p className="prestamo_descripcion">Has recogido tu libro, disfruta de tu compra!</p>
                 </div> 
                }
            </div>
            <div className="compra_detalles">
                <p className="compra_detalles_info">ID del pedido: <span>{compra.id}</span></p>
                <p className="compra_detalles_info">Precio total: <span>{compra.precio*compra.cantidad}</span></p>
                <p className="compra_detalles_info">Cantidad: <span>{compra.cantidad}</span></p>
            </div>
            <div className="prestamo_libro prestamo_clientes">
                <p className="prestamo_libro_texto">Libro:</p>
                <Book admin={false} book={compra.libro}/>
            </div>
            { estado == "Reservado" && <button onClick={e => cancelPedido(compra.id, compra.libro.id, compra.libro.titulo, e)} className="adminInfo_acciones_eliminar admin_pedidos">Cancelar Compra</button> }
        </div>
    )
}