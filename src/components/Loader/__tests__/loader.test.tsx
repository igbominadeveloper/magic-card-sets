import { render, screen } from '@testing-library/react';

import Loader from '../Loader';

test('Loader Component', () => {
  render(<Loader />);

  const loader = screen.getByTestId('loader');

  expect(loader).toBeInTheDocument();
});
