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
    const description = screen.getByText(/My name is Sławek/)

    // then
    expect(heading).toBeInTheDocument()
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/images/slawek.jpeg')
    expect(description).toBeInTheDocument()
  })

  it('renders external links correctly', () => {
    // given
    render(<HomePage />)
    
    // when
    const linkedInLink = screen.getByText('LinkedIn')
    const githubLink = screen.getByText('React codebase')

    // then
    expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/in/slawekradzyminski/')
    expect(linkedInLink).toHaveAttribute('target', '_blank')
    expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer')

    expect(githubLink).toHaveAttribute('href', 'https://github.com/slawekradzyminski/reactapp')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })
})