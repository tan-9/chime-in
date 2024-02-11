import RegisterAndLoginForm from "./RegisterAndLoginForm";
import { useContext } from "react";
import { UserContext } from "./userContext";
import Chat from "./ChatWindow";
import Avatar from "./Avatar";

export default function Routes() {
    const { username, id, avatar } = useContext(UserContext);

    console.log("details", avatar, username)

    if(username && !avatar){
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