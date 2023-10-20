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
  const db = await initdb();
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  
  // content is stored
  const id = await store.put({ content });
  await tx.done;

  console.log(`Added content with ID: ${id}`);
};

// TODO: Add logic for a method that gets all the content from the database

// This code creates a read-only transaction, retrieves all content from the database, and returns it.
export const getDb = async () => {
  // console.error('getDb not implemented')
  const db = await initdb();
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  
  const allContent = await store.getAll();
  await tx.done;

  return allContent;
};

initdb();