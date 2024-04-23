export const randomImage = (width = 500, height = 500) => {
  return `https://source.unsplash.com/random/${width}x${height}/?${Math.floor(
    Math.random() * 100,
  )}`
}
