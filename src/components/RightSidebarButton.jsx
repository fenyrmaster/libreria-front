import React from "react";
import { styled } from "styled-components";

export default function RightSidebarButton({text, color, icon, whiteBG, disabled_btn, font_size}){
    const Button = styled.button`
        font-size: ${font_size ? font_size : 2.5}rem;
        background-color: transparent;
        border: none;
        color: black;
        padding: .5rem 1rem;
        font-family: "Oswald", sans-serif;
        transition: .3s;

        &:hover{
            color: ${!whiteBG ? "white" : color};
        }
    `;

    const Div = styled.div`
        border-radius: 1rem;
        background-color: ${disabled_btn ? "grey" : color};
        border: .3rem solid ${disabled_btn ? "grey" : color};
        display: flex;
        align-items: center;
        justify-content: center;
        transition: .3s;
        &:hover{
            border: .3rem solid ${disabled_btn ? "grey" : color};
            background-color: ${disabled_btn ? "#808080" : color}20;
            color: ${!whiteBG ? "white" : color};
        }
    `;

    return(
        <div className="button_sidebar">
            <Div>
                <ion-icon name={icon}></ion-icon>
                <Button disabled={disabled_btn ? true : false}>{text}</Button>
            </Div>
        </div>
    )
}