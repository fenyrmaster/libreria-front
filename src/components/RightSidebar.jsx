import React from "react";
import SidebarBookForm from "./SidebarBookForm";
import SidebarBookInfo from "./sidebarBookInfo";
import RegistroLogin from "./RegistroLogin";

export default function RightSidebar({setRightSidebar, rightSidebar, location}){
    return(
        <div className={`sidebar_right ${rightSidebar ? "" : "hidden"}`}>
            <div className="sidebar_right_close" onClick={() => setRightSidebar(false)}>X</div>
            {location == "/" && <SidebarBookInfo/>}
            {location == "/libros" && <SidebarBookForm/>}
        </div>
    )
}