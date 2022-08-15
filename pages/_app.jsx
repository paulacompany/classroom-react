import React from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../common/redux/store.js"


export default function ({ Component, pageProps }) {

    return (
        <Layout>
            <Head>
                <title>classroom | paula</title>
            </Head>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </Layout>
    )
}
