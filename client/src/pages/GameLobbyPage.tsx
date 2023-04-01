import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo-black-and-white.svg';
import changeSeedArrow from '../assets/reroll-arrow.svg';
import { useLocation } from 'react-router-dom';

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
            <div className="items-center justify-center max-h-96 whitespace-nowrap overflow-auto w-80 bg-white rounded-xl scroll-m-0 scrollbar-hide">
            {players.map(player => (
                <div key={player} className="w-72 h-16 text-2xl flex flex-row items-center justify-center text-black bg-gray rounded-md font-bold m-4">
                    <div className="">
                        <img src={`https://api.dicebear.com/6.x/micah/svg?seed=${seed}`} className=" w-12 h-12 rounded-full bg-white border-2 -m-3" alt="logo" />
                        <a className="">
                            {player}
                        </a>
                    </div>
                </div>
            ))}
            </div>
            <button className="w-72 h-16 text-2xl text-center text-black bg-white border-black border-4 rounded-md font-bold shadow-solid-primary absolute bottom-12" onClick={() => navigate(`/game/${gamePin}/lobby`)}>Ready</button>
        </div>

    );
}