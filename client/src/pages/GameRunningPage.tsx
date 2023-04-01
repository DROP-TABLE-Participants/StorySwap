import React from "react";



export function GameRunningPage()
{
        const turn = 0;
        
    if(turn == 0) {
        return (
            <div>
                <p className="round"></p> 
                <img src="" alt="" />
                <p>Wait.....</p>
            </div>
    );
    
    } else {
        return (
            <div>
                <p className="round"></p> 
                <img src="" alt="" />
                <input type="text" />
                <button></button>
            </div>
        );
    }
}

