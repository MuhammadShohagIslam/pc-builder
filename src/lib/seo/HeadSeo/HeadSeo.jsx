import Head from "next/head";
import React from "react";

const HeadSeo = ({ title, content }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={content} />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
};

export default HeadSeo;
