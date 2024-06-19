export default function Contact({id, username, onClick, selected}){
    return(
        <div 
        key={id} onClick={()=>onClick(id)} 
            className={"border-b border-white-400 py-3 px-3 cursor-pointer " + (selected ? "bg-blue-200" : "")}>
            {selected && (
                <div className="w-1 bg-blue-500"></div>
            )}
            <span className="text-gray-800">{username}</span>
        </div>

    );
}