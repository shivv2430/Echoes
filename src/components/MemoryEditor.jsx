import React, { useState, useEffect } from 'react';
import { PenTool, Check, RotateCcw, Calendar, Users, MapPin, Tag, FileText } from 'lucide-react';
import AudioRecorder from './AudioRecorder';

export default function MemoryEditor({ onSaveMemory, initialPrompt = '', onCancel }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [people, setPeople] = useState('');
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState('');
  const [notes, setNotes] = useState('');
  
  // Audio state
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioDuration, setAudioDuration] = useState(0);

  // If prompt is provided from empty state, prefill body
  useEffect(() => {
    if (initialPrompt) {
      setBody(`Story regarding: ${initialPrompt}\n\n`);
    }
  }, [initialPrompt]);

  const handleAudioRecorded = (blob, duration) => {
    setAudioBlob(blob);
    setAudioDuration(duration);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!body.trim() && !audioBlob) {
      alert('Please write a story or record a voice note before saving.');
      return;
    }

    const memory = {
      title: title.trim(),
      body: body.trim(),
      date,
      people: people.split(',').map((p) => p.trim()).filter(Boolean),
      location: location.trim(),
      tags: tags.split(/[,#]/).map((t) => t.trim().toLowerCase()).filter(Boolean),
      notes: notes.trim(),
      audioBlob,
      audioDuration,
      isAiGenerated: false,
    };

    onSaveMemory(memory);

    // Reset form
    setTitle('');
    setBody('');
    setPeople('');
    setLocation('');
    setTags('');
    setNotes('');
    setAudioBlob(null);
    setAudioDuration(0);
  };

  return (
    <div className="editor-card">
      <div className="editor-header">
        <h2 className="editor-title">Preserve a Recollection</h2>
        <p className="editor-subtitle">
          Write down memories, record voices, or save family stories exactly as they were spoken.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Oral Audio Recording Section */}
        <AudioRecorder
          onAudioRecorded={handleAudioRecorded}
          initialBlob={audioBlob}
          initialDuration={audioDuration}
        />

        {/* Story Body */}
        <div className="form-group">
          <label className="form-label" htmlFor="memory-body">
            The Story or Recollection
          </label>
          <textarea
            id="memory-body"
            className="form-textarea"
            placeholder="Write what happened... What did Grandma say? What scents, sounds, or words do you remember?"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        {/* Title (Optional) */}
        <div className="form-group">
          <label className="form-label" htmlFor="memory-title">
            Title <span style={{ fontWeight: 400, textTransform: 'none', color: 'var(--text-muted)' }}>(Optional — can be written by you or generated locally later)</span>
          </label>
          <input
            id="memory-title"
            type="text"
            className="form-input"
            placeholder="e.g. Grandma's Childhood in the Orchard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Metadata Grid */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="memory-date">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={13} />
                <span>Date or Era</span>
              </span>
            </label>
            <input
              id="memory-date"
              type="date"
              className="form-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="memory-people">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Users size={13} />
                <span>People Involved</span>
              </span>
            </label>
            <input
              id="memory-people"
              type="text"
              className="form-input"
              placeholder="e.g. Grandma Eleanor, Uncle Ben"
              value={people}
              onChange={(e) => setPeople(e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="memory-location">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={13} />
                <span>Place / Location</span>
              </span>
            </label>
            <input
              id="memory-location"
              type="text"
              className="form-input"
              placeholder="e.g. Old Homestead, Boston"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="memory-tags">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Tag size={13} />
                <span>Archival Tags</span>
              </span>
            </label>
            <input
              id="memory-tags"
              type="text"
              className="form-input"
              placeholder="e.g. recipe, childhood, winter, traditions"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>

        {/* Private Personal Notes */}
        <div className="form-group">
          <label className="form-label" htmlFor="memory-notes">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <FileText size={13} />
              <span>Personal Context & Private Notes</span>
            </span>
          </label>
          <textarea
            id="memory-notes"
            className="form-input"
            rows={2}
            placeholder="Extra context for future generations (e.g. She told me this on her 85th birthday over tea)."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.85rem', marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-light)' }}>
          {onCancel && (
            <button
              type="button"
              className="btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="btn-primary"
            id="btn-save-memory"
          >
            <Check size={16} />
            <span>Save to Private Archive</span>
          </button>
        </div>
      </form>
    </div>
  );
}
