# Stack SDK Folder Documentation

This documentation covers a range of components, hooks, and utilities provided by the Stack SDK that facilitate creating robust user experiences, focusing on authentication, user management, and theming. Each component and utility is aimed at easing integration across different parts of a tech stack, particularly focused on handling users and authentication processes seamlessly in your applications.

## StackProvider

**Type**: Component

**Description**: The `StackProvider` is a context provider used for wrapping the main application to provide global access to stack configurations and state.

**Usage**:
```typescript
import { StackProvider } from 'path-to-stack-sdk';

function App() {
  return (
    <StackProvider config={configOptions}>
      <YourApp />
    </StackProvider>
  );
}
```

**Properties**:
- `config`: `ConfigType` - Configuration options necessary for initializing the stack environment.

**Notes**: Ensure that `configOptions` are defined with all required keys and values as per Stack SDK's requirements.

## useUser

**Type**: Hook

**Description**: A hook to access user data loaded through the Stack SDK.

**Usage**:
```typescript
import { useUser } from 'path-to-sdk';

function UserProfile() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{user ? user.name : 'No user found'}</div>;
}
```

**Returns**: An object containing `user` (user data object or null if not logged in) and `isLoading` (boolean indicating if the user data is still loading).

## useStackApp

**Type**: Hook

**Description**: Hook that provides access to the Stack application instance, including methods to control the app's behavior.

**Usage**:
```typescript
import { useStackApp } from 'path-to-stack-sdk';

function ControlPanel() {
  const app = useStackApp();

  const handleLogout = () => {
    app.logout();
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

**Returns**: The Stack application instance which includes functionalities like `logout()` and `refreshUserData()`.

## StackHandler

**Type**: Component

**Description**: Manages routing and state transitions within stack controlled environments like authentication or user account management.

**Usage**:
```typescript
import { StackHandler } from 'path-to-stack-sdk';

function App() {
  return (
    <StackHandler>
      <YourComponent />
    </StackHandler>
  );
}
```

**Properties**:
- `children`: `ReactNode` - React components to be rendered inside the handler.

**Notes**: This component is critical in setups where authentication and user state handling are centrally managed.

#### Authentication Components

Each of the authentication components such as `SignIn`, `SignUp`, `EmailVerification`, `PasswordReset`, `ForgotPassword`, etc., follow a similar usage pattern. These components are used in the authentication flows and are meant to integrate seamlessly with the respective backend services to handle user authentication processes. These components typically have props like `onSuccess` and `onError` to handle the results of the authentication operation.

## SignIn

**Type**: Component

**Description**: Provides a sign-in form for users.

**Usage**:
```typescript
import { SignIn } from 'path-to-stack-sdk';

function Login() {
  return <SignIn onSuccess={handleSuccess} onError={handleError} />;
}
```

**Properties**:
- `onSuccess`: `Function` - Callback function triggered upon successful sign-in.
- `onError`: `Function` - Callback function triggered upon an unsuccessful sign-in attempt.

**Notes**: Ensure redirect or further user flow management is handled within the success callback.

The `SignUp`, `EmailVerification`, `PasswordReset`, `ForgotPassword`, and other authentication components would have similar documentation, detailing their specific purposes and usages.

By establishing these elements within your application, the Stack SDK streamlines much of the heavy lifting regarding user authentication and account management, leaving you more time to focus on your application's unique features and user experiences.