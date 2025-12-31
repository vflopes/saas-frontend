import React from "react";

import { type DeliveryMedium } from "../types/SignUpTypes";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { AlertCircleIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import type { ConfirmSignUpOutput } from "@aws-amplify/auth";
import { useConfirmSignUpForm } from "../hooks/useConfirmSignUpForm";

export interface ConfirmSignUpProps {
  username: string;
  deliveryMedium: DeliveryMedium;
  destination: string;

  onSuccess?: (confirmSignUpOutput: ConfirmSignUpOutput) => void;
}

const ConfirmSignUp: React.FC<ConfirmSignUpProps> = ({
  username,
  deliveryMedium,
  destination,
  onSuccess,
}) => {
  const { form, formError, isSubmitting } = useConfirmSignUpForm({
    username,
    onSuccess,
  });

  return (
    <>
      {formError && (
        <Alert variant="destructive" className="w-full sm:max-w-md">
          <AlertCircleIcon />
          <AlertTitle>An error happened while confirming sign up.</AlertTitle>
          <AlertDescription>
            <p>{formError}</p>
          </AlertDescription>
        </Alert>
      )}
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Confirm Sign Up</CardTitle>
          <CardDescription>
            A confirmation code has been sent to your{" "}
            {deliveryMedium === "EMAIL" ? "e-mail" : "phone number"} at{" "}
            {destination}. Please enter the code below to confirm your sign up.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="confirm-sign-up-form"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <fieldset disabled={isSubmitting}>
              <FieldGroup>
                <form.Field
                  name="confirmationCode"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Confirmation Code
                        </FieldLabel>
                        <InputOTP
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(value) => field.handleChange(value)}
                          aria-invalid={isInvalid}
                          maxLength={6}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </FieldGroup>
            </fieldset>
          </form>
        </CardContent>
        <CardFooter>
          <fieldset disabled={isSubmitting}>
            <Field orientation="horizontal">
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button type="submit" form="confirm-sign-up-form">
                {isSubmitting ? (
                  <>
                    <Spinner /> Confirming...
                  </>
                ) : (
                  "Confirm"
                )}
              </Button>
            </Field>
          </fieldset>
        </CardFooter>
      </Card>
    </>
  );
};

export default ConfirmSignUp;
