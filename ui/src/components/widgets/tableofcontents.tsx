import { Link } from "react-router-dom"

const TableOfContents = (props : any) => {
    const title = props.title

    return (
        <aside className="bg-white border h-full w-full">
            <div className="text-xl font-semibold flex justify-center py-1">{title}</div>
            <hr />
            <div className="h-[calc(95%)] w-full overflow-y-scroll">
                {props.children}
            </div>

        </aside>
    )
}

const ContentItem = (props: any) => {
    const href = props.href

    return(
        <>
        <div className="px-2 my-3 w-full">
            <Link onClick={props.onClick} className="px-4 py-0 w-full rounded hover:underline" to={href}>{props.children}</Link>
        </div>
        <hr />
        </>
    )
}

export {TableOfContents, ContentItem}