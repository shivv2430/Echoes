import React from 'react';
import { BookOpen, PenTool, Download, Settings, Sun, Moon } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  memoryCount,
  onExport,
  onOpenSettings,
  theme = 'light',
  onToggleTheme,
}) {
  const isDark = theme === 'dark';

  return (
    <header className="archival-header">
      <div className="brand-section">
        <div className="brand-meta-stamp">
          <span>Local Archival Folio · No Cloud</span>
        </div>
        <div className="brand-title">
          <span>Echoes</span>
          <span className="brand-badge">Sovereign & Offline</span>
        </div>
        <p className="brand-tagline">
          A quiet keeper for voices, family recollections, and stories before they wander away.
        </p>
      </div>

      <div className="header-actions">
        {/* Navigation Tabs */}
        <nav className="view-tabs" aria-label="Archive navigation">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'library' ? 'active' : ''}`}
            onClick={() => setActiveTab('library')}
            id="tab-library"
          >
            <BookOpen size={16} />
            <span>Archive</span>
            {memoryCount > 0 && (
              <span className="timer-tag" style={{ padding: '0.1rem 0.45rem', fontSize: '0.72rem' }}>
                {memoryCount}
              </span>
            )}
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

        {/* Human-Made Day/Night Study Switch */}
        <button
          type="button"
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          title={isDark ? 'Switch to Daylight Paper' : 'Switch to Night Study (Candlelight)'}
          aria-label={isDark ? 'Switch to Daylight Paper' : 'Switch to Night Study (Candlelight)'}
          id="btn-theme-toggle"
        >
          <span className="theme-icon-orb">
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </span>
          <span>{isDark ? 'Night Study' : 'Daylight'}</span>
        </button>

        {/* Export JSON backup button */}
        <button
          type="button"
          className="btn-icon"
          title="Download archive backup (JSON)"
          onClick={onExport}
          aria-label="Export Archive JSON"
          id="btn-export-archive"
        >
          <Download size={17} />
        </button>

        {/* Settings button */}
        <button
          type="button"
          className="btn-icon"
          title="Storage and local privacy settings"
          onClick={onOpenSettings}
          aria-label="Privacy & Storage Settings"
          id="btn-open-settings"
        >
          <Settings size={17} />
        </button>
      </div>
    </header>
  );
}
