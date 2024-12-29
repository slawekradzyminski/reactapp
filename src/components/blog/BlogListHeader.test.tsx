import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BlogListHeader } from './BlogListHeader';

describe('BlogListHeader', () => {
  it('renders blog archive title', () => {
    // given
    const onSearchChange = vi.fn();
    
    // when
    render(
      <BlogListHeader
        searchTerm=""
        onSearchChange={onSearchChange}
      />
    );
    
    // then
    expect(screen.getByText('Blog Archive')).toBeInTheDocument();
    expect(screen.getByText('Blog Archive').tagName).toBe('H1');
  });

  it('renders search input with correct value', () => {
    // given
    const searchTerm = 'test search';
    const onSearchChange = vi.fn();
    
    // when
    render(
      <BlogListHeader
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
      />
    );
    
    // then
    const searchInput = screen.getByTestId('search-blog-input');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue(searchTerm);
  });

  it('calls onSearchChange when typing in search input', async () => {
    // given
    const onSearchChange = vi.fn();
    render(
      <BlogListHeader
        searchTerm=""
        onSearchChange={onSearchChange}
      />
    );
    
    // when
    const searchInput = screen.getByTestId('search-blog-input');
    await userEvent.type(searchInput, 'test');
    
    // then
    expect(onSearchChange).toHaveBeenCalledTimes(4); // Once for each character
  });

  it('applies correct styling to title', () => {
    // given
    const onSearchChange = vi.fn();
    
    // when
    render(
      <BlogListHeader
        searchTerm=""
        onSearchChange={onSearchChange}
      />
    );
    
    // then
    const title = screen.getByText('Blog Archive');
    expect(title).toHaveStyle({ textAlign: 'center' });
    expect(title.className).toContain('blog-list-title');
  });
}); 