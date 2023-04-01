import React from "react";
import { useNavigate } from "react-router-dom";
import { PlayerLobbyCard } from "./PlayerLobbyCard";

export function PlayerLobbyCardsContainer({players}:any)
{
    return (
         <ul className="w-80 divide-y items-center justify-center max-h-96 whitespace-nowrap overflow-auto  bg-white rounded-xl scroll-m-0 scrollbar-hide ">
            {players.map((p: any) => (
                <PlayerLobbyCard player={p}></PlayerLobbyCard>
            ))}
         </ul>
    );
}