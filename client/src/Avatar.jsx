import { useContext, useEffect, useState } from "react";
import { UserContext } from "./userContext";
import axios from "axios";

export default function AvatarSelection() {
    const { setAvatar, avatar } = useContext(UserContext);
    const [avatars, setAvatars] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    useEffect(() => {
        const newAvatars = Array.from({length: 4}, () => Math.floor(Math.random() * 10000000).toString());
        setAvatars(newAvatars);
    }, []);

    const handleAvatarClick = (avatar) => {
        setSelectedAvatar(avatar);
        
    };

    const handleConfirmAvatar = () => {
        setAvatar(selectedAvatar);
        localStorage.setItem('avatar', selectedAvatar);
        axios.put('/profile', { avatar: selectedAvatar })
        .then(response => {
            console.log('Avatar updated successfully');
        })
        .catch(error => {
            console.error('Error updating avatar:', error);
        });
    };

    return (
        <div className="flex flex-col items-center h-screen py-10 pb-10 bg-slate-300">
            <div className="title-container flex justify-center mt-20 text-3xl">Select your avatar!</div>
            <div className="flex gap-6 items-center h-screen flex-wrap">
            {avatars.map(avatar => (
                <img 
                    key={avatar}
                    src={`https://api.multiavatar.com/${avatar}.svg`}
                    alt="Avatar"
                    onClick={() => handleAvatarClick(avatar)}
                    className= {`cursor-pointer w-24 h-24 transition duration-500 ease-in-out ${avatar === selectedAvatar ? 'border-2 border-slate-500' : ''}`}
                />
            ))}
            </div>
        <div>
            {selectedAvatar && <button onClick={handleConfirmAvatar} 
                className="bg-slate-500 hover:bg-slate-600 text-white font-bold rounded block p-3 py-3 mb-10 ">
                    Set as Avatar
                </button>}
        </div>
        </div>


    );
}
