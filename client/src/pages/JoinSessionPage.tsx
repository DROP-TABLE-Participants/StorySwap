import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo-black-and-white.svg';

export function JoinSessionPage()
{
    const navigate = useNavigate();
    const [gamePin, setName] = React.useState('');

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-bg-start to-bg-end">
            <img src={logo} className="w-32 h-32" alt="logo" />
            <div className="flex flex-col items-center justify-center gap-3 mt-16">
                <input type="text" className="w-64 h-14 text-2xl text-center border-4 border-white rounded-md bg-transparent placeholder:text-white" placeholder="Enter Pin" value={gamePin} onChange={(e) => setName(e.target.value)} />
                <button className="w-64 h-14 text-2xl text-center text-black bg-white border-black border-4 rounded-md font-bold shadow-solid-primary" onClick={() => navigate(`/game/${gamePin}`)}>Join</button>
                <a className=" text-2xl">or</a>
                <button className="w-64 h-14 text-2xl text-center border-4 border-white rounded-md bg-transparent font-bold" onClick={() => navigate(`/game/${gamePin}`)}>Create a game</button>
            </div>
        </div>

    );
}