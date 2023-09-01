export function getToken() {
  return document.cookie.slice(6)
}