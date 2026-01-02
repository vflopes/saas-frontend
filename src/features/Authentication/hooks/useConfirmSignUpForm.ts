import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useConfirmSignUp } from "../apis/sign-up.mutations";
import {
  getConfirmSignUpDefaultValues,
  ConfirmSignUpSchema,
} from "../types/SignUpTypes";
import type { ConfirmSignUpOutput } from "@aws-amplify/auth";

interface UseConfirmSignUpFormProps {
  username: string;
  onSuccess?: (output: ConfirmSignUpOutput) => void;
}

export const sanitizeConfirmationCode = (value: string) =>
  value.replace(/\D/g, "").slice(0, 6);

export const useConfirmSignUpForm = ({
  username,
  onSuccess,
}: UseConfirmSignUpFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const confirmSignUp = useConfirmSignUp();

  const form = useForm({
    defaultValues: getConfirmSignUpDefaultValues(),
    onSubmit: ({ value }) => {
      setIsSubmitting(true);
      setFormError(null);
      confirmSignUp.mutate(
        {
          username,
          confirmationCode: value.confirmationCode,
        },
        {
          onSuccess: (output) => {
            if (onSuccess) {
              onSuccess(output);
            }
          },
          onError: (error) => {
            setFormError(error.message);
          },
          onSettled: () => {
            form.reset();
            setIsSubmitting(false);
          },
        }
      );
    },
    validators: {
      onChange: ConfirmSignUpSchema,
    },
  });

  return {
    form,
    formError,
    isSubmitting,
  };
};
