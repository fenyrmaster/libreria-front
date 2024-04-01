import React, { useEffect } from "react";
import Spinner from "./Spinner";
import clienteAxios from "../../config/clienteAxios";
import { useSearchParams } from "react-router-dom";
import { useParams,  useNavigate } from "react-router"
import Swal from "sweetalert2";

export default function ConfirmMailChange(){
    const { codigo } = useParams();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const confirmarCorreo = async token => {
            try{
                console.log(token);
                const email = searchParams.get("mail");
                const respuesta = await clienteAxios.patch(`/usuarios/confirmChangeMail`, {
                    correo_electronico: email,
                    emailChangeString: token
                });
                console.log(respuesta);
                navigate("/");
                Swal.fire({
                    icon: "success",
                    title: "Confirmado",
                    text: "Correo modificado con exito",
                    showConfirmButton: true,
                    customClass: {
                        title: "swal_title",
                        icon: "swal_icon",
                        htmlContainer: "swal_text",
                        confirmButton: "swal_confirm"
                    }
                });
            } catch(error){
                navigate("/");
                Swal.fire({
                    icon: "error",
                    title: "Algo salio mal",
                    text: error,
                    showConfirmButton: true,
                    customClass: {
                        title: "swal_title",
                        icon: "swal_icon",
                        htmlContainer: "swal_text",
                        confirmButton: "swal_confirm"
                    }
                });
            }
        }
        confirmarCorreo(codigo);
    }, [])
    

    return(
        <Spinner/>
    )
}