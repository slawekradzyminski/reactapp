import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TipBody } from './TipBody';

describe('TipBody', () => {
  const mockTip = {
    title: 'Sample Tip Title',
    content: '<p>Sample tip content</p>'
  };

  it('renders TipBody with header when header prop is true', () => {
    // given
    const props = { selectedTip: mockTip, header: true };

    // when
    render(<TipBody {...props} />);

    // then
    expect(screen.getByText(mockTip.title)).toBeInTheDocument();
    expect(screen.getByText('Sample tip content')).toBeInTheDocument();
  });

  it('renders TipBody without header when header prop is false', () => {
    // given
    const props = { selectedTip: mockTip, header: false };

    // when
    render(<TipBody {...props} />);

    // then
    expect(screen.queryByText(mockTip.title)).not.toBeInTheDocument();
    expect(screen.getByText('Sample tip content')).toBeInTheDocument();
  });

  it('renders HTML content correctly using dangerouslySetInnerHTML', () => {
    // given
    const htmlContent = 'This is <strong>bold</strong> text';
    const props = { selectedTip: { ...mockTip, content: htmlContent }, header: true };

    // when
    render(<TipBody {...props} />);

    // then
    const contentElement = screen.getByText(/This is/);
    expect(contentElement).toBeInTheDocument();
    expect(contentElement.innerHTML).toBe(htmlContent);
  });
});