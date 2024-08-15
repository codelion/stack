# Stack SDK Components Documentation

The following documentation provides detailed information about various components and functionalities related to account settings, authentication, team interactions, and more within the Stack SDK. These components are essential for incorporating authentication and account management capabilities into applications using the Stack SDK.

---

## AccountSettings

**Type**: Component

**Description**: This component allows users to manage their account settings, including profile information, password, email verification, and multi-factor authentication (MFA).

**Usage**:
```jsx
<AccountSettings fullPage={true} />
```

**Properties**:
- `fullPage`: `boolean` - Determines if the settings should be displayed as a full page. Default is `false`.

**Notes**: The component encapsulates several sections, each responsible for a specific part of the user settings, providing a comprehensive management interface.

---

## AuthPage

**Type**: Component

**Description**: A component rendering the authentication page, which can dynamically switch between sign-in and sign-up forms based on the provided props.

**Usage**:
```jsx
<AuthPage fullPage={true} type="sign-in" />
```

**Properties**:
- `fullPage`: `boolean` - If `true`, the authentication page will occupy the full page.
- `type`: `'sign-in' | 'sign-up'` - Specifies the type of authentication form to display.

**Notes**: This component also handles redirections based on authentication state and can optionally integrate with social OAuth providers.

---

## EmailVerification

**Type**: Component

**Description**: Manages the email verification process, displaying appropriate messages and handling verification logic.

**Usage**:
```jsx
<EmailVerification searchParams={{ code: "verification_code" }} fullPage={true} />
```

**Properties**:
- `searchParams`: `{ code: string }` - Query parameters containing the verification code.
- `fullPage`: `boolean` - Whether the message should be displayed as full page.

---

## ForgotPassword

**Type**: Component

**Description**: Offers users the ability to initiate a password reset procedure via email.

**Usage**:
```jsx
<ForgotPassword fullPage={true} />
```

**Properties**:
- `fullPage`: `boolean` - Determines if the forgot password component should be displayed as a full page.

---

## MagicLinkCallback

**Type**: Component

**Description**: Handles callbacks for magic link authentication, including validating the state and managing user redirection.

**Usage**:
```jsx
<MagicLinkCallback searchParams={{ code: "unique_code" }} fullPage={true} />
```

**Properties**:
- `searchParams`: `{ code: string }` - Parameters to be used in the magic link callback, typically including a unique code.
- `fullPage`: `boolean` - If `true`, renders the component in full-page mode.

---

## OAuthCallback

**Type**: Component

**Description**: Processes OAuth callbacks, managing state and user redirection after authentication with third-party services.

**Usage**:
```jsx
<OAuthCallback fullPage={true} />
```

**Properties**:
- `fullPage`: `boolean` - Determines if the OAuth callback should handle the user in a full-page view.

---

## PasswordReset

**Type**: Component

**Description**: Allows users to reset their password using a code received via email.

**Usage**:
```jsx
<PasswordReset searchParams={{ code: "reset_code" }} fullPage={true} />
```

**Properties**:
- `searchParams`: `{ code: string }` - Contains the password reset code.
- `fullPage`: `boolean` - Indicates if the password reset interface should occupy the full page.

---

## SignIn

**Type**: Component

**Description**: Wrapper component for `AuthPage` that specifically handles sign-in operations.

**Usage**:
```jsx
<SignIn fullPage={true} />
```

**Properties**:
- `fullPage`: `boolean` - If set to `true`, the sign-in page will take up the full screen.

---

## SignUp

**Type**: Component

**Description**: A simple wrapper around the `AuthPage` component for handling user sign-ups.

**Usage**:
```jsx
<SignUp fullPage={true} />
```

**Properties**:
- `fullPage`: `boolean` - Whether to display the component as a full-page.

---

## StackHandler

**Type**: Component

**Description**: Centralized handler for all stack-related routes and functionalities, coordinating various user-related operations such as sign-in, sign-up, account settings, and others based on the URL path.

**Usage**:
```jsx
<StackHandler fullPage={true} />
```

**Properties**:
- `fullPage`: `boolean` - Renders the handler in a full-page layout depending on the URL and the operation.

---

This documentation covers the primary components related to user account and authentication management in Stack SDK's specific folder. Each component plays a crucial role in facilitating user interactions within web projects, ensuring robust and flexible user management.