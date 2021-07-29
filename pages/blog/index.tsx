import { getSortedPostsData } from '../../lib/posts'
import Layout from '../../components/layout'
import Link from "next/link";
import { GetStaticProps } from 'next';

export default function Home({ allPostsData }) {
    return (
        <Layout>
            <section>
                <h2>Blog</h2>
                <ul>
                    {allPostsData && allPostsData.map(({ id, date, title }) => (
                        <li key={id}>
                            <Link href={`/blog/${id}`}>
                                {title}
                            </Link>
                            <br />
                            {id}
                            <br />
                            {date}
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async => {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}