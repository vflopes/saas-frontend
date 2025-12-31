import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { PartyPopper } from "lucide-react";
import { useSignUpSuccess } from "../hooks/useSignUpSuccess";

export interface SignUpSuccessProps {
  countdownSeconds?: number;
  onExpire?: () => void;
  autoSignInOnExpire?: boolean;
}

const SignUpSuccess: React.FC<SignUpSuccessProps> = ({
  countdownSeconds,
  onExpire,
  autoSignInOnExpire = false,
}) => {
  const { remainingSeconds } = useSignUpSuccess({
    countdownSeconds,
    onExpire,
    autoSignInOnExpire,
  });

  return (
    <Alert className="w-full sm:max-w-md">
      <PartyPopper />
      <AlertTitle>Your account has been created successfully!</AlertTitle>
      <AlertDescription>
        You'll be redirected to sign in{" "}
        {remainingSeconds > 0 ? `in ${remainingSeconds} seconds` : `now`}.
      </AlertDescription>
    </Alert>
  );
};

export default SignUpSuccess;
