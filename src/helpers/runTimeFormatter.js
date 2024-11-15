export function runTimeFormatter(num) {
  let h = Math.floor(num / 60)
  let m = num % 60
  return `0${h}:${m}:00`
}