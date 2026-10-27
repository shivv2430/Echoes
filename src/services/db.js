import { openDB } from 'idb';

const DB_NAME = 'echoes-archive';
const DB_VERSION = 1;
const STORE_NAME = 'memories';

/**
 * Initialize IndexedDB for Echoes archive
 */
export async function getDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('createdAt', 'createdAt');
        store.createIndex('date', 'date');
      }
    },
  });
}

/**
 * Fetch all memories sorted chronologically (newest first)
 */
export async function getAllMemories() {
  const db = await getDB();
  const all = await db.getAllFromIndex(STORE_NAME, 'createdAt');
  return all.reverse(); // newest first
}

/**
 * Fetch a single memory by ID
 */
export async function getMemory(id) {
  const db = await getDB();
  return db.get(STORE_NAME, id);
}

/**
 * Save or update a memory
 */
export async function saveMemory(memory) {
  const db = await getDB();
  const now = Date.now();
  const record = {
    id: memory.id || `mem_${now}_${Math.random().toString(36).slice(2, 7)}`,
    title: (memory.title || '').trim(),
    body: (memory.body || '').trim(),
    summary: (memory.summary || '').trim(),
    audioBlob: memory.audioBlob || null,
    audioDuration: memory.audioDuration || 0,
    date: memory.date || new Date().toISOString().split('T')[0],
    people: Array.isArray(memory.people) ? memory.people : [],
    location: (memory.location || '').trim(),
    tags: Array.isArray(memory.tags) ? memory.tags : [],
    notes: (memory.notes || '').trim(),
    isAiGenerated: Boolean(memory.isAiGenerated),
    createdAt: memory.createdAt || now,
    updatedAt: now,
  };

  await db.put(STORE_NAME, record);
  return record;
}

/**
 * Delete a memory permanently
 */
export async function deleteMemory(id) {
  const db = await getDB();
  await db.delete(STORE_NAME, id);
}

/**
 * Export all memories as JSON
 * Note: audioBlobs are converted to base64 data URLs for backup export
 */
export async function exportArchiveAsJSON() {
  const memories = await getAllMemories();
  
  const serialized = await Promise.all(
    memories.map(async (m) => {
      let audioBase64 = null;
      if (m.audioBlob) {
        audioBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = () => resolve(null);
          reader.readAsDataURL(m.audioBlob);
        });
      }
      return {
        ...m,
        audioBlob: undefined,
        audioDataUrl: audioBase64,
      };
    })
  );

  return JSON.stringify(
    {
      appName: 'Echoes',
      version: '1.0',
      exportedAt: new Date().toISOString(),
      totalMemories: serialized.length,
      memories: serialized,
    },
    null,
    2
  );
}

/**
 * Clear all records in the archive
 */
export async function clearAllMemories() {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.objectStore(STORE_NAME).clear();
  await tx.done;
}
