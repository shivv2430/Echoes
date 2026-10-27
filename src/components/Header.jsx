import React from 'react';
import { BookOpen, PenTool, Download, Settings, ShieldCheck } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  memoryCount,
  onExport,
  onOpenSettings,
}) {
  return (
    <header className="archival-header">
      <div className="brand-section">
        <div className="brand-title">
          <span>Echoes</span>
          <span className="brand-badge">Local-First</span>
        </div>
        <p className="brand-tagline">Preserving family oral histories, meaningful moments, and quiet recollections.</p>
      </div>

      <div className="header-actions">
        <nav className="view-tabs" aria-label="Archive navigation">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'library' ? 'active' : ''}`}
            onClick={() => setActiveTab('library')}
            id="tab-library"
          >
            <BookOpen size={16} />
            <span>Archive</span>
            {memoryCount > 0 && <span className="timer-tag" style={{ padding: '0.1rem 0.4rem', fontSize: '0.72rem' }}>{memoryCount}</span>}
          </button>

          <button
            type="button"
            className={`tab-btn ${activeTab === 'editor' ? 'active' : ''}`}
            onClick={() => setActiveTab('editor')}
            id="tab-editor"
          >
            <PenTool size={16} />
            <span>Record Memory</span>
          </button>
        </nav>

        <button
          type="button"
          className="btn-icon"
          title="Export memories as JSON"
          onClick={onExport}
          aria-label="Export Archive"
          id="btn-export-archive"
        >
          <Download size={17} />
        </button>

        <button
          type="button"
          className="btn-icon"
          title="Archive Privacy & Storage Settings"
          onClick={onOpenSettings}
          aria-label="Settings"
          id="btn-open-settings"
        >
          <Settings size={17} />
        </button>
      </div>
    </header>
  );
}
