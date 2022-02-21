module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: ['error', 'never'],
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/camelcase': ['error', { properties: 'never', ignoreDestructuring: true }],
    '@typescript-eslint/prefer-interface': 'off',
    'vue/no-v-html': 'off'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2018
  }
}
