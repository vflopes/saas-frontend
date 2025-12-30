import { describe, expect, test, vi } from "vitest";
import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignUpForm from "./SignUpForm";
import { useSignUp } from "../apis/sign-up.mutations";

// Prevent real network calls from the sign-up mutation
vi.mock("../apis/sign-up.mutations", () => ({
  useSignUp: vi.fn().mockReturnValue({ mutate: vi.fn() }),
}));

describe("SignUpForm password requirement", () => {
  test("requires a password to submit", async () => {
    const useSignUpMock = vi.mocked(useSignUp);

    const { getByRole, getByText } = render(<SignUpForm />);

    const submitButton = getByRole("button", { name: /submit/i });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        getByText(/^Password must be at least 8 characters long/i)
      ).toBeInTheDocument();
      expect(useSignUpMock().mutate).not.toHaveBeenCalled();
    });
  });

  test("hides password fields by default", () => {
    const { getByLabelText } = render(<SignUpForm />);

    const passwordInput = getByLabelText(/^Password$/i) as HTMLInputElement;
    const confirmPasswordInput = getByLabelText(
      /confirm your password/i
    ) as HTMLInputElement;

    expect(passwordInput.type).toBe("password");
    expect(confirmPasswordInput.type).toBe("password");
  });

  test("allows toggling password visibility", async () => {
    const { getByLabelText } = render(<SignUpForm />);

    const passwordInput = getByLabelText(/^Password$/i) as HTMLInputElement;
    const confirmPasswordInput = getByLabelText(
      /confirm your password/i
    ) as HTMLInputElement;

    const toggleButton = within(
      passwordInput.parentElement as HTMLElement
    ).getByRole("button");

    await userEvent.click(toggleButton);
    expect(passwordInput.type).toBe("text");
    expect(confirmPasswordInput.type).toBe("text");

    await userEvent.click(toggleButton);
    expect(passwordInput.type).toBe("password");
    expect(confirmPasswordInput.type).toBe("password");
  });
});
