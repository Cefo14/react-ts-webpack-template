import { render, screen } from '@testing-library/react';

import App from '.';

describe('App', () => {
  it('should render the app', () => {
    render(
      <App />
    );

    const component = screen.queryByText(/Hello World/);
    const image = screen.queryByRole('img', { name: 'cheems' });

    expect(component).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
});
