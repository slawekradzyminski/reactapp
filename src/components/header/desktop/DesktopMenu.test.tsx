import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DesktopMenu from './DesktopMenu';
import { pages } from '../pages';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('DesktopMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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
    for (const page of pages) {
      await userEvent.click(screen.getByText(page.name));
      expect(mockNavigate).toHaveBeenCalledWith(page.path);
    }
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

  it('applies bold font weight to the active page for nested routes', () => {
    // when
    render(
      <MemoryRouter initialEntries={['/tips/2']}>
        <DesktopMenu />
      </MemoryRouter>
    );
    const activeButton = screen.getByText('Tips for Seniors');
    const inactiveButton = screen.getByText('Book Recommendations');

    // then
    expect(window.getComputedStyle(activeButton).fontWeight).toBe('700');
    expect(window.getComputedStyle(inactiveButton).fontWeight).toBe('normal');
  });

  describe('Blog menu item', () => {
    it('applies bold font weight when viewing blog list', () => {
      // when
      render(
        <MemoryRouter initialEntries={['/blog']}>
          <DesktopMenu />
        </MemoryRouter>
      );
      const blogButton = screen.getByText('Blog');

      // then
      expect(window.getComputedStyle(blogButton).fontWeight).toBe('700');
    });

    it('applies bold font weight when viewing a blog post with year in URL', () => {
      // when
      render(
        <MemoryRouter initialEntries={['/2024/12/from-live-suggestions-to-agents-exploring-ai-powered-ides']}>
          <DesktopMenu />
        </MemoryRouter>
      );
      const blogButton = screen.getByText('Blog');

      // then
      expect(window.getComputedStyle(blogButton).fontWeight).toBe('700');
    });

    it('does not apply bold font weight for non-year URLs', () => {
      // when
      render(
        <MemoryRouter initialEntries={['/some-other-path']}>
          <DesktopMenu />
        </MemoryRouter>
      );
      const blogButton = screen.getByText('Blog');

      // then
      expect(window.getComputedStyle(blogButton).fontWeight).toBe('normal');
    });
  });
});
