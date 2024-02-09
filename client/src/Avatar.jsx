import { useContext, useEffect, useState } from "react";
import { UserContext } from "./userContext";
import axios from "axios";

export default function AvatarSelection() {
    const { setAvatar, avatar } = useContext(UserContext);
    const [avatars, setAvatars] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    // Generate 4 random avatars when the component mounts
    useEffect(() => {
        const newAvatars = Array.from({length: 4}, () => Math.floor(Math.random() * 10000000).toString());
        setAvatars(newAvatars);
    }, []);

    const handleAvatarClick = (avatar) => {
        setSelectedAvatar(avatar);
        
    };

    const handleConfirmAvatar = () => {
        setAvatar(selectedAvatar);
        axios.put('/profile', { avatar: selectedAvatar })
        .then(response => {
            console.log('Avatar updated successfully');
        })
        .catch(error => {
            console.error('Error updating avatar:', error);
        });
    };

    return (
        <div className="flex justify-around items-center flex-row h-screen w-screen">
            {avatars.map(avatar => (
                <img 
                    key={avatar}
                    src={`https://api.multiavatar.com/${avatar}.svg`}
                    alt="Avatar"
                    onClick={() => handleAvatarClick(avatar)}
                    className= {`cursor-pointer w-24 h-24 ${avatar === selectedAvatar ? 'border-2 border-blue-500' : ''}`}
                />
            ))}
            {selectedAvatar && <button onClick={handleConfirmAvatar}>Set as Avatar</button>}
        </div>
    );
}
