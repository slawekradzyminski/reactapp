import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import BlogList from './BlogList';

vi.mock('../../data/blog/index.json', () => ({
  default: [
    {
      id: 'test-post-1',
      title: 'Test Post 1',
      date: '2024-01-01',
      category: 'Testing',
      permalink: '/2024/01/test-post-1',
      preview: 'Test preview 1'
    },
    {
      id: 'test-post-2',
      title: 'Test Post 2',
      date: '2024-01-02',
      category: 'React',
      permalink: '/2024/01/test-post-2',
      preview: 'Test preview 2'
    }
  ]
}));

const mockSetSearchParams = vi.fn();
let mockSearchParams = new URLSearchParams('');

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal() as any;
  return {
    ...actual,
    useSearchParams: () => [mockSearchParams, mockSetSearchParams]
  };
});

const renderWithRouter = (ui: React.ReactElement, { searchParams = '' } = {}) => {
  mockSearchParams = new URLSearchParams(searchParams);
  return render(ui, { wrapper: MemoryRouter });
};

describe('BlogList', () => {
  beforeEach(() => {
    mockSetSearchParams.mockClear();
    mockSearchParams = new URLSearchParams('');
  });

  it('does not show category chip when no category is selected', () => {
    // when
    renderWithRouter(<BlogList />);
    
    // then
    const categoryChip = screen.queryByTestId('mobile-category-chip');
    expect(categoryChip).not.toBeInTheDocument();
  });

  it('shows category chip on mobile when category is selected', () => {
    // when
    renderWithRouter(<BlogList />, { searchParams: 'category=Testing' });
    
    // then
    const categoryChip = screen.getByTestId('mobile-category-chip');
    expect(categoryChip).toBeInTheDocument();
  });

  it('clears category when clicking the chip delete button', async () => {
    // given
    renderWithRouter(<BlogList />, { searchParams: 'category=Testing' });
    const chip = screen.getByText('Category: Testing').closest('div');
    const deleteButton = chip?.querySelector('[data-testid="CancelIcon"]');
    expect(deleteButton).toBeInTheDocument();
    
    // when
    await userEvent.click(deleteButton!);
    
    // then
    expect(mockSetSearchParams).toHaveBeenCalled();
    const newParams = mockSetSearchParams.mock.calls[0][0];
    expect(newParams.has('category')).toBe(false);
    expect(newParams.get('page')).toBe('1');
  });

  it('shows chip container with correct mobile/desktop visibility', () => {
    // when
    renderWithRouter(<BlogList />, { searchParams: 'category=Testing' });
    
    // then
    const chipContainer = screen.getByTestId('mobile-category-chip');
    const styles = window.getComputedStyle(chipContainer);
    expect(styles.display).toBe('block');
  });
}); 