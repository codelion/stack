# Stack SDK Components Documentation

This MDX documentation provides detailed information about specific components and other exports from the `components-page` folder of the Stack SDK. Each section will cover a component, its purposes, functionalities, properties, usage, and other pertinent details.

## AccountSettings

**Type**: Component

**Description**: This component provides a user interface to manage account settings including profile information, security settings (password and MFA), and email verification.

**Usage**:
```jsx
<AccountSettings fullPage={true} />
```

**Properties**:
- `fullPage`: `boolean` - If set to true, renders the component in a full page layout. Otherwise, it uses a sidebar layout.

**Notes**: This component utilizes several subcomponents to handle specific sections like profile, security, and more. Each section allows user interactions with forms and update operations.

## AuthPage

**Type**: Component

**Description**: Renders an authentication page which includes sign-in, sign-up functionalities along with options for OAuth and Magic Link sign-in methods.

**Usage**:
```jsx
<AuthPage type='sign-in' fullPage={true} />
```

**Properties**:
- `fullPage`: `boolean` - Whether the page is rendered as a full page.
- `type`: `'sign-in' | 'sign-up'` - Determines whether the page is for signing in or signing up.
- `automaticRedirect`: `boolean` - If enabled, automatically redirects after successful authentication.
- `mockProject`: `Object` - Can provide mock project settings for testing environments.

**Notes**: This component uses dynamic rendering for different sections based on the authentication type. It can integrate seamlessly with backend processes for authentication.

## EmailVerification

**Type**: Component

**Description**: Manages email verification process. It validates and processes the verification from the provided link.

**Usage**:
```jsx
<EmailVerification searchParams={{ code: 'verification_code' }} fullPage={true} />
```

**Properties**:
- `searchParams`: `Record<string, string>` - URL search parameters, primarily the verification code.
- `fullPage`: `boolean` - Renders in full page layout if true.

**Notes**: It displays appropriate messages based on the verification results, such as successful verification or errors like expired links.

## ErrorPage

**Type**: Component

**Description**: This component is designed to display various error states based on OAuth or other authentication errors.

**Usage**:
```jsx
<ErrorPage fullPage={true} searchParams={{ errorCode: 'error_code' }} />
```

**Properties**:
- `fullPage`: `boolean` - Renders the error information in a full-page layout when set to true.
- `searchParams`: `Record<string, string>` - Parameters that help determine the specifics of the error displayed.

**Notes**: It handles multiple known errors and displays contextual messages to the user.

## ForgotPassword

**Type**: Component

**Description**: Allows users to initiate a password reset process.

**Usage**:
```jsx
<ForgotPassword fullPage={true} />
```

**Properties**:
- `fullPage`: `boolean` - If set to true, the component is rendered on a full page.

**Notes**: Users can enter their email addresses to receive a password reset link. This component confirms the email submission and provides feedback on the next steps.

## MagicLinkCallback

**Type**: Component

**Description**: Validates the magic link used for signing in and handles the authentication process based on the link's validity.

**Usage**:
```jsx
<MagicLinkCallback searchParams={{ code: 'magic_code' }} fullPage={true} />
```

**Properties**:
- `searchParams`: `Record<string, string>` - Expected to contain the `code` parameter which is needed for validating the magic link.
- `fullPage`: `boolean` - Determines if the layout should be full-page.

**Notes**: Handles different states like link expiration, invalid link, or already used links, and provides corresponding user feedback.

## OAuthCallback

**Type**: Component

**Description**: Manages the callback response from OAuth authentication processes, handling success or error states.

**Usage**:
```jsx
<OAuthCallback fullPage={true} />
```

**Properties**:
- `fullPage`: `boolean` - Indicates if the component should use a full-page layout.

**Notes**: It captures and processes the OAuth data from the URL after a user authenticates using an OAuth provider. Handles redirection or error messaging based on the result.

## PasswordReset

**Type**: Component

**Description**: This component allows the user to reset their password using a valid password reset code.

**Usage**:
```jsx
<PasswordReset searchParams={{ code: 'reset_code' }} fullPage={true} />
```

**Properties**:
- `searchParams`: `Record<string, string>` - Contains the reset code necessary to perform the password reset.
- `fullPage`: `boolean` - Renders the component in full-page mode if true.

**Notes**: Includes form handling and error management to assist users in updating their passwords securely.

---

Documenting these components ensures that developers utilizing the Stack SDK have a clear understanding of each component's functionality and how to implement them effectively within their projects.