import { useEffect, useState } from "react";

interface Grecaptcha {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
}

declare global {
  interface Window {
    grecaptcha: Grecaptcha;
  }
}

export interface UseReCaptchaOptions {
  siteKey?: string;
  grecaptcha?: Grecaptcha;
  loadScript?: (siteKey: string, onLoad: () => void) => void | (() => void);
}

export interface ReCaptchaResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  score: number;
  action: string;
}

export interface UseReCaptchaReturn {
  generateReCaptchaToken: (action: string) => Promise<string>;
  reCaptchaLoaded: boolean;
}

const defaultLoadScript = (
  siteKey: string,
  onLoad: () => void
): (() => void) => {
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
  script.addEventListener("load", onLoad);
  document.body.appendChild(script);

  return () => {
    script.removeEventListener("load", onLoad);
    document.body.removeChild(script);
  };
};

const useReCaptcha = ({
  siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY,
  grecaptcha,
  loadScript = defaultLoadScript,
}: UseReCaptchaOptions = {}): UseReCaptchaReturn => {
  const [reCaptchaLoaded, setReCaptchaLoaded] = useState(false);

  useEffect(() => {
    const globalGrecaptcha = grecaptcha ?? window.grecaptcha;

    if (globalGrecaptcha) {
      setReCaptchaLoaded(true);
      return;
    }

    if (typeof window === "undefined" || reCaptchaLoaded) {
      return;
    }

    const cleanup = loadScript(siteKey, () => {
      setReCaptchaLoaded(true);
    });

    return typeof cleanup === "function" ? cleanup : undefined;
  }, [siteKey, reCaptchaLoaded, loadScript, grecaptcha]);

  const generateReCaptchaToken = async (action: string): Promise<string> => {
    if (!reCaptchaLoaded) {
      throw new Error("ReCaptcha not loaded");
    }

    const globalGrecaptcha = grecaptcha ?? window.grecaptcha;

    if (typeof window === "undefined" || !globalGrecaptcha) {
      setReCaptchaLoaded(false);
      throw new Error("ReCaptcha not loaded");
    }

    await new Promise((resolve) => {
      globalGrecaptcha.ready(() => {
        resolve(true);
      });
    });
    return await globalGrecaptcha.execute(siteKey, { action });
  };

  return {
    generateReCaptchaToken,
    reCaptchaLoaded,
  };
};

export default useReCaptcha;
