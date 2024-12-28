import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NoPostsFound } from './NoPostsFound';

describe('NoPostsFound', () => {
  it('renders the no posts found message', () => {
    // given/when
    render(<NoPostsFound />);
    
    // then
    expect(screen.getByText('No posts found matching your criteria')).toBeInTheDocument();
  });

  it('renders with correct styling', () => {
    // given/when
    render(<NoPostsFound />);
    
    // then
    const message = screen.getByText('No posts found matching your criteria');
    expect(message.tagName).toBe('H6');
    expect(message).toHaveStyle({ textAlign: 'center' });
  });
}); 