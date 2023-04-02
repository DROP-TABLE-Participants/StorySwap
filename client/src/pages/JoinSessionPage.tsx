import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo-black-and-white.svg';
import { ButtonMain, ButtonSecondary, InputMain } from '../components/Base'

import {socket} from "../main";

export function JoinSessionPage()
{
    const navigate = useNavigate();
    const [gamePin, setName] = React.useState('');

    const joinGame = () => {
        socket.emit("join", gamePin);
        socket.on("user_joined", (...args) => {
            navigate(`/game/${gamePin}`, { state: { gamePin } });
            sessionStorage.setItem("userType", "user");
        })
        socket.on("user_already_in_room", (...args) => {
            navigate(`/game/${gamePin}`, { state: { gamePin } });
            sessionStorage.setItem("userType", "user");
        })
        socket.on("room_does_not_exist", (...args) => {
            // MAKE BUTTON RED
        })
    }

    const createGame = () => {
        //generate pin
        const _gamePin = Math.floor(100000 + Math.random() * 900000).toString();

        socket.emit("create", _gamePin);
        socket.on("room_created", (...args) => {
            navigate(`/game/${_gamePin}`, { state: { _gamePin } });
            sessionStorage.setItem("userType", "admin");
        });
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-bg-start to-bg-end">
            <img src={logo} className="w-32 h-32" alt="logo" />
            <div className="flex flex-col items-center justify-center gap-3 mt-16">
                <InputMain placeholder="Enter Pin" value={gamePin} onChange={(e) => setName(e.target.value)} ></InputMain>
                <ButtonMain onClick={joinGame}>JOIN</ButtonMain>
                <a className=" text-2xl">or</a>
                <ButtonSecondary  onClick={createGame}>Create a game</ButtonSecondary>
            </div>
        </div>

    );
}
