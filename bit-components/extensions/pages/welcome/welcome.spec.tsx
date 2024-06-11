import React from 'react';
import { render } from '@testing-library/react';
import { BasicWelcome } from './welcome.composition.js';

it('should render the correct text', () => {
  const { getByText } = render(<BasicWelcome />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
