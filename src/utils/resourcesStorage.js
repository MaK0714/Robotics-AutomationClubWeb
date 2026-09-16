import bundledResources from '../data/resources.json';

export async function getResources() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('rac_peer_learning_resources');
    } catch (e) {}
  }

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

  if (Array.isArray(bundledResources)) {
    return bundledResources;
  }

  return [];
}
