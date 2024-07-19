import { openDB } from 'idb';

const openDatabase = async () => {
  if (typeof window === 'undefined' || !window.indexedDB) {
    console.warn('indexedDB is not available in this environment');
    return null;
  }

  return openDB('auth-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'email' });
        console.log('Created object store: users');
      }

      if (!db.objectStoreNames.contains('media')) {
        db.createObjectStore('media', { keyPath: 'id', autoIncrement: true });
        console.log('Created object store: media');
      }
    },
  });
};

export const getUser = async (email) => {
  const db = await openDatabase();
  if (!db) return null;

  return db.get('users', email);
};

export const addUser = async (user) => {
  const db = await openDatabase();
  if (!db) return null;

  return db.add('users', user);
};

export const getMedia = async (id) => {
  const db = await openDatabase();
  if (!db) return null;

  return db.get('media', id);
};

export const addMedia = async (media) => {
  const db = await openDatabase();
  if (!db) return null;

  return db.add('media', media);
};

export const getAllMedia = async () => {
  const db = await openDatabase();
  if (!db) return [];

  return db.getAll('media');
};
