import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContactPage from './ContactPage';

describe('ContactPage', () => {
  it('renders contact form and description', () => {
    // given
    render(<ContactPage />);

    // then
    expect(screen.getByText('Contact Me')).toBeInTheDocument();
    expect(screen.getByText(/If you're looking for expert help/)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Email Address/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Message/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });
});
