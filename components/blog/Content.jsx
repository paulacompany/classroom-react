import React from "react"
import Link from "next/link"
export default function Content({ json }) {

    let defaultImage = 'https://htmlcolorcodes.com/assets/images/colors/light-gray-color-solid-background-1920x1080.png'

    return (
        <div className="container d-flex flex-row flex-wrap">
            {
                json.map(item => {
                    item.img = item.img ? item.img : defaultImage

                    if (!item.title) {
                        return
                    }

                    return (
                        <Link href={`./blog/article?id=${item.id}`}>
                            <div className="blog-logo rounded text-white p-1 m-5 d-flex flex-column align-items-center">
                                <div className="img-container">
                                    <img src={item.img} className="w-100 rounded" />
                                </div>
                                <p className="fs-2 fw-bold text-center m-2 p-0 border-top border-light">{item.title}</p>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}