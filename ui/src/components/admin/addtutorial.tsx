const AddTutorial = () => {
    return (
        <div className="flex flex-col justify-center items-center border rounded mx-auto my-16 w-2/6 p-4 bg-white">
            <h1 className="text-xl font-semibold border-b w-full text-center py-2"> Add Tutorial</h1>
            <div className="flex flex-col mt-10">
                <div className="my-3">
                    <div className="inline-block w-32">Tutorial Name </div>
                    <input className="border p-1 rounded ml-3 w-38"></input>
                </div>
                <div className="my-3">
                     <div className="inline-block w-32">Breadcrumb</div>
                    <input className="border p-1 rounded ml-3"></input>
                </div>
                <div className="my-5">
                    <div className="">Tutorial Description</div> <br></br>
                    <textarea className="border rounded" cols={44} rows={10}></textarea>
                </div>
                <div className="flex justify-end">
                    <button className="px-4 py-1 bg-blue-700 hover:bg-blue-900 text-white rounded">Add</button>
                    <button className="px-4 py-1 bg-blue-700 hover:bg-blue-900 text-white rounded ml-2">Cancel</button>
                </div>
            </div>
        </div>
    )
}
export default AddTutorial