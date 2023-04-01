import React from "react";
import { useNavigate } from "react-router-dom";

export function GameEndPage()
{
    const navigate = useNavigate();
    const story = [{text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", imgUrl: "https://us.be"}, {text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", imgUrl: "https://us.be"}, {text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", imgUrl: "https://us.be"}, {text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", imgUrl: "https://us.be"}];

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-bg-start to-bg-end">
            {story.map(
                (s: any) => (
                    <div className="flex flex-col items-center justify-center gap-3 mt-16">
                        <div className="bg-white text-2xl text-black font-bold py-3 px-5 rounded-tl-md rounded-tr-md">Story</div>
                        <div className="bg-white text-2xl text-black font-bold py-3 px-5 rounded-tl-md rounded-tr-md">{s.text}</div>
                    </div>
                )
            )}
        </div>
    );
}