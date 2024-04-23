const path = require('path')

const getRelativePath = (f) => path.relative(process.cwd(), f)

const checkFilePath = (filenames) => {
  const errFiles = filenames.filter((f) => /[A-Z]/.test(getRelativePath(f)))
  if (errFiles.length !== 0) {
    errFiles.forEach((f) =>
      console.log(`${getRelativePath(f)} has capital letter`),
    )
    process.exit(1)
  }
  return 'echo'
}

const buildEslintCommand = (filenames) =>
  `next lint --file ${filenames
    .map((f) => getRelativePath(f))
    .join(' --file ')}`

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand, 'prettier --write'],
  'src/**/*': [checkFilePath],
}
