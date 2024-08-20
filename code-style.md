# Code Style Guidelines

## Naming Conventions
- Use PascalCase for component names
- Use camelCase for variables and functions

## Code Structure
- Use JSX syntax for React components
- Include type annotations for TypeScript
- Organize imports at the top of files
- Use optional chaining for potentially undefined properties
- Group related components and exports in specific folders (e.g., components-page)

## Documentation
- Use markdown formatting for documentation
- Provide detailed component descriptions including type, usage, properties, and notes
- Include parameter descriptions and example usage in documentation
- Use descriptive and concise titles for documentation sections
- Use consistent formatting for component documentation

## Security
- Avoid using dangerouslySetInnerHTML to prevent XSS vulnerabilities
- Use crypto.timingSafeEqual for secure string comparison
- Avoid using eval for security reasons
- Use hardcoded string literals when calling require

## Best Practices
- Provide descriptive comments for functions and components
- Use consistent code formatting with proper indentation and spacing