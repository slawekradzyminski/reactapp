import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryFilter from './CategoryFilter';
import { MemoryRouter } from 'react-router-dom';

// Mock the blog index data
vi.mock('../../data/blog/index.json', () => ({
  default: [
    { category: 'Testing' },
    { category: 'Testing' },
    { category: 'Development' },
    { category: 'Development' },
    { category: 'Agile' }
  ]
}));

const mockSetSearchParams = vi.fn();
const mockSearchParams = new URLSearchParams();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => [mockSearchParams, mockSetSearchParams]
  };
});

describe('CategoryFilter', () => {
  beforeEach(() => {
    mockSetSearchParams.mockClear();
    mockSearchParams.delete('category');
  });

  it('renders category filter with correct categories', () => {
    // given/when
    render(
      <MemoryRouter>
        <CategoryFilter />
      </MemoryRouter>
    );
    
    // then
    expect(screen.getByText('Categories')).toBeInTheDocument();
  });

  it('displays correct category counts when expanded', async () => {
    // given
    render(
      <MemoryRouter>
        <CategoryFilter />
      </MemoryRouter>
    );
    
    // when
    await userEvent.click(screen.getByText('Categories'));
    
    // then
    expect(screen.getByText('Testing')).toBeInTheDocument();
    expect(screen.getByText('Development')).toBeInTheDocument();
    expect(screen.getByText('Agile')).toBeInTheDocument();
    
    const chips = screen.getAllByRole('generic').filter(el => el.className.includes('MuiChip-root'));
    const chipLabels = chips.map(chip => chip.textContent);
    expect(chipLabels).toContain('2'); // Testing has 2 posts
    expect(chipLabels).toContain('2'); // Development has 2 posts
    expect(chipLabels).toContain('1'); // Agile has 1 post
  });

  it('expands and collapses when header is clicked', async () => {
    // given
    render(
      <MemoryRouter>
        <CategoryFilter />
      </MemoryRouter>
    );
    
    // when
    await userEvent.click(screen.getByText('Categories'));
    
    // then
    expect(screen.getByTestId('ExpandLessIcon')).toBeInTheDocument();
    
    // when clicking again
    await userEvent.click(screen.getByText('Categories'));
    
    // then
    expect(screen.getByTestId('ExpandMoreIcon')).toBeInTheDocument();
  });

  it('updates search params when category is selected', async () => {
    // given
    render(
      <MemoryRouter>
        <CategoryFilter />
      </MemoryRouter>
    );
    
    // when
    await userEvent.click(screen.getByText('Categories')); // expand
    await userEvent.click(screen.getByText('Testing'));
    
    // then
    expect(mockSetSearchParams).toHaveBeenCalledWith(expect.any(URLSearchParams));
    const lastCall = mockSetSearchParams.mock.lastCall![0] as URLSearchParams;
    expect(lastCall.get('category')).toBe('Testing');
    expect(lastCall.get('page')).toBe('1');
  });

  it('shows selected category in header when collapsed', () => {
    // given
    mockSearchParams.set('category', 'Testing');
    
    // when
    render(
      <MemoryRouter>
        <CategoryFilter />
      </MemoryRouter>
    );
    
    // then
    const chip = screen.getByRole('button', { name: 'Testing' });
    expect(chip).toBeInTheDocument();
    expect(chip.className).toContain('MuiChip-root');
  });

  it('clears category when chip delete is clicked', async () => {
    // given
    mockSearchParams.set('category', 'Testing');
    render(
      <MemoryRouter>
        <CategoryFilter />
      </MemoryRouter>
    );
    
    // when
    const deleteButton = screen.getByTestId('CancelIcon');
    await userEvent.click(deleteButton);
    
    // then
    expect(mockSetSearchParams).toHaveBeenCalledWith(expect.any(URLSearchParams));
    const lastCall = mockSetSearchParams.mock.lastCall![0] as URLSearchParams;
    expect(lastCall.has('category')).toBe(false);
    expect(lastCall.get('page')).toBe('1');
  });

  it('toggles category selection when clicking same category twice', async () => {
    // given
    mockSearchParams.set('category', 'Testing');
    render(
      <MemoryRouter>
        <CategoryFilter />
      </MemoryRouter>
    );
    
    // when
    await userEvent.click(screen.getByText('Categories')); // expand
    await userEvent.click(screen.getByText('Testing')); // click selected category
    
    // then
    expect(mockSetSearchParams).toHaveBeenCalledWith(expect.any(URLSearchParams));
    const lastCall = mockSetSearchParams.mock.lastCall![0] as URLSearchParams;
    expect(lastCall.has('category')).toBe(false);
    expect(lastCall.get('page')).toBe('1');
  });
}); 