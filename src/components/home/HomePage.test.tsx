import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomePage from './HomePage'

describe('HomePage', () => {
  it('renders main content correctly', () => {
    // given
    render(<HomePage />)
    
    // when
    const heading = screen.getByText('Hello 😊')
    const image = screen.getByAltText('Sławek')
    const professionalDescription = screen.getByText(/I'm a seasoned test engineer/)
    const personalDescription = screen.getByText(/When I'm not immersed in code/)

    // then
    expect(heading).toBeInTheDocument()
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/images/slawek.jpeg')
    expect(professionalDescription).toBeInTheDocument()
    expect(personalDescription).toBeInTheDocument()
  })
})