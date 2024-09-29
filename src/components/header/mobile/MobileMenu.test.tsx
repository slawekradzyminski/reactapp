import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import MobileMenu from "./MobileMenu";

vi.mock("./MenuButton", () => ({
  default: ({ onClick }: { onClick: () => void }) => (
    <button data-testid="mock-menu-button" onClick={onClick}>
      Menu
    </button>
  ),
}));

vi.mock("./MobileMenuItems", () => ({
  default: ({ onItemClick }: { onItemClick: () => void }) => (
    <div data-testid="mock-mobile-menu-items">
      <button onClick={onItemClick}>Menu Item</button>
    </div>
  ),
}));

describe("MobileMenu", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("opens the menu when MenuButton is clicked", async () => {
    // given
    render(
      <MemoryRouter>
        <MobileMenu />
      </MemoryRouter>
    );
    // when
    const menuButton = screen.getByTestId("mock-menu-button");
    await userEvent.click(menuButton);

    // then
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("closes the menu when a menu item is clicked", async () => {
    // given
    render(
      <MemoryRouter>
        <MobileMenu />
      </MemoryRouter>
    );
    const menuButton = screen.getByTestId("mock-menu-button");
    await userEvent.click(menuButton);

    // when
    const menuItem = screen.getByText("Menu Item");
    await userEvent.click(menuItem);

    // then
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  test("closes the menu when clicking outside", async () => {
    // given
    render(<MobileMenu />);

    // when
    const menuButton = screen.getByTestId("mock-menu-button");
    await userEvent.click(menuButton);
    expect(screen.getByRole("menu")).toBeInTheDocument();
    // click outside
    fireEvent.click(screen.getByRole("presentation").firstChild!);

    // then
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });
});
