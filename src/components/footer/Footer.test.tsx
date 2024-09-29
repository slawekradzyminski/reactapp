import Footer from './Footer';
import { render, screen } from '@testing-library/react';
import {  it, expect } from 'vitest';

it('renders correct copyright message', () => {
    // when
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const expectedText = `Copyright © Sławomir Radzymiński Consulting ${currentYear}`;

    // then
    expect(screen.getByText(expectedText)).toBeInTheDocument();
});