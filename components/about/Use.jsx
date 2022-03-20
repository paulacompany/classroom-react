import React from "react"
import Image from "next/image"

export default function Author() {

    return (
        <div>
            <h1 className="display-2 m-5">Use</h1>
            <div className="row mx-auto">
                <p className="col h5">
                    <mark>Grapphy 1</mark> is the home page of this website,
                    if you click the button, "join us", you can go to edit the page.
                    <mark>Grapphy 2</mark> is the edit page, you can edit somthing on that page,
                    the preview box will show the data that you saved, 
                    {'{日期}{動作}{科目}{書}{頁數}'}<code>(</code>{'{補充}'}<code>)</code>
                </p>
                <Image
                    src={'https://i.imgur.com/7W8je8B_d.webp?maxwidth=760&fidelity=grand'}
                    height={400}
                    width={760}
                    alt="Picture of the author"
                    className="col"
                />
            </div>

        </div>
    )
}