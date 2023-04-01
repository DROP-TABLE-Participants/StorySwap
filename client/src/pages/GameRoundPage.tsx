import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export function GameRound()
{
    const params = useParams();

    return(
        <div className="container">
            <div className="top-section">
                <h1 className="round-text">Round {params.round}</h1>
    
                <div className="clock">clok</div>
            </div>

            <div className="main-section">
                <img src="" alt="img" />
    
                <input type="text" name="" id="" />

                <button className="done">Done</button>
            </div>
        </div>
    );
}