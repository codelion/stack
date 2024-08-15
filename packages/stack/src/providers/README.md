# Stack SDK Documentation

This document provides detailed explanations and usage examples for the various exports available in the Stack SDK library. The SDK is designed to facilitate app development with components, providers, hooks, and utilities around user management and theming capabilities.

## StackProvider

**Type**: Component

**Description**: This component sets up a context provider for the Stack SDK, enabling the utilization of `StackClientApp` across the application.

**Usage**:
```tsx
import { StackProvider } from 'path-to-stack-sdk';
import { StackClientApp } from 'path-to-stack-client-app';

const app = new StackClientApp(true); // Example instantiation

<StackProvider app={app}>
  <App />
</StackProvider>
```

**Properties**:
- `children`: `React.ReactNode` - The child components that will have access to the Stack context.
- `app`: `StackClientApp<true>` - An instance of the `StackClientApp` configured for your application.

**Notes**: This provider must wrap your application's root component to effectively use the Stack SDK client throughout your application.

## StackTheme

**Type**: Component

**Description**: Provides a theme wrapper that applies CSS variables for light and dark modes across the application using React's context.

**Usage**:
```tsx
import { StackTheme } from 'path-to-stack-sdk';

<StackTheme theme={customTheme} nonce="your-nonce">
  <App />
</StackTheme>
```

**Properties**:
- `theme`: `ThemeConfig` - Optional. Custom theme settings that override default light and dark mode configurations.
- `children`: `React.ReactNode` - React children nodes to render inside the theme provider.
- `nonce`: `string` - Optional. A cryptographic nonce (number used once) for Content Security Policy.

**Notes**: Custom themes allow developers to specify styles that are consistent with their branding requirements. The `nonce` attribute is crucial when your Content Security Policy (CSP) setup requires it.

## useUser

**Type**: Hook

**Description**: This hook provides the functionality to access and manipulate the current user’s data.

**Usage**:
```tsx
import { useUser } from 'path-to-stack-sdk';

const userInfo = useUser();
```

**Returns**: Current user’s information or operations depending on the specific implementation details which are to be added.

**Notes**: Mostly used inside components that are deeply nested where passing user context through props becomes inefficient.

## useStackApp

**Type**: Hook

**Description**: A hook that provides access to the `StackClientApp` instance from the context, enabling components to interact with Stack app functionalities.

**Usage**:
```tsx
import { useStackApp } from 'path-to-stack-sdk';

const app = useStackApp();
```

**Returns**: An instance of `StackClientApp` if within the StackProvider context, otherwise, it may throw an error or return `null` based on implementation details.

## Export Summary from Other Modules

Here's a brief on exports that might originate in other files but are used or re-exported in the current context.

- **StackHandler, SignIn, SignUp, EmailVerification (and other components)** are likely part of the user management components which handle different user states and authentication interfaces. These are documented separately in their respective modules.

## Note

For full functionality and integration, ensure all components and hooks are utilized within their appropriate context providers and setup. Each component might have dependencies on certain parts of the Stack SDK, so initializing the SDK properly is crucial for optimal performance and functionality.