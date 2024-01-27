import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const TopNav = (props: any) => {
    const [menuItems, setMenuItems] = useState([])

    useEffect(()=> {
        axios.get(process.env.REACT_APP_API_URL + '/api/tutorials').then((res: any) => {
            setMenuItems(res.data)
        })
    
    }, [] )

    const onTutorial = (e: any) => {
        const url = e.target.href.split("/").pop()
        props.setSelectedTutorial(url)
    }

    return (
        <nav className="bg-blue-500 text-white shadow border-b mb-1 px-2">
            <div className="flex justify-between">
                
                <div className="flex justify-between">
                    {/* Logo & Name */}
                    <div className="px-2 py-1 cursor-pointer">
                        <Link to={'/'}>TechVelocity</Link>
                    </div>

                    {/* Menu */}
                    <div className="flex justify-start">
                        {
                            menuItems.length > 0 &&
                            menuItems.map((item) => <Link onClick={onTutorial} to={'/tutorials/' + item["breadcrumb"]} key={ item["breadcrumb"]} className="px-3 py-1 rounded cursor-pointer hover:bg-blue-700">  {item["name"]} </Link>)
                        }
                    </div>
                </div>

                <div className="">
                    User Menu
                </div>
            </div>
        </nav>
    )
}

export default TopNav