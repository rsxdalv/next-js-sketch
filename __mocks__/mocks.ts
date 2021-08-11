import { FilmsResponse } from "../pages/jest";

export const mockedFilms: FilmsResponse = {
    results: [
        {
            title: 'A New Hope',
            release_date: '1977-05-25',
            director: 'George Lucas',
        },
        {
            title: 'The Empire Strikes Back',
            release_date: '1980-05-17',
            director: 'Richard Marquand',
        },
    ],
};