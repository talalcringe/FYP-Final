// localStorage.js

class LocalStorageService {
  // Get an item from localStorage
  getItem(key) {
    try {
      const item = localStorage.getItem(key);
      console.log(`Getting item ${key} from localStorage`, item);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage`, error);
      return null;
    }
  }

  // Set an item in localStorage
  setItem(key, value) {
    try {
      const valueToStore = JSON.stringify(value);
      localStorage.setItem(key, valueToStore);
      console.log(`Setting item ${key} in localStorage`, valueToStore);
    } catch (error) {
      console.error(`Error setting item ${key} in localStorage`, error);
    }
  }

  // Update an item in localStorage
  updateItem(key, value) {
    try {
      const existingItem = this.getItem(key);
      if (existingItem) {
        const newValue = { ...existingItem, ...value };
        this.setItem(key, newValue);
        console.log(`Updated item ${key} in localStorage`, newValue);
      } else {
        console.warn(`Item with key ${key} does not exist in localStorage`);
      }
    } catch (error) {
      console.error(`Error updating item ${key} in localStorage`, error);
    }
  }

  // Delete an item from localStorage
  deleteItem(key) {
    try {
      localStorage.removeItem(key);
      console.log(`Deleted item ${key} from localStorage`);
    } catch (error) {
      console.error(`Error deleting item ${key} from localStorage`, error);
    }
  }

  // // Get first Item from localStorage
  // getFirstItem() {
  //   try {
  //     const item = localStorage.getItem(Object.keys(localStorage)[0]);
  //     console.log(`Getting first item from localStorage`, item);
  //     return item ? JSON.parse(item) : null;
  //   } catch (error) {
  //     console.error(`Error getting first item from localStorage`, error);
  //     return null;
  //   }
  // }
}

export default new LocalStorageService();
