import Head from "next/head";
import { css } from "@emotion/css";

export default function EmotionPage() {
    return (
        <div>
            <Head>
                <title>Styling using Emotion.sh</title>
            </Head>
            <main>
                <div className={css`
                    p {
                        :hover {
                            color: lime;
                        }
                    }
                `}>
                    <p>
                        This text glows green on hover.
                    </p>
                </div>
            </main>
            <footer>

            </footer>
        </div>
    )
}