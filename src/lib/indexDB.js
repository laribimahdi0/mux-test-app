import { openDB } from 'idb';

const dbPromise = openDB('auth-db', 1, {
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

export async function getUser(email) {
  return (await dbPromise).get('users', email);
}

export async function addUser(user) {
  return (await dbPromise).add('users', user);
}


export async function getMedia(id) {
  return (await dbPromise).get('media', id);
}

export async function addMedia(media) {
  return (await dbPromise).add('media', media);
}

export async function getAllMedia() {
  return (await dbPromise).getAll('media');
}
