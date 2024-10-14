export class LocalDb {
  static get(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  static remove(key) {
    localStorage.removeItem(key);
  }
  static clear() {
    localStorage.clear();
  }

  static getWishlist() {
    return Object.keys(LocalDb.get("wishlist") || {});
  }
  static addToWishlist(bookId) {
    const wishlist = LocalDb.get("wishlist") || {};
    wishlist[bookId] = true;
    LocalDb.set("wishlist", wishlist);
  }
  static isInWishlist(bookId) {
    return Boolean(LocalDb.get("wishlist")?.[bookId]);
  }
  static removeFromWishlist(bookId) {
    const wishlist = LocalDb.get("wishlist") || {};
    delete wishlist[bookId];
    LocalDb.set("wishlist", wishlist);
  }
}
