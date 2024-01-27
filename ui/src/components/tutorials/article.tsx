import axios from "axios"
import { ContentItem, TableOfContents } from "../widgets/tableofcontents"
import { useEffect, useState } from "react"


const Article = (props: any) => {
    const [articles, setArticles] = useState([])
    
    useEffect( ()=> {
        const url = process.env.REACT_APP_API_URL + "/api/tutorials/" + props.selectedTutorial + "/topics/" + props.selectedTopic + "/articles"
        console.log(url)
        axios.get(url).then(res => {
            setArticles(res.data)
            console.log(res.data)
        })
    }, [])

    const onContentItem = (e:any) => {
        console.log(e.target)
    }
    
    return(
        <div className="flex justify-between bg-slate-100 px-2 h-[calc(95%)] w-full">
            <div className="w-1/6 mr-2">
                <TableOfContents title="Test">
                    {
                        articles.length > 0 && articles.map( item => <ContentItem onClick={onContentItem} 
                            href={"/tutorials/" + props.selectedTutorial + "/" + props.selectedTopic + "/" + item["breadcrumb"]}>{item["title"]}</ContentItem>)
                    }
                </TableOfContents>
            </div>
            <div className="w-5/6 bg-white p-2">
                Article
            </div>
            
        </div>
    )
}
export default Article