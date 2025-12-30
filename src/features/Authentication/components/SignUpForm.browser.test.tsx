import { beforeEach, describe, expect, test, vi } from "vitest";

import { render, waitFor, within, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignUpForm from "./SignUpForm";
import { useSignUp } from "../apis/sign-up.mutations";

vi.mock("../apis/sign-up.mutations", () => ({
  useSignUp: vi.fn().mockReturnValue({ mutate: vi.fn() }),
}));

vi.mock("@/hooks/use-recaptcha.ts", () => ({
  __esModule: true,
  default: vi.fn().mockReturnValue({
    generateReCaptchaToken: vi.fn().mockResolvedValue("token"),
    reCaptchaLoaded: true,
  }),
}));

describe("SignUpForm password requirement", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test("requires a password to submit", async () => {
    const useSignUpMock = vi.mocked(useSignUp);

    const screen = render(<SignUpForm />);

    const submitButton = screen.getByRole("button", { name: /submit/i });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/^Password must be at least 8 characters long/i)
      ).toBeInTheDocument();
      expect(useSignUpMock().mutate).not.toHaveBeenCalled();
    });
  });

  test("hides password fields by default", () => {
    const screen = render(<SignUpForm />);

    const passwordInput = screen.getByLabelText(
      /^Password$/i
    ) as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText(
      /confirm your password/i
    ) as HTMLInputElement;

    expect(passwordInput.type).toBe("password");
    expect(confirmPasswordInput.type).toBe("password");
  });

  test("allows toggling password visibility", async () => {
    const screen = render(<SignUpForm />);

    const passwordInput = screen.getByLabelText(
      /^Password$/i
    ) as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText(
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

  test("requires confirming the password before submitting", async () => {
    const useSignUpMock = vi.mocked(useSignUp);

    const screen = render(<SignUpForm />);

    await userEvent.type(screen.getByLabelText(/e-mail/i), "test@example.com");
    await userEvent.type(screen.getByLabelText(/^Password$/i), "Validpass1!");

    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/confirm password must be at least 8 characters long/i)
      ).toBeInTheDocument();
      expect(useSignUpMock().mutate).not.toHaveBeenCalled();
    });
  });

  test("flags mismatched passwords and blocks submission", async () => {
    const useSignUpMock = vi.mocked(useSignUp);

    const screen = render(<SignUpForm />);

    await userEvent.type(screen.getByLabelText(/e-mail/i), "test@example.com");
    await userEvent.type(screen.getByLabelText(/^Password$/i), "Validpass1!");
    await userEvent.type(
      screen.getByLabelText(/confirm your password/i),
      "Anotherpass1!"
    );

    await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
      expect(useSignUpMock().mutate).not.toHaveBeenCalled();
    });
  });

  test("trims surrounding whitespace before validating passwords", async () => {
    const useSignUpMock = vi.mocked(useSignUp);

    const screen = render(<SignUpForm />);

    await userEvent.type(screen.getByLabelText(/e-mail/i), "test@example.com");
    await userEvent.type(
      screen.getByLabelText(/^Password$/i),
      "  Validpass1!  "
    );
    await userEvent.type(
      screen.getByLabelText(/confirm your password/i),
      "  Validpass1!  "
    );

    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(useSignUpMock().mutate).toHaveBeenCalledWith(
        expect.objectContaining({ password: "Validpass1!" }),
        expect.any(Object)
      );
    });

    expect(
      screen.queryByText(/password must be at least 8 characters long/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/passwords do not match/i)
    ).not.toBeInTheDocument();
  });

  test.each([
    {
      password: "Va1!",
      message: /^password must be at least 8 characters long/i,
      description: "rejects passwords shorter than 8 characters",
    },
    {
      password: "validpass1!",
      message: /password must include at least one uppercase letter/i,
      description: "rejects passwords without uppercase letters",
    },
    {
      password: "VALIDPASS1!",
      message: /password must include at least one lowercase letter/i,
      description: "rejects passwords without lowercase letters",
    },
    {
      password: "Validpass!",
      message: /password must include at least one digit/i,
      description: "rejects passwords without digits",
    },
    {
      password: "Validpass1",
      message: /password must include at least one symbol/i,
      description: "rejects passwords without symbols",
    },
  ])("$description", async ({ password, message }) => {
    const useSignUpMock = vi.mocked(useSignUp);
    const screen = render(<SignUpForm />);

    await userEvent.type(screen.getByLabelText(/e-mail/i), "test@example.com");
    await userEvent.type(screen.getByLabelText(/^Password$/i), password);
    await userEvent.type(
      screen.getByLabelText(/confirm your password/i),
      password
    );

    await userEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument();
      expect(useSignUpMock().mutate).not.toHaveBeenCalled();
    });
  });
});
