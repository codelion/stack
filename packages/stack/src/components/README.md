# Overview

This documentation details the various components and hooks that are part of our SDK. These elements are specifically designed to handle user authentication, application state management, and UI components within our tech stack. The integrations provided in these exports allow developers to streamline the implementation of common functionalities such as signing in, signing up, managing user sessions, and configuring application themes. Each section of the documentation provides details about usage, parameters, return types, and special notes to aid developers in leveraging these utilities effectively within their applications.

## StackProvider

**Type**: Component

**Description**: StackProvider is a React component that provides a context for Stack SDK functionalities. It is used to wrap the entire application or a part of the application that needs access to stack features.

**Usage**:
```jsx
import { StackProvider } from 'path-to-sdk';

function App() {
  return (
    <StackProvider>
      <YourApp />
    </StackProvider>
  );
}
```

**Properties**:
- `children`: `ReactNode` - The child components that will have access to the stack context.

**Notes**: Ensure that your application is wrapped in `StackProvider` before using any hooks or components that rely on the Stack SDK.

## useUser

**Type**: Hook

**Description**: A custom hook that provides access to the current user object. This hook is part of the authentication system in the SDK.

**Usage**:
```jsx
import { useUser } from 'path-to-sdk';

function UserProfile() {
  const user = useUser();

  return (
    <div>
      {user ? `Welcome ${user.name}` : 'Please sign in'}
    </div>
  );
}
```

**Notes**: This hook relies on the React context provided by `StackProvider`. It should be used within components wrapped by `StackProvider`.

## useStackApp

**Type**: Hook

**Description**: A hook that provides various helper functions related to the application context.

**Usage**:
```jsx
import { useStackApp } from 'path-to-sdk';

function LogoutButton() {
  const app = useStackApp();

  const handleLogout = () => {
    app.logout();
  };

  return (
    <button onClick={handleLogout}>Log Out</button>
  );
}
```

## StackHandler

**Type**: Component

**Description**: To be added

**Usage**:
```javascript
To be added
```

## SignIn, SignUp, EmailVerification, PasswordReset, ForgotPassword, AccountSettings, AuthPage

**Type**: Components

**Description**: These components are part of the Stack SDK's authentication pages. They provide UI elements for their respective functionalities.

**Usage**:
```jsx
import { SignIn } from 'path-to-sdk';

function LoginPage() {
  return (
    <SignIn />
  );
}
```

**Notes**: Each authentication component can be directly used in your routing components or anywhere in your application to provide built-in UI for authentication.

## UserButton

**Type**: Component

**Description**: Provides a user interface element that displays user information and provides links to various user actions like signing out.

**Usage**:
```jsx
import { UserButton } from 'path-to-sdk';

function Header() {
  return (
    <header>
      <UserButton />
    </header>
  );
}
```

**Properties**:
- `showUserInfo`: `boolean` - Whether to show user details or just an icon.

## OAuthButton, OAuthButtonGroup

**Type**: Components

**Description**: OAuthButton is a component that triggers OAuth authentication for a specified provider. OAuthButtonGroup aggregates multiple OAuthButton components for various providers.

**Usage**:
```jsx
import { OAuthButton, OAuthButtonGroup } from 'path-to-sdk';

function OAuthLogin() {
  return (
    <OAuthButtonGroup type="sign-in">
      <OAuthButton provider="google" />
      <OAuthButton provider="facebook" />
    </OAuthButtonGroup>
  );
}
```

**Notes**: Ensure that the OAuth providers are correctly configured in your backend before using these components.

## SelectedTeamSwitcher

**Type**: Component

**Description**: Allows the user to switch between different teams they are part of.

**Usage**:
```jsx
import { SelectedTeamSwitcher } from 'path-to-sdk';

function TeamSwitcher() {
  return <SelectedTeamSwitcher />;
}
```

**Properties**:
- `urlMap`: `Function` - A function mapping team objects to redirect URLs.
- `selectedTeam`: `Team` - The currently selected team object.

**Notes**: This component is useful for applications that involve team-based functionalities.

## Additional Information

The components and hooks provided in the SDK are designed to integrate seamlessly into your React application, ensuring that you can manage user authentication and other stack-related functionalities efficiently. Make sure `StackProvider` is used at an appropriate level in your application to access all context-dependent features.