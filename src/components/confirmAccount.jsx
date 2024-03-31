import React, { useEffect } from "react";
import Spinner from "./Spinner";
import clienteAxios from "../../config/clienteAxios";
import { useParams, useNavigate } from "react-router"
import Swal from "sweetalert2";

export default function ConfirmCuenta(){
    const { codigo } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const confirmarUsuario = async token => {
            try{
                await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/confirm/${token}`, {
                    method: "GET"
                });
                navigate("/");
                Swal.fire({
                    icon: "success",
                    title: "Confirmado",
                    text: "Tu cuenta ha sido confirmada, ya puedes utilizar el sitio web",
                    showConfirmButton: true,
                    customClass: {
                        title: "swal_title",
                        icon: "swal_icon",
                        htmlContainer: "swal_text",
                        confirmButton: "swal_confirm"
                    }
                });
            } catch(error){
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
        confirmarUsuario(codigo);
    }, [])
    

    return(
        <Spinner/>
    )
}