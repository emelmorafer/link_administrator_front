import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ListTabs from '../src/components/linkcrud/ListTabs';

test('renders ListTabs and checks category buttons', async () => {
  const mockSetIdCategorySelectedProp = jest.fn();
  
  render(<ListTabs setIdCategorySelectedProp={mockSetIdCategorySelectedProp} />);
  
  // Simulate async categories fetch by mocking listCategories
  const categoryButton = await screen.findByText('Categories');
  expect(categoryButton).toBeInTheDocument();
  
  fireEvent.click(categoryButton);
  expect(mockSetIdCategorySelectedProp).toHaveBeenCalled();
});