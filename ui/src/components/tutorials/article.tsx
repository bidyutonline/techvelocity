import axios from "axios"
import { ContentItem, TableOfContents } from "../widgets/tableofcontents"
import { useEffect, useState } from "react"
import parse from 'html-react-parser'

const Article = (props: any) => {
    const [articles, setArticles] = useState([])
    const [currentArticle, setCurrentArticle] = useState()

    const urlPieces = window.location.href.split("/")
    const selectedTutorial = props.selectedTutorial ? props.selectedTutorial : urlPieces[urlPieces.length -2]
    const selectedTopic = props.selectedTopic ? props.selectedTopic : urlPieces[urlPieces.length -1]
    
    useEffect( ()=> {
        const url = process.env.REACT_APP_API_URL + "/api/tutorials/" + selectedTutorial + "/topics/" + selectedTopic + "/articles"
        axios.get(url).then(res => {
            setArticles(res.data)
        })
    }, [])

    const onContentItem = (e:any) => {
        const articleBreadcrumb = e.target.href.split("/").pop()
        const url = process.env.REACT_APP_API_URL + "/api/tutorials/" + selectedTutorial + "/topics/" + selectedTopic + "/articles/" + articleBreadcrumb
        axios.get(url).then((res:any) => {           
            setCurrentArticle(res.data[0])
            console.log(res.data[0].content)
        })        
    }
    
    return(
        <div className="flex justify-between bg-slate-100 px-2 h-[calc(92%)] w-full">
            <div className="w-1/6 mr-2">
                <TableOfContents title="Test">
                    {
                        articles.length > 0 && articles.map( item => <ContentItem onClick={onContentItem} key={item["breadcrumb"]}
                            href={"/tutorials/" + selectedTutorial + "/" + selectedTopic + "/" + item["breadcrumb"]}>{item["title"]}</ContentItem>)
                    }
                </TableOfContents>
            </div>
            <div className="w-5/6 bg-white p-4 h-full">
                <div className="flex justify-center h-10">
                    <h1 className="text-xl font-semibold">{currentArticle && currentArticle["title"] }</h1>
                </div>
                <div className="overflow-y-scroll h-[calc(97%)]">
                    {currentArticle && parse(currentArticle["content"]) }
                </div>
            </div>
            
        </div>
    )
}
export default Article