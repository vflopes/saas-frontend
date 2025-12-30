import { describe, expect, test, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
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
});
