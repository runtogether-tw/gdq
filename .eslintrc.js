module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'max-len': 0,
    'indent': [
      'error',
      2,
      {
        'ignoredNodes': [
          'TemplateLiteral'
        ],
      },
    ],
    'template-curly-spacing': [
      'off',
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
