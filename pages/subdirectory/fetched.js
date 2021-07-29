import Layout from '../../components/layout'
import { getFetchedData } from '../../lib/getFetchedData'
import { css } from '@emotion/css'

export default function Home({ fetchedData }) {
    return (
        <Layout home>
            <section>
                <h2>API Sample</h2>
                <div>
                    {fetchedData.data.map(x =>
                        <div className={css`
                            display: flex;
                            flex-direction: column;
                            >img {
                                width: 150px;
                                height: 150px;
                            }
                        `}>
                            <img src={x.avatar} />
                            <span>{x.first_name} {x.last_name}</span>
                            <span>Email {x.email}</span>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    )
}

export async function getStaticProps() {
    const fetchedData = await getFetchedData()
    return {
        props: {
            fetchedData
        }
    }
}