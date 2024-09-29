import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import DesktopMenu from './DesktopMenu';
import { pages } from './pages';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('DesktopMenu', () => {
  it('renders all pages from the pages array', () => {
    // given
    render(
      <MemoryRouter>
        <DesktopMenu />
      </MemoryRouter>
    );

    // when + then
    pages.forEach((page) => {
      expect(screen.getByText(page.name)).toBeInTheDocument();
    });
  });

  it('navigates to the correct path when a button is clicked', async () => {
    // given
    render(
      <MemoryRouter>
        <DesktopMenu />
      </MemoryRouter>
    );

    // when + then
    pages.forEach(async (page) => {
      await userEvent.click(screen.getByText(page.name));
      expect(mockNavigate).toHaveBeenCalledWith(page.path);
    });
  });

  it('applies bold font weight to the active page', () => {
    // when
    render(
      <MemoryRouter initialEntries={['/tips']}>
        <DesktopMenu />
      </MemoryRouter>
    );
    const activeButton = screen.getByText('Tips for Seniors');
    const inactiveButton = screen.getByText('Book Recommendations');

    // then
    expect(window.getComputedStyle(activeButton).fontWeight).toBe('700');
    expect(window.getComputedStyle(inactiveButton).fontWeight).toBe('normal');
  });
});