import React from "react";
import UserManagerFilters from "./UserManagerFilters";
import UserCard from "./UserCard";

export default function UserManagerPage(){
    return(

        <div className={`book_content user_manager_content`}>
            <UserManagerFilters/>
            <div className="books user_manager_users">
                <UserCard/>
                <UserCard/>
                <UserCard/>
                <UserCard/>
                <UserCard/>
                <UserCard/>
                <UserCard/>
                <UserCard/>
                <UserCard/>
                <UserCard/>
                <UserCard/>
                <UserCard/>
                <UserCard/>
                <UserCard/>
                <UserCard/>
                <UserCard/>
            </div>
        </div>
    )
}