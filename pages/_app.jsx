import React from "react";
import Layout from "../components/Layout";
import '../css/global.css'


export default function({ Component, pageProps }){
    return(
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}