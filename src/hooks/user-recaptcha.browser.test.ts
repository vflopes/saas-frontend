import { describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useReCaptcha from "./use-recaptcha";

describe("useReCaptcha", () => {
  test("marks as loaded when grecaptcha is provided", async () => {
    const grecaptcha = {
      ready: (cb: () => void) => cb(),
      execute: vi.fn(),
    };

    const { result } = renderHook(() =>
      useReCaptcha({ grecaptcha, loadScript: vi.fn() })
    );

    await waitFor(() => {
      expect(result.current.reCaptchaLoaded).toBe(true);
    });
  });

  test("generates token using provided grecaptcha", async () => {
    const execute = vi.fn().mockResolvedValue("token-123");
    const grecaptcha = {
      ready: (cb: () => void) => cb(),
      execute,
    };

    const { result } = renderHook(() => useReCaptcha({ grecaptcha }));

    const token = await result.current.generateReCaptchaToken("action");

    expect(execute).toHaveBeenCalledWith(expect.any(String), {
      action: "action",
    });
    expect(token).toBe("token-123");
  });

  test("calls loadScript when grecaptcha is missing", async () => {
    const onLoad = vi.fn();
    const loadScript = vi.fn().mockImplementation((_key, cb) => {
      onLoad.mockImplementation(cb);
      // Simulate returning cleanup fn
      return () => {};
    });

    const { result } = renderHook(() => useReCaptcha({ loadScript }));

    // Simulate script load completion
    onLoad();

    await waitFor(() => {
      expect(result.current.reCaptchaLoaded).toBe(true);
    });

    expect(loadScript).toHaveBeenCalledTimes(1);
  });

  test("throws when token requested before load", async () => {
    const { result } = renderHook(() => useReCaptcha({ loadScript: vi.fn() }));

    await expect(
      result.current.generateReCaptchaToken("action")
    ).rejects.toThrow("ReCaptcha not loaded");
  });
});
