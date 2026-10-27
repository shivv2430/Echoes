import React, { useState, useMemo } from 'react';
import { Search, X, Filter, Tag, Users } from 'lucide-react';
import MemoryCard from './MemoryCard';
import EmptyArchive from './EmptyArchive';

export default function MemoryLibrary({
  memories,
  onSelectMemory,
  onStartWriting,
  onSelectPrompt,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set();
    memories.forEach((m) => {
      if (Array.isArray(m.tags)) {
        m.tags.forEach((t) => tagsSet.add(t.toLowerCase()));
      }
    });
    return Array.from(tagsSet).sort();
  }, [memories]);

  // Extract all unique people
  const allPeople = useMemo(() => {
    const peopleSet = new Set();
    memories.forEach((m) => {
      if (Array.isArray(m.people)) {
        m.people.forEach((p) => peopleSet.add(p));
      }
    });
    return Array.from(peopleSet).sort();
  }, [memories]);

  // Filter memories
  const filteredMemories = useMemo(() => {
    return memories.filter((m) => {
      // Tag filter
      if (selectedTag && (!m.tags || !m.tags.map((t) => t.toLowerCase()).includes(selectedTag))) {
        return false;
      }

      // Person filter
      if (selectedPerson && (!m.people || !m.people.includes(selectedPerson))) {
        return false;
      }

      // Text Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = (m.title || '').toLowerCase().includes(q);
        const inBody = (m.body || '').toLowerCase().includes(q);
        const inLocation = (m.location || '').toLowerCase().includes(q);
        const inNotes = (m.notes || '').toLowerCase().includes(q);
        const inPeople = (m.people || []).some((p) => p.toLowerCase().includes(q));
        const inTags = (m.tags || []).some((t) => t.toLowerCase().includes(q));

        if (!inTitle && !inBody && !inLocation && !inNotes && !inPeople && !inTags) {
          return false;
        }
      }

      return true;
    });
  }, [memories, searchQuery, selectedTag, selectedPerson]);

  const hasActiveFilters = Boolean(searchQuery.trim() || selectedTag || selectedPerson);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedTag(null);
    setSelectedPerson(null);
  };

  if (memories.length === 0) {
    return <EmptyArchive onSelectPrompt={onSelectPrompt} onStartWriting={onStartWriting} />;
  }

  return (
    <div className="memory-library-view">
      {/* Archive Search & Filters Toolbar */}
      <div className="archive-toolbar">
        <div className="search-bar-row">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search recollections by keywords, people, stories, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="input-library-search"
            />
            {searchQuery && (
              <button
                type="button"
                className="modal-close-btn"
                style={{ position: 'absolute', right: '0.75rem' }}
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills for Tags and People */}
        {(allTags.length > 0 || allPeople.length > 0) && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {allTags.length > 0 && (
              <div className="filter-pills">
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  Tags:
                </span>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={`filter-pill ${selectedTag === tag ? 'active' : ''}`}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}

            {allPeople.length > 0 && (
              <div className="filter-pills">
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  People:
                </span>
                {allPeople.map((person) => (
                  <button
                    key={person}
                    type="button"
                    className={`filter-pill ${selectedPerson === person ? 'active' : ''}`}
                    onClick={() => setSelectedPerson(selectedPerson === person ? null : person)}
                  >
                    {person}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Results metadata bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span>
            Showing {filteredMemories.length} {filteredMemories.length === 1 ? 'memory' : 'memories'}
            {hasActiveFilters && ` (filtered from ${memories.length})`}
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              className="tab-btn"
              style={{ padding: '0.2rem 0.5rem', fontSize: '0.78rem' }}
              onClick={clearAllFilters}
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Grid of Memory Cards */}
      {filteredMemories.length > 0 ? (
        <div className="memories-grid">
          {filteredMemories.map((memory) => (
            <MemoryCard
              key={memory.id}
              memory={memory}
              onSelect={onSelectMemory}
            />
          ))}
        </div>
      ) : (
        <div className="empty-archive" style={{ padding: '3.5rem 1.5rem' }}>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-serif)', marginBottom: '0.75rem' }}>
            No recollections matched your search filters.
          </p>
          <button
            type="button"
            className="btn-secondary"
            onClick={clearAllFilters}
          >
            Clear Search Filters
          </button>
        </div>
      )}
    </div>
  );
}
