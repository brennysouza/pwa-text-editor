import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // console.error('putDb not implemented')
  const db = openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  // content is stored
  const id = store.put({ id: 1, value: content });
  const result = await id;
  console.log(`Added content with ID: ${result.value}`);
};

// TODO: Add logic for a method that gets all the content from the database

// This code creates a read-only transaction, retrieves all content from the database, and returns it.
export const getDb = async () => {
  // console.error('getDb not implemented')
  const db = openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const allContent = store.get(1);
  const result = await allContent;
  return result?.value;
};

initdb();