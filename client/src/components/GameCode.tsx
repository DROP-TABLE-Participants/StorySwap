import React from "react";
import clipboard from "../assets/clipboard-icon.svg";

export default function GameCode()
{
    const [gamePin, setGamePin] = React.useState("123456");

    return (
        <div className="flex flex-row items-center justify-center gap-3 w-56 h-24 bg-white rounded-xl border-black border-4"
        data-te-toggle="tooltip"
        data-te-placement="top"
        data-te-ripple-init
        data-te-ripple-color="light"
        title="Click to Copy"
        onClick={() => {navigator.clipboard.writeText(gamePin)}}>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-900 text-black"> Game PIN: </h1>
                <h1 className="text-3xl font-bold text-gray-900 text-black"> {gamePin} </h1>
            </div>
            <button className="flex items-center justify-center w-16 h-16 bg-zinc-950">
                <img src={clipboard} className="w-8 h-8" alt="clipboard" />
            </button>
        </div>
    );
}