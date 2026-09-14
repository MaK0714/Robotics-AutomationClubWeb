// ─── RESOURCES DATA SOURCE & STORAGE UTILITY ───────────────────────────────
// Connects directly to code file storage (src/data/resources.json & /api/resources).
// Does NOT use browser localStorage for resources.
// Enforces password authentication ('MayureshPassword') for uploads.

import bundledResources from '../data/resources.json';

export const ADMIN_PASSWORD = 'MayureshPassword';

export async function getResources() {
  // Clear any legacy localStorage to ensure clean code-file-only data
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('rac_peer_learning_resources');
    } catch (e) {}
  }

  // 1. Fetch from /api/resources (Vite server middleware connected directly to src/data/resources.json on disk)
  try {
    const res = await fetch(`/api/resources?t=${Date.now()}`, {
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

  // 2. Fallback to static /resources.json
  try {
    const res = await fetch(`/resources.json?t=${Date.now()}`, {
      cache: 'no-store',
      headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache' },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch (err) {
    console.warn('Could not load /resources.json:', err);
  }

  // 3. Fallback to bundled code file
  if (Array.isArray(bundledResources)) {
    return bundledResources;
  }

  return [];
}

export async function uploadResource(resourceData) {
  const { password, ...fields } = resourceData;

  // Strict client check
  if (password !== ADMIN_PASSWORD) {
    throw new Error('Incorrect password! Only authorized users can upload resources.');
  }

  const res = await fetch('/api/resources', {
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
    throw new Error(data.error || 'Failed to upload resource');
  }

  return data;
}

export async function deleteResource({ id, password }) {
  // Strict client check
  if (password !== ADMIN_PASSWORD) {
    throw new Error('Incorrect password! Cannot delete resource.');
  }

  const res = await fetch('/api/resources', {
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
    throw new Error(data.error || 'Failed to delete resource');
  }

  return data;
}


