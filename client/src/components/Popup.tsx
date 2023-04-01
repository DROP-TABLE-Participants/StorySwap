import React from "react";
import { ButtonMain } from "./Base";
 
function Popup({player}:any, trigger:boolean){
        return (trigger) ? (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 b-black">
                <p>Kick player {player}</p>
                <ButtonMain>Kick</ButtonMain>
                <ButtonMain>Cancel</ButtonMain>
            </div>
        ): <></>;
}


export default Popup;