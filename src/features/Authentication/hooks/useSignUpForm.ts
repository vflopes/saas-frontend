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

export const useSignUpForm = ({ onSuccess }: UseSignUpFormProps) => {
  const [username] = useState(crypto.randomUUID());
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const signUp = useSignUp();

  const { generateReCaptchaToken } = useReCaptcha();

  const form = useForm({
    defaultValues: getSignUpDefaultValues(),
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      setFormError(null);
      signUp.mutate(
        {
          username,
          email: value.email,
          password: value.password.trim(),
          reCaptchaToken: await generateReCaptchaToken("SignUp"),
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
    isSubmitting,
    showPassword,
    setShowPassword,
    username,
  };
};
