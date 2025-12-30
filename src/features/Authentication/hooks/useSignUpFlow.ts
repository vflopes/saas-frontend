import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { ConfirmSignUpOutput } from "@aws-amplify/auth";
import {
  type SignUpSteps,
  type SignUpSuccessValue,
  type DeliveryMedium,
} from "../types/SignUpTypes";

export interface UseSignUpFlowProps {
  initialStep?: SignUpSteps;
  username?: string;
}

export const useSignUpFlow = ({
  initialStep = "SIGN_UP",
  username: initialUsername = "",
}: UseSignUpFlowProps = {}) => {
  if (initialStep !== "SIGN_UP" && !initialUsername) {
    throw new Error("Username must be provided if initialStep is not SIGN_UP");
  }

  const [username, setUsername] = useState(initialUsername);
  const [confirmationInfo, setConfirmationInfo] = useState<null | {
    deliveryMedium: DeliveryMedium;
    destination: string;
  }>(null);
  const [signUpStep, setSignUpStep] = useState<SignUpSteps>(initialStep);

  const navigate = useNavigate();

  const handleSignUpSuccess = (value: SignUpSuccessValue) => {
    const { signUpStep: step } = value.signUpOutput.nextStep;

    setUsername(value.username);

    if (step === "CONFIRM_SIGN_UP") {
      const { deliveryMedium, destination } =
        value.signUpOutput.nextStep.codeDeliveryDetails;

      setConfirmationInfo({
        deliveryMedium: deliveryMedium as DeliveryMedium,
        destination: destination!,
      });
    }

    setSignUpStep(step ?? "SIGN_UP");
  };

  const handleConfirmSignUpSuccess = (
    confirmSignUpOutput: ConfirmSignUpOutput
  ) => {
    setSignUpStep(confirmSignUpOutput.nextStep.signUpStep);
  };

  const handleSignUpDone = () => {
    navigate({
      to: "/sign-in",
      search: (prev) => ({ redirect: prev.redirect }),
    });
  };

  return {
    username,
    confirmationInfo,
    signUpStep,
    handleSignUpSuccess,
    handleConfirmSignUpSuccess,
    handleSignUpDone,
  };
};
