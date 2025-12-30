import { signUp, confirmSignUp, autoSignIn } from "aws-amplify/auth";

export interface SignUpParams {
  username: string;
  email: string;
  password: string;
  reCaptchaToken: string;
}

export const signUpService = async ({
  username,
  email,
  password,
  reCaptchaToken,
}: SignUpParams) => {
  return await signUp({
    username,
    password,
    options: {
      userAttributes: {
        email,
      },
      clientMetadata: {
        reCaptchaToken,
      },
      // autoSignIn: {
      //   authFlowType: "USER_AUTH",
      // },
    },
  });
};

export interface ConfirmSignUpParams {
  username: string;
  confirmationCode: string;
}

export const confirmSignUpService = async ({
  username,
  confirmationCode,
}: ConfirmSignUpParams) => {
  return await confirmSignUp({
    username,
    confirmationCode,
  });
};

export const autoSignInService = async () => {
  return await autoSignIn();
};
