import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import axios from 'axios';

export interface Film {
    title: string;
    director: string;
    release_date: string;
}

export interface FilmsResponse {
    results: Film[];
}

export default function Home({
    data,
    notFound,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    if (notFound) {
        return <div>Something went wrong, please try again</div>;
    }

    return (
        <div>
            <main>
                <ul>
                    {data.results.map(({ title, release_date, director }) => (
                        <li key={title}>
                            <h2>{title}</h2>
                            <span>Release date: {release_date}</span>
                            <span>Director: {director}</span>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<{
    data?: FilmsResponse;
    notFound?: boolean;
}> = async () => {
    try {
        const { data } = await axios.get<FilmsResponse>(
            'https://swapi.dev/api/films/'
        );
        if (!data.results) {
            return {
                props: { notFound: true },
            };
        }

        return {
            props: { data },
        };
    } catch (error) {
        return {
            props: { notFound: true },
        };
    }
};
