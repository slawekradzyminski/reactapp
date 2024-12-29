import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BlogEntry } from './BlogEntry';
import { MemoryRouter } from 'react-router-dom';

describe('BlogEntry', () => {
  const mockPost = {
    id: 'test-post',
    title: 'Test Blog Post',
    date: '2023-01-15',
    category: 'Testing',
    permalink: '/blog/test-post'
  };

  const mockOnCategoryClick = vi.fn();

  const renderBlogEntry = (props = {}) => {
    return render(
      <MemoryRouter>
        <BlogEntry
          post={mockPost}
          onCategoryClick={mockOnCategoryClick}
          {...props}
        />
      </MemoryRouter>
    );
  };

  it('renders blog entry with title and date', () => {
    // given/when
    renderBlogEntry();
    
    // then
    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    expect(screen.getByText('January 15, 2023')).toBeInTheDocument();
  });

  it('renders preview text when provided', () => {
    // given
    const preview = 'This is a test preview text';
    
    // when
    renderBlogEntry({ preview });
    
    // then
    expect(screen.getByText(preview)).toBeInTheDocument();
  });

  it('does not render preview when not provided', () => {
    // given/when
    const { container } = renderBlogEntry();
    
    // then
    const previewElements = container.querySelectorAll('.MuiTypography-body2');
    expect(previewElements.length).toBe(0);
  });

  it('renders category with icon', () => {
    // given/when
    renderBlogEntry();
    
    // then
    expect(screen.getByText('Category:')).toBeInTheDocument();
    expect(screen.getByText('Testing')).toBeInTheDocument();
    expect(screen.getByTestId('CategoryIcon')).toBeInTheDocument();
  });

  it('calls onCategoryClick when clicking category', async () => {
    // given
    renderBlogEntry();
    
    // when
    await userEvent.click(screen.getByText('Testing'));
    
    // then
    expect(mockOnCategoryClick).toHaveBeenCalledTimes(1);
    expect(mockOnCategoryClick).toHaveBeenCalledWith(expect.any(Object), 'Testing');
  });

  it('renders as a link with correct permalink', () => {
    // given/when
    renderBlogEntry();
    
    // then
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/blog/test-post');
  });

  it('applies hover styles to paper component', () => {
    // given/when
    renderBlogEntry();
    
    // then
    const paper = screen.getByRole('link').firstChild;
    expect(paper).toHaveStyle({
      transition: 'all 0.3s ease'
    });
  });
}); 