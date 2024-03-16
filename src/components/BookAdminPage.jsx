import React from "react";
import BookFilters from "./BookFilters";
import Book from "./Book";

export default function BookAdminPage(){
    return(

        <div className="book_content">
            <BookFilters admin={true}/>
            <div className="books">
                <Book admin={true}/>
                <Book admin={true}/>
                <Book admin={true}/>
                <Book admin={true}/>
                <Book admin={true}/>
                <Book admin={true}/>
                <Book admin={true}/>
                <Book admin={true}/>
                <Book admin={true}/>
                <Book admin={true}/>
                <Book admin={true}/>
                <Book admin={true}/>
                <Book admin={true}/>
                <Book admin={true}/>
                <Book admin={true}/>
                <Book admin={true}/>
            </div>
        </div>

    )
}