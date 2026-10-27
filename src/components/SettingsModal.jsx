import React, { useState } from 'react';
import { X, ShieldCheck, Download, Trash2, Cpu, HardDrive, AlertTriangle } from 'lucide-react';

export default function SettingsModal({
  onClose,
  onExport,
  onClearAll,
  totalMemories,
}) {
  const [confirmClear, setConfirmClear] = useState(false);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '560px' }}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <ShieldCheck size={22} style={{ color: 'var(--accent-olive)' }} />
            <h2 className="modal-title" style={{ fontSize: '1.35rem' }}>Archive Privacy & Storage</h2>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close settings"
          >
            <X size={20} />
          </button>
        </div>

        {/* Local-first architecture explanation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
          <div style={{ background: 'var(--bg-subtle)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              <HardDrive size={16} />
              <span>100% Local-First Persistence</span>
            </div>
            <p style={{ lineHeight: 1.6 }}>
              All your recollections and audio recordings are stored in your device's browser using <strong>IndexedDB</strong>. Nothing is ever sent to external cloud databases, analytics providers, or third-party servers.
            </p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Note: Because storage lives inside this browser profile, clearing browser cache or profile data will remove the archive. Use the Export button regularly to keep a safe backup.
            </p>
          </div>

          {/* AI inference notice */}
          <div style={{ background: 'var(--bg-subtle)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              <Cpu size={16} />
              <span>Local AI Engine (Week 2 Integration)</span>
            </div>
            <p style={{ lineHeight: 1.6 }}>
              Echoes is engineered to connect to <strong>Ollama</strong> running directly on your Mac. When connected, AI titles and memory Q&A run 100% on your local CPU/GPU with open-weight models (like Llama 3.2 3B). No API keys or cloud requests are needed.
            </p>
          </div>

          {/* Export Action */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderTop: '1px solid var(--border-light)' }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>Export Archive Backup</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Download all {totalMemories} memories and voice records as a portable JSON file.
              </div>
            </div>
            <button
              type="button"
              className="btn-secondary"
              onClick={onExport}
            >
              <Download size={15} />
              <span>Export JSON</span>
            </button>
          </div>

          {/* Clear Archive Danger Zone */}
          <div style={{ padding: '0.75rem 0', borderTop: '1px solid var(--border-light)' }}>
            <div style={{ fontWeight: 600, color: '#B93535', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
              <AlertTriangle size={15} />
              <span>Clear Entire Archive</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Permanently wipe all stories, recordings, and metadata from this device.
            </p>

            {!confirmClear ? (
              <button
                type="button"
                className="btn-danger"
                onClick={() => setConfirmClear(true)}
              >
                <Trash2 size={15} />
                <span>Erase All Data</span>
              </button>
            ) : (
              <div style={{ background: '#FDF2F0', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #F5C6CB' }}>
                <p style={{ fontSize: '0.85rem', color: '#B93535', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Are you absolutely certain? This cannot be undone.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    className="btn-danger"
                    style={{ backgroundColor: '#B93535', color: '#FFFFFF' }}
                    onClick={() => {
                      onClearAll();
                      setConfirmClear(false);
                      onClose();
                    }}
                  >
                    Yes, Permanently Erase
                  </button>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setConfirmClear(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
