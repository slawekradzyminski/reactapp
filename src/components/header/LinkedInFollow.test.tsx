import { render, screen } from '@testing-library/react';
import LinkedInFollow from './LinkedInFollow';

describe('LinkedInFollow', () => {
  test('renders the component with correct text and link', () => {
    // given
    render(<LinkedInFollow />);

    // when
    const linkElement = screen.getByRole('link', { name: /Follow me on/i });

    // then
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://www.linkedin.com/in/slawekradzyminski/');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('renders the LinkedIn icon', () => {
    // given
    render(<LinkedInFollow />);

    // when
    const iconElement = screen.getByTestId('LinkedInIcon');

    // then
    expect(iconElement).toBeInTheDocument();
  });
});