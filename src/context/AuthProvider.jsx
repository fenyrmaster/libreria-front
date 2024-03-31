import React, {useState, useEffect} from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/clienteAxios";
import Swal from "sweetalert2";
import { createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [ auth, setAuth ] = useState({});
    const [ cargando, setCargando ] = useState(true);

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
            respuesta.data.data.user.rol == "Administrador" ? navigate("/libros") : navigate("/")
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