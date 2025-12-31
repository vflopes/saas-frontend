import React from "react";

import SignInForm from "@/features/Authentication/components/SignInForm";
import SignUpCallToAction from "@/features/Authentication/components/SignUpCallToAction";

const SignInPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-start gap-y-8">
      <SignInForm />
      <SignUpCallToAction />
    </div>
  );
};

export default SignInPage;
