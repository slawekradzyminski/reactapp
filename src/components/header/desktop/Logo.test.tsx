import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Logo from './Logo';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Logo', () => {
  it('navigates to home page when logo icon is clicked', async () => {
    // given
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );

    // when
    await userEvent.click(screen.getByTestId('AdbIcon'));

    // then
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

});