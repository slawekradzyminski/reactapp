import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from '@testing-library/react';
import BlogPost from './BlogPost';
import { BrowserRouter } from 'react-router-dom';

// Mock the router hooks
const mockNavigate = vi.fn();
const mockLocation = { pathname: '/blog/test-post' };

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation
  };
});

// Mock blog index data
vi.mock('../../data/blog/index.json', () => ({
  default: [
    { 
      id: 'test-post',
      title: 'Test Post',
      permalink: '/blog/test-post'
    }
  ]
}));

// Mock post data
const mockPostData = {
  id: 'test-post',
  title: 'Test Post Title',
  date: '2024-01-01',
  category: 'Test Category',
  content: '<p>Test content</p>',
  permalink: '/blog/test-post'
};

// Mock BlogComments component
vi.mock('./BlogComments', () => ({
  default: ({ postId }: { postId: string }) => <div data-testid="blog-comments">{postId}</div>
}));

// Mock BlogPostNavigation component
vi.mock('./BlogPostNavigation', () => ({
  default: ({ currentPostId }: { currentPostId: string }) => (
    <div data-testid="blog-navigation">{currentPostId}</div>
  )
}));

// Create a delayed mock import function
const createMockImportPost = (delay: number = 0) => {
  return vi.fn().mockImplementation(() => 
    new Promise((resolve) => {
      setTimeout(() => resolve(mockPostData), delay);
    })
  );
};

const renderWithRouter = async (component: React.ReactNode) => {
  let result: ReturnType<typeof render>;
  await act(async () => {
    result = render(<BrowserRouter>{component}</BrowserRouter>);
  });
  return result!;
};

describe('BlogPost', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    vi.clearAllTimers();
  });

  it('should render loading state initially', async () => {
    // given
    const delayedImportPost = createMockImportPost(100);
    
    // when
    await renderWithRouter(<BlogPost importPost={delayedImportPost} />);

    // then
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render blog post content after loading', async () => {
    // given
    const mockImportPost = createMockImportPost();
    await renderWithRouter(<BlogPost importPost={mockImportPost} />);

    // then
    await waitFor(() => {
      expect(screen.getByText('Test Post Title')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Date: 2024-01-01')).toBeInTheDocument();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should navigate to category page when clicking category', async () => {
    // given
    const mockImportPost = createMockImportPost();
    await renderWithRouter(<BlogPost importPost={mockImportPost} />);

    // when
    await waitFor(() => {
      const categoryLink = screen.getByText('Test Category');
      fireEvent.click(categoryLink);
    });

    // then
    expect(mockNavigate).toHaveBeenCalledWith('/blog?category=Test Category&page=1');
  });

  it('should render BlogComments with correct postId', async () => {
    // given
    const mockImportPost = createMockImportPost();
    await renderWithRouter(<BlogPost importPost={mockImportPost} />);

    // then
    await waitFor(() => {
      const comments = screen.getByTestId('blog-comments');
      expect(comments).toHaveTextContent('test-post');
    });
  });

  it('should render BlogPostNavigation with correct postId', async () => {
    // given
    const mockImportPost = createMockImportPost();
    await renderWithRouter(<BlogPost importPost={mockImportPost} />);

    // then
    await waitFor(() => {
      const navigation = screen.getByTestId('blog-navigation');
      expect(navigation).toHaveTextContent('test-post');
    });
  });
}); 