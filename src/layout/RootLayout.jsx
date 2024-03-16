import React from "react";
import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom"
import libreriaLogo from "../assets/6fabc24c3830d75486725cc6d786dfbb-logotipo-de-circulos-de-libro.png"
import defaultAvatar from "../assets/default-avatar.jpg"
import RightSidebar from "../components/RightSidebar";

export default function RootLayout(){
    let location = useLocation();
    console.log(location.pathname)

    const [sidebar, setSidebar] = useState(false);
    const [rightSidebar, setRightSidebar] = useState(false);

    const toggleSidebar = () => {
        sidebar ? setSidebar(false) : setSidebar(true);
    }

    return(
        <>
            <main className="main_content">
                <div className={`sidebar ${sidebar ? "" : "hidden"}`}>
                    <ul>
                        <li className="logo">
                            <div className="sidebar_close" onClick={() => setSidebar(false)}>X</div>
                            <Link href="/" className="logo_link" style={{textDecoration: "none"}}>
                                <img src={libreriaLogo}></img>
                                <h1 className="logo_text">Librerias MX</h1>
                            </Link>
                        </li>
                        <div className="Menulist">
                            <li className={`nav-el-1 ${location.pathname == "/" && "active"}`}>
                                <Link to="/" className="link_container" style={{textDecoration: "none"}}>
                                    <div className="icon"><ion-icon name="book-outline"></ion-icon></div>
                                    <div className="text">Libros</div>
                                </Link>
                            </li>
                            <li className="nav-el-2">
                                <Link to="/libros" className="link_container" style={{textDecoration: "none"}}>
                                    <div className="icon"><ion-icon name="library-outline"></ion-icon></div>
                                    <div className="text">Prestamos</div>
                                </Link>
                            </li>
                            <li className="nav-el-3">
                                <Link to="/libros" className="link_container" style={{textDecoration: "none"}}>
                                    <div className="icon"><ion-icon name="person-outline"></ion-icon></div>
                                    <div className="text">Mi Cuenta</div>
                                </Link>
                            </li>
                            <li className={`nav-el-4 ${location.pathname == "/iniciar-sesion" && "active"}`}>
                                <Link to="/iniciar-sesion" className="link_container" style={{textDecoration: "none"}}>
                                    <div className="icon"><ion-icon name="log-in-outline"></ion-icon></div>
                                    <div className="text">Iniciar Sesion</div>
                                </Link>
                            </li>
                            <li className="nav-el-5">
                                <Link to="/libros" className="link_container" style={{textDecoration: "none"}}>
                                    <div className="icon"><ion-icon name="people-outline"></ion-icon></div>
                                    <div className="text">Gestionar Usuarios</div>
                                </Link>
                            </li>
                            <li className="nav-el-6">
                                <Link to="/libros" className="link_container" style={{textDecoration: "none"}}>
                                    <div className="icon"><ion-icon name="bookmarks-outline"></ion-icon></div>
                                    <div className="text">Gestionar Etiquetas</div>
                                </Link>
                            </li>
                            <li className="nav-el-7">
                                <Link to="/libros" className="link_container" style={{textDecoration: "none"}}>
                                    <div className="icon"><ion-icon name="reader-outline"></ion-icon></div>
                                    <div className="text">Gestionar Prestamos</div>
                                </Link>
                            </li>
                            <li className={`nav-el-8 ${location.pathname == "/libros" && "active"}`}>
                                <Link to="/libros" className="link_container" style={{textDecoration: "none"}}>
                                    <div className="icon"><ion-icon name="library-outline"></ion-icon></div>
                                    <div className="text">Gestionar Libros</div>
                                </Link>
                            </li>
                        </div>
                        <div className="bottom">
                            <li className="bottom_container">
                                <div className="icon"><ion-icon name="log-out-outline"></ion-icon></div>
                                <div className="text">Cerrar Sesion</div>
                            </li>
                        </div>
                    </ul>
                </div>
                <div className="content_container">
                    <header className="main_content_header">
                        <div className="burger_menu" onClick={() => toggleSidebar()}>
                            <div className="bar"></div>
                        </div>
                        <form onSubmit={() => console.log("hello")} className="main_content_search_bar">
                            <input className="search_bar" type={"text"} placeholder={"Busca por nombre de libros..."} name={"bookName"}/>
                            <button type="submit" className="main_content_search_bar_button"><ion-icon name="search-outline"></ion-icon></button>
                        </form>
                        <Link onClick={() => setRightSidebar(true)} className="main_content_user" style={{textDecoration: "none"}}>
                            <h3 className="username">Brandon Yahir</h3>
                            <div className="user_img">
                                <img src={defaultAvatar}/>
                            </div>
                        </Link>
                    </header>
                    <div className="page">
                        <div className={`sidebar_filter ${sidebar ? "" : "hidden"}`}></div>
                        <div className="content_module">
                            <Outlet setRightSidebar={setRightSidebar}/>
                        </div>
                        <RightSidebar setRightSidebar={setRightSidebar} rightSidebar={rightSidebar} location={location.pathname}/>
                    </div>
                </div>
            </main>
        </>       
    )
}