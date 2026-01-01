import { useState } from "react";
import useReCaptcha from "@/hooks/use-recaptcha.ts";
import { useForm } from "@tanstack/react-form";
import { useSignUp } from "../apis/sign-up.mutations";
import {
  getSignUpDefaultValues,
  SignUpFormSchema,
  type SignUpSuccessValue,
} from "../types/SignUpTypes";

interface UseSignUpFormProps {
  onSuccess?: (value: SignUpSuccessValue) => void;
}

const CAPTCHA_ERROR_MESSAGE =
  "We couldn't verify you via reCAPTCHA. Please reload the page and try again.";

export const useSignUpForm = ({ onSuccess }: UseSignUpFormProps) => {
  const [username] = useState(crypto.randomUUID());
  const [formError, setFormError] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const signUp = useSignUp();

  const { generateReCaptchaToken, reCaptchaLoaded } = useReCaptcha();

  const handleReloadPage = () => {
    window.location.reload();
  };

  const form = useForm({
    defaultValues: getSignUpDefaultValues(),
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      setFormError(null);
      setCaptchaError(null);

      // Attempt to generate reCAPTCHA token before proceeding
      let reCaptchaToken: string;
      try {
        reCaptchaToken = await generateReCaptchaToken("SignUp");
      } catch {
        setCaptchaError(CAPTCHA_ERROR_MESSAGE);
        setIsSubmitting(false);
        return;
      }

      signUp.mutate(
        {
          username,
          email: value.email,
          password: value.password.trim(),
          reCaptchaToken,
        },
        {
          onSuccess: (signUpOutput) => {
            if (onSuccess) {
              onSuccess({ username, signUpOutput });
            }
            form.reset();
          },
          onError: (error) => {
            setFormError(error.message);
          },
          onSettled: () => {
            setIsSubmitting(false);
          },
        }
      );
    },
    validators: {
      onChange: SignUpFormSchema,
    },
  });

  return {
    form,
    formError,
    captchaError,
    isSubmitting,
    showPassword,
    setShowPassword,
    username,
    reCaptchaLoaded,
    handleReloadPage,
  };
};
