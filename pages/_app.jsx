import React, { useState } from "react";
import Layout from "../components/Layout";
import '../css/global.css'
import Head from "next/head";
import Link from "next/link";


export default function ({ Component, pageProps }) {

    let [delState, setDelState] = useState(false)

    function renderAD() {
        if (!delState) {
            return (
                <div className="bg-warning d-flex justify-content-between fs-5 align-items-center">
                    <p className="p-0 m-0">
                        2022/7/4 We released the
                        <strong>Testing</strong> functional app.
                        <Link href={'/test'}>
                            <a>Click here
                                <i className="bi bi-arrow-right"></i>
                            </a>
                        </Link>
                    </p>
                    <i
                        className="bi bi-x"
                        onClick={()=>{
                            setDelState(true)
                        }}
                    ></i>
                </div>

            )
        }
    }

    return (
        <Layout>
            <Head>
                <title>classroom | paula</title>
            </Head>
            {renderAD()}
            <Component {...pageProps} />
        </Layout>
    )
}