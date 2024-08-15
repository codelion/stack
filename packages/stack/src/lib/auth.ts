import { KnownError, StackClientInterface } from "@stackframe/stack-shared";
import { InternalSession } from "@stackframe/stack-shared/dist/sessions";
import { StackAssertionError, captureError } from "@stackframe/stack-shared/dist/utils/errors";
import { neverResolve } from "@stackframe/stack-shared/dist/utils/promises";
import { constructRedirectUrl } from "../utils/url";
import { getVerifierAndState, saveVerifierAndState } from "./cookie";

/**
 * This asynchronous function is used for signing in with OAuth. It first saves the verifier and state, 
 * then gets the OAuth URL from the provided interface object, and finally redirects the page to the OAuth URL.
 * @param {Object} iface - An object of StackClientInterface which includes methods to interact with the stack client.
 * @param {Object} options - An object that configures the OAuth provider and the redirect URLs.
 * @param {string} options.provider - The OAuth provider's name.
 * @param {string} options.redirectUrl - The URL to redirect the user to after a successful sign-in.
 * @param {string} options.errorRedirectUrl - The URL to redirect the user to if the sign-in fails.
 * @param {string} [options.providerScope] - Scopes that define the level of access that the application requires. 
 * @returns {Promise<void>} This function does not return anything. It initiatively redirects to the OAuth URL.
 */
export async function signInWithOAuth(
  iface: StackClientInterface,
  options: {
    provider: string,
    redirectUrl: string,
    errorRedirectUrl: string,
    providerScope?: string,
  }
) {
  const { codeChallenge, state } = await saveVerifierAndState();
  const location = await iface.getOAuthUrl({
    provider: options.provider,
    redirectUrl: constructRedirectUrl(options.redirectUrl),
    errorRedirectUrl: constructRedirectUrl(options.errorRedirectUrl),
    codeChallenge,
    state,
    type: "authenticate",
    providerScope: options.providerScope,
  });
  window.location.assign(location);
  await neverResolve();
}

/**
 * This asynchronous function adds a new OAuth provider or Scope to a session.
 * @param {Object}  iface - The interface client with which the stack operations will be conducted.
 * @param {Object}  options - The options object containing provider details and URLs.
 * @param {string}  options.provider - The OAuth provider.
 * @param {string}  options.redirectUrl - The URL to which the user will be redirected after authorization.
 * @param {string}  options.errorRedirectUrl - The URL to which the user will be redirected if errors are encountered during authorization.
 * @param {string}  options.providerScope - The scope at which the provider operates (optional).
 * @param {Object}  session - An instance of InternalSession.
 * @returns {void} This method does not return anything.
 */

export async function addNewOAuthProviderOrScope(
  iface: StackClientInterface,
  options: {
    provider: string,
    redirectUrl: string,
    errorRedirectUrl: string,
    providerScope?: string,
  },
  session: InternalSession,
) {
  const { codeChallenge, state } = await saveVerifierAndState();
  const location = await iface.getOAuthUrl({
    provider: options.provider,
    redirectUrl: constructRedirectUrl(options.redirectUrl),
    errorRedirectUrl: constructRedirectUrl(options.errorRedirectUrl),
    afterCallbackRedirectUrl: constructRedirectUrl(window.location.href),
    codeChallenge,
    state,
    type: "link",
    session,
    providerScope: options.providerScope,
  });
  window.location.assign(location);
  await neverResolve();
}

/**
 * Checks if the current URL has the query parameters for an OAuth callback, and if so, removes them.
 *
 * Must be synchronous for the logic in callOAuthCallback to work without race conditions.
 */
function consumeOAuthCallbackQueryParams(expectedState: string): null | URL {
  const requiredParams = ["code", "state"];
  const originalUrl = new URL(window.location.href);
  for (const param of requiredParams) {
    if (!originalUrl.searchParams.has(param)) {
      captureError("consumeOAuthCallbackQueryParams", new Error(`Missing required query parameter on OAuth callback: ${param}`));
      return null;
    }
  }

  if (expectedState !== originalUrl.searchParams.get("state")) {
    // If the state doesn't match, then the callback wasn't meant for us.
    // Maybe the website uses another OAuth library?
    captureError("consumeOAuthCallbackQueryParams", new Error(`Invalid OAuth callback state: Are you using another OAuth authentication with the same callback URL as Stack, or did your cookies reset?`));
    return null;
  }


  const newUrl = new URL(originalUrl);
  for (const param of requiredParams) {
    newUrl.searchParams.delete(param);
  }

  // let's get rid of the authorization code in the history as we
  // don't redirect to `redirectUrl` if there's a validation error
  // (as the redirectUrl might be malicious!).
  //
  // We use history.replaceState instead of location.assign(...) to
  // prevent an unnecessary reload
  window.history.replaceState({}, "", newUrl.toString());

  return originalUrl;
}

/**
 * Asynchronously handles the OAuth callback, validates the callback parameters, initiates the authentication process, and deals with potential errors.
 * @param {StackClientInterface} iface - The client interface instance for interfacing with the authentication stack.
 * @param {string} redirectUrl - The URL where the OAuth service should redirect to after user authentication.
 * @returns {Promise<object|null>} Returns a Promise that resolves to an object containing the callback response from the OAuth service if the authentication process 
 *                          successfully completes, or null if there's no original URL from the OAuth callback.
 *                          If an error occurs during user authentication, the Promise will be rejected with an error.
 */
export async function callOAuthCallback(
  iface: StackClientInterface,
  redirectUrl: string,
) {
  // note: this part of the function (until the return) needs
  // to be synchronous, to prevent race conditions when
  // callOAuthCallback is called multiple times in parallel
  const { codeVerifier, state } = getVerifierAndState();
  if (!codeVerifier || !state) {
    throw new Error("Invalid OAuth callback URL parameters. It seems like the OAuth flow was interrupted, so please try again.");
  }
  const originalUrl = consumeOAuthCallbackQueryParams(state);
  if (!originalUrl) return null;

  // the rest can be asynchronous (we now know that we are the
  // intended recipient of the callback)
  try {
    return await iface.callOAuthCallback({
      oauthParams: originalUrl.searchParams,
      redirectUri: constructRedirectUrl(redirectUrl),
      codeVerifier,
      state,
    });
  } catch (e) {
    if (e instanceof KnownError) {
      throw e;
    }
    throw new StackAssertionError("Error signing in during OAuth callback. Please try again.", { cause: e });
  }
}
