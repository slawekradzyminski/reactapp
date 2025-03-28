import { render, screen } from '@testing-library/react';
import SpeakingPage from './SpeakingPage';

describe('SpeakingPage', () => {
  it('renders the page title and talks', () => {
    // given
    render(<SpeakingPage />);

    // then
    expect(screen.getByText('Public Speaking')).toBeInTheDocument();
    expect(screen.getByText('Conference Talks & Presentations')).toBeInTheDocument();
    expect(screen.getByText('[2023] Effective ChatGPT usage: start with understanding')).toBeInTheDocument();
    expect(screen.getByText('[2023] Prompt engineering - the Future of Testing?')).toBeInTheDocument();
  });

  it('renders YouTube iframes for each talk', () => {
    // given
    render(<SpeakingPage />);

    // then
    const iframes = screen.getAllByTitle(/.*/).filter(element => element.tagName.toLowerCase() === 'iframe');
    expect(iframes).toHaveLength(2);
    expect(iframes[0]).toHaveAttribute('src', 'https://www.youtube.com/embed/i5owU7RdC9g');
    expect(iframes[1]).toHaveAttribute('src', 'https://www.youtube.com/embed/U8iCGim-ro0');
  });

  it('renders correct language flags for each talk', () => {
    // given
    render(<SpeakingPage />);

    // then
    const englishElement = screen.getByText((content) => content.includes('🇬🇧') && content.includes('English'));
    const polishElement = screen.getByText((content) => content.includes('🇵🇱') && content.includes('Polish'));
    
    expect(englishElement).toBeInTheDocument();
    expect(polishElement).toBeInTheDocument();
  });
}); 