/**
 * Format ISO or YYYY-MM-DD date into human-friendly archival date
 */
export function formatArchivalDate(dateStr) {
  if (!dateStr) return 'Unknown date';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  } catch (e) {
    // fallback
  }
  return dateStr;
}

/**
 * Format audio seconds into MM:SS
 */
export function formatDuration(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

/**
 * Parse comma or space separated tags
 */
export function parseTags(tagString) {
  if (!tagString) return [];
  if (Array.isArray(tagString)) return tagString;
  return tagString
    .split(/[,#]/)
    .map((t) => t.trim().toLowerCase())
    .filter((t) => t.length > 0);
}

/**
 * Parse comma separated list of names
 */
export function parsePeople(peopleString) {
  if (!peopleString) return [];
  if (Array.isArray(peopleString)) return peopleString;
  return peopleString
    .split(',')
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
}
