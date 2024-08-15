# Stack SDK Component Documentation

This documentation provides detailed descriptions and usage examples for components and utilities within a specific folder of the Stack SDK. The goal is to help developers understand how to integrate and utilize these components effectively in their projects.

---

## CredentialSignIn

**Type**: Component

**Description**: 
The `CredentialSignIn` component provides a user interface for signing in using email and password credentials. It validates user input against a predefined schema.

**Usage**:
```tsx
import { CredentialSignIn } from 'path-to-this-component';

function App() {
  return (
    <div>
      <CredentialSignIn />
    </div>
  );
}
```

**Properties**:
- No additional properties defined within the component itself.

**Notes**: Uses `useStackApp` for app-specific functionalities and state, and `useForm` from `react-hook-form` for form handling.

---

## CredentialSignUp

**Type**: Component

**Description**: 
The `CredentialSignUp` component provides a form for users to create a new account with email and password credentials. Includes real-time validation and password strength checking.

**Usage**:
```tsx
import { CredentialSignUp } from 'path-to-this-component';

function App() {
  return (
    <div>
      <CredentialSignUp />
    </div>
  );
}
```

**Properties**:
- No additional properties defined within the component itself.

**Notes**: Utilizes `yup` for schema validation and custom password validation logic. Integrated `FormWarningText` for displaying error messages.

---

## MagicLinkSignIn

**Type**: Component

**Description**: 
The `MagicLinkSignIn` component enables signing in via a magic link sent to the user's email. It provides a form to input the email and handle request sending.

**Usage**:
```tsx
import { MagicLinkSignIn } from 'path-to-this-component';

function App() {
  return (
    <div>
      <MagicLinkSignIn />
    </div>
  );
}
```

**Properties**:
- No additional properties defined within the component itself.

**Notes**: After submitting the form, it checks for any errors and adjusts UI accordingly to notify the user if the email was sent.

---

## OAuthButton

**Type**: Component

**Description**: 
`OAuthButton` provides a customizable button for OAuth sign-in functionality, supporting multiple providers such as Google, Facebook, and GitHub.

**Usage**:
```tsx
import { OAuthButton } from 'path-to-this-component';

function App() {
  return (
    <div>
      <OAuthButton provider="google" type="sign-in" />
    </div>
  );
}
```

**Properties**:
- `provider`: `string` – OAuth provider identifier (e.g., "google", "github").
- `type`: `'sign-in' | 'sign-up'` – Specifies the action type.

**Notes**: This component dynamically adjusts its style based on the provider and handles the OAuth flow initialization.

---

## OAuthButtonGroup

**Type**: Component

**Description**: 
`OAuthButtonGroup` arranges multiple `OAuthButton` components into a group based on the available OAuth providers in the application configuration.

**Usage**:
```tsx
import { OAuthButtonGroup } from 'path-to-this-component';

function App() {
  return (
    <OAuthButtonGroup type="sign-in" />
  );
}
```

**Properties**:
- `type`: `'sign-in' | 'sign-up'` – Indicates whether the buttons are used for signing in or signing up.
- `mockProject`: Optional project configuration used primarily for testing.

**Notes**: Utilizes `useStackApp` to access project configuration.

---

## SelectedTeamSwitcher

**Type**: Component

**Description**: 
Allows users to switch between different teams within the application, with the ability to navigate based on team selection or update the selected team dynamically.

**Usage**:
```tsx
import { SelectedTeamSwitcher } from 'path-to-this-component';

function App() {
  return (
    <div>
      <SelectedTeamSwitcher />
    </div>
  );
}
```

**Properties**:
- `urlMap`: Function that maps a team to a URL for navigation.
- `selectedTeam`: The currently selected team object.
- `noUpdateSelectedTeam`: If true, doesn't trigger an update to the selected team state.

**Notes**: Handle team switch events and integrate navigations seamlessly within the user's session context.

---

## UserButton

**Type**: Component

**Description**: 
Provides a user interface component that displays user information and offers user-related actions like sign-in, sign-up, and sign-out.

**Usage**:
```tsx
import { UserButton } from 'path-to-this-component';

function App() {
  return (
    <div>
      <UserButton />
    </div>
  );
}
```

**Properties**:
- `showUserInfo`: Boolean indicating whether to display user info.
- `colorModeToggle`: Function to toggle theme.
- `extraItems`: Additional items to display in the dropdown.

**Notes**: Supports both signed-in and signed-out states, dynamically adjusting the options available based on the user's authentication state.

---

## Conclusion

These components are part of a robust stack developed to handle various aspects of user management, authentication, and application settings. Ensure to follow usage examples and properties to integrate them effectively into your applications. For more in-depth details, make sure to refer to the source code or additional documentation provided in the SDK.