import { CurrentUser, GetUserOptions as AppGetUserOptions, StackClientApp, CurrentInternalUser } from "./stack-app";
import { StackContext } from "../providers/stack-provider-client";
import { useContext } from "react";

type GetUserOptions = AppGetUserOptions<true> & {
  projectIdMustMatch?: string,
};

/**
 * Returns the current user object. Equivalent to `useStackApp().useUser()`.
 *
 * @returns the current user
 */
export function useUser(options: GetUserOptions & { or: 'redirect' | 'throw', projectIdMustMatch: "internal" }): CurrentInternalUser;
export function useUser(options: GetUserOptions & { or: 'redirect' | 'throw' }): CurrentUser;
export function useUser(options: GetUserOptions & { projectIdMustMatch: "internal" }): CurrentInternalUser | null;
export function useUser(options?: GetUserOptions): CurrentUser | CurrentInternalUser | null;
/**
 * A hook that returns either the external or internal user from the specified stack app, based on the given options.
 * @param {Object} options - An optional parameter. It is a configuration object that can include 'projectIdMustMatch', which is an optional string that must match the projectId of the stack app. If 'projectIdMustMatch' is set as "internal", the function will return an internal user.
 * @returns {CurrentUser | CurrentInternalUser | null} Returns CurrentUser if 'projectIdMustMatch' is not set as "internal". Returns CurrentInternalUser if 'projectIdMustMatch' is set as "internal". Returns null if user is not found or doesn't match the condition.
 */
export function useUser(options: GetUserOptions = {}): CurrentUser | CurrentInternalUser | null {
  const stackApp = useStackApp(options);
  if (options.projectIdMustMatch && stackApp.projectId !== options.projectIdMustMatch) {
    throw new Error("Unexpected project ID in useStackApp: " + stackApp.projectId);
  }
  if (options.projectIdMustMatch === "internal") {
    return stackApp.useUser(options) as CurrentInternalUser;
  } else {
    return stackApp.useUser(options) as CurrentUser;
  }
}

/**
 * Returns the current Stack app associated with the StackProvider.
 *
 * @returns the current Stack app
 */
export function useStackApp<ProjectId extends string>(options: { projectIdMustMatch?: ProjectId } = {}): StackClientApp<true, ProjectId> {
  const context = useContext(StackContext);
  if (context === null) {
    throw new Error("useStackApp must be used within a StackProvider");
  }
  const stackApp = context.app;
  if (options.projectIdMustMatch && stackApp.projectId !== options.projectIdMustMatch) {
    throw new Error("Unexpected project ID in useStackApp: " + stackApp.projectId);
  }
  return stackApp as StackClientApp<true, ProjectId>;
}
