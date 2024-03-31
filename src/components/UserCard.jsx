import React from "react";
import defaultAvatar from "../assets/default-avatar.jpg"

export default function UserCard(){
    return(
        <div className="user_card_content">
            <div className="user_card_image">
                <img src={defaultAvatar}/>
            </div>
            <div className="user_card_data">
                <h2 className="user_card_data_name">Castañeda Godinez Brandon Yahir</h2>
                <p className="user_card_data_email">testyes1234@gmail.com</p>
                <p className="user_card_data_number">124236235435432</p>
            </div>
        </div>
    )
}