import React from "react";

const ReCaptchaStatement: React.FC = () => {
  return (
    <p className="text-xs text-gray-600 max-w-sm">
      This site is protected by reCAPTCHA and the Google{" "}
      <a
        href="https://policies.google.com/privacy"
        className="text-primary underline underline-offset-4"
      >
        Privacy Policy
      </a>{" "}
      and{" "}
      <a
        href="https://policies.google.com/terms"
        className="text-primary underline underline-offset-4"
      >
        Terms of Service
      </a>{" "}
      apply.
    </p>
  );
};

export default ReCaptchaStatement;
