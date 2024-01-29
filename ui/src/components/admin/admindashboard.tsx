import { Outlet } from "react-router-dom"
import AdminSideBar from "./adminsidebar"

const AdminDashboard = () => {
    return (
        <div className="flex justify-between w-full">
            <div className="w-100">
                <AdminSideBar />
            </div>
            <div className="w-11/12 p-2">
                <Outlet />
            </div>
        </div>
    )
}

export default AdminDashboard