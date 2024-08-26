import React from "react";
import Book from "./Book";
import useSidebar from "../hooks/useSidebar";

export default function CompraCardAdmin({estado, compra, libroCompradoQuestion, cancelarCompraQuestion}){

    const { changeSidebar, setUserManage } = useSidebar();

    const usuario = {
        nombre: compra.nombre,
        correo_electronico: compra.correo_electronico,
        id: compra.user_id,
        localidad: compra.localidad,
        rol: compra.rol,
        domicilio: compra.domicilio,
        telefono: compra.telefono,
        image: compra.image,
        active: compra.active
    };

    return(
        <div className={`prestamo_datos compra_${(estado == "Cancelado" ? "cancelado" : (estado == "Reservado" ? "reservado" : (estado == "Pagado" ? "pagado" : (estado == "Entregado" ? "entregado" :  '' ))))}`}>
            <div className={`prestamo_info`}>
                { estado == "Cancelado"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Compra cancelada</h3>
                    <p className="prestamo_descripcion">La compra fue cancelada el <span>{new Date(compra.fecha_entrega.split("T")[0]).toLocaleDateString("es-MX", {timeZone: "Europe/London"})}</span></p>
                 </div> 
                }
                { estado == "Reservado"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Recogida y pago pendiente</h3>
                    <p className="prestamo_descripcion">El usuario debe pagar y recibir el libro a mas tardar el <span>{new Date(compra.fecha_entrega.split("T")[0]).toLocaleDateString("es-MX", {timeZone: "Europe/London"})}</span></p>
                 </div> 
                }
                { estado == "Pagado"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Libro Comprado</h3>
                    <p className="prestamo_descripcion">El usuario debe de recoger el libro</p>
                 </div> 
                }
                { estado == "Entregado"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Libro Entregado</h3>
                    <p className="prestamo_descripcion">El usuario ha recogido el libro, no olvides dar las gracias!</p>
                 </div> 
                }
            </div>
            <div onClick={() => {changeSidebar("userData"); setUserManage(usuario);}} className="compra_detalles admin_prestamo_usuario">
                <p className="compra_detalles_info">ID del usuario: <span>{compra.user_id}</span></p>
                <p className="compra_detalles_info">ID del pedido: <span>{compra.id}</span></p>
                <p className="compra_detalles_info">Precio total: <span>{compra.precio*compra.cantidad}</span></p>
                <p className="compra_detalles_info">Cantidad: <span>{compra.cantidad}</span></p>
            </div>
            <div className="prestamo_libro prestamo_clientes">
                <p className="prestamo_libro_texto">Libro:</p>
                <Book admin={false} book={compra.libro}/>
            </div>
            { estado == "Reservado" && <button onClick={e => cancelarCompraQuestion(compra.id, compra.libro.id, compra.libro.titulo, e, usuario.nombre)} className="adminInfo_acciones_eliminar admin_pedidos reserved_actions">Cancelar Compra</button> }
            { estado == "Reservado" && <button onClick={e => libroCompradoQuestion(compra.id, compra.libro.id, compra.libro.titulo, e, usuario.nombre)} className="adminInfo_acciones_editar admin_pedidos reserved_actions">Libro Comprado</button> }
        </div>
    )
}