import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
// The eslint-plugin-react-hooks is not yet fully updated for Flat Config and
// does not provide a flatConfigs object. Must use the fixupPluginRules.
import { fixupPluginRules } from '@eslint/compat';

// Native Flat Config Plugins
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
    {
        // Global ignores must be in their own object
        ignores: ['.next/', 'node_modules/', '**/.*', 'next-env.d.ts'],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,

    // GLOBAL SETTINGS (React version warning)
    {
        settings: {
            react: {
                version: 'detect',
            },
        },
    },

    // NATIVE NEXT.JS SETUP (Replaces compat.extends)
    {
        plugins: {
            '@next/next': nextPlugin,
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs['core-web-vitals'].rules,
        },
    },

    // NATIVE REACT SETUP
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],

    // NATIVE A11Y & PRETTIER
    jsxA11y.flatConfigs.recommended,
    prettierPlugin,

    {
        // Handling CommonJS files
        files: ['*.config.js', '*.config.mjs'],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        plugins: {
            // Hooks plugin needs the fixup wrapper for ESLint 9/10
            'react-hooks': fixupPluginRules(hooksPlugin),
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
        },
        rules: {
            ...hooksPlugin.configs.recommended.rules,
            // Your custom overrides
            'react-hooks/exhaustive-deps': 'off',
            'prettier/prettier': 'warn',
            '@typescript-eslint/naming-convention': [
                'warn',
                {
                    selector: 'interface',
                    format: ['PascalCase'],
                    custom: { regex: '^I[A-Z]', match: true },
                    filter: {
                        regex: '^(IncomingMessage)$',
                        match: false,
                    },
                },
            ],
            '@typescript-eslint/ban-ts-ignore': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/triple-slash-reference': 'off',
            'react/prop-types': 'off',
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
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
    }
);
