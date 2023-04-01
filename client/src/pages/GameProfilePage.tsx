import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo-black-and-white.svg';
import changeSeedArrow from '../assets/reroll-arrow.svg';
import { useLocation } from 'react-router-dom';

export function GameProfilePage()
{
    const navigate = useNavigate();
    const [name, setName] = React.useState('');
    const [seed, setSeed] = React.useState(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
    const location = useLocation();
    const { gamePin } = location.state;

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-bg-start to-bg-end">
            <img src={logo} className="w-28 h-28 absolute top-12" alt="logo" />
            <div className="flex flex-col items-center justify-center gap-3 border-4 border-white rounded-xl bg-white bg-opacity-10 mt-5">
                <img src={`https://api.dicebear.com/6.x/micah/svg?seed=${seed}`} className=" w-48 h-48 rounded-full bg-white border-2 -m-12" alt="logo" />
                <div className="flex flex-row items-center justify-center m-6 mt-16 gap-4">
                    <input type="text" className="w-72 h-14 text-2xl text-center text-black border-4 bg-white rounded-md placeholder:text-black" placeholder="Nickname" value={name} onChange={(e) => setName(e.target.value)} />
                    <button className="w-14 h-14 text-2xl text-center text-black bg-white border-black border-4 rounded-md font-bold flex flex-row items-center justify-center" onClick={() => setSeed(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))}><img src={changeSeedArrow}/></button>
                </div>
            </div>
            <button className="w-72 h-16 text-2xl text-center text-black bg-white border-black border-4 rounded-md font-bold shadow-solid-primary absolute bottom-12" onClick={() => navigate(`/game/${gamePin}/lobby`, { state: { gamePin } })}>START</button>
        </div>

    );
}