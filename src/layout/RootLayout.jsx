import Cookies from "js-cookie";
import React from "react";
import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import clienteAxios from "../../config/clienteAxios";
import libreriaLogo from "../assets/6fabc24c3830d75486725cc6d786dfbb-logotipo-de-circulos-de-libro.png"
import defaultAvatar from "../assets/default-avatar.jpg"
import RightSidebar from "../components/RightSidebar";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";
import useSidebar from "../hooks/useSidebar";

export default function RootLayout(){
    let location = useLocation();
    console.log(location.pathname)

    const [sidebar, setSidebar] = useState(false);

    const { cargando, auth, setAuth } = useAuth();
    const { closeAll, setSearchUniversal, searchUniversal } = useSidebar();
    const navigate = useNavigate();

    const cerrarSesion = async () => {
        Cookies.remove("jwt2");
        setAuth({});
        await clienteAxios.get("/usuarios/logout");
        navigate("/");
        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            customClass: {
                title: "swal_title_mixin",
                icon: "swal_icon",
                htmlContainer: "swal_text",
                confirmButton: "swal_confirm"
            },
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Has cerrado sesion"
        });
    }

    const findBooks = e => {
        e.preventDefault();
        navigate("/");
    }

    return(
        <>
            <main className="main_content">
                <div className={`sidebar ${sidebar ? "" : "hidden"}`}>
                    <ul>
                        <li className="logo">
                            <div className="sidebar_close" onClick={() => setSidebar(false)}>X</div>
                            <Link to="/" className="logo_link" style={{textDecoration: "none"}}>
                                <img src={libreriaLogo}></img>
                                <h1 className="logo_text">Librerias MX</h1>
                            </Link>
                        </li>
                        { cargando ? <Spinner/> : <><div className="Menulist">
                            { (auth.rol == "Cliente" || Object.keys(auth).length === 0) && <li className={`nav-el-1 ${location.pathname == "/" && "active"}`}>
                                <Link to="/" className="link_container" style={{textDecoration: "none"}}>
                                    <div className="icon"><ion-icon name="book-outline"></ion-icon></div>
                                    <div className="text">Libros</div>
                                </Link>
                            </li> }
                            { (auth.rol == "Cliente") && <li className={`nav-el-2 ${location.pathname == "/prestamos" && "active"}`}>
                                <Link to="/prestamos" className="link_container" style={{textDecoration: "none"}}>
                                    <div className="icon"><ion-icon name="library-outline"></ion-icon></div>
                                    <div className="text">Mis Prestamos</div>
                                </Link>
                            </li>}
                            {auth.rol == "Cliente" && <li className={`nav-el-10 ${location.pathname == "/compras" && "active"}`}>
                                <Link to="/compras" className="link_container" style={{textDecoration: "none"}}>
                                    <div className="icon"><ion-icon name="cash-outline"></ion-icon></div>
                                    <div className="text">Mis Compras</div>
                                </Link>
                            </li>}
                            { (auth.rol == "Administrador" || auth.rol == "Cliente") && <li className={`nav-el-3 ${location.pathname == "/cuenta" && "active"}`}>
                                <Link to="/cuenta" className="link_container" style={{textDecoration: "none"}}>
                                    <div className="icon"><ion-icon name="person-outline"></ion-icon></div>
                                    <div className="text">Mi Cuenta</div>
                                </Link>
                            </li>}
                            { Object.keys(auth).length === 0 && <li className={`nav-el-4 ${location.pathname == "/iniciar-sesion" && "active"}`}>
                                <Link to="/iniciar-sesion" className="link_container" style={{textDecoration: "none"}}>
                                    <div className="icon"><ion-icon name="log-in-outline"></ion-icon></div>
                                    <div className="text">Iniciar Sesion</div>
                                </Link>
                            </li>}
                            {auth.rol == "Administrador" && <li className={`nav-el-5 ${location.pathname == "/usuarios" && "active"}`}>
                                <Link to="/usuarios" className="link_container" style={{textDecoration: "none"}}>
                                    <div className="icon"><ion-icon name="people-outline"></ion-icon></div>
                                    <div className="text">Gestionar Usuarios</div>
                                </Link>
                            </li>}
                            { auth.rol == "Administrador" && <li className={`nav-el-6 ${location.pathname == "/etiquetas" && "active"}`}>
                                <Link to="/etiquetas" className="link_container" style={{textDecoration: "none"}}>
                                    <div className="icon"><ion-icon name="bookmarks-outline"></ion-icon></div>
                                    <div className="text">Gestionar Etiquetas</div>
                                </Link>
                            </li>}
                            { auth.rol == "Administrador" && <li className={`nav-el-7 ${location.pathname == "/gestion-prestamos" && "active"}`}>
                                <Link to="/gestion-prestamos" className="link_container" style={{textDecoration: "none"}}>
                                    <div className="icon"><ion-icon name="reader-outline"></ion-icon></div>
                                    <div className="text">Gestionar Prestamos</div>
                                </Link>
                            </li>}
                            { auth.rol == "Administrador" && <li className={`nav-el-8 ${location.pathname == "/libros" && "active"}`}>
                                <Link to="/libros" className="link_container" style={{textDecoration: "none"}}>
                                    <div className="icon"><ion-icon name="library-outline"></ion-icon></div>
                                    <div className="text">Gestionar Libros</div>
                                </Link>
                            </li> }
                            {auth.rol == "Administrador" && <li className={`nav-el-10 ${location.pathname == "/gestion-compras" && "active"}`}>
                                <Link to="/gestion-compras" className="link_container" style={{textDecoration: "none"}}>
                                    <div className="icon"><ion-icon name="cash-outline"></ion-icon></div>
                                    <div className="text">Gestionar Compras</div>
                                </Link>
                            </li>}
                            { auth.rol == "Administrador" && <li className={`nav-el-9 ${location.pathname == "/auditorias" && "active"}`}>
                                <Link to="/auditorias" className="link_container" style={{textDecoration: "none"}}>
                                    <div className="icon"><ion-icon name="information-circle-outline"></ion-icon></div>
                                    <div className="text">Auditorias</div>
                                </Link>
                            </li> }
                        </div>
                        { Object.keys(auth).length != 0 && <div onClick={() => {cerrarSesion(); closeAll();}} className="bottom">
                            <li className="bottom_container">
                                <div className="icon"><ion-icon name="log-out-outline"></ion-icon></div>
                                <div className="text">Cerrar Sesion</div>
                            </li>
                        </div>}</> }
                    </ul>
                </div>
                <div className="content_container">
                    <header className="main_content_header">
                        <div onClick={() => setSidebar(true)} className="burger_menu">
                            <div className="bar"></div>
                        </div>
                        <form onSubmit={e => findBooks(e)} className="main_content_search_bar">
                            <input value={searchUniversal} onChange={e => setSearchUniversal(e.target.value)} className="search_bar" type={"text"} placeholder={"Busca por nombre de libros..."} name={"bookName"}/>
                            <button type="submit" className="main_content_search_bar_button"><ion-icon name="search-outline"></ion-icon></button>
                        </form>
                        { Object.keys(auth).length != 0 ? <Link to={"/cuenta"} className="main_content_user" style={{textDecoration: "none"}}>
                            <h3 className="username">{auth?.nombre?.split(" ")[0]}</h3>
                            <div className="user_img">
                                <img src={auth.image == null ? defaultAvatar : auth.image}/>
                            </div>
                        </Link> : 
                        <Link to={"/iniciar-sesion"} className="main_content_user" style={{textDecoration: "none"}}>
                            <h3 className="username">Iniciar Sesion</h3>
                        </Link> }
                    </header>
                    <div className="page">
                        <div className={`sidebar_filter ${sidebar ? "" : "hidden"}`} onClick={() => setSidebar(false)}></div>
                        <div className="content_module">
                            { cargando ? <Spinner/> : <Outlet/> }
                        </div>
                        <RightSidebar location={location.pathname}/>
                    </div>
                </div>
            </main>
        </>       
    )
}