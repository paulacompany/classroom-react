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
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"></link>
                <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

