import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBookInput from './SearchBookInput';

describe('SearchBookInput', () => {
    
  it('calls onSearchChange when input value changes', () => {
    // given
    const onSearchChange = vi.fn();
    render(<SearchBookInput onSearchChange={onSearchChange} />);
    const input = screen.getByPlaceholderText('Search by title');

    // when
    fireEvent.change(input, { target: { value: 'test search' } });

    // then
    expect(onSearchChange).toHaveBeenCalledTimes(1);
  });

});