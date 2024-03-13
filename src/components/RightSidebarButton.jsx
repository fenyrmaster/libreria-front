import React from "react";
import { styled } from "styled-components";

export default function RightSidebarButton({text, color, icon}){
    const Button = styled.button`
        font-size: 2.5rem;
        background-color: transparent;
        border: none;
        color: black;
        padding: .5rem 1rem;
        font-family: "Oswald", sans-serif;
        transition: .3s;

        &:hover{
            color: white;
        }
    `;

    const Div = styled.div`
        border-radius: 1rem;
        background-color: ${color};
        border: .3rem solid ${color};
        display: flex;
        align-items: center;
        justify-content: center;
        transition: .3s;
        &:hover{
            border: .3rem solid ${color};
            background-color: ${color}20;
            color: white;
        }
    `;

    return(
        <div className="button_sidebar">
            <Div>
                <ion-icon name={icon}></ion-icon>
                <Button>{text}</Button>
            </Div>
        </div>
    )
}