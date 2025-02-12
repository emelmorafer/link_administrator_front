import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '../src/components/Header';

test('renders header with the correct text', () => {
  render(<Header textHeaderProp="Link Administrator" />);
  const headerElement = screen.getByText("Link Administrator");
  expect(headerElement).toBeInTheDocument();
});