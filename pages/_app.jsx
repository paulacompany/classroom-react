import React from "react";
import Layout from "../components/Layout";
import '../css/global.css'
import Head from "next/head";


export default function ({ Component, pageProps }) {
    return (
        <Layout>
            <Head>
                <title>classroom | paula</title>
            </Head>
            <Component {...pageProps} />
        </Layout>
    )
}