import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const Topics = (props : any) => {
    const [topics, setTopics] = useState([])
    const params = useParams()
    const breadcrumb = params.tutorialBreadcrumb!
    console.log(breadcrumb)
    
    const onStart = (e: any) => {
        props.setSelectedTopic(e.target.href.split("/").pop())
    }

    useEffect( () => {
        axios.get(process.env.REACT_APP_API_URL + '/api/tutorials/' + breadcrumb + '/topics').then( (res) => {
            setTopics(res.data)
        })
    }, [props.selectedTutorial])

    return (
        <div className="flex">
            {/* Cards */}
            { topics.length > 0 && topics.map( (item) => 
                <div key={item["breadcrumb"]} className="bg-white m-3 border p-4 w-1/6 shadow rounded text-center"> 
                    <h2 className="p-2 text-xl font-semibold">{item["name"]}</h2>
                    <hr />
                    <div className="p-2">
                        <p>{item["description"]} 
                        {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, */}
                        </p>
                    </div>
                    <Link onClick={onStart} to={'/tutorials/' + breadcrumb + '/' +item["breadcrumb"] } className="bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-1">Start</Link>
                </div>
            )
            }

        </div>
    )
}

export default Topics