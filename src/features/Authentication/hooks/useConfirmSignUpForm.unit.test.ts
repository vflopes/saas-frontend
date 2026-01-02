import { describe, expect, it } from "vitest";
import { sanitizeConfirmationCode } from "./useConfirmSignUpForm";

describe("sanitizeConfirmationCode", () => {
  it("strips non-digit characters", () => {
    expect(sanitizeConfirmationCode("12ab34!@56")).toBe("123456");
  });

  it("truncates input to six digits", () => {
    expect(sanitizeConfirmationCode("1234567899")).toBe("123456");
  });

  it("preserves leading zeros within six digits", () => {
    expect(sanitizeConfirmationCode("00123456")).toBe("001234");
  });
});
