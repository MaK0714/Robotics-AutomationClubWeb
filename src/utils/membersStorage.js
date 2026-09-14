// ─── CSV FILE DATA SOURCE & STORAGE UTILITY ──────────────────────────────────
// Reads directly from members.csv / /api/members on disk every time.
// All submitted members are written directly to members.csv.

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

export function parseCSV(csvText) {
  if (!csvText) return [];
  const lines = csvText.trim().split('\n');
  if (lines.length <= 1) return [];

  const members = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const parts = parseCSVLine(line);
    if (parts.length >= 3) {
      members.push({
        number: parseInt(parts[0], 10) || i,
        name: parts[1],
        branch: parts.slice(2).join(', '),
      });
    }
  }
  return members;
}

export async function getMembers() {
  // Clean up any old localStorage test cache to ensure 100% fidelity to the CSV file
  try {
    localStorage.removeItem('rac_added_members');
  } catch (e) {}

  // 1. Try fetching from /api/members (Vite middleware connected to root members.csv)
  try {
    const res = await fetch(`/api/members?t=${Date.now()}`, {
      cache: 'no-store',
      headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache' },
    });
    if (res.ok) {
      const text = await res.text();
      const parsed = parseCSV(text);
      if (parsed.length > 0) return parsed;
    }
  } catch (err) {
    // fallback to static file fetch below
  }

  // 2. Fallback to /members.csv directly
  try {
    const res = await fetch(`/members.csv?t=${Date.now()}`, {
      cache: 'no-store',
      headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache' },
    });
    if (res.ok) {
      const text = await res.text();
      return parseCSV(text);
    }
  } catch (err) {
    console.warn('Could not load members.csv:', err);
  }

  return [];
}

export async function addMember({ name, branch }) {
  const cleanName = name.trim();
  const cleanBranch = branch.trim();

  // POST directly to /api/members which updates members.csv and public/members.csv on disk
  try {
    const res = await fetch('/api/members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: cleanName, branch: cleanBranch }),
    });

    if (res.ok) {
      // Re-fetch fresh directly from the updated CSV file
      return await getMembers();
    }
  } catch (err) {
    console.error('Error saving member to CSV file:', err);
  }

  // If server post failed, return current list
  return await getMembers();
}
