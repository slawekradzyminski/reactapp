import { useParams } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import useTipNavigation from "./useTipNavigation";
import tipsData from "../data/tipsData.json";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

describe("useTipNavigation", () => {
  it("should initialize with a random tip when no tipId is provided", () => {
    // given
    vi.mocked(useParams).mockReturnValue({ tipId: undefined });
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    // when
    const { result } = renderHook(() => useTipNavigation(), {
      wrapper: MemoryRouter,
    });

    // then
    expect(result.current.selectedTip).toBeDefined();
    expect(tipsData).toContainEqual(result.current.selectedTip);
  });

  it("should select the correct tip when tipId is provided", () => {
    // given
    const tipId = tipsData[2].id;
    vi.mocked(useParams).mockReturnValue({ tipId });
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    // when
    const { result } = renderHook(() => useTipNavigation(), {
      wrapper: MemoryRouter,
    });

    // then
    expect(result.current.selectedTip).toBeDefined();
    expect(result.current.selectedTip.id).toBe(tipId);
  });

  it("should navigate to the next tip", () => {
    // given
    const currentTipIndex = 1;
    const currentTipId = tipsData[currentTipIndex].id;
    vi.mocked(useParams).mockReturnValue({ tipId: currentTipId });
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    const { result } = renderHook(() => useTipNavigation(), {
      wrapper: MemoryRouter,
    });

    // when
    act(() => {
      result.current.handleNavigation("next");
    });

    // then
    expect(mockNavigate).toHaveBeenCalledWith(
      `/tips/${tipsData[currentTipIndex + 1].id}`
    );
  });

  it("should navigate to the previous tip", () => {
    // given
    const currentTipIndex = 1;
    const currentTipId = tipsData[currentTipIndex].id;
    vi.mocked(useParams).mockReturnValue({ tipId: currentTipId });
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    const { result } = renderHook(() => useTipNavigation(), {
      wrapper: MemoryRouter,
    });

    // when
    act(() => {
      result.current.handleNavigation("prev");
    });

    // then
    expect(mockNavigate).toHaveBeenCalledWith(
      `/tips/${tipsData[currentTipIndex - 1].id}`
    );
  });

  it("should not navigate when at the first tip and trying to go previous", () => {
    // given
    const currentTipId = tipsData[0].id;
    vi.mocked(useParams).mockReturnValue({ tipId: currentTipId });
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    const { result } = renderHook(() => useTipNavigation(), {
      wrapper: MemoryRouter,
    });

    // when
    act(() => {
      result.current.handleNavigation("prev");
    });

    // then
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("should not navigate when at the last tip and trying to go next", () => {
    // given
    const currentTipId = tipsData[tipsData.length - 1].id;
    vi.mocked(useParams).mockReturnValue({ tipId: currentTipId });
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    const { result } = renderHook(() => useTipNavigation(), {
      wrapper: MemoryRouter,
    });

    // when
    act(() => {
      result.current.handleNavigation("next");
    });

    // then
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("should navigate to a specific tip", () => {
    // given
    vi.mocked(useParams).mockReturnValue({ tipId: undefined });
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    const { result } = renderHook(() => useTipNavigation(), {
      wrapper: MemoryRouter,
    });
    const targetTipId = "keep-coding";

    // when
    act(() => {
      result.current.onNavigateToTip(targetTipId);
    });

    // then
    expect(mockNavigate).toHaveBeenCalledWith(`/tips/${targetTipId}`);
  });
});
