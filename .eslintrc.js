module.exports = {
  extends: [
    'airbnb-base/legacy'
  ],
  // parserOptions: {
  //   project: './tsconfig.json',
  // },
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  rules: {
    'class-methods-use-this': 'off',
    strict: ['warn', 'never'],
    'global-require': 'off',
    'max-classes-per-file': 'off',
    'array-callback-return': 'warn',
    'no-unneeded-ternary': 'warn',
    'no-nested-ternary': 'warn',
    'no-unused-vars': 'off'

  //   "class-name": 'off',
  //   "comment-format": [
  //     'off',
  //     "check-space"
  //   ],
  //   "import-name": 'off',
  //   "indent": ["off", 2],
  //   "one-line": [
  //     'off',
  //     "check-open-brace",
  //     "check-whitespace"
  //   ],
  //   "no-var-keyword": 'warn',
  //   "no-unused-variable": 'error',
  //   "quotemark": [
  //     'warn',
  //     "single",
  //     "avoid-escape"
  //   ],
  //   "semicolon": [
  //     'warn',
  //     "always",
  //     "ignore-bound-class-methods"
  //   ],
  //   "whitespace": [
  //     'warn',
  //     "check-branch",
  //     "check-decl",
  //     "check-operator",
  //     "check-module",
  //     "check-separator",
  //     "check-type"
  //   ],
  //   "typedef-whitespace": [
  //     'warn',
  //     {
  //       "call-signature": "nospace",
  //       "index-signature": "nospace",
  //       "parameter": "nospace",
  //       "property-declaration": "nospace",
  //       "variable-declaration": "nospace"
  //     },
  //     {
  //       "call-signature": "onespace",
  //       "index-signature": "onespace",
  //       "parameter": "onespace",
  //       "property-declaration": "onespace",
  //       "variable-declaration": "onespace"
  //     }
  //   ],
  //   "no-internal-module": 'error',
  //   "no-trailing-whitespace": 'error',
  //   "no-null-keyword": 'warn',
  //   "prefer-const": 'warn',
  //   "jsdoc-format": 'warn'
  }
};
