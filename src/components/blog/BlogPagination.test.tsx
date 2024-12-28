import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BlogPagination } from './BlogPagination';

describe('BlogPagination', () => {
  it('renders pagination with correct number of pages', () => {
    // given
    const onPageChange = vi.fn();
    
    // when
    render(
      <BlogPagination
        totalPages={5}
        currentPage={1}
        onPageChange={onPageChange}
      />
    );
    
    // then
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(9); // 5 pages + first/last + prev/next buttons
  });

  it('shows current page as selected', () => {
    // given
    const onPageChange = vi.fn();
    const currentPage = 3;
    
    // when
    render(
      <BlogPagination
        totalPages={5}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    );
    
    // then
    const currentPageButton = screen.getByRole('button', { name: `page ${currentPage}` });
    expect(currentPageButton).toHaveAttribute('aria-current', 'true');
  });

  it('calls onPageChange when clicking a page number', async () => {
    // given
    const onPageChange = vi.fn();
    
    render(
      <BlogPagination
        totalPages={5}
        currentPage={1}
        onPageChange={onPageChange}
      />
    );
    
    // when
    await userEvent.click(screen.getByRole('button', { name: 'Go to page 2' }));
    
    // then
    expect(onPageChange).toHaveBeenCalledTimes(1);
    expect(onPageChange).toHaveBeenCalledWith(expect.any(Object), 2);
  });

  it('shows first and last page buttons', () => {
    // given
    const onPageChange = vi.fn();
    
    // when
    render(
      <BlogPagination
        totalPages={10}
        currentPage={5}
        onPageChange={onPageChange}
      />
    );
    
    // then
    expect(screen.getByRole('button', { name: 'Go to first page' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to last page' })).toBeInTheDocument();
  });

  it('calls onPageChange when clicking first/last buttons', async () => {
    // given
    const onPageChange = vi.fn();
    const totalPages = 10;
    
    render(
      <BlogPagination
        totalPages={totalPages}
        currentPage={5}
        onPageChange={onPageChange}
      />
    );
    
    // when clicking first page
    await userEvent.click(screen.getByRole('button', { name: 'Go to first page' }));
    
    // then
    expect(onPageChange).toHaveBeenCalledWith(expect.any(Object), 1);
    
    // when clicking last page
    await userEvent.click(screen.getByRole('button', { name: 'Go to last page' }));
    
    // then
    expect(onPageChange).toHaveBeenCalledWith(expect.any(Object), totalPages);
  });
}); 