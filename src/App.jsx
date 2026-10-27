import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MemoryEditor from './components/MemoryEditor';
import MemoryLibrary from './components/MemoryLibrary';
import MemoryDetailModal from './components/MemoryDetailModal';
import SettingsModal from './components/SettingsModal';
import {
  getAllMemories,
  saveMemory,
  deleteMemory,
  exportArchiveAsJSON,
  clearAllMemories,
} from './services/db';

export default function App() {
  const [memories, setMemories] = useState([]);
  const [activeTab, setActiveTab] = useState('library');
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Theme state with local persistence & system preference fallback
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('echoes_theme');
    if (saved) return saved;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('echoes_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Load memories from IndexedDB on startup
  const refreshMemories = async () => {
    try {
      const data = await getAllMemories();
      setMemories(data);
    } catch (err) {
      console.error('Failed to load memories from IndexedDB:', err);
    }
  };

  useEffect(() => {
    refreshMemories();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const handleSaveMemory = async (memoryData) => {
    try {
      await saveMemory(memoryData);
      await refreshMemories();
      setInitialPrompt('');
      setActiveTab('library');
      showToast('Memory preserved in your private archive.');
    } catch (err) {
      console.error('Failed to save memory:', err);
      alert('Could not save memory: ' + err.message);
    }
  };

  const handleUpdateMemory = async (updatedData) => {
    try {
      const saved = await saveMemory(updatedData);
      await refreshMemories();
      setSelectedMemory(saved);
      showToast('Memory updated.');
    } catch (err) {
      console.error('Failed to update memory:', err);
      alert('Could not update memory: ' + err.message);
    }
  };

  const handleDeleteMemory = async (id) => {
    try {
      await deleteMemory(id);
      await refreshMemories();
      setSelectedMemory(null);
      showToast('Memory permanently removed.');
    } catch (err) {
      console.error('Failed to delete memory:', err);
      alert('Could not delete memory: ' + err.message);
    }
  };

  const handleExportArchive = async () => {
    try {
      const json = await exportArchiveAsJSON();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `echoes-archive-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Archive downloaded as JSON backup.');
    } catch (err) {
      console.error('Export error:', err);
      alert('Failed to export archive: ' + err.message);
    }
  };

  const handleClearAll = async () => {
    try {
      await clearAllMemories();
      await refreshMemories();
      showToast('All memories have been erased.');
    } catch (err) {
      console.error('Clear all error:', err);
      alert('Failed to clear archive: ' + err.message);
    }
  };

  const handleSelectPrompt = (prompt) => {
    setInitialPrompt(prompt);
    setActiveTab('editor');
  };

  return (
    <div className="app-container">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        memoryCount={memories.length}
        onExport={handleExportArchive}
        onOpenSettings={() => setShowSettings(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main>
        {activeTab === 'library' ? (
          <MemoryLibrary
            memories={memories}
            onSelectMemory={(mem) => setSelectedMemory(mem)}
            onStartWriting={() => setActiveTab('editor')}
            onSelectPrompt={handleSelectPrompt}
          />
        ) : (
          <MemoryEditor
            onSaveMemory={handleSaveMemory}
            initialPrompt={initialPrompt}
            onCancel={() => {
              setInitialPrompt('');
              setActiveTab('library');
            }}
          />
        )}
      </main>

      {/* Detail Modal */}
      {selectedMemory && (
        <MemoryDetailModal
          memory={selectedMemory}
          onClose={() => setSelectedMemory(null)}
          onDelete={handleDeleteMemory}
          onUpdate={handleUpdateMemory}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          onExport={handleExportArchive}
          onClearAll={handleClearAll}
          totalMemories={memories.length}
        />
      )}

      {/* Notification Toast */}
      {toastMessage && (
        <div className="toast-notice" role="status" aria-live="polite">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
