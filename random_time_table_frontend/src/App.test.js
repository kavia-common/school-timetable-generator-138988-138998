import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header title', () => {
  render(<App />);
  const title = screen.getByText(/Random Timetable/i);
  expect(title).toBeInTheDocument();
});

test('has generate button', () => {
  render(<App />);
  const btn = screen.getByRole('button', { name: /Generate Timetable/i });
  expect(btn).toBeInTheDocument();
});
