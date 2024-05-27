// indexedDB.js

const DB_NAME = 'SlateyDB';
const DB_VERSION = 1;
const STORE_NAME = 'Pages';

class IndexedDBService {
  constructor() {
    this.db = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this.db);
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        console.log('IndexedDB upgradeneeded');
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        console.log('IndexedDB initialized');
        resolve(this.db);
      };

      request.onerror = (event) => {
        reject(`IndexedDB error: ${event.target.errorCode}`);
      };
    });
  }

  async getItem(key) {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onsuccess = () => {
        console.log(`Getting item ${key} from IndexedDB`, request.result);
        resolve(request.result ? request.result.value : null);
      };

      request.onerror = () => {
        console.log(`Error getting item ${key} from IndexedDB`);
        reject(`Error getting item ${key}`);
      };
    });
  }

  async setItem(key, value) {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put({ id: key, value });

      request.onsuccess = () => {
        console.log(`Setting item ${key} in IndexedDB`, value);
        resolve();
      };

      request.onerror = () => {
        console.log(`Error setting item ${key} in IndexedDB`, request.error);
        reject(`Error setting item ${key}`);
      };
    });
  }

  async updateItem(key, value) {
    const existingItem = await this.getItem(key);
    if (existingItem === null) {
      console.warn(`Item with key ${key} does not exist in IndexedDB`);
      this.setItem(key, value);
      console.log(`Updated item ${key} in IndexedDB`, value);
      return;
      // throw new Error(`Item with key ${key} does not exist`);
    }

    const newValue = { ...existingItem, ...value };
    console.log(`Updated item ${key} in IndexedDB`, newValue);
    await this.setItem(key, newValue);
  }

  async deleteItem(key) {
    const db = await this.init();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(key);

      request.onsuccess = () => {
        console.log(`Deleted item ${key} from IndexedDB`);
        resolve();
      };

      request.onerror = () => {
        console.log(`Error deleting item ${key} from IndexedDB`, request.error);
        reject(`Error deleting item ${key}`);
      };
    });
  }
}

export default new IndexedDBService();
