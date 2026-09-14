// ─── DIGITAL LIBRARY DATA SOURCE & STORAGE UTILITY ─────────────────────────
// Connects directly to code file storage (src/data/library.json & /api/library).
// Does NOT use browser localStorage.
// Enforces password authentication ('MayureshPassword') for uploads & deletions.

import bundledLibrary from '../data/library.json';

export const ADMIN_PASSWORD = 'MayureshPassword';

export async function getLibraryItems() {
  // Clear any legacy localStorage to ensure clean code-file-only data
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('rac_digital_library_items');
    } catch (e) {}
  }

  // 1. Fetch from /api/library (Vite server middleware connected directly to src/data/library.json on disk)
  try {
    const res = await fetch(`/api/library?t=${Date.now()}`, {
      cache: 'no-store',
      headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache' },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch (err) {
    // Fallback to static fetch below
  }

  // 2. Fallback to static /library.json
  try {
    const res = await fetch(`/library.json?t=${Date.now()}`, {
      cache: 'no-store',
      headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache' },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch (err) {
    console.warn('Could not load /library.json:', err);
  }

  // 3. Fallback to bundled code file
  if (Array.isArray(bundledLibrary)) {
    return bundledLibrary;
  }

  return [];
}

export async function uploadLibraryItem(itemData) {
  const { password, ...fields } = itemData;

  // Strict client check
  if (password !== ADMIN_PASSWORD) {
    throw new Error('Incorrect password! Only authorized users can upload to the Digital Library.');
  }

  const res = await fetch('/api/library', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password,
      ...fields,
    }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to upload library item');
  }

  return data;
}

export async function deleteLibraryItem({ id, password }) {
  // Strict client check
  if (password !== ADMIN_PASSWORD) {
    throw new Error('Incorrect password! Cannot delete library resource.');
  }

  const res = await fetch('/api/library', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action: 'delete',
      id,
      password,
    }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Failed to delete library item');
  }

  return data;
}

