module.exports = {
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
