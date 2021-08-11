import { screen, waitFor } from '@testing-library/react';
import { getPage } from 'next-page-tester';

import { mockedFilms } from '../__mocks__/mocks';
import { server, rest } from '../test-utils/server';
import { API_URL } from '../config';

test('displays the list of films', async () => {
  const { render } = await getPage({ route: '/jest/' });

  render();

  await waitFor(() => {
    mockedFilms.results.forEach(({ title, release_date, director }) => {
      expect(
        screen.getByRole('heading2', { level: 2, name: title })
      ).toBeInTheDocument();
      expect(
        screen.getByText(`Release date: ${release_date}`)
      ).toBeInTheDocument();
      expect(screen.getByText(`Director: ${director}`)).toBeInTheDocument();
    });
  });
});

test('shows the error message when receive an error from the API', async () => {
  server.use(rest.get(API_URL, async (_req, res, ctx) => res(ctx.status(404))));

  const { render } = await getPage({ route: '/jest/' });

  render();

  await waitFor(() => {
    expect(
      screen.getByText('Something went wrong, please try again')
    ).toBeInTheDocument();
  });
});
