import React, {useState, useEffect} from "react";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import clienteAxios from "../../config/clienteAxios";
import Swal from "sweetalert2";
import { createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [ auth, setAuth ] = useState({});
    const [ cargando, setCargando ] = useState(true);
    let location = useLocation();

    const navigate = useNavigate();

    // Otra forma de autenticar (IMPORTANTE)
    //const config = {
    //    headers: {
    //        "Content-Type": "application/json",
    //        Authorization: `Bearer ${token}`
    //    }
    //}

    useEffect(() => {
        const confirmarUser = async () => {
          setCargando(true);
          try{
            const respuesta = await clienteAxios.get(`/usuarios/remind`);
            setAuth(respuesta.data.data.user);
            setCargando(false);
            if(!location.pathname.includes("/confirmarCuenta") && !location.pathname.includes("/correoCambiado") && !location.pathname.includes("/recuperar")){
              respuesta.data.data.user.rol == "Administrador" ? navigate("/libros") : navigate("/")
            }
          } catch(error){
            console.log(error)
            setAuth({});
            setCargando(false)
          }
        }
        confirmarUser();
    }, [])

    return(
        <AuthContext.Provider value={{
            auth,
            cargando,
            setAuth
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export {
    AuthProvider
}

export default AuthContext;