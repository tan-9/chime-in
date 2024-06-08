import { useEffect, useState } from "react";

export default function ChatWindow(){
    const [ws, setWs] = useState(null); 
    const [onlinePeople, setOnlinePeople] = useState({});
    useEffect(()=>{
        const ws = new WebSocket('ws://localhost:5000');
        // const ws = new WebSocket("ws://" + location.host + "/");
        setWs(ws);
        ws.addEventListener('message', handleMessage);
    }, []);

    function showOnlinePeople(pArray){
        const people = {};
        pArray.forEach(({userId, username}) => {
            people[userId] = username;
        });
        setOnlinePeople(people);
        console.log(people);
    }

    function handleMessage(ev){
        const messageData = JSON.parse(ev.data);
        if('online' in messageData){
            showOnlinePeople(messageData.online);
        }

    }
    return (
        <div className="flex h-screen">
            <div className="bg-pink-200 w-1/4 p-2">
                <div className="text-pink-600 font-bold">ChimeIn!</div>
                {Object.keys(onlinePeople).map(userId => (
                    <div className="border-b border-white-400 py-2">
                        {onlinePeople[userId]}
                    </div>
                ))}
            </div>

            <div className="flex flex-col bg-white w-3/4">
                <div className="flex-grow">messages with selected person</div>
                <div className="flex gap-2 mx-1">
                    <input type="text" className="bg-gray-100 rounded-sm flex-grow" placeholder="type anything"></input>
                    <button className="p-2 text-pink-400 border rounded-sm border-pink-100">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                        </svg>
                </button>
                </div>
            </div>

        </div>
    );
}