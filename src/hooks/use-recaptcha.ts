import { useEffect, useState } from "react";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export interface UseReCaptchaOptions {
  siteKey?: string;
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

const useReCaptcha = ({
  siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY,
}: UseReCaptchaOptions = {}): UseReCaptchaReturn => {
  const [reCaptchaLoaded, setReCaptchaLoaded] = useState(false);

  useEffect(() => {
    if (window.grecaptcha) {
      setReCaptchaLoaded(true);
      return;
    }

    if (typeof window === "undefined" || reCaptchaLoaded) {
      return;
    }

    const script = document.createElement("script");

    script.async = true;
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.addEventListener("load", () => {
      setReCaptchaLoaded(true);
    });

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [siteKey, reCaptchaLoaded]);

  const generateReCaptchaToken = async (action: string): Promise<string> => {
    if (!reCaptchaLoaded) {
      throw new Error("ReCaptcha not loaded");
    }

    if (typeof window === "undefined" || !window.grecaptcha) {
      setReCaptchaLoaded(false);
      throw new Error("ReCaptcha not loaded");
    }

    await new Promise((resolve) => {
      window.grecaptcha.ready(() => {
        resolve(true);
      });
    });
    return await window.grecaptcha.execute(siteKey, { action });
  };

  return {
    generateReCaptchaToken,
    reCaptchaLoaded,
  };
};

export default useReCaptcha;
