interface ImportMetaEnv {
  readonly VITE_AWS_COGNITO_USER_POOL_ID: string;
  readonly VITE_AWS_COGNITO_USER_POOL_WEB_CLIENT_ID: string;
  readonly VITE_RECAPTCHA_SITE_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
