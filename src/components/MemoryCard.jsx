import React from 'react';
import { Calendar, Users, MapPin, Mic, Tag, ChevronRight } from 'lucide-react';
import { formatArchivalDate, formatDuration } from '../utils/formatters';

export default function MemoryCard({ memory, onSelect }) {
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="memory-date">
            <Calendar size={13} />
            <span>{formatArchivalDate(memory.date)}</span>
          </div>
          {memory.audioBlob && (
            <span
              className="archival-tag"
              style={{ backgroundColor: 'var(--accent-terracotta-soft)', color: 'var(--accent-terracotta)', borderColor: 'var(--accent-terracotta)' }}
              title="Voice recording attached"
            >
              <Mic size={11} style={{ display: 'inline', marginRight: '3px' }} />
              {formatDuration(memory.audioDuration)}
            </span>
          )}
        </div>

        <h3 className="memory-title">
          {memory.title || 'Untitled recollection'}
        </h3>

        <p className="memory-snippet">
          {memory.body || (memory.audioBlob ? 'Oral history recording saved without text transcript.' : 'No written content.')}
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
