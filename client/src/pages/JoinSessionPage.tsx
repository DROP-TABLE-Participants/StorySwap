import React from "react";
import { useNavigate } from "react-router-dom";

export function JoinSessionPage()
{
    const navigate = useNavigate();
    const [gamePin, setName] = React.useState('');

    return (
        <div className="container">
            <form className="join-session-form">
                <input
                    value={gamePin}
                    onChange={e =>{
                        setName(e.target.value);
                    }}
                    type="text"
                    className="game-pin-field"
                    placeholder="Game pin"/>

                <button onClick={_ => navigate(`/game/${gamePin}`)} className="join-game-button ">JOIN</button>
            </form>
        </div>

    );
}