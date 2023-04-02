import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { socket } from "../main";

export function GameRound()
{
    const params = useParams();
    const location = useLocation();
    const [shouldType, setShouldType] = React.useState(location.state.draw);

    return(
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-bg-start to-bg-end">

            {shouldType === null ? <div className="loading">Loading...</div> :

            <>
                <div className="top-section">
                    <h1 className="round-text">Round {params.round}</h1>

                    <div className="clock">clok</div>
                </div>

                <div className="main-section">
                    <img src="" alt="img" />

                    {shouldType === true ?
                    <>
                        <input type="text" name="" id="" />

                        <button className="done">Done</button>
                    </> :
                    <>
                        <h1 className="text">Waiting for other player to finish...</h1>
                    </>
                    }

                </div>
            </>

        }
        </div>
    );
}
