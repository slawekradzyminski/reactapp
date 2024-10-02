import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest';
import { TipBody } from './TipBody';

describe('TipBody', () => {
  it('renders the tip title and content when a tip is selected', () => {
    // given
    const selectedTip = {
      title: 'Test Tip',
      content: '<p>This is a test tip content</p>'
    };

    // when
    render(<TipBody selectedTip={selectedTip} />);

    // then
    expect(screen.getByText('Test Tip')).toBeInTheDocument();
    expect(screen.getByText('This is a test tip content')).toBeInTheDocument();
  });

});