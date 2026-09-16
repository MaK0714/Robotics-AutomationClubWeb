import bundledLibrary from '../data/library.json';

export async function getLibraryItems() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('rac_digital_library');
    } catch (e) {}
  }

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

  if (Array.isArray(bundledLibrary)) {
    return bundledLibrary;
  }

  return [];
}
