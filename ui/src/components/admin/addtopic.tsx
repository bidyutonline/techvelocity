import axios from "axios"
import { useEffect, useState } from "react"

const AddTopic = () => {

    const [tutorials, setTutorials] = useState([])

    useEffect(()=> {
        axios.get(process.env.REACT_APP_API_URL + '/api/tutorials').then((res: any) => {
            setTutorials(res.data)
        })
    
    }, [] )    
    
    return (
        <div className="flex flex-col justify-center items-center border rounded mx-auto my-16 w-2/6 p-4 bg-white">
            <h1 className="text-xl font-semibold border-b w-full text-center py-2"> Add Topic</h1>
            <div className="flex flex-col mt-8">
                <div className="my-1">
                    <div className="inline-block w-32">Topic Name </div>
                    <input className="border p-1 rounded ml-3 w-72"></input>
                </div>
                <div className="my-1">
                     <div className="inline-block w-32">Breadcrumb</div>
                    <input className="border p-1 rounded ml-3 w-72"></input>
                </div>
                <div className="my-1">
                     <div className="inline-block w-32">Tutorial</div>
                    <select className="border p-1 rounded ml-3 w-72">
                        <option value="none">Select Tutorial</option>
                        {
                            tutorials.length > 0 && tutorials.map( item => <option value={item["breadcrumb"]}> {item["name"]} </option>)
                        }
                    </select>
                </div>                
                <div className="mt-5">
                    <div className="mb-4">Topic Description</div>
                    <textarea className="border rounded" cols={56} rows={8}></textarea>
                </div>
                <div className="flex justify-end">
                    <button className="px-4 py-1 bg-blue-700 hover:bg-blue-900 text-white rounded">Add</button>
                    <button className="px-4 py-1 bg-blue-700 hover:bg-blue-900 text-white rounded ml-2">Cancel</button>
                </div>
            </div>
        </div>
    )
}
export default AddTopic