import React from "react";
import BookFilters from "./BookFilters";
import Book from "./Book";

export default function BookPage(){
    return(

        <div className="book_content">
            <BookFilters/>
            <div className="books">
                <Book/>
                <Book/>
                <Book/>
                <Book/>
                <Book/>
                <Book/>
                <Book/>
                <Book/>
                <Book/>
                <Book/>
                <Book/>
                <Book/>
                <Book/>
                <Book/>
                <Book/>
                <Book/>
            </div>
        </div>

    )
}