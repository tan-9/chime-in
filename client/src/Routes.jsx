import RegisterAndLoginForm from "./RegisterAndLoginForm";
import { useContext } from "react";
import { UserContext } from "./userContext";
import Chat from "./ChatWindow";

export default function Routes() {
    const { username, id } = useContext(UserContext);

    if (username) {
        // return <Chat />;
        return "logged in! " + username;
    }



    return (
        <RegisterAndLoginForm />
    );
}