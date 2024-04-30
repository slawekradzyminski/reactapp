import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders correct copyright message', () => {
    // when
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const expectedText = `Copyright © Sławomir Radzymiński Consulting ${currentYear}`;

    // then
    expect(screen.getByText(expectedText)).toBeInTheDocument();
});