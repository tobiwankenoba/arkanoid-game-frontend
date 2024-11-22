module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['@typescript-eslint', 'import'],
  overrides: [
    {
      files: ['packages/client/**'],
      rules: {
        'import/order': [
          2,
          {
            groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
            'newlines-between': 'always',
            pathGroups: [
              {
                pattern: '@/**',
                group: 'internal',

              },
              {
                pattern: '@mui/**',
                group: 'external',
              }
            ],
            alphabetize: {
              order: 'asc'
            }
          }
        ]
      }
    }
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
  },
}
