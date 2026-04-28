import type {} from "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../src/App";

function expectStat(label: string, value: string) {
  const stat = screen.getByText(label).closest("div");

  expect(stat).not.toBeNull();
  expect(within(stat as HTMLElement).getByText(value)).toBeInTheDocument();
}

describe("App", () => {
  it("adds points, undoes, and redoes canvas history", () => {
    render(<App />);

    const canvas = screen.getByRole("button", { name: /drawing canvas/i });
    const undoButton = screen.getByRole("button", { name: /undo/i });
    const redoButton = screen.getByRole("button", { name: /redo/i });

    expect(undoButton).toBeDisabled();
    expect(redoButton).toBeDisabled();

    fireEvent.click(canvas, { clientX: 100, clientY: 120 });
    fireEvent.click(canvas, { clientX: 180, clientY: 220 });

    expectStat("Points on canvas:", "2");
    expectStat("History states:", "3");
    expect(screen.getAllByLabelText(/point/i)).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Undo (2)" })).toBeEnabled();

    fireEvent.click(screen.getByRole("button", { name: "Undo (2)" }));

    expect(screen.getAllByLabelText(/point/i)).toHaveLength(1);
    expect(screen.getByRole("button", { name: "Redo (1)" })).toBeEnabled();
    expectStat("Future states:", "1");

    fireEvent.click(screen.getByRole("button", { name: "Redo (1)" }));

    expect(screen.getAllByLabelText(/point/i)).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Redo (0)" })).toBeDisabled();
  });

  it("clears redo history after a new point is added", () => {
    render(<App />);

    const canvas = screen.getByRole("button", { name: /drawing canvas/i });

    fireEvent.click(canvas, { clientX: 40, clientY: 60 });
    fireEvent.click(canvas, { clientX: 80, clientY: 100 });
    fireEvent.click(screen.getByRole("button", { name: "Undo (2)" }));

    expect(screen.getByRole("button", { name: "Redo (1)" })).toBeEnabled();

    fireEvent.click(canvas, { clientX: 120, clientY: 140 });

    expect(screen.getAllByLabelText(/point/i)).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Redo (0)" })).toBeDisabled();
    expectStat("Future states:", "0");
  });
});
