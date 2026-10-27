import React from 'react';
import { Feather, BookOpen, Compass } from 'lucide-react';

const INSPIRATION_PROMPTS = [
  'Grandma talking about her childhood school days',
  'The recipe and technique for our holiday dish',
  'Moving into our first apartment with almost nothing',
  'The songs grandfather used to hum on summer evenings',
  'A tradition we celebrate every winter without fail',
  'An unforgettable trip our family took together',
];

export default function EmptyArchive({ onSelectPrompt, onStartWriting }) {
  return (
    <div className="empty-archive">
      <div className="empty-icon">
        <Feather size={52} strokeWidth={1.5} />
      </div>
      <h3 className="empty-title">Your archive is currently quiet.</h3>
      <p className="empty-description">
        Every family is made of quiet stories, recipes, and moments that slip away if unwritten.
        Begin by capturing a single recollection today.
      </p>

      <button
        type="button"
        className="btn-primary"
        onClick={onStartWriting}
        id="btn-empty-start-writing"
      >
        <BookOpen size={16} />
        <span>Preserve Your First Memory</span>
      </button>

      <div style={{ marginTop: '2.5rem' }}>
        <p style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)' }}>
          Gentle Prompts to Begin
        </p>
        <div className="empty-prompts">
          {INSPIRATION_PROMPTS.map((prompt, index) => (
            <button
              key={index}
              type="button"
              className="prompt-chip"
              onClick={() => onSelectPrompt(prompt)}
            >
              “{prompt}”
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
