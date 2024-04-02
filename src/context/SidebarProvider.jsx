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
    const [ userManage, setUserManage ] = useState({});

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
        setUserManage({});

        choice == "userInfo" && setUserChangeInfo(true);
        choice == "userData" && setUserSidebar(true);
    }

    const closeAll = () => {
        setUserChangeInfo(false);
        setUserSidebar(false);
        setUserManage({});
    }

    return(
        <RightSidebarContext.Provider value={{
            userChangeInfo,
            userManage,
            userSidebar,
            userManagerReload,
            setUserManage,
            setUserManagerReload,
            setUserSidebar,
            setUserChangeInfo,
            changeSidebar,
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