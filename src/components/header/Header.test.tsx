import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";
import Header from "./Header";
import useMediaQuery from "@mui/material/useMediaQuery";

vi.mock("./Logo", () => ({
  default: () => <div data-testid="mock-logo">Mock Logo</div>,
}));
vi.mock("./MobileMenu", () => ({
  default: () => <div data-testid="mock-mobile-menu">Mock Mobile Menu</div>,
}));
vi.mock("./DesktopMenu", () => ({
  default: () => <div data-testid="mock-desktop-menu">Mock Desktop Menu</div>,
}));
vi.mock("./LinkedInFollow", () => ({
  default: () => (
    <div data-testid="mock-linkedin-follow">Mock LinkedIn Follow</div>
  ),
}));

vi.mock("@mui/material/useMediaQuery", () => ({
  default: vi.fn()
}));

it("renders Header component correctly", () => {
  // given
  vi.mocked(useMediaQuery).mockReturnValue(false);

  // when
  render(<Header />);

  // then
  expect(screen.getByTestId("mock-logo")).toBeInTheDocument();
  expect(screen.getByTestId("mock-desktop-menu")).toBeInTheDocument();
  expect(screen.getByTestId("mock-desktop-menu")).toBeInTheDocument();
  expect(screen.getByTestId("mock-linkedin-follow")).toBeInTheDocument();
});

it("renders MobileMenu when on mobile view", () => {
  // given
  vi.mocked(useMediaQuery).mockReturnValue(true);

  // when
  render(<Header />);

  // then
  expect(screen.getByTestId("mock-mobile-menu")).toBeInTheDocument();
  expect(screen.queryByTestId("mock-desktop-menu")).not.toBeInTheDocument();
});
