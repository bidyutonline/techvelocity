import axios from "axios"
import { ContentItem, TableOfContents } from "../widgets/tableofcontents"
import { useEffect, useState } from "react"


const Article = (props: any) => {
    const [articles, setArticles] = useState([])
    const [currentArticle, setCurrentArticle] = useState()
    
    useEffect( ()=> {
        const url = process.env.REACT_APP_API_URL + "/api/tutorials/" + props.selectedTutorial + "/topics/" + props.selectedTopic + "/articles"

        axios.get(url).then(res => {
            setArticles(res.data)
        })
    }, [])

    const onContentItem = (e:any) => {
        const articleBreadcrumb = e.target.href.split("/").pop()
        const url = process.env.REACT_APP_API_URL + "/api/tutorials/" + props.selectedTutorial + "/topics/" + props.selectedTopic + "/articles/" + articleBreadcrumb
        axios.get(url).then(res => {            
            setCurrentArticle(res.data)
        })        
    }
    
    return(
        <div className="flex justify-between bg-slate-100 px-2 h-[calc(93%)] w-full">
            <div className="w-1/6 mr-2">
                <TableOfContents title="Test">
                    {
                        articles.length > 0 && articles.map( item => <ContentItem onClick={onContentItem} key={item["breadcrumb"]}
                            href={"/tutorials/" + props.selectedTutorial + "/" + props.selectedTopic + "/" + item["breadcrumb"]}>{item["title"]}</ContentItem>)
                    }
                </TableOfContents>
            </div>
            <div className="w-5/6 bg-white p-4 h-full">
                <div className="flex justify-center h-10">
                    <h1 className="text-xl font-semibold">{currentArticle != undefined && currentArticle["title"] }</h1>
                </div>
                <div className="overflow-y-scroll h-[calc(97%)]">
                    {currentArticle != undefined && currentArticle["body"]}
                </div>
            </div>
            
        </div>
    )
}
export default Article