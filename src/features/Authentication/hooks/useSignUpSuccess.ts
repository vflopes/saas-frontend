import { useState, useEffect } from "react";
import { useAutoSignIn } from "../apis/sign-in.queries";

interface UseSignUpSuccessProps {
  countdownSeconds?: number;
  onExpire?: () => void;
  autoSignInOnExpire?: boolean;
}

export const useSignUpSuccess = ({
  countdownSeconds = 0,
  onExpire,
  autoSignInOnExpire = false,
}: UseSignUpSuccessProps) => {
  const [remainingSeconds, setRemainingSeconds] = useState(countdownSeconds);
  const autoSignIn = useAutoSignIn();

  useEffect(() => {
    if (remainingSeconds <= 0) {
      if (autoSignInOnExpire) {
        autoSignIn.refetch().then(() => {
          if (onExpire) onExpire();
        });
        return;
      }
      if (onExpire) onExpire();
      return;
    }

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingSeconds, autoSignInOnExpire, onExpire, autoSignIn]);

  return { remainingSeconds };
};
