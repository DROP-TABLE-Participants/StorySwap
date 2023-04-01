import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo-black-and-white.svg';
import changeSeedArrow from '../assets/reroll-arrow.svg';
import { useLocation } from 'react-router-dom';
import { PlayerLobbyCardsContainer } from "../components/PlayerLobbyCardsContainer";

export function GameLobby()
{
    const navigate = useNavigate();
    const [name, setName] = React.useState('');
    const [seed, setSeed] = React.useState(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
    const location = useLocation();
    const { gamePin } = location.state;
    const players = ["Player 1", "Player 2", "Player 3", "Player 4", "Player 1", "Player 2", "Player 3", "Player 4", "Player 1", "Player 2", "Player 3", "Player 4"];

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-bg-start to-bg-end">

            <PlayerLobbyCardsContainer players={players}></PlayerLobbyCardsContainer>

            <button className="w-72 h-16 text-2xl text-center text-black bg-white border-black border-4 rounded-md font-bold shadow-solid-primary absolute bottom-12" onClick={() => navigate(`/game/${gamePin}/lobby`)}>Ready</button>
        </div>

    );
}