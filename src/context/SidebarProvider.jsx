import React, {useState, useEffect} from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/clienteAxios";
import Swal from "sweetalert2";
import { createContext } from "react";

const RightSidebarContext = createContext();

const RightSidebarProvider = ({ children }) => {
    const [ userChangeInfo, setUserChangeInfo ] = useState(false);
    const [ userSidebar, setUserSidebar ] = useState(false);
    const [ userManagerReload, setUserManagerReload ] = useState(false);
    const [ etiquetasManagerReload, setEtiquetasManagerReload ] = useState(false);
    const [ etiquetaForm, setEtiquetaForm ] = useState(false);
    const [ userManage, setUserManage ] = useState({});
    const [ etiquetaFormData, setEtiquetaFormData ] = useState({
        id: "",
        nombre: "",
        tipo: "Categoria"
    })

    const navigate = useNavigate();

    // Otra forma de autenticar (IMPORTANTE)
    //const config = {
    //    headers: {
    //        "Content-Type": "application/json",
    //        Authorization: `Bearer ${token}`
    //    }
    //}

    const changeSidebar = choice => {
        setUserChangeInfo(false);
        setUserSidebar(false);
        setEtiquetaForm(false);
        setUserManage({});
        setEtiquetaFormData({
            id: "",
            nombre: "",
            tipo: "Categoria"
        });

        choice == "userInfo" && setUserChangeInfo(true);
        choice == "userData" && setUserSidebar(true);
        choice == "etiquetaForm" && setEtiquetaForm(true);
    }

    const closeAll = () => {
        setUserChangeInfo(false);
        setUserSidebar(false);
        setEtiquetaForm(false);
        setUserManage({});
        setEtiquetaFormData({
            id: "",
            nombre: "",
            tipo: "Categoria"
        });
    }

    return(
        <RightSidebarContext.Provider value={{
            userChangeInfo,
            userManage,
            userSidebar,
            userManagerReload,
            etiquetaForm,
            etiquetaFormData,
            etiquetasManagerReload,
            setEtiquetasManagerReload,
            setUserManage,
            setUserManagerReload,
            setUserSidebar,
            setUserChangeInfo,
            changeSidebar,
            setEtiquetaForm,
            setEtiquetaFormData,
            closeAll
        }}>
            {children}
        </RightSidebarContext.Provider>
    );
}

export {
    RightSidebarProvider
}

export default RightSidebarContext;