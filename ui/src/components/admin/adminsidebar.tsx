import { Link } from "react-router-dom"

const AdminSideBar = () => {
    return (
        <div className="bg-white h-screen mr-2 p-2 w-[calc(99%)]">
            <h2 className="flex justify-center text-xl font-semibold py-2">Command Pallete</h2>
            <hr />
            <div className="flex flex-col py-2 justify-center items-center w-full">
                <h2 className="font-medium">Article</h2>
                <Link to={"/cpanel/add-article"} className="py-2 px-2 my-2 border hover:border-blue-500 rounded-lg w-36"> + Add Article </Link>
                <Link to={"/cpanel/edit-article"} className="py-2 px-2 my-2 border hover:border-blue-500 rounded-lg w-36"> / Edit Article </Link>
                <Link to={"/cpanel/delete-article"} className="py-2 px-2 my-2 border hover:border-blue-500 rounded-lg w-36"> - Delete Article </Link>
            </div>
            <hr />


            <div className="flex flex-col py-2 justify-center items-center w-full">
                <h2 className="font-medium">Topic</h2>
                <Link to={"/cpanel/add-topic"} className="py-2 px-2 my-2 border hover:border-blue-500 rounded-lg w-36"> + Add Topic </Link>
                <Link to={"/cpanel/edit-topic"} className="py-2 px-2 my-2 border hover:border-blue-500 rounded-lg w-36"> / Edit Topic </Link>
                <Link to={"/cpanel/delete-topic"} className="py-2 px-2 my-2 border hover:border-blue-500 rounded-lg w-36"> - Delete Topic </Link>
            </div>
            <hr /> 

            <div className="flex flex-col py-2 justify-center items-center w-full">
                <h2 className="font-medium">Tutorial</h2>
                <Link to={"/cpanel/add-tutorial"} className="py-2 px-2 my-2 border hover:border-blue-500 rounded-lg w-36"> + Add Tutorial </Link>
                <Link to={"/cpanel/edit-tutorial"} className="py-2 px-2 my-2 border hover:border-blue-500 rounded-lg w-36"> / Edit Tutorial </Link>
                <Link to={"/cpanel/delete-tutorial"} className="py-2 px-2 my-2 border hover:border-blue-500 rounded-lg w-36"> - Delete Tutorial </Link>
            </div>
            <hr />                       
        </div>
    )
}

export default AdminSideBar