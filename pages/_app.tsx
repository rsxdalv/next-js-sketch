import { useEffect, useState } from "react";
import Head from 'next/head'
import '../styles/global.css'
import { AppProps } from "next/dist/next-server/lib/router/router";

export default function App({ Component, pageProps }: AppProps) {
    const [navigations, setNavigations] = useState(0);
    useEffect(() => {
        setNavigations(x => x + 1);
    }, [Component]);
    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} navigations={navigations} />
        </div>
    )
}