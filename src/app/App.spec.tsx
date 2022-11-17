import { render, screen } from '@testing-library/react';

import App from '.';

describe('App Component', () => {
  describe('when it has no props', () => {
    it('should render it', () => {
      render(
        <App />
      );

      const component = screen.queryByText(/Hello World/);
      const image = screen.queryByRole('img', { name: 'cheems' });

      expect(component).toBeInTheDocument();
      expect(image).toBeInTheDocument();
    });
  });
});
