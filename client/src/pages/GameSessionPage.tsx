import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GameLobby } from "./GameLobbyPage";
import { GameRunningPage } from "./GameRunningPage";

export function GameSessionPage()
{
    const params = useParams();
    const game = {
        state: 1,
        pin: params.gamePin,
    };

    if (game.state == 0)
    {
        return (
            <></>
        );
    }
    else if (game.state == 1)
    {
        return (
            <GameRunningPage/>
        );
    }
    else(game.state == 2)
    {
        return (
            //game finished
            <h1>Game Finished</h1>
        );
    }
}