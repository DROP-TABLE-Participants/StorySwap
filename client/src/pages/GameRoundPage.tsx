import React, {useEffect, useState} from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { socket } from "../main";
import waitingIcon from "../assets/waiting-icon.png";
import theWizzard from "../assets/start-story-icon.png";
import { InputMain, ButtonMain } from "../components/Base";

export function GameRound()
{
    const params = useParams();
    const location = useLocation();

    const { gamePin } = useParams() ;


    const [input, setInput] = useState('');
    const [img, setImg] = useState('');
    const [shouldType, setShouldType] = React.useState(location.state.draw);

    useEffect(() => {
        if (location.state.args?.length > 0) {
            setImg(location.state.args[0]);
        }
    }, []);

    const onClick = () => {
        socket.emit("create_image", gamePin, input);

        socket.on("generation_finished", (arg) => {
            setImg(arg);
        });
    }

    socket.on("to_wait", () => {
        setShouldType(false);
        setInput('');

        setTimeout(() => {
            setImg('');
        }, 5000);

    });

    socket.on("to_draw", (...args) => {
       setShouldType(true);
    });

    return(
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-bg-start to-bg-end">

            {shouldType === null ? <div className="loading">Loading...</div> :

            <>
                <div className="absolute flex flex-row justify-between w-full px-10 top-10">
                    <h1 className="round-text">Round {params.round}</h1>

                    <div className="clock">clok</div>
                </div>

                <div className="flex flex-col items-center justify-center">

                    {shouldType === true ?
                    <>
                        {
                        location.state.args?.length > 1 ?
                        <img src="" alt="img-inkomink" /> :
                        <>
                            <img src={img.length > 0 ? img : theWizzard} alt="start-your-story" />
                            <h1 className="text-3xl font-nunito font-bold stroke-blue-700">Start your story</h1>
                        </>
                        }

                        <InputMain value={input} onChange={(e) => setInput(e.target.value)}></InputMain>

                        <ButtonMain onClick={onClick}>Done</ButtonMain>
                    </> :
                    <>
                        <img src={img.length > 0 ? img : waitingIcon} className="w-52" />
                        <h1 className="text-2xl font-nunito font-bold stroke-blue-700">Wait for your turn!</h1>
                    </>
                    }

                </div>
            </>

        }
        </div>
    );
}
