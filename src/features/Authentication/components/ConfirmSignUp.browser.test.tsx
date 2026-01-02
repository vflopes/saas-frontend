import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, beforeEach } from "vitest";
import ConfirmSignUp from "./ConfirmSignUp";

const defaultProps = {
  username: "user@example.com",
  deliveryMedium: "EMAIL" as const,
  destination: "user@example.com",
};

const renderComponent = () => {
  const queryClient = new QueryClient();
  const renderResult = render(
    <QueryClientProvider client={queryClient}>
      <ConfirmSignUp {...defaultProps} />
    </QueryClientProvider>
  );

  return { queryClient, ...renderResult };
};

describe("ConfirmSignUp", () => {
  beforeEach(() => {
    cleanup();
  });

  test("renders six OTP slots and enforces numeric-only input up to six digits", async () => {
    const user = userEvent.setup();
    const { container } = renderComponent();

    const slots = container.querySelectorAll('[data-slot="input-otp-slot"]');
    expect(slots.length).toBe(6);

    const input = container.querySelector('input[maxlength="6"]');
    expect(input).not.toBeNull();
    if (!input) return;

    await user.type(input, "12ab34cd5678");

    expect((input as HTMLInputElement).value).toBe("123456");
    expect(input.getAttribute("pattern")).toBe("[0-9]*");
    expect(input.getAttribute("inputmode")).toBe("numeric");
    expect(input.getAttribute("maxlength")).toBe("6");
  });
});
