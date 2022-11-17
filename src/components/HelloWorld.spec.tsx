import { render, screen } from '@testing-library/react';

import HelloWorld from './HelloWorld';

describe('HelloWorld Component', () => {
  describe('when it has no props', () => {
    it('should render it', () => {
      render(
        <HelloWorld />
      );

      const component = screen.queryByText(/Hello World/);
      expect(component).toBeInTheDocument();
    });
  });
});
