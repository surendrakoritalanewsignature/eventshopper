import {
  ISSUER,
  CLIENT_ID,
  REDIRECT_URL,
  READ_ACCESS,
  SU_AUTHORIZATION,
  SU_TOKEN,
  SU_REVOCATION,
  PR_AUTHORIZATION,
  PR_TOKEN,
  PR_REVOCATION,
  PE_AUTHORIZATION,
  PE_TOKEN,
  PE_REVOCATION,
} from "@env";

export const signupsigninconfig = {
  issuer: ISSUER,
  clientId: CLIENT_ID,
  redirectUrl: REDIRECT_URL,
  additionalParameters: {
    prompt: 'login'
  },
  scopes: ["openid", READ_ACCESS, "offline_access"],

  serviceConfiguration: {
    authorizationEndpoint: SU_AUTHORIZATION,
    tokenEndpoint: SU_TOKEN,
    revocationEndpoint: SU_REVOCATION,
  },
};

export const passwordresetconfig = {
  issuer: ISSUER,
  clientId: CLIENT_ID,
  redirectUrl: REDIRECT_URL,
  scopes: ["openid", READ_ACCESS, "offline_access"],

  serviceConfiguration: {
    authorizationEndpoint: PR_AUTHORIZATION,
    tokenEndpoint: PR_TOKEN,
    revocationEndpoint: PR_REVOCATION,
  },
};

export const profileeditconfig = {
  issuer: ISSUER,
  clientId: CLIENT_ID,
  redirectUrl: REDIRECT_URL,
  additionalParameters: {},
  scopes: ["openid", READ_ACCESS, "offline_access"],

  serviceConfiguration: {
    authorizationEndpoint: PE_AUTHORIZATION,
    tokenEndpoint: PE_TOKEN,
    revocationEndpoint: PE_REVOCATION,
  },
};


