import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export function GameSessionPage()
{
    const params = useParams();

    return (
        <div className="container">
           <h1>Game session pin: {params.gamePin}</h1>
        </div>

    );
}