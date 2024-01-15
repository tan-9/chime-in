import { useState } from "react";

export default function Register(){
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    return(
        <div className="bg-pink-200 h-screen flex items-center">
            <form className="w-80 mx-auto">
                <input value={username} 
                onChange={ev=>setUserName(ev.target.value)} 
                type="text" placeholder="username" className="block w-full rounded p-2 mb-2">
                </input>

                <input value={password}
                onChange={ev=>setPassword(ev.target.value)} 
                type="password" placeholder="password" className="block w-full rounded p-2 mb-2">
                </input>
                
                <button className="bg-indigo-200 text-pink-800 font-bold rounded block w-full p-2">Register Here</button>
            </form>
        </div>
    );
}