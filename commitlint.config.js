module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-empty': [1, 'never'],
    'type-empty': [1, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'UI',
        'refactor',
        'perf',
        'test',
        'build',
        'chore',
        'release',
      ],
    ],
  },
}
