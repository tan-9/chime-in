import RegisterAndLoginForm from "./RegisterAndLoginForm";
import { useContext } from "react";
import { UserContext } from "./userContext";
import Chat from "./ChatWindow";
import Avatar from "./Avatar";

export default function Routes() {
    const { username, id, avatar } = useContext(UserContext);

    if (username) {
        return <Chat/>;
    }

    // if(username && !avatar){
    //     return <Avatar/>
    // }

    return (
        <RegisterAndLoginForm />
    );
}