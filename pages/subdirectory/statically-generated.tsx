import { GetStaticProps } from "next";
import Head from "next/head";

export default function StaticallyGenerated({ data, date }) {
    return (
        <div>
            <Head>
                <title>Statically Generated Props</title>
            </Head>
            <main>
                <ul>
                    <li>Data payload: {data}</li>
                    <li>Generation Date: {date}</li>
                </ul>
            </main>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async context => {
    // Get external data from the file system, API, DB, etc.
    const data = Math.PI;

    // The value of the `props` key will be
    //  passed to the `Home` component
    return {
        props: {
            data,
            date: new Date().toDateString() + ' ' + new Date().toTimeString()
        }
    }
}