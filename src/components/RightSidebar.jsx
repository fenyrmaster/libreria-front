import React from "react";
import SidebarBookForm from "./SidebarBookForm";
import SidebarBookInfo from "./sidebarBookInfo";
import SidebarUserInfo from "./SidebarUserInfo";
import UserProfileForm from "./UserProfileForm";
import RightSidebarTagForm from "./RightSidebarTagForm";
import useSidebar from "../hooks/useSidebar";
import SidebarBookDiscountForm from "./SidebarBookDiscountForm";
import SidebarBookFormBuy from "./SidebarBookFormBuy";

export default function RightSidebar({ location, setUserChangeInfo}){

    const { userChangeInfo, closeAll, userSidebar, etiquetaForm, bookForm, bookShowOption, bookDiscountSidebar, bookBuy } = useSidebar();

    return(
        <div className={`sidebar_right ${(userChangeInfo || userSidebar || etiquetaForm || bookForm || bookShowOption || bookDiscountSidebar || bookBuy) ? "" : "hidden"}`}>
            <div className="sidebar_right_close" onClick={() => closeAll()}>X</div>
            { userChangeInfo && <UserProfileForm/> }
            { userSidebar && <SidebarUserInfo/> }
            { etiquetaForm && <RightSidebarTagForm/> }
            { bookForm && <SidebarBookForm/> }
            { bookShowOption && <SidebarBookInfo/> }
            { bookDiscountSidebar && <SidebarBookDiscountForm/> }
            { bookBuy && <SidebarBookFormBuy/> }
        </div>
    )
}