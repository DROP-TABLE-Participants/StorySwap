import React from "react";
import clipboard from "../assets/clipboard-icon.svg";

export function GamePin(gamePinProp: any)
{
    const [gamePin, setGamePin] = React.useState(gamePinProp.gamePinProp);
    

    return (
        <div className="absolute bottom-2 right-2 flex flex-row items-center justify-center gap-3 w-50 h-18 bg-white rounded-xl border-black border-4"
        data-te-toggle="tooltip"
        data-te-placement="top"
        data-te-ripple-init
        data-te-ripple-color="light"
        title="Click to Copy"
        onClick={() => {navigator.clipboard.writeText(gamePin)}}>
            <div className="flex flex-col items-center justify-center pl-3">
                <h1 className="text-1xl font-bold text-gray-900 text-black"> Game PIN: </h1>
                <h1 className="text-2xl font-bold text-gray-900 text-black"> {gamePin} </h1>
            </div>
            <button className="flex items-center justify-center w-16 h-16 bg-zinc-950">
                <img src={clipboard} className="w-8 h-8" alt="clipboard" />
            </button>
        </div>
    );
}