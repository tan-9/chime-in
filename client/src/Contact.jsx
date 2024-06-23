export default function Contact({id, avatar, username, onClick, selected}){
    return(
        <div 
        key={id} onClick={()=>onClick(id)} 
            className={"border-b border-white-400 py-3 px-3 cursor-pointer " + (selected ? "bg-blue-200" : "")}>
            {selected && (
                <div className="w-1 bg-blue-500"></div>
            )}
            <div className="flex flex-row items-center justify-start">
                <img 
                    key={avatar}
                    src={`https://api.multiavatar.com/${avatar}.svg`}
                    alt="Avatar"
                    className="w-8 h-8 mx-2"
                />
                <div className="text-lg pt-1">{username}</div>
            </div>
        </div>

    );
}