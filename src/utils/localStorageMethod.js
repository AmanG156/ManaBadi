export function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

export function getLocalStorage(key) {
  return localStorage.getItem(key);
}

export function getUserLocale() {
  return getLocalStorage('i18nextLng') || 'de';
}

export function getRowsPerPage() {
  const rowsPerPage = getLocalStorage('rowsPerPage');
  if (rowsPerPage) {
    return parseInt(rowsPerPage, 10);
  }
  return 10;
}

export function logout() {
  localStorage.clear();
  sessionStorage.clear();
  window.location.assign('/');
}
