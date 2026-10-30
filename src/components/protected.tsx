
import { Navigate,Outlet } from "react-router"
import { tokenStorage } from "../api/token"
const Protected = () => {

    if (!tokenStorage.get())
        return <Navigate to="/enterance" replace/>
    return <Outlet/>
}

export default Protected