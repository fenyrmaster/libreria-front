import React, { useEffect } from "react";
import UserManagerFilters from "./UserManagerFilters";
import UserCard from "./UserCard";
import useAuth from "../hooks/useAuth";
import useSidebar from "../hooks/useSidebar";
import Swal from "sweetalert2";
import { useState } from "react";
import clienteAxios from "../../config/clienteAxios";
import Spinner from "./Spinner";

export default function UserManagerPage(){
    const { auth } = useAuth();
    const { userManagerReload, setUserManagerReload } = useSidebar();
    const [userFilters, setUserFilters] = useState({
        nombre: "",
        correo_electronico: ""
    });
    const [ users, setUsers ] = useState([]);

    const [ lookupUsers, setLookupUsers ] = useState(true);
    const [ cargando, setCargando ] = useState(false);

    useEffect(() => {
        const searchUsers = async () => {
            if(lookupUsers || userManagerReload){
                setCargando(true);
                try{
                    const usuarios = await clienteAxios.post("/usuarios/userAdmins", userFilters);
                    setUsers(usuarios.data.users);
                    setLookupUsers(false);
                    setCargando(false);
                    setUserManagerReload(false);
                }catch(error){
                    setLookupUsers(false);
                    setCargando(false);
                    setUserManagerReload(false);
                    console.log(error);
                }
            }
        }
        searchUsers();
    }, [lookupUsers, userManagerReload]);

    useEffect(() =>{
        if(Object.keys(auth).length === 0){
            Swal.fire({
                icon: "error",
                title: "Sin permiso",
                text: "Para usar este sitio, crea una cuenta",
                showConfirmButton: true,
                customClass: {
                    title: "swal_title",
                    icon: "swal_icon",
                    htmlContainer: "swal_text",
                    confirmButton: "swal_confirm"
                }
            });
            navigate("/iniciar-sesion");
        }
    }, []);

    return(

        <div className={`book_content user_manager_content`}>
            <UserManagerFilters userFilters={userFilters} setUserFilters={setUserFilters} setLookupUsers={setLookupUsers}/>
            <div className="books user_manager_users">
                { cargando ? <Spinner/> : (users.length > 0 ? users.map(user => <UserCard user={user} key={user.id}/>) : <h3 className="no_users_alert">No hay usuarios</h3>) }
            </div>
        </div>
    )
}