import React from "react";

export default function UserManagerFilters({userFilters, setUserFilters, setLookupUsers}){
    return(
        <form className={`book_filters usuarios_filters`}>
            <div className="book_filters_input_container user_manager_group">
                <label htmlFor="nombre" className="book_filters_label">Nombre:</label>
                <input onBlur={() => setLookupUsers(true)} onChange={e => setUserFilters({...userFilters, [e.target.name]: e.target.value})} name="nombre" id="nombre" className="book_filters_input"/>
            </div>
            <div className="book_filters_input_container user_manager_group">
                <label htmlFor="correo_electronico" className="book_filters_label">Correo:</label>
                <input onBlur={() => setLookupUsers(true)} onChange={e => setUserFilters({...userFilters, [e.target.name]: e.target.value})} name="correo_electronico" id="correo_electronico" className="book_filters_input"/>
            </div>
        </form>
    )
}