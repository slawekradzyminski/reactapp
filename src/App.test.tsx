import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders App', () => {
    render(<App />);
    const linkElement = screen.getByText(/Hello/i);
    expect(linkElement).toBeInTheDocument();
  });
});
