import React from "react";
import SidebarBookForm from "./SidebarBookForm";
import SidebarBookInfo from "./sidebarBookInfo";
import RegistroLogin from "./RegistroLogin";
import UserProfileForm from "./UserProfileForm";
import RightSidebarTagForm from "./RightSidebarTagForm";

export default function RightSidebar({setRightSidebar, rightSidebar, location}){
    return(
        <div className={`sidebar_right ${rightSidebar ? "" : "hidden"}`}>
            <div className="sidebar_right_close" onClick={() => setRightSidebar(false)}>X</div>
            {location == "/" && <SidebarBookInfo/>}
            {location == "/libros" && <SidebarBookForm/>}
            {location == "/cuenta" && <UserProfileForm/>}
            {location == "/etiquetas" && <RightSidebarTagForm/>}
        </div>
    )
}