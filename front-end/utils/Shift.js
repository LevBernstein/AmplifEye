export default function Shift(alg, red, green, blue) {
  switch (alg) {
    case 0:
      if (red - green > 30 && red - blue > 30) {
        red = 0
        green = green
        blue = blue < 205 ? blue + 50 : 255
      }
  }
  return [red, green, blue]
}
