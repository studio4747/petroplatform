// lib/pocketbase.ts
import PocketBase from 'pocketbase';

const client = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL!);

// Optional: Persist auth across refreshes
if (typeof window !== 'undefined') {
  client.authStore.loadFromCookie(document.cookie || '');
  client.authStore.onChange(() => {
    document.cookie = client.authStore.exportToCookie({ httpOnly: false });
  });
}

export default client;
