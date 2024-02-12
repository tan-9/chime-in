import RegisterAndLoginForm from "./RegisterAndLoginForm";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./userContext";
import Chat from "./ChatWindow";
import Avatar from "./Avatar";

export default function Routes() {
    const { username, id, avatar, setAvatar } = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const storedAvatar = localStorage.getItem('avatar');
        if(storedAvatar){
            setAvatar(storedAvatar);
            if(username) setLoading(false);
            else setTimeout(()=>setLoading(false), 1000); //Give the user time to load their profile before showing
        }
        else setLoading(false);
    }, [username, setAvatar]);

    console.log("details", avatar, username)

    if(loading){
        return <div>Loading...</div>
    }

    if(username && !avatar){
        console.log("details!", avatar, username);
        return <Avatar/>
    }

    if (username) {
        console.log("user detected", username);
        return <Chat/>
    }

    return (
        <RegisterAndLoginForm />
    );
}