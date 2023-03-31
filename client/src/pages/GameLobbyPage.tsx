import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export function GameLobby({game}:any)
{
    const params = useParams();

    return (
        <div className="container">
           <h1>In game lobby {game.pin}</h1>
        </div>
    );


    
}