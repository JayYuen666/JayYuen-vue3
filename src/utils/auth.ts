// auth.js
const TOKEN_KEY = '__TOKEN';
export function getTokenAUTH() {
  return localStorage.getItem(TOKEN_KEY);
}
