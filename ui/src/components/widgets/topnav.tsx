import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const TopNav = (props: any) => {
    const [menuItems, setMenuItems] = useState([])
    const [tutorialOpen, setTutorialOpen] = useState(false)

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/api/tutorials').then((res: any) => {
            setMenuItems(res.data)
        })

    }, [])

    const onTutorial = (e: any) => {
        const url = e.target.href.split("/").pop()
        props.setSelectedTutorial(url)
    }

    return (
        <nav className="bg-white shadow border-b mb-1 px-2 py-2">
            <div className="flex justify-between">

                <div className="flex justify-between w-2/12">
                    {/* Logo & Name */}
                    <div className="px-2 py-1 cursor-pointer">
                        <Link to={'/'}>
                            <span className="text-blue-800 font-bold text-3xl font-serif">Tech</span>
                            <span className="text-2xl">Velocity</span>
                        </Link>
                    </div>

                    {/* Menu */}
                    <div className="relative flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="inline-block bi bi-ui-checks-grid" viewBox="0 0 16 16">
                            <path d="M2 10h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1m9-9h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1m0 9a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zm0-10a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM2 9a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2zm7 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2zM0 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.354.854a.5.5 0 1 0-.708-.708L3 3.793l-.646-.647a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0z" />
                        </svg>
                        <div className="cursor-pointer" onClick={e => setTutorialOpen(!tutorialOpen)}> &nbsp; Tutorials &nbsp;
                            { !tutorialOpen &&
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down inline" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                            </svg>
                            }
                            {
                                tutorialOpen &&
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-up inline" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
                                </svg>
                            } 
                            <div className={`${tutorialOpen ? "absolute bg-white shdow rounded border shadow w-36 p-2" : "hidden"} `}>
                                {
                                    menuItems.length > 0 &&
                                    menuItems.map((item) => <Link onClick={onTutorial} to={'/tutorials/' + item["breadcrumb"]} key={item["breadcrumb"]} className="inline-block px-2 w-full py-1 cursor-pointer hover:bg-gray-200">  {item["name"]} </Link>)
                                }
                            </div>
                        </div>
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