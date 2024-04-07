import React, {useState, useEffect} from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/clienteAxios";
import Swal from "sweetalert2";
import { createContext } from "react";

const RightSidebarContext = createContext();

const RightSidebarProvider = ({ children }) => {
    const [ userChangeInfo, setUserChangeInfo ] = useState(false);
    const [ bookShow, setBookShow ] = useState({});
    const [ bookShowOption, setBookShowOption ] = useState(false);
    const [ userSidebar, setUserSidebar ] = useState(false);
    const [ userManagerReload, setUserManagerReload ] = useState(false);
    const [ bookSelectedId, setBookSelectedId ] = useState("");
    const [ bookManagerReload, setBookManagerReload ] = useState(false);
    const [ etiquetasManagerReload, setEtiquetasManagerReload ] = useState(false);
    const [ etiquetaForm, setEtiquetaForm ] = useState(false);
    const [ userManage, setUserManage ] = useState({});
    const [ prestamoManagerReload, setPrestamoManagerReload ] = useState(false);
    const [ bookForm, setBookForm ] = useState(false);
    const [ tagsBookFormLoad, setTagsBookFormLoad ] = useState(true);
    const [ etiquetaFormData, setEtiquetaFormData ] = useState({
        id: "",
        nombre: "",
        tipo: "Categoria"
    });
    const [ prestamoFilterData, setPrestamoFilterData ] = useState({
        nombre: "",
        estado: ""
    })
    const [ bookFormData, setBookFormData ] = useState({
        id: "",
        titulo: "",
        sinopsis: "",
        stock: 0,
        edicion: "",
        autores: "",
        fecha_publicacion: "",
        paginas: 0,
        imagen_portada: null
    })
    const [ tagsBookFormSelected, setTagsBookFormSelected ] = useState([]);
    const [ filterBooks, setFilterBooks ] = useState({
        titulo: "",
        categoria: "",
        autores: ""
    });

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
        setBookForm(false);
        setUserManage({});
        setBookShow({});
        setBookShowOption(false);
        setTagsBookFormSelected([]);
        setEtiquetaFormData({
            id: "",
            nombre: "",
            tipo: "Categoria"
        });
        setBookFormData({
            id: "",
            titulo: "",
            sinopsis: "",
            stock: 0,
            edicion: "",
            autores: "",
            editorial: "",
            fecha_publicacion: "",
            paginas: 0,
            imagen_portada: null
        })
        
        setBookSelectedId("");
        setPrestamoFilterData({
            nombre: "",
            estado: ""
        });
        setFilterBooks({
            titulo: "",
            categoria: "",
            autores: ""
        })

        choice == "userInfo" && setUserChangeInfo(true);
        choice == "userData" && setUserSidebar(true);
        choice == "etiquetaForm" && setEtiquetaForm(true);
        choice == "bookForm" && setBookForm(true);
        choice == "bookShow" && setBookShowOption(true);
    }

    const closeAll = () => {
        setUserChangeInfo(false);
        setUserSidebar(false);
        setEtiquetaForm(false);
        setUserManage({});
        setBookForm(false);
        setBookShow({});
        setBookShowOption(false);
        setBookSelectedId("");
        setTagsBookFormSelected([]);
        setEtiquetaFormData({
            id: "",
            nombre: "",
            tipo: "Categoria"
        });
        setBookFormData({
            id: "",
            titulo: "",
            sinopsis: "",
            stock: 0,
            edicion: "",
            autores: "",
            editorial: "",
            fecha_publicacion: "",
            paginas: 0,
            imagen_portada: null
        });
        setBookSelectedId("");
        setPrestamoFilterData({
            nombre: "",
            estado: ""
        });
        setFilterBooks({
            titulo: "",
            categoria: "",
            autores: ""
        })
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
            bookForm,
            tagsBookFormLoad,
            tagsBookFormSelected,
            bookFormData,
            bookManagerReload,
            filterBooks,
            bookShow,
            bookShowOption,
            bookSelectedId,
            prestamoManagerReload,
            prestamoFilterData,
            setBookSelectedId,
            setPrestamoManagerReload,
            setPrestamoFilterData,
            setBookShowOption,
            setBookShow,
            setFilterBooks,
            setBookManagerReload,
            setBookFormData,
            setTagsBookFormSelected,
            setTagsBookFormLoad,
            setEtiquetasManagerReload,
            setBookForm,
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