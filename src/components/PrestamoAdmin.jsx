import React from "react";
import Book from "./Book";

export default function PrestamoAdmin({estado}){
    return(
        <div className={`prestamo_datos prestamo_${estado}`}>
            <div className={`prestamo_info`}>
                { estado == "cancelado"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Pedido cancelado</h3>
                    <p className="prestamo_descripcion">El pedido fue cancelado el <span>03/05/2024</span></p>
                </div> 
                }
                { estado == "reservado"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Listo para recoger</h3>
                    <p className="prestamo_descripcion">El usuario debe recoger el libro antes del <span>03/05/2024</span></p>
                </div> 
                }
                { estado == "recogido"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Libro Recogido</h3>
                    <p className="prestamo_descripcion">El usuario debe devolver el libro antes del <span>03/05/2024</span></p>
                </div> 
                }
                { estado == "devuelto"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Libro Devuelto</h3>
                    <p className="prestamo_descripcion">El usuario devolvio el libro el <span>03/05/2024</span>, no olvides ser amable!</p>
                </div> 
                }
                { estado == "sin_devolver"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Libro no devuelto</h3>
                    <p className="prestamo_descripcion">El usuario no devolvio el libro con limite de <span>03/05/2024</span>, contacta al usuario</p>
                </div> 
                }
                <div className="admin_prestamo_usuario">
                    <h4>Usuario:</h4>
                    <p>Nombre: Brandon Yahir Castañeda Godinez</p>
                    <p>ID: 12452352345237623</p>
                </div>
            </div>
            <div className="prestamo_libro">
                <p className="prestamo_libro_texto">Libro:</p>
                <Book admin={false}/>
            </div>
            { (estado == "sin_devolver" || estado == "devuelto" || estado == "cancelado") && <form className="cancelar_pedido_button"><button className="adminInfo_acciones_eliminar admin_pedidos">Eliminar Pedido</button></form> }
            { estado == "reservado" && <div className="adminInfo_acciones admin_prestamos_recogido">
                    <button className="adminInfo_acciones_editar">Recogido</button>
                    <button className="adminInfo_acciones_eliminar">Cancelar</button>
                </div> 
            }
            { estado == "recogido" && <div className="adminInfo_acciones admin_prestamos_recogido">
                    <button className="adminInfo_acciones_editar">Devuelto</button>
                    <button className="adminInfo_acciones_eliminar">No Devuelto</button>
                </div> 
            }
        </div>
    )
}