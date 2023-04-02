import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import { socket } from "../main";

export function GameEndPage() {
    const navigate = useNavigate();
    const { gamePin } = useParams();
    const [entities, setEntities] = useState<[]>([])

    useEffect(() => {
        socket.emit("game_finished", gamePin);
        socket.on("game_finished", (...args) => {
            setEntities(args);
        })
    }, []);

    console.log(gamePin);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-bg-start to-bg-end">
            {entities.map(
                (s: any) => (
                    <div className="flex flex-col items-center justify-center gap-3 mt-16">
                        <img src={s[0].url} className="w-96"/>
                        <div className="bg-white text-2xl text-black font-bold py-3 px-5 rounded-tl-md rounded-tr-md">{s[0].prompt}</div>
                    </div>
                )
            )}
        </div>
    );
}
