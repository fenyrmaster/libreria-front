import RightSidebarButton from "./RightSidebarButton"
import { Link } from "react-router-dom"

export default function NotFound(){
    return(
        <div className="error_404_content">
            <h3 className="error_404_titulo">Error 404</h3>
            <p className="error_404_text">No se encontro el sitio de la URL Proporcionada</p>
            <div className="error_404_button">
                <Link to={"/"}>
                    <RightSidebarButton text={"Volver"} color={"#e92f69"} whiteBG={true} icon={"arrow-back-circle"}/>
                </Link>
            </div>
        </div>
    )
}