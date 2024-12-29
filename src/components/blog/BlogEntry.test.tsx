import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { BlogEntry } from './BlogEntry';

const mockPost = {
  id: 'test-post',
  title: 'Test Post',
  date: '2024-01-01',
  category: 'Testing',
  permalink: '/2024/01/test-post',
  preview: 'Test preview'
};

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: MemoryRouter });
};

describe('BlogEntry', () => {
  it('renders post title and date', () => {
    // when
    renderWithRouter(<BlogEntry post={mockPost} onCategoryClick={() => {}} />);
    
    // then
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('January 1, 2024')).toBeInTheDocument();
  });

  it('renders preview text when provided', () => {
    // when
    renderWithRouter(<BlogEntry post={mockPost} onCategoryClick={() => {}} />);
    
    // then
    expect(screen.getByText('Test preview')).toBeInTheDocument();
  });

  it('calls onCategoryClick when category is clicked', async () => {
    // given
    const onCategoryClick = vi.fn();
    renderWithRouter(<BlogEntry post={mockPost} onCategoryClick={onCategoryClick} />);
    const categoryElement = screen.getByText('Testing');
    
    // when
    await userEvent.click(categoryElement);
    
    // then
    expect(onCategoryClick).toHaveBeenCalled();
  });

  it('shows tooltip on category hover', async () => {
    // given
    renderWithRouter(<BlogEntry post={mockPost} onCategoryClick={() => {}} />);
    const categoryElement = screen.getByText('Testing').closest('.blog-entry-section');
    
    // when
    await userEvent.hover(categoryElement!);
    
    // then
    await waitFor(() => {
      expect(screen.getByText('Click to find all posts in this category')).toBeInTheDocument();
    });
  });
}); 