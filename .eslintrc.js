module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2022: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'eslint-config-airbnb-base',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:vue/essential'
  ],
  plugins: ['vue', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src', '@/'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['src', 'node_modules']
      }
    }
  },
  rules: {
    'import/no-unresolved': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'vue/custom-event-name-casing': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-unused-vars': 'error',
    'space-before-function-paren': 'off',
    'no-unused-expressions': 'off',
    'no-param-reassign': 'off',
    'consistent-return': 'off',
    'no-console': 'off',
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'never']
  }
}
