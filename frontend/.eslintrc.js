module.exports = {
  extends: ['../.eslintrc.js'],
  rules: {
    'sort-imports': [
      'error',
      {
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: true,
      },
    ],
  },
};
