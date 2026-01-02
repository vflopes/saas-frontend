import * as z from "zod";
import type { SignUpOutput } from "@aws-amplify/auth";

export interface SignUpSuccessValue {
  username: string;
  signUpOutput: SignUpOutput;
}

export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export const getSignUpDefaultValues = (): SignUpFormData => ({
  email: "",
  password: "",
  confirmPassword: "",
});

export const SignUpFormSchema = z
  .object({
    email: z.email("Invalid email address"),
    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must include at least one lowercase letter.")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
      .regex(/[0-9]/, "Password must include at least one digit.")
      .regex(/[^A-Za-z0-9]/, "Password must include at least one symbol."),
    confirmPassword: z
      .string()
      .trim()
      .min(8, "Confirm Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export interface ConfirmSignUpData {
  confirmationCode: string;
}

export const getConfirmSignUpDefaultValues = (): ConfirmSignUpData => ({
  confirmationCode: "",
});

export const ConfirmSignUpSchema = z.object({
  confirmationCode: z
    .string()
    .regex(/^\d{6}$/, "Confirmation code must be exactly 6 digits"),
});

export type DeliveryMedium = "EMAIL" | "SMS" | "PHONE" | "UNKNOWN";

export type SignUpSteps =
  | "SIGN_UP"
  | "CONFIRM_SIGN_UP"
  | "DONE"
  | "COMPLETE_AUTO_SIGN_IN";
