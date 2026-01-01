import { describe, expect, test, vi, beforeEach } from "vitest";
import { renderHook, waitFor, cleanup } from "@testing-library/react";
import useReCaptcha from "./use-recaptcha";

describe("useReCaptcha", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    vi.stubEnv("VITE_RECAPTCHA_SITE_KEY", "test-site-key");
  });

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
    const loadScript = vi
      .fn<(key: string, onLoad: () => void) => () => void>()
      .mockImplementation((_key, onLoadCb) => {
        onLoadCb();
        const cleanup = vi.fn(() => undefined);
        return cleanup;
      });

    const { result } = renderHook(() => useReCaptcha({ loadScript }));

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
