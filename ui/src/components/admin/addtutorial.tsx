import axios from "axios"
import { useState } from "react"

const AddTutorial = () => {
    const [tutorial, setTutorial] = useState("")
    const [breadcrumb, setBreadcumb] = useState("")
    const [description, setDescription] = useState("")
    const [addStatus, setAddStatus] = useState("")

    const onAdd = (e: any) => {
        //console.log(tutorial, breadcrumb, description)
        const url = process.env.REACT_APP_API_URL + "/tutorials/add"
        //console.log(url)
        const params = {
            name: tutorial,
            breadcrumb: breadcrumb,
            desciption: description
        }
        axios.post( process.env.REACT_APP_API_URL + "/api/tutorials/add", {params}).then (  res => {

            if(res.data.error) {
                setAddStatus("failed")
            }
            else {
                setAddStatus("success")
            }            
            console.log(res.data)
        } ).catch( e => {
            console.log(e)
            
        })
    }

    return (
        <div className="flex flex-col justify-center items-center border rounded mx-auto my-16 w-2/6 p-4 bg-white">
            <h1 className="text-xl font-semibold border-b w-full text-center py-2"> Add Tutorial</h1>
            <div className="flex flex-col mt-8">
                <div className="my-1">
                    <div className="inline-block w-32">Tutorial Name </div>
                    <input value={tutorial} onChange={ e => setTutorial(e.target.value)} className="border p-1 rounded ml-3 w-72"></input>
                </div>
                <div className="my-1">
                     <div className="inline-block w-32">Breadcrumb</div>
                    <input value={breadcrumb} onChange={ e => setBreadcumb(e.target.value)} className="border p-1 rounded ml-3 w-72"></input>
                </div>
                <div className="mt-5">
                    <div className="mb-4">Tutorial Description</div>
                    <textarea value={description} onChange={ e => setDescription(e.target.value)} className="border rounded" cols={56} rows={8}></textarea>
                </div>
                <div className="flex justify-end">
                    <button onClick={onAdd} className="px-4 py-1 bg-blue-700 hover:bg-blue-900 text-white rounded">Add</button>
                    <button className="px-4 py-1 bg-blue-700 hover:bg-blue-900 text-white rounded ml-2">Cancel</button>
                </div>
                <div>
                    { addStatus == "success" && <p className="bg-green-500 text-white mt-5 p-2 rounded text-center"> Tutorial Added Successfully </p> }
                </div>
                <div>
                { addStatus == "failed" && <p className="bg-red-500 text-white mt-5 p-2 rounded text-center"> Failed to Add Tutorial </p> }
                </div>
            </div>
        </div>
    )
}
export default AddTutorial