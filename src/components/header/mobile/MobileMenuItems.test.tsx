import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import MobileMenuItems from './MobileMenuItems'
import { mobilePages } from '../pages'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('MobileMenuItems', () => {
  const mockOnItemClick = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all mobile pages', () => {
    // given
    render(
      <MemoryRouter>
        <MobileMenuItems onItemClick={mockOnItemClick} />
      </MemoryRouter>
    )

    // when + then
    mobilePages.forEach((page) => {
      expect(screen.getByText(page.name)).toBeInTheDocument()
    })
  })

  it('calls onItemClick and navigates when a menu item is clicked', async () => {
    // given
    render(
      <MemoryRouter>
        <MobileMenuItems onItemClick={mockOnItemClick} />
      </MemoryRouter>
    )
    const firstMenuItem = screen.getByText(mobilePages[0].name)

    // when
    await userEvent.click(firstMenuItem)

    // then
    expect(mockOnItemClick).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith(mobilePages[0].path)
  })

})