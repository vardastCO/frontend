export default function remToPixels(remValue: number) {
  // Get the root font size
  const rootFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  )

  // Convert rem to pixels
  const pixelsValue = remValue * rootFontSize

  return pixelsValue
}
