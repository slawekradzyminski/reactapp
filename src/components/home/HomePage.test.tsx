import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from './HomePage';

describe('HomePage', () => {
  test('renders main content correctly', () => {
    // when
    render(<HomePage />);
    
    // then
    expect(screen.getByText('Hello 😊')).toBeInTheDocument();
    const image = screen.getByAltText('Sławek');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/slawek.jpeg');
    expect(screen.getByText(/My name is Sławek/)).toBeInTheDocument();
  });

  test('renders external links correctly', () => {
    // when
    render(<HomePage />);
    
    // then
    const linkedInLink = screen.getByText('LinkedIn');
    expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/slawekradzyminski/');
    expect(linkedInLink).toHaveAttribute('target', '_blank');
    expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer');

    const githubLink = screen.getByText('React codebase');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/slawekradzyminski/reactapp');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});