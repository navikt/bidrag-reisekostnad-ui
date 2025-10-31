import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

// Plugin/Config imports
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import jestDom from 'eslint-plugin-jest-dom';
import testingLibrary from 'eslint-plugin-testing-library';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
    //...nextTypescript, // Assign the array to a variable
    // Standard ESLint recommended rules
    // TypeScript configuration
    js.configs.recommended,
    ...tseslint.configs.recommended,
    // Use the FlatCompat for Next.js configs
    ...compat.extends('next/core-web-vitals'),
    ...compat.extends('next/typescript'),
    ...compat.extends('plugin:jsx-a11y/recommended'),
    ...compat.extends('plugin:react/recommended'),
    ...compat.extends('plugin:react-hooks/recommended'), // Main configuration object for project-specific rules and settings
    ...compat.extends('plugin:prettier/recommended'), // Add global ignores here
    {
        files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],

        plugins: {
            react: react,
            'react-hooks': reactHooks,
            '@typescript-eslint': tseslint.plugin,
            'jsx-a11y': jsxA11y,
            'jest-dom': jestDom,
            'testing-library': testingLibrary,
            prettier: prettier,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parser: tseslint.parser,
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        rules: {
            // Your custom rule overrides
            '@typescript-eslint/ban-ts-ignore': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/triple-slash-reference': 'off',
            '@typescript-eslint/naming-convention': [
                'warn',
                {
                    selector: 'interface',
                    format: ['PascalCase'],
                    custom: {
                        regex: '^I[A-Z]',
                        match: true,
                    },
                    filter: {
                        regex: '^(IncomingMessage)$',
                        match: false,
                    },
                },
            ],
            'react-hooks/exhaustive-deps': 'off',
            'react/prop-types': 'off',
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            'prettier/prettier': 'warn',
            'no-console': 'off',
            'no-restricted-syntax': [
                'error',
                {
                    selector:
                        "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
                    message: 'Unexpected property on console object was called',
                },
            ],
        },
    },
    {
        ignores: ['.next/', 'node_modules/', '**/.*'],
    },
];

// Export the variable as the module default
export default eslintConfig;
