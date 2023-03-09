module.exports = {
  extends: [
    'standard',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  env: {
    node: true,
    mocha: true
  },
  plugins: ['prettier'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': 'off', // We should turn this one on soon
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    'no-use-before-define': 'off',
    camelcase: 'off',
    'no-unused-vars': 'off',
    'func-call-spacing': 'off',
    semi: ['error', 'never'],
    'no-undef': 'error',
    'no-empty': 'off',
    'arrow-parens': 'off',
    'padded-blocks': 'off',
    'no-prototype-builtins': 'off', // added by Dheeraj, to remove
    'no-async-promise-executor': 'off', // added by Dheeraj, to remove
    'no-useless-catch': 'off', // added by Dheeraj, to remove
    'prefer-regex-literals': 'off', // added by Dheeraj, to remove
    'no-unmodified-loop-condition': 'off', // added by Dheeraj, to remove
    'array-callback-return': 'off', // added by Dheeraj, to remove
    'node/no-path-concat': 'off', // added by Dheeraj, to remove

    'space-before-function-paren': 'off',
    'generator-star-spacing': 'off',

    'prettier/prettier': 'error',

    'import/no-unresolved': 'error',
    'import/order': 'off'
  }
};
