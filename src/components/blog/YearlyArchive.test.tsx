import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { YearlyArchive } from './YearlyArchive';

describe('YearlyArchive', () => {
  const mockPosts = [
    { date: '2023-01-01' },
    { date: '2023-06-15' },
    { date: '2022-12-31' },
    { date: '2022-01-01' },
    { date: '2021-07-15' }
  ];

  it('renders yearly archive with correct year counts', () => {
    // given
    const onYearSelect = vi.fn();
    
    // when
    render(<YearlyArchive posts={mockPosts} onYearSelect={onYearSelect} />);
    
    // then
    expect(screen.getByText('Yearly Archive')).toBeInTheDocument();
  });

  it('displays correct post counts for each year when expanded', async () => {
    // given
    const onYearSelect = vi.fn();
    render(<YearlyArchive posts={mockPosts} onYearSelect={onYearSelect} />);
    
    // when
    await userEvent.click(screen.getByText('Yearly Archive'));
    
    // then
    const chips = screen.getAllByRole('generic').filter(el => el.className.includes('MuiChip-root'));
    const chipLabels = chips.map(chip => chip.textContent);
    expect(chipLabels).toContain('2');  // 2023 has 2 posts
    expect(chipLabels).toContain('2');  // 2022 has 2 posts
    expect(chipLabels).toContain('1');  // 2021 has 1 post
  });

  it('expands and collapses when header is clicked', async () => {
    // given
    const onYearSelect = vi.fn();
    render(<YearlyArchive posts={mockPosts} onYearSelect={onYearSelect} />);
    
    // when
    await userEvent.click(screen.getByText('Yearly Archive'));
    
    // then
    const expandIcon = screen.getByTestId('ExpandLessIcon');
    expect(expandIcon).toBeInTheDocument();

    // when clicking again
    await userEvent.click(screen.getByText('Yearly Archive'));
    
    // then
    const collapseIcon = screen.getByTestId('ExpandMoreIcon');
    expect(collapseIcon).toBeInTheDocument();
  });

  it('calls onYearSelect with year when year is clicked', async () => {
    // given
    const onYearSelect = vi.fn();
    render(<YearlyArchive posts={mockPosts} onYearSelect={onYearSelect} />);
    
    // when
    await userEvent.click(screen.getByText('Yearly Archive')); // expand first
    await userEvent.click(screen.getByText('2023'));
    
    // then
    expect(onYearSelect).toHaveBeenCalledWith(2023);
  });

  it('shows selected year in header when collapsed', () => {
    // given
    const onYearSelect = vi.fn();
    render(<YearlyArchive posts={mockPosts} selectedYear={2023} onYearSelect={onYearSelect} />);
    
    // when
    const chip = screen.getByRole('button', { name: '2023' });
    
    // then
    expect(chip).toBeInTheDocument();
    expect(chip.className).toContain('MuiChip-root');
  });

  it('clears selected year when chip delete is clicked', async () => {
    // given
    const onYearSelect = vi.fn();
    render(<YearlyArchive posts={mockPosts} selectedYear={2023} onYearSelect={onYearSelect} />);
    
    // when
    const deleteButton = screen.getByTestId('CancelIcon');
    await userEvent.click(deleteButton);
    
    // then
    expect(onYearSelect).toHaveBeenCalledWith(undefined);
  });

  it('toggles year selection when clicking same year twice', async () => {
    // given
    const onYearSelect = vi.fn();
    render(<YearlyArchive posts={mockPosts} selectedYear={2023} onYearSelect={onYearSelect} />);
    
    // when
    await userEvent.click(screen.getByText('Yearly Archive')); // expand
    await userEvent.click(screen.getByText('2023')); // click selected year
    
    // then
    expect(onYearSelect).toHaveBeenCalledWith(undefined);
  });
}); 