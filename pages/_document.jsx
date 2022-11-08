import React from "react";
import { Html, Head, Main, NextScript } from 'next/document'

export default function () {

    return (
        <Html>
            <Head>
                <meta name="description" content="This is the classroom editor welcome to join us." />
                <meta name="keywords" content="Classroom, Editor, Remind, Notice, 聯絡簿, 記事, 部落格, Blog" />
                <meta name="author" content="Paula" />
                <link rel="icon" href="/img/favicon.png" />
                <link href="/css/bootstrap.min.css" rel="stylesheet" />
                <link href="/css/global.css" rel="stylesheet" />
                <script src="/js/popper.min.js"></script>
                <script src="/js/bootstrap.bundle.min.js"></script>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5554170373239490"
                    crossorigin="anonymous"></script>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-1QWR4ZQET5"></script>
                <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-1QWR4ZQET5');
                </script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

