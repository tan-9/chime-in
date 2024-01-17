import { useContext, useState } from "react";
import axios from "axios"; 
import { UserContext } from "./userContext";

export default function Register(){
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const {setUsername:setLoggedInUsername, setId} = useContext(UserContext);
    async function register(ev){
        ev.preventDefault();
        const{data} = await axios.post('/register', {username, password});
        setLoggedInUsername(username);
        setId(data.id);
    }
    return(
        <div className="bg-pink-200 h-screen flex items-center">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-80 mx-auto" onSubmit={register}>
                <label class="block text-gray-700 text-sm font-bold mb-2 mt-2" for="username">Username</label>
                <input value={username} 
                onChange={ev=>setUserName(ev.target.value)} 
                type="text" placeholder="username" className="block bg-pink-50 w-full rounded p-2 mb-4">
                </input>

                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                <input value={password}
                onChange={ev=>setPassword(ev.target.value)} 
                type="password" placeholder="password" className="block bg-pink-50 w-full rounded p-2 mb-3">
                </input>
                
                <button className="bg-violet-500 hover:bg-violet-600 text-white font-bold rounded block mt-6 mx-auto p-2 py-2 mb-1">Register Here</button>
            </form>
        </div>
    );
}