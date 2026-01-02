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
  try {
    const signUpOutput = await signUp({
      username,
      password,
      options: {
        userAttributes: {
          email,
        },
        validationData: {
          reCaptchaToken,
        },
        // autoSignIn: {
        //   authFlowType: "USER_AUTH",
        // },
      },
    });
    return signUpOutput;
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("PreSignUp")) {
      throw new Error(
        error.message
          .substring("PreSignUp failed with error ".length)
          .slice(0, -1)
      );
    }
  }
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
