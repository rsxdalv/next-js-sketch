import { rest } from 'msw';

// import { API_URL } from '../config'; //'https://swapi.dev/api/films'
const API_URL = 'https://swapi.dev/api/films';
import { mockedFilms } from '../__mocks__/mocks';

const handlers = [
    rest.get(API_URL, (_req, res, ctx) => {
        return res(ctx.json(mockedFilms));
    }),
];

export { handlers };