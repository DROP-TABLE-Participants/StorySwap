import React, { useEffect, useState } from "react";
import { useNavigate, useParams  } from "react-router-dom";
import logo from '../assets/logo-black-and-white.svg';
import changeSeedArrow from '../assets/reroll-arrow.svg';
import { useLocation } from 'react-router-dom';
import { PlayerLobbyCardsContainer } from "../components/PlayerLobbyCardsContainer";
import { GamePin } from "../components/GamePin"

import { socket } from "../main";

export function GameLobby() {
    const navigate = useNavigate();
    const location = useLocation();

    const [seed, setSeed] = React.useState(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
    const [players, setPlayers]:any = useState([]);
    const [isGameReady, setIsGameReady] = useState(false);

    const { gamePin } = useParams() ;

    const isUserAdmin = sessionStorage.getItem("userType") == "admin";

    socket.on("can_start_game", () => {
        setIsGameReady(true);
    });

    socket.on("can_not_start_game", () => {
        setIsGameReady(false);
    });

    useEffect(() => {
        socket.emit("users_in_room", gamePin);
        socket.on("users_in_room", (args) => {
            setPlayers(args);
        });
    }, [gamePin])

    socket.on("user_ready", async (args) => {
        // fetch user data from api
        const newPlayers = players.concat(args);

        setPlayers(newPlayers);
    });

    const onClick = () => {
        if (!isGameReady) return;

        socket.emit("start_game", gamePin);
        socket.on("game_start", () => {
            socket.on("to_draw", (...args) => {
               navigate(`/game/${gamePin}/round`, {state: {draw: true, args: args}});
            });

            socket.on("to_wait", () => {
                navigate(`/game/${gamePin}/round`, {state: {draw: false}});
            })
        });

    };

    return (

            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-bg-start to-bg-end">

                {/*
                <div className="tabs-container">
                <div className="game-tab-button">Game</div>
                </div>
            */}
                <div className="flex flex-row items-center justify-center gap-3 mt-16">
                    <div className="bg-white text-2xl text-black font-bold py-3 px-5 rounded-tl-md rounded-tr-md">Players</div>
                    <div className="bg-white text-2xl text-black font-bold py-3 px-5 rounded-tl-md rounded-tr-md">Game</div>
                </div>

                <PlayerLobbyCardsContainer players={players}></PlayerLobbyCardsContainer>

                {
                    isUserAdmin ?
                        <button disabled={!isGameReady}  onClick={onClick}> Start the game </button> :
                        <p> Waiting for host to start the game.</p>
                }

                <GamePin gamePinProp={gamePin}></GamePin>

            </div>


    );
}
