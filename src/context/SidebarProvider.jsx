import React, {useState, useEffect} from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/clienteAxios";
import Swal from "sweetalert2";
import { createContext } from "react";

const RightSidebarContext = createContext();

const RightSidebarProvider = ({ children }) => {
    const [ userChangeInfo, setUserChangeInfo ] = useState(false);

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

        choice == "userInfo" && setUserChangeInfo(true);
    }

    const closeAll = () => {
        setUserChangeInfo(false);
    }

    return(
        <RightSidebarContext.Provider value={{
            userChangeInfo,
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