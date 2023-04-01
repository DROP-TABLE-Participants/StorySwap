import React from "react";
import { useNavigate } from "react-router-dom";

export function PlayerLobbyCard({player}:any)
{
    const [seed, setSeed] = React.useState(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));

    return (
        <li className="p-3 sm:py-4 bg-zinc-950" onClick={_ =>{console.log(player)}}>
            <div className="flex items-center space-x-4 ">
                <div className="flex-shrink-0">
                    <img src={`https://api.dicebear.com/6.x/micah/svg?seed=${seed}`} className=" w-12 h-12 rounded-full" alt="Avatar" />
                </div>

                <h1 className="text-xl font-bold text-gray-900 text-black"> {player} </h1>
            </div>
        </li>   
    );
}