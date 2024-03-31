import { useContext } from "react";
import RightSidebarContext from "../context/SidebarProvider";

const useSidebar = () => {
    return useContext(RightSidebarContext);
}

export default useSidebar;