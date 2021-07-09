export default class LocalStorageService {
  getItem(key) {
    if (localStorage.getItem(key)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  setItem(key, value) {
    localStorage.setItem(key, value);
  }
}
