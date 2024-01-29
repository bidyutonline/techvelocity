import { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import axios from 'axios';

const AddArticle = () => {
    const editorRef = useRef<TinyMCEEditor | null>(null)

    const [tutorials, setTutorials] = useState([])
    const [selectedTutorial, setSelectedTutorial] = useState()
    const [topics, setTopics] = useState([])
    const [selectedTopic, setSelectedTopic] = useState()

    const onSave = (e: any) => {

    }

    const onCancel = (e: any) => {

    }

    const onChangeTutorial = (e: any) => {
        const breadcrumb = e.target.value
        setSelectedTutorial(breadcrumb)

        axios.get(process.env.REACT_APP_API_URL + '/api/tutorials/' + breadcrumb + "/topics").then((res: any) => {
            setTopics(res.data)
        })        
    }

    const onChangeTopic = (e: any) => {
        const breadcrumb = e.target.value
        setSelectedTopic(breadcrumb)          
    }

    useEffect(()=> {
        axios.get(process.env.REACT_APP_API_URL + '/api/tutorials').then((res: any) => {
            setTutorials(res.data)
        })
    
    }, [] )     

    return (
        <div className="w-full h-full flex">
            <div className="w-10/12 bg-white mr-1 p-2">
                <div className="text-center mt-4 text-xl font-semibold">Add Article</div>
                <div className="flex justify-center mt-5">
                    <h1 className="inline-block font-semibold pr-5">Title</h1>
                    <input type="text" className="border w-11/12 rounded"></input>
                </div>
                <div className='w-full mt-10 flex justify-center'>
                    <Editor
                        //apiKey='your-api-key'
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue="<p>This is the initial content of the editor.</p>"
                        init={{
                            height: 700,
                            width: '95%',
                            menubar: false,

                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'image'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help | image',
                            image_title: true,
                            automatic_uploads: true,
                            file_picker_types: 'image',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',

                            file_picker_callback: (cb, value, meta) => {
                                // Provide file and text for the link dialog

                                const input = document.createElement('input');
                                input.setAttribute('type', 'file');
                                input.setAttribute('accept', 'image/*');

                                input.onchange = function () {
                                    var obj = this as HTMLInputElement
                                    var file = obj.files![0];
                              
                                    var reader = new FileReader();
                                    reader.onload = function () {
                                      /*
                                        Note: Now we need to register the blob in TinyMCEs image blob
                                        registry. In the next release this part hopefully won't be
                                        necessary, as we are looking to handle it internally.
                                      */
                                      var id = 'blobid' + (new Date()).getTime();
                                      var blobCache =  editorRef.current!.editorUpload.blobCache;
                                      var result = reader.result as string
                                      var base64 = result.split(',')[1]
                                      var blobInfo = blobCache.create(id, file, base64);
                                      blobCache.add(blobInfo);
                              
                                      /* call the callback and populate the Title field with the file name */
                                      cb(blobInfo.blobUri(), { title: file.name });
                                    };
                                    reader.readAsDataURL(file);
                                  };
                                input.click();
                              }

                        }}
                    />

                </div>
            </div>
            <div className="w-2/12 px-4">
                
                <div className='bg-white p-2'> 
                    <h1 className='text-center text-xl font-semibold mb-2'> Article Settings </h1>                    
                </div>
                
                <div className='my-3 bg-white p-4'>
                    <h2> Tutorial</h2>
                    <select onChange={onChangeTutorial} className='border w-56 mt-1 rounded'>
                        <option>Select Tutorial</option>
                        {
                            tutorials.length > 0 && tutorials.map( item => <option value={item["breadcrumb"]} key={item["breadcrumb"]}> {item["name"]} </option>)
                        }                        
                    </select>
                </div>
                

                <div className='my-3 bg-white p-4'>                    
                    <h2> Topic</h2>
                    <select onChange={onChangeTopic}  className='border rounded mt-1 w-56'>
                        <option>Select Topic</option>
                        {
                            topics.length > 0 && topics.map( item => <option value={item["breadcrumb"]} key={item["breadcrumb"]}> {item["name"]} </option>)
                        }                               
                    </select>
                </div>
                <hr />

                <div className=' bg-white my-3 p-4'>
                    <h2>Keywords</h2>
                    <input type="text" className='border rounded w-56 mt-1'/>
                </div>

                <div className='bg-white p-4 flex justify-end'>
                    <button onClick={onSave} className='px-5 py-1 bg-blue-700 hover:bg-blue-800 rounded text-white'> Save</button>
                    <button onClick={onCancel} className='ml-2 px-5 py-1 bg-blue-700 hover:bg-blue-800 rounded text-white'> Cancel</button>
                </div>

            </div>
        </div>
    )
}

export default AddArticle