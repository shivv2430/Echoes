import React from 'react';
import { Calendar, Users, MapPin, Mic } from 'lucide-react';
import { formatArchivalDate, formatDuration } from '../utils/formatters';

export default function MemoryCard({ memory, onSelect }) {
  // Extract a human-like accession code for the card ledger
  const accessionCode = memory.id ? `№ ${memory.id.replace('mem_', '').slice(0, 6)}` : 'FOLIO';

  return (
    <article
      className="memory-card"
      onClick={() => onSelect(memory)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(memory);
        }
      }}
      aria-label={`Open memory: ${memory.title || 'Untitled recollection'}`}
    >
      <div>
        <div className="card-top-ledger">
          <div className="memory-date">
            <Calendar size={13} />
            <span>{formatArchivalDate(memory.date)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            {memory.audioBlob && (
              <span
                className="archival-tag"
                style={{
                  backgroundColor: 'var(--accent-terracotta-soft)',
                  color: 'var(--accent-terracotta)',
                  borderColor: 'var(--accent-terracotta)',
                }}
                title="Voice recording attached"
              >
                <Mic size={11} style={{ display: 'inline', marginRight: '3px' }} />
                {formatDuration(memory.audioDuration)}
              </span>
            )}
            <span className="card-ledger-mark" title="Archive Accession Number">
              {accessionCode}
            </span>
          </div>
        </div>

        <h3 className="memory-title">
          {memory.title || 'Untitled recollection'}
        </h3>

        <p className="memory-snippet">
          {memory.body ||
            (memory.audioBlob
              ? 'Oral history recording saved without text transcript.'
              : 'No written story recorded.')}
        </p>

        {(memory.people?.length > 0 || memory.location) && (
          <div className="memory-metadata">
            {memory.people?.length > 0 && (
              <span className="meta-item" title="People involved">
                <Users size={13} />
                <span>{memory.people.join(', ')}</span>
              </span>
            )}
            {memory.location && (
              <span className="meta-item" title="Location">
                <MapPin size={13} />
                <span>{memory.location}</span>
              </span>
            )}
          </div>
        )}
      </div>

      {memory.tags?.length > 0 && (
        <div className="memory-tags">
          {memory.tags.slice(0, 4).map((tag, idx) => (
            <span key={idx} className="archival-tag">
              #{tag}
            </span>
          ))}
          {memory.tags.length > 4 && (
            <span className="archival-tag">+{memory.tags.length - 4}</span>
          )}
        </div>
      )}
    </article>
  );
}
