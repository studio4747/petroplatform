// lib/pocketbase.ts
import PocketBase from 'pocketbase';

const client = new PocketBase('http://127.0.0.1:8090'); // Use your local server or change to deployed URL later

// Optional: Persist auth across refreshes
if (typeof window !== 'undefined') {
  client.authStore.loadFromCookie(document.cookie || '');
  client.authStore.onChange(() => {
    document.cookie = client.authStore.exportToCookie({ httpOnly: false });
  });
}

export default client;