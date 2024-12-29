import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BlogEntry } from './BlogEntry';
import { BrowserRouter } from 'react-router-dom';

const mockPost = {
  id: 'test-post',
  title: 'Test Blog Post',
  date: '2023-01-15',
  category: 'Testing',
  permalink: '/blog/test-post',
  preview: 'This is a test preview of the blog post that gives readers a glimpse of the content...'
};

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('BlogEntry', () => {
  it('renders blog entry with title and date', () => {
    // given
    const onCategoryClick = vi.fn();
    
    // when
    renderWithRouter(
      <BlogEntry
        post={mockPost}
        onCategoryClick={onCategoryClick}
      />
    );
    
    // then
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(/January 15, 2023/)).toBeInTheDocument();
  });

  it('renders category with icon', () => {
    // given
    const onCategoryClick = vi.fn();
    
    // when
    renderWithRouter(
      <BlogEntry
        post={mockPost}
        onCategoryClick={onCategoryClick}
      />
    );
    
    // then
    expect(screen.getByText('Category:')).toBeInTheDocument();
    expect(screen.getByText(mockPost.category)).toBeInTheDocument();
    expect(screen.getByTestId('CategoryIcon')).toBeInTheDocument();
  });

  it('calls onCategoryClick when clicking category', async () => {
    // given
    const onCategoryClick = vi.fn();
    renderWithRouter(
      <BlogEntry
        post={mockPost}
        onCategoryClick={onCategoryClick}
      />
    );
    
    // when
    const categoryElement = screen.getByText(mockPost.category);
    await userEvent.click(categoryElement);
    
    // then
    expect(onCategoryClick).toHaveBeenCalledWith(expect.any(Object), mockPost.category);
  });

  it('renders as a link with correct permalink', () => {
    // given
    const onCategoryClick = vi.fn();
    
    // when
    renderWithRouter(
      <BlogEntry
        post={mockPost}
        onCategoryClick={onCategoryClick}
      />
    );
    
    // then
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', mockPost.permalink);
  });

  it('applies hover styles to paper component', () => {
    // given
    const onCategoryClick = vi.fn();
    
    // when
    renderWithRouter(
      <BlogEntry
        post={mockPost}
        onCategoryClick={onCategoryClick}
      />
    );
    
    // then
    const paperElement = screen.getByRole('heading').parentElement;
    expect(paperElement).toHaveClass('blog-entry');
    expect(paperElement).toHaveStyle({ transition: 'all 0.3s ease' });
  });

  it('renders preview text with correct styling', () => {
    // given
    const onCategoryClick = vi.fn();
    
    // when
    renderWithRouter(
      <BlogEntry
        post={mockPost}
        onCategoryClick={onCategoryClick}
      />
    );
    
    // then
    const previewElement = screen.getByText(mockPost.preview);
    expect(previewElement).toBeInTheDocument();
    expect(previewElement).toHaveClass('blog-entry-preview');
    expect(previewElement).toHaveStyle({
      color: 'rgba(0, 0, 0, 0.6)'
    });
  });

  it('handles missing preview gracefully', () => {
    // given
    const onCategoryClick = vi.fn();
    const postWithoutPreview = { ...mockPost, preview: undefined };
    
    // when
    renderWithRouter(
      <BlogEntry
        post={postWithoutPreview}
        onCategoryClick={onCategoryClick}
      />
    );
    
    // then
    const previewElements = screen.queryAllByTestId('blog-entry-preview');
    expect(previewElements).toHaveLength(0);
  });
}); 