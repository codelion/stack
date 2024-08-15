import { cookies as rscCookies } from '@stackframe/stack-sc/force-react-server';
import Cookies from "js-cookie";
import { calculatePKCECodeChallenge, generateRandomCodeVerifier, generateRandomState } from "oauth4webapi";

type SetCookieOptions = { maxAge?: number };

/**
 * Checks if the passed error relates to unavailable Request Scoped Cookie.
 * @param {any} e - The error object that needs to be checked
 * @returns {boolean} Returns true if error is related to unavailable RSC, otherwise false
 */
function isRscCookieUnavailableError(e: any) {
  const allowedMessageSnippets = ["was called outside a request scope", "cookies() expects to have requestAsyncStorage"];
  /**
   * Checks if the error message is a string type and if it includes any of the allowed message snippets.
   * @param {object}  e - Error object that may contain a message property. 
   * @param {Array.<string>}  allowedMessageSnippets - Array of allowed error message snippets.
   * @returns {boolean} Returns true if the error message includes any of the allowed snippets, false otherwise.
   */
  return typeof e?.message === "string" && allowedMessageSnippets.some(msg => e.message.includes(msg));
}

/**
 * This function retrieves the value of a specific cookie by its name.
 * @param {string}  name - The name of the cookie to retrieve.
 * @returns {string | null} The value of the cookie if found, null otherwise.
 */
export function getCookie(name: string): string | null {
  try {
    return rscCookies().get(name)?.value ?? null;
  } catch (e: any) {
    if (isRscCookieUnavailableError(e)) {
      return Cookies.get(name) ?? null;
    } else {
      throw e;
    }
  }
}

/**
 * Function for setting or deleting a cookie based on the value provided.
 * If the value is null, the cookie will be deleted, otherwise a new cookie will be set.
 * @param {string} name - The name of the cookie to set or delete.
 * @param {string | null} value - The value to be set in the cookie, if null will trigger the delete cookie function.
 * @param {SetCookieOptions} options - Optional parameter; used when setting the cookie to provide additional settings such as 'expires', 'path', etc.
 */
export function setOrDeleteCookie(name: string, value: string | null, options: SetCookieOptions = {}) {
  if (value === null) {
    deleteCookie(name);
  } else {
    setCookie(name, value, options);
  }
}

/**
 * Deletes the specified cookie. Falls back to using js-cookies removal method if rscCookie deletion is unavailable.
 * @param {string}  name - The name of the cookie to be deleted.
 * @throws {any} If an error occurs that is not a RscCookieUnavailableError
 */

export function deleteCookie(name: string) {
  try {
    rscCookies().delete(name);
  } catch (e: any) {
    if (isRscCookieUnavailableError(e)) {
      Cookies.remove(name);
    } else {
      throw e;
    }
  }
}

/**
 * A function to set a cookie with specific options. By default, cookies are secure in production mode. 
 * If unable to set a secure cookie in production mode due to an error (e.g. the page is not served over HTTPS), 
 * the function will attempt to set a non-secure cookie.
 *
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value of the cookie.
 * @param {SetCookieOptions} options - An optional parameter to override default cookie characteristics. The only option currently supported is "maxAge" which sets the cookie expiry time in seconds.
 * @throws {Error} Throws an error if an attempt to set a secure cookie in production mode fails, and the current page is not served over HTTPS.
 */

export function setCookie(name: string, value: string, options: SetCookieOptions = {}) {
  const isProd = process.env.NODE_ENV === "production";
  try {
    rscCookies().set(name, value, {
      secure: isProd,
      maxAge: options.maxAge,
    });
  } catch (e: any) {
    if (isRscCookieUnavailableError(e)) {
      if (window.location.protocol !== "https:" && isProd) {
        throw new Error("Attempted to set a secure cookie, but this build was compiled as a production build, but the current page is not served over HTTPS. This is a security risk and is not allowed in production.");
      }
      Cookies.set(name, value, {
        secure: isProd,
        expires: options.maxAge === undefined ? undefined : new Date(Date.now() + (options.maxAge) * 1000),
      });
    } else {
      throw e;
    }
  }
}

/**
 * An asynchronous function that generates and stores code verifier, code challenge, and state. It uses the PKCE protocol for security. The generated codes are then stored in two cookies for a maximum age of 10 minutes.
 * This function does not take any parameters.
 * @returns {Object} An object containing the 'codeChallenge' and 'state' properties.
 */

export async function saveVerifierAndState() {
  const codeVerifier = generateRandomCodeVerifier();
  const codeChallenge = await calculatePKCECodeChallenge(codeVerifier);
  const state = generateRandomState();

  setCookie("stack-outer-code-verifier", codeVerifier, { maxAge: 60 * 10 });
  setCookie("stack-outer-state", state, { maxAge: 60 * 10 });

  return {
    codeChallenge,
    state,
  };
}

/**
 * Function that retrieves verifier and state from cookies.
 * @returns {{codeVerifier: string, state: string}} Return object, containing value of stack-outer-code-verifier and stack-outer-state cookies.
 */
export function getVerifierAndState() {
  const codeVerifier = getCookie("stack-outer-code-verifier");
  const state = getCookie("stack-outer-state");
  return {
    codeVerifier,
    state,
  };
}
