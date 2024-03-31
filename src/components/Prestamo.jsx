import React from "react";
import Book from "./Book";
import RightSidebarButton from "./RightSidebarButton";

export default function Prestamo({estado}){
    return(
        <div className={`prestamo_datos prestamo_${estado}`}>
            <div className={`prestamo_info`}>
                { estado == "cancelado"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Pedido cancelado</h3>
                    <p className="prestamo_descripcion">Has cancelado o fue cancelado este pedido el <span>03/05/2024</span></p>
                 </div> 
                }
                { estado == "reservado"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Listo para recoger</h3>
                    <p className="prestamo_descripcion">Puedes recoger tu libro hasta el <span>03/05/2024</span></p>
                 </div> 
                }
                { estado == "recogido"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Libro Recogido</h3>
                    <p className="prestamo_descripcion">Debes devolver este libro antes del <span>03/05/2024</span></p>
                 </div> 
                }
                { estado == "devuelto"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Libro Devuelto</h3>
                    <p className="prestamo_descripcion">Has devuelto este libro el <span>03/05/2024</span>, gracias por ser puntual</p>
                 </div> 
                }
                { estado == "sin_devolver"
                &&<div className="prestamo_info_desc">
                    <h3 className="prestamo_texto">Libro no devuelto</h3>
                    <p className="prestamo_descripcion">No devolviste el libro antes del <span>03/05/2024</span>, contactate con la libreria</p>
                 </div> 
                }
            </div>
            <div className="prestamo_libro">
                <p className="prestamo_libro_texto">Libro:</p>
                <Book admin={false}/>
            </div>
            { estado == "reservado" && <form className="cancelar_pedido_button"><button className="adminInfo_acciones_eliminar admin_pedidos">Cancelar Pedido</button></form> }
        </div>
    )
}