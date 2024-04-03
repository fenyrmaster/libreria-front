import React from "react";
import SidebarBookForm from "./SidebarBookForm";
import SidebarBookInfo from "./sidebarBookInfo";
import SidebarUserInfo from "./SidebarUserInfo";
import UserProfileForm from "./UserProfileForm";
import RightSidebarTagForm from "./RightSidebarTagForm";
import useSidebar from "../hooks/useSidebar";

export default function RightSidebar({ location, setUserChangeInfo}){

    const { userChangeInfo, closeAll, userSidebar, etiquetaForm } = useSidebar();

    return(
        <div className={`sidebar_right ${(userChangeInfo || userSidebar || etiquetaForm) ? "" : "hidden"}`}>
            <div className="sidebar_right_close" onClick={() => closeAll()}>X</div>
            { userChangeInfo && <UserProfileForm/> }
            { userSidebar && <SidebarUserInfo/> }
            { etiquetaForm && <RightSidebarTagForm/> }
        </div>
    )
}