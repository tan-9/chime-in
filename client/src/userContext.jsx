import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});
export function UserContextProvider({children}){
    const [username, setUsername] = useState(null);
    const [id, setId] = useState(null);
    const [avatar, setAvatar] = useState(null);

    useEffect(()=>{
        axios.get('/profile').then(response=>{
            setId(response.data.userId);
            setUsername(response.data.username);
            setAvatar(response.data.avatar);
        });
    }, []);

    useEffect(() => {
        axios.get('/user').then(response => {
            setId(response.data.userId);
            setUsername(response.data.username);
            setAvatar(response.data?.avatar);
        });
    }, []);
    
    return(
        <UserContext.Provider value={{username, setUsername, id, setId, avatar, setAvatar}}>
            {children}
        </UserContext.Provider>
    );
}