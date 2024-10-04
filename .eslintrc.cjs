module.exports = {
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // Add this option
      },
    },
  },
  root: true,
  parser: '@typescript-eslint/parser', // Ensure you're using the TypeScript parser
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  ignorePatterns: [
    '!**/.server',
    '!**/.client',
    'build/**',
    'dist/**',
    'node_modules/**',
    'cache/**',
  ],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  overrides: [
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      plugins: ['react', 'jsx-a11y', 'prettier', 'import'],
      rules: {
        'prettier/prettier': [
          'error',
          {
            singleQuote: false,
            semi: true,
            trailingComma: 'es5',
            printWidth: 80,
            tabWidth: 2,
          },
        ],
      },
      extends: [
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:prettier/recommended',
      ],
      settings: {
        react: {
          version: 'detect',
        },
        formComponents: ['Form'],
        linkComponents: [
          { name: 'Link', linkAttribute: 'to' },
          { name: 'NavLink', linkAttribute: 'to' },
        ],
      },
    },
    {
      files: ['**/*.{ts,tsx}'],
      plugins: ['@typescript-eslint', 'import', 'prettier'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:prettier/recommended',
      ],
    },
    {
      files: ['.eslintrc.cjs'],
      env: {
        node: true,
      },
    },
  ],
};
