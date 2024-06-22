import RegisterAndLoginForm from "./RegisterAndLoginForm";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./userContext";
import Chat from "./ChatWindow";
import Avatar from "./Avatar";
import Loading from "./Loading";
import axios from "axios";

export default function Routes() {
    const { username, id, avatar, setAvatar } = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchAvatarstatus = async () => {
            try{
                const res = await axios.get('/profile');
                const storedAvatar = res.data.avatar;

                console.log("this is the stored avatar id:", storedAvatar);

                if(storedAvatar){
                    setAvatar(storedAvatar);
                }
            } catch(error){
                console.error("Error fetching avatar status:", error);
            } finally{
                setLoading(false);
            }
        };
        fetchAvatarstatus();
        // const storedAvatar = localStorage.getItem('avatar');
        // if(storedAvatar){
        //     console.log("avatar of user:",storedAvatar);
        //     setTimeout(()=>setLoading(false), 1000);
        //     setAvatar(storedAvatar);
        // }
        // else{
        //     setLoading(false);
        //     return <Avatar/>
        // };
    }, [setAvatar]);

    console.log("details", avatar, username);

    if(loading){
        return <Loading/>
    }

    if(avatar==null){
        console.log("details!", avatar, username);
        return <Avatar/>
    }

    if (username && avatar) {
        console.log("user detected", username);
        return <Chat/>
    }

    return (
        <RegisterAndLoginForm />
    );
}