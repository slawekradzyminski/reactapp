import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MenuButton from './MenuButton'

describe('MenuButton', () => {

  it('calls the onClick handler when clicked', async () => {
    // given
    const onClick = vi.fn()
    render(<MenuButton onClick={onClick} />)
    const button = screen.getByRole('button', { name: /navigation menu/i })

    // when
    await userEvent.click(button)

    // then
    expect(onClick).toHaveBeenCalledTimes(1)
  })
  
})