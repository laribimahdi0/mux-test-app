import { openDB } from 'idb';

const dbPromise = openDB('auth-db', 1, {
  upgrade(db) {
    db.createObjectStore('users', { keyPath: 'email' });
  },
});

export async function getUser(email) {
  return (await dbPromise).get('users', email);
}

export async function addUser(user) {
  return (await dbPromise).add('users', user);
}
