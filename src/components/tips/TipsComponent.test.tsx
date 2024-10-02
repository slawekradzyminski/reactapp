import { render, screen } from '@testing-library/react';
import { it, expect, describe, vi } from 'vitest';
import TipsComponent from './TipsComponent';
import { useMediaQuery } from "@mui/material";

vi.mock("@mui/material", () => ({
  useMediaQuery: vi.fn(),
}));

vi.mock("./mobile/MobileTipView", () => ({
  default: () => <div data-testid="mock-mobile-tip-view">Mobile Tip View</div>,
}));

vi.mock("./desktop/DesktopTipView", () => ({
  default: () => <div data-testid="mock-desktop-tip-view">Desktop Tip View</div>,
}));

describe('TipsComponent', () => {
  it('renders MobileTipView when screen width is 900px or less', () => {
    // given
    vi.mocked(useMediaQuery).mockReturnValue(true);

    // when
    render(<TipsComponent />);

    // then
    expect(screen.getByTestId('mock-mobile-tip-view')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-desktop-tip-view')).not.toBeInTheDocument();
  });

  it('renders DesktopTipView when screen width is greater than 900px', () => {
    // given
    vi.mocked(useMediaQuery).mockReturnValue(false);

    // when
    render(<TipsComponent />);

    // then
    expect(screen.getByTestId('mock-desktop-tip-view')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-mobile-tip-view')).not.toBeInTheDocument();
  });

});