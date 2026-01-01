import React from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Eye, EyeOff, AlertCircleIcon } from "lucide-react";
import { useSignUpForm } from "../hooks/useSignUpForm";
import type { SignUpSuccessValue } from "../types/SignUpTypes";
import ReCaptchaStatement from "@/components/layout/ReCaptchaStatement";

export interface SignUpFormProps {
  onSuccess?: (value: SignUpSuccessValue) => void;
  onError?: (error: Error) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess, onError }) => {
  const {
    form,
    formError,
    captchaError,
    isSubmitting,
    showPassword,
    setShowPassword,
    reCaptchaLoaded,
    handleReloadPage,
  } = useSignUpForm({ onSuccess });

  const passwordVisibilityToggle = (
    <Button
      className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
      onClick={() => setShowPassword(!showPassword)}
      size="icon"
      type="button"
      variant="ghost"
    >
      {showPassword ? (
        <EyeOff className="h-4 w-4 text-muted-foreground" />
      ) : (
        <Eye className="h-4 w-4 text-muted-foreground" />
      )}
    </Button>
  );

  return (
    <>
      {captchaError && (
        <Alert variant="destructive" className="w-full sm:max-w-md">
          <AlertCircleIcon />
          <AlertTitle>{captchaError}</AlertTitle>
          <Button
            variant="outline"
            size="sm"
            className="my-2 w-max"
            onClick={handleReloadPage}
          >
            Reload Page
          </Button>
        </Alert>
      )}
      {formError && (
        <Alert variant="destructive" className="w-full sm:max-w-md">
          <AlertCircleIcon />
          <AlertTitle>Oh no! An error happened while signing up.</AlertTitle>
          <AlertDescription>
            <p>{formError}</p>
          </AlertDescription>
        </Alert>
      )}
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create a new account to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="sign-up-form"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit().catch(() => {
                if (onError) {
                  onError(new Error("Failed to submit sign up form"));
                }
              });
            }}
          >
            <fieldset disabled={isSubmitting}>
              <FieldGroup>
                <form.Field
                  name="email"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>E-mail</FieldLabel>
                        <Input
                          id={field.name}
                          type="email"
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          placeholder="Enter your email address"
                          autoComplete="off"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
                <form.Field
                  name="password"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                        <div className="relative">
                          <Input
                            id={field.name}
                            type={showPassword ? "text" : "password"}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="Enter your password"
                            autoComplete="off"
                          />
                          {passwordVisibilityToggle}
                        </div>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
                <form.Field
                  name="confirmPassword"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Confirm your password
                        </FieldLabel>
                        <div className="relative">
                          <Input
                            id={field.name}
                            type={showPassword ? "text" : "password"}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="Confirm your password"
                            autoComplete="off"
                          />
                          {passwordVisibilityToggle}
                        </div>
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
                type="submit"
                form="sign-up-form"
                disabled={!reCaptchaLoaded || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner /> Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </Field>
            <CardDescription className="mt-4">
              <ReCaptchaStatement />
            </CardDescription>
          </fieldset>
        </CardFooter>
      </Card>
    </>
  );
};

export default SignUpForm;
