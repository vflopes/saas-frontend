import { describe, expect, it } from "vitest";
import { ConfirmSignUpSchema } from "./SignUpTypes";

describe("ConfirmSignUpSchema", () => {
  it("accepts exactly six numeric digits", () => {
    const result = ConfirmSignUpSchema.safeParse({
      confirmationCode: "123456",
    });

    expect(result.success).toBe(true);
  });

  it("rejects codes shorter than six digits", () => {
    const result = ConfirmSignUpSchema.safeParse({
      confirmationCode: "12345",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Confirmation code must be exactly 6 digits"
      );
    }
  });

  it("rejects codes longer than six digits", () => {
    const result = ConfirmSignUpSchema.safeParse({
      confirmationCode: "1234567",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Confirmation code must be exactly 6 digits"
      );
    }
  });

  it("rejects non-numeric characters", () => {
    const result = ConfirmSignUpSchema.safeParse({
      confirmationCode: "12ab56",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Confirmation code must be exactly 6 digits"
      );
    }
  });
});
