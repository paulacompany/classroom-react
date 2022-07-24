import React, { useState } from "react";
import Layout from "../components/Layout";
import '../css/global.css'
import Head from "next/head";
import Link from "next/link";


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
