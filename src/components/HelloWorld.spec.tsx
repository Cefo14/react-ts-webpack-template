import { render, screen } from '@testing-library/react';

import HelloWorld from './HelloWorld';

describe('HelloWorld Component', () => {
  it('should display the text Hello World', () => {
    render(
      <HelloWorld />
    );

    const component = screen.getByRole('heading', { level: 1 });
    expect(component).toHaveTextContent(/Hello World/i);
  });
});
