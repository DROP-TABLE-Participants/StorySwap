import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo-black-and-white.svg';
import { ButtonMain, ButtonSecondary, InputMain } from '../components/Base'

export function JoinSessionPage()
{
    const navigate = useNavigate();
    const [gamePin, setName] = React.useState('');

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-bg-start to-bg-end">
            <img src={logo} className="w-32 h-32" alt="logo" />
            <div className="flex flex-col items-center justify-center gap-3 mt-16">
                <InputMain placeholder="Enter Pin" value={gamePin} onChange={(e) => setName(e.target.value)} ></InputMain>
                <ButtonMain onClick={() => navigate(`/game/${gamePin}`, { state: { gamePin } })}>Join</ButtonMain>
                <a className=" text-2xl">or</a>
                <ButtonSecondary  onClick={() => navigate(`/game/${gamePin}`)}>Create a game</ButtonSecondary>
            </div>
        </div>

    );
}