import React,{ useContext, useState } from "react";
import axios from "axios"; 
import { UserContext } from "./userContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function RegisterAndLoginForm(){
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedin, setIsloggedin] = useState('register');
    const {setUsername:setLoggedInUsername, setId} = useContext(UserContext);
    async function handleResponse(ev){
        ev.preventDefault();
        const url = isLoggedin === 'register' ? 'register' : 'login';
        try{
            const{data} = await axios.post(url, {username, password});
            setLoggedInUsername(username);
            setId(data.id);
        } catch(error){
            if(error.response && error.response.status === 401) {
                toast.error("Incorrect Password :(");
            }
            else if(error.response && error.response.status === 404){
                toast.error("No user found");
            }
        }
    }
    return(
        <div className="bg-pink-200 h-screen flex items-center">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-80 mx-auto" onSubmit={handleResponse}>
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
                
                <button className="bg-violet-500 hover:bg-violet-600 text-white font-bold rounded block mt-6 mx-auto p-2 py-2 mb-1">
                    {isLoggedin === 'register' ? 'Sign Up' : 'Sign In'}
                </button>

                <div className="text-center mt-4 text-gray-700">
                    {isLoggedin ==='register' && (
                        <div>
                        Already registered?
                        <button className="mx-1 text-violet-600" onClick={()=> setIsloggedin('login')}>
                        Sign In here!
                        </button>
                        </div>
                    )}

                    {isLoggedin ==='login' && (
                        <div>
                        Don't have an account?
                        <button className="mx-1 text-violet-600" onClick={()=> setIsloggedin('register')}>
                        Sign Up here!
                        </button>
                        </div>
                    )}
                </div>
                <ToastContainer position="bottom-right" autoClose = {2500}/>
            </form>
        </div>
    );
}