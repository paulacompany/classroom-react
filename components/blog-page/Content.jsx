import React from "react"
import Link from "next/link"
import { compile } from "html-to-text"
export default function Content({ json }) {

    let defaultImage = '/img/gray.png'
    let convert = compile({
        ignoreHref: true,
        wordwrap: 500
    })
    return (
        <div className="container d-flex flex-row flex-wrap">
            {
                json.map(item => {
                    let itemId, itemTitle, itemImg, itemBody;

                    itemImg = item.img
                    itemTitle = item.title
                    itemId = item.id
                    itemBody = item.body
                    itemImg = itemImg ? itemImg : defaultImage

                    if (!itemTitle) return
                    return (
                        <Link href={`./blog/${itemId}`}>
                            <div className="blog-logo m-5 d-flex flex-column justify-content-between">
                                <div className="img-container">
                                    <img src={itemImg} className="text-center" />
                                </div>
                                <p className="fs-2 fw-bold m-2 p-0">{itemTitle}</p>
                                <div className="blog-body-preview w-100">
                                    {convert(itemBody)}
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}