import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, Users, MapPin, Tag, Play, Pause, Trash2, Edit3, Check, ArrowLeft } from 'lucide-react';
import { formatArchivalDate, formatDuration } from '../utils/formatters';

export default function MemoryDetailModal({
  memory,
  onClose,
  onDelete,
  onUpdate,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Editable fields
  const [title, setTitle] = useState(memory.title || '');
  const [body, setBody] = useState(memory.body || '');
  const [date, setDate] = useState(memory.date || '');
  const [peopleStr, setPeopleStr] = useState(memory.people?.join(', ') || '');
  const [location, setLocation] = useState(memory.location || '');
  const [tagsStr, setTagsStr] = useState(memory.tags?.join(', ') || '');
  const [notes, setNotes] = useState(memory.notes || '');

  const audioRef = useRef(null);

  // Create Object URL for audio blob
  useEffect(() => {
    if (memory.audioBlob) {
      const url = URL.createObjectURL(memory.audioBlob);
      setAudioUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [memory.audioBlob]);

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const togglePlayAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSaveEdit = () => {
    const updated = {
      ...memory,
      title: title.trim(),
      body: body.trim(),
      date,
      people: peopleStr.split(',').map((p) => p.trim()).filter(Boolean),
      location: location.trim(),
      tags: tagsStr.split(/[,#]/).map((t) => t.trim().toLowerCase()).filter(Boolean),
      notes: notes.trim(),
    };
    onUpdate(updated);
    setIsEditing(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <div className="modal-header">
          <div>
            <div className="memory-date">
              <Calendar size={13} />
              <span>{formatArchivalDate(isEditing ? date : memory.date)}</span>
            </div>
            {!isEditing ? (
              <h2 className="modal-title">{memory.title || 'Untitled recollection'}</h2>
            ) : (
              <input
                type="text"
                className="form-input"
                style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '0.4rem' }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Memory Title"
              />
            )}
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close memory details"
          >
            <X size={20} />
          </button>
        </div>

        {/* Audio Recording if attached */}
        {audioUrl && (
          <div className="archival-player" style={{ marginBottom: '1.5rem', padding: '0.75rem 1rem' }}>
            <button
              type="button"
              className="player-btn"
              onClick={togglePlayAudio}
              aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
            >
              {isPlaying ? <Pause size={15} /> : <Play size={15} />}
            </button>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>
                Spoken Oral Record
              </div>
              <span className="player-time">{formatDuration(memory.audioDuration)}</span>
            </div>
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={() => setIsPlaying(false)}
              onPause={() => setIsPlaying(false)}
            />
          </div>
        )}

        {/* View / Edit Mode */}
        {!isEditing ? (
          <div>
            <div className="detail-narrative">
              {memory.body || <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No written story recorded.</span>}
            </div>

            {(memory.people?.length > 0 || memory.location) && (
              <div className="memory-metadata" style={{ marginTop: '1.25rem', padding: '0.75rem 0', borderTop: '1px solid var(--border-light)' }}>
                {memory.people?.length > 0 && (
                  <span className="meta-item">
                    <Users size={14} />
                    <strong>People:</strong> {memory.people.join(', ')}
                  </span>
                )}
                {memory.location && (
                  <span className="meta-item">
                    <MapPin size={14} />
                    <strong>Location:</strong> {memory.location}
                  </span>
                )}
              </div>
            )}

            {memory.tags?.length > 0 && (
              <div className="memory-tags" style={{ margin: '1rem 0' }}>
                {memory.tags.map((tag, idx) => (
                  <span key={idx} className="archival-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {memory.notes && (
              <div className="detail-notes">
                <div className="detail-notes-title">Personal Archive Notes</div>
                <p>{memory.notes}</p>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Story / Recollection</label>
              <textarea
                className="form-textarea"
                rows={8}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Date of Memory</label>
                <input
                  type="date"
                  className="form-input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">People Involved</label>
                <input
                  type="text"
                  className="form-input"
                  value={peopleStr}
                  onChange={(e) => setPeopleStr(e.target.value)}
                  placeholder="e.g. Grandma Rose, Dad"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Kyoto, Japan"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tags</label>
                <input
                  type="text"
                  className="form-input"
                  value={tagsStr}
                  onChange={(e) => setTagsStr(e.target.value)}
                  placeholder="summer, tradition, cooking"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Private Notes</label>
              <textarea
                className="form-input"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Context or notes about this story"
              />
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="detail-footer-actions">
          {!isEditing ? (
            <>
              <div>
                {!confirmDelete ? (
                  <button
                    type="button"
                    className="btn-danger"
                    onClick={() => setConfirmDelete(true)}
                  >
                    <Trash2 size={15} />
                    <span>Delete</span>
                  </button>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.84rem', color: '#B93535', fontWeight: 500 }}>
                      Permanently delete this memory?
                    </span>
                    <button
                      type="button"
                      className="btn-danger"
                      onClick={() => onDelete(memory.id)}
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className="btn-secondary"
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.84rem' }}
                      onClick={() => setConfirmDelete(false)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIsEditing(true)}
              >
                <Edit3 size={15} />
                <span>Edit Memory</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                <ArrowLeft size={15} />
                <span>Cancel</span>
              </button>

              <button
                type="button"
                className="btn-primary"
                onClick={handleSaveEdit}
              >
                <Check size={16} />
                <span>Save Changes</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
