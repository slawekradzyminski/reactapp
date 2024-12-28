import { describe, it, vi, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BlogPostNavigation from './BlogPostNavigation';
import { BrowserRouter } from 'react-router-dom';

// Mock the router navigation
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock blog index data
vi.mock('../../data/blog/index.json', () => ({
  default: [
    { id: 'post1', title: 'First Post', permalink: '/blog/first-post' },
    { id: 'post2', title: 'Second Post', permalink: '/blog/second-post' },
    { id: 'post3', title: 'Third Post', permalink: '/blog/third-post' }
  ]
}));

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('BlogPostNavigation', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('should render navigation buttons for middle post', () => {
    // given
    renderWithRouter(<BlogPostNavigation currentPostId="post2" />);

    // when
    const prevButton = screen.getByTestId('ArrowBackIosNewIcon').parentElement;
    const nextButton = screen.getByTestId('ArrowForwardIosIcon').parentElement;

    // then
    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
    expect(screen.getByText('Previous: First Post')).toBeInTheDocument();
    expect(screen.getByText('Next: Third Post')).toBeInTheDocument();
  });

  it('should disable previous button for first post', () => {
    // given
    renderWithRouter(<BlogPostNavigation currentPostId="post1" />);

    // when
    const prevButton = screen.getByTestId('ArrowBackIosNewIcon').parentElement;
    const nextButton = screen.getByTestId('ArrowForwardIosIcon').parentElement;

    // then
    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();
    expect(screen.queryByText(/Previous:/)).not.toBeInTheDocument();
    expect(screen.getByText('Next: Second Post')).toBeInTheDocument();
  });

  it('should disable next button for last post', () => {
    // given
    renderWithRouter(<BlogPostNavigation currentPostId="post3" />);

    // when
    const prevButton = screen.getByTestId('ArrowBackIosNewIcon').parentElement;
    const nextButton = screen.getByTestId('ArrowForwardIosIcon').parentElement;

    // then
    expect(prevButton).not.toBeDisabled();
    expect(nextButton).toBeDisabled();
    expect(screen.getByText('Previous: Second Post')).toBeInTheDocument();
    expect(screen.queryByText(/Next:/)).not.toBeInTheDocument();
  });

  it('should navigate to previous post when clicking previous button', () => {
    // given
    renderWithRouter(<BlogPostNavigation currentPostId="post2" />);

    // when
    const prevButton = screen.getByTestId('ArrowBackIosNewIcon').parentElement;
    fireEvent.click(prevButton!);

    // then
    expect(mockNavigate).toHaveBeenCalledWith('/blog/first-post');
  });

  it('should navigate to next post when clicking next button', () => {
    // given
    renderWithRouter(<BlogPostNavigation currentPostId="post2" />);

    // when
    const nextButton = screen.getByTestId('ArrowForwardIosIcon').parentElement;
    fireEvent.click(nextButton!);

    // then
    expect(mockNavigate).toHaveBeenCalledWith('/blog/third-post');
  });

  it('should navigate when clicking on post titles', () => {
    // given
    renderWithRouter(<BlogPostNavigation currentPostId="post2" />);

    // when
    fireEvent.click(screen.getByText('Previous: First Post'));
    fireEvent.click(screen.getByText('Next: Third Post'));

    // then
    expect(mockNavigate).toHaveBeenCalledWith('/blog/first-post');
    expect(mockNavigate).toHaveBeenCalledWith('/blog/third-post');
  });
}); 