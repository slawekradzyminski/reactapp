import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MobileCategoryChip } from './MobileCategoryChip';

describe('MobileCategoryChip', () => {
  it('renders nothing when category is null', () => {
    // when
    render(<MobileCategoryChip category={null} onClear={() => {}} />);
    
    // then
    const chip = screen.queryByTestId('mobile-category-chip');
    expect(chip).not.toBeInTheDocument();
  });

  it('renders chip with category name when category is provided', () => {
    // when
    render(<MobileCategoryChip category="Testing" onClear={() => {}} />);
    
    // then
    const chip = screen.getByTestId('mobile-category-chip');
    expect(chip).toBeInTheDocument();
    expect(screen.getByText('Category: Testing')).toBeInTheDocument();
  });

  it('calls onClear when delete button is clicked', async () => {
    // given
    const onClear = vi.fn();
    render(<MobileCategoryChip category="Testing" onClear={onClear} />);
    const deleteButton = screen.getByTestId('CancelIcon');
    
    // when
    await userEvent.click(deleteButton);
    
    // then
    expect(onClear).toHaveBeenCalled();
  });
}); 