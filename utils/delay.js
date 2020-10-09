export default function delay(milSec) {
  return new Promise(resolve => {
    setTimeout(resolve, milSec)
  })
}
