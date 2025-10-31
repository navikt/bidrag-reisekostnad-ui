import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import jestDom from 'eslint-plugin-jest-dom';
import testingLibrary from 'eslint-plugin-testing-library';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

/** @type {import('eslint').Linter.FlatConfig[]} */ // Optional: for type safety
export default [
    ...fixupConfigRules(
        compat.extends(
            'eslint:recommended',
            // 'next/core-web-vitals' is now deprecated and should be updated
            // to use the new @next/eslint-plugin-next direct imports
            'next/core-web-vitals',
            'plugin:jsx-a11y/recommended',
            'plugin:react/recommended',
            'plugin:react-hooks/recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:prettier/recommended'
        )
    ),
    {
        plugins: {
            react: fixupPluginRules(react),
            'react-hooks': fixupPluginRules(reactHooks),
            '@typescript-eslint': fixupPluginRules(typescriptEslint),
            prettier: fixupPluginRules(prettier),
            'jsx-a11y': fixupPluginRules(jsxA11Y),
            'jest-dom': jestDom,
            'testing-library': testingLibrary,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },

            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'module',

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        rules: {
            '@typescript-eslint/ban-ts-ignore': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
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
];
