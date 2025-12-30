import React from "react";

import SignUpForm from "@/features/Authentication/components/SignUpForm";
import ConfirmSignUp from "@/features/Authentication/components/ConfirmSignUp";
import SignUpSuccess from "@/features/Authentication/components/SignUpSuccess";
import { useSignUpFlow } from "@/features/Authentication/hooks/useSignUpFlow";

const SignUpPage: React.FC = () => {
  const {
    username,
    confirmationInfo,
    signUpStep,
    handleSignUpSuccess,
    handleConfirmSignUpSuccess,
    handleSignUpDone,
  } = useSignUpFlow();

  return (
    <div className="w-full max-w-xl flex flex-col items-center justify-start gap-y-8">
      {signUpStep === "SIGN_UP" && (
        <SignUpForm onSuccess={handleSignUpSuccess} />
      )}
      {signUpStep === "CONFIRM_SIGN_UP" && (
        <ConfirmSignUp
          username={username}
          deliveryMedium={confirmationInfo!.deliveryMedium}
          destination={confirmationInfo!.destination}
          onSuccess={handleConfirmSignUpSuccess}
        />
      )}
      {signUpStep === "DONE" && (
        <SignUpSuccess countdownSeconds={5} onExpire={handleSignUpDone} />
      )}
    </div>
  );
};

export default SignUpPage;
