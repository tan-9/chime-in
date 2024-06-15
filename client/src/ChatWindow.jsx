import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "./userContext";
import { uniqBy } from "lodash"
import axios from "axios";


export default function ChatWindow(){
    const [ws, setWs] = useState(null); 
    const [onlinePeople, setOnlinePeople] = useState({});
    const [selectedUserId, setSelectedUserId] = useState(null);
    const {username, id} = useContext(UserContext); 
    const [msgtxt, setMsgtxt] = useState('');
    const [receivedmsg, setReceivedmsg] = useState([]);
    const divUndermsg = useRef();

    useEffect(()=>{
        const ws = new WebSocket('ws://localhost:5000');
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
        console.log({ev, messageData});
        if('online' in messageData){
            showOnlinePeople(messageData.online);
        }
        else{
            setReceivedmsg(prev => ([...prev, {...messageData}]));
        }
    }

    function sendMsg(ev){
        ev.preventDefault();
        console.log('sending msg');
        ws.send(JSON.stringify({
            recipient: selectedUserId,
            text: msgtxt,
            
        }));
        setMsgtxt('');
        setReceivedmsg(prev => ([...prev, {
            text: msgtxt, 
            sender: id,
            recipient: selectedUserId,
            id: Date.now(),
        }]));
    }

    useEffect(() => {
        const div = divUndermsg.current;
        if(div){
            div.scrollIntoView({behaviour: 'smooth', block:'end'});
        }
    }, [receivedmsg])

    useEffect(()=>{
        if(selectedUserId){
            axios.get('/messages/'+selectedUserId) //this endpoint will receive msgs between our user and selected user
        }
    }, [selectedUserId]);

    const otherContacts = {...onlinePeople};
    delete otherContacts[id];
 
    const messagesWithoutDup = uniqBy(receivedmsg, 'id');

    return (
        <div className="flex h-screen">
            <div className="bg-pink-200 w-1/4">
                <div className="text-pink-600 font-bold p-4">ChimeIn!</div>
            
                {Object.keys(otherContacts).map(userId => (
                    <div 
                    key={userId} onClick={()=>setSelectedUserId(userId)} 
                        className={"border-b border-white-400 py-3 px-3 cursor-pointer " + (userId === selectedUserId ? "bg-blue-200" : "")}>
                        {otherContacts[userId]}
                    </div>
                ))}
            </div>

            <div className="flex flex-col bg-white w-3/4">
                <div className="flex-grow">
                    {!selectedUserId && (
                        <div className="flex flex-grow h-full items-center justify-center">
                            <div className="text-slate-400">Please select a contact!</div>
                        </div>
                    )

                    }
                </div>

                {!!selectedUserId && (
                    <div className="relative h-full">
                        <div className="overflow-y-scroll absolute inset-0">
                        {messagesWithoutDup.map(msg=>(
                            <div className={(msg.sender === id ? 'text-right' : 'text-left')}>
                                <div className={"text-left text-sm inline-block p-2 m-2 rounded-md " +(msg.sender === id ? 'bg-pink-300 text-black' : 'bg-blue-300 text-white')}>
                                sender: {msg.sender}<br/>
                                my id: {id}<br/>
                                {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={divUndermsg}></div>
                        </div>
                    </div>
                )}

                {!!selectedUserId && (
                    <form className="flex gap-2 mx-1" onSubmit={sendMsg}>
                    <input type="text" className="bg-gray-100 rounded-sm flex-grow" 
                    value={msgtxt} 
                    onChange={ev=> setMsgtxt(ev.target.value)} 
                    placeholder="type anything"></input>
                    <button type="submit" className="p-2 text-pink-400 border rounded-sm border-pink-100">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                        </svg>
                </button>
                </form>
                )}
                
            </div>

        </div>
    );
}