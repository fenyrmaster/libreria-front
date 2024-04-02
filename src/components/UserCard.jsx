import React from "react";
import useSidebar from "../hooks/useSidebar";
import defaultAvatar from "../assets/default-avatar.jpg"

export default function UserCard({user}){

    const { setUserManage, changeSidebar, userManage, setUserChangeInfo } = useSidebar();

    return(
        <div onClick={() => {changeSidebar("userData"); setUserManage(user);}} className={`user_card_content ${userManage?.id == user.id && "user_card_active"} ${!user?.active && "disabled_user"}`}>
            <div className="user_card_image">
                <img src={user.image == null ? defaultAvatar : user.image}/>
            </div>
            <div className="user_card_data">
                <h2 className="user_card_data_name">{user.nombre}</h2>
                <p className="user_card_data_email">{user.correo_electronico}</p>
                <p className="user_card_data_number">{user.id}</p>
            </div>
        </div>
    )
}