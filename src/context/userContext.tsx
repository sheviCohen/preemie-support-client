import { createContext, type ReactNode } from "react";
import type { Self } from "../types";
import { useMe } from "../api/auth";


export  const UserContext=createContext<Self|null>(null);
export default function UserProvider({children}:{children:ReactNode})
{
const me=useMe();
if(me.isPending)
    return <p>טוען...</p>
if(me.error)
    return <p>{me.error.message}</p>

return(
    <UserContext.Provider value={me.data}>
        {children}
    </UserContext.Provider>
)


}
