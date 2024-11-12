export function durationFormatter(num) {
  let result = ''
  let h = Math.floor(num / 60)
  let m = num % 60
  return `${h}h ${m}m`
}