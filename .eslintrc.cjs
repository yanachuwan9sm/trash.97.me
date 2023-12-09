module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:import/recommended',
    'plugin:import/warnings',
    'next/core-web-vitals',
    'prettier',
  ],
  plugins: ['sort-destructure-keys', 'unused-imports'],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['**/*.js', '**/*.cjs', '**/*.mjs'],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  rules: {
    /* TypeScript Rules */
    // v6 で recommended から削除されたものを有効化
    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': 'error',
    // v6 で strict に移動したルールを有効化
    '@typescript-eslint/no-non-null-assertion': 'warn',
    // v6 で stylistic に移動したルールを有効化
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'error',
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    // v6 で recommended に追加されたルールを無効化
    '@typescript-eslint/no-duplicate-enum-values': 'off',
    '@typescript-eslint/no-unsafe-declaration-merging': 'off',
    // v6 で recommended-type-checked に追加されたルールを無効化
    '@typescript-eslint/no-base-to-string': 'off',
    '@typescript-eslint/no-duplicate-type-constituents': 'off',
    '@typescript-eslint/no-redundant-type-constituents': 'off',
    '@typescript-eslint/no-unsafe-enum-comparison': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'unused-imports/no-unused-imports': 'error',
    'react-hooks/exhaustive-deps': [
      'error',
      {
        enableDangerousAutofixThisMayCauseInfiniteLoops: true,
      },
    ],
    'sort-destructure-keys/sort-destructure-keys': 'error',
  },
}
