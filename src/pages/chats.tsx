import { useState } from "react"
import UserList from "../components/userList";
import Conversation from "../components/conversation";


export default function Chats()
{
    const [selected,setSelected]=useState<"general"|number>("general");
    return(
    
    <div className="glass-card flex h-[calc(100vh-9rem)] overflow-hidden">
    <UserList selected={selected} onSelect={setSelected} />
    <Conversation selected={selected} onSelect={setSelected}/>

</div>

    )
    
}