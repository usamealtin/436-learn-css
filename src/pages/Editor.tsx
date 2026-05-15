import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiPlay, FiRotateCcw, FiCode, FiEye } from 'react-icons/fi';

const DEFAULT_HTML = `<div class="container">
  <h1>Hello, LearnCSS!</h1>
  <p>Edit this code and click "Run" to see your changes.</p>
  <div class="card">
    <div class="badge">CSS</div>
    <h2>Interactive Editor</h2>
    <p>Try editing the HTML and CSS panels.</p>
    <button class="btn">Click Me</button>
  </div>
</div>`;

const DEFAULT_CSS = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', sans-serif;
  background: #f0f4f8;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.container {
  max-width: 600px;
  text-align: center;
}

h1 {
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

p {
  color: #666;
  margin-bottom: 1.5rem;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
}

.badge {
  display: inline-block;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

h2 {
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.btn {
  margin-top: 1rem;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}`;

const Editor: React.FC = () => {
  const { t } = useTranslation();
  const [html, setHtml] = useState(DEFAULT_HTML);
  const [css, setCss] = useState(DEFAULT_CSS);
  const [previewKey, setPreviewKey] = useState(0);
  const [activeTab, setActiveTab] = useState<'html' | 'css'>('html');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const runCode = useCallback(() => {
    setPreviewKey(prev => prev + 1);
  }, []);

  const resetCode = useCallback(() => {
    setHtml(DEFAULT_HTML);
    setCss(DEFAULT_CSS);
    setPreviewKey(prev => prev + 1);
  }, []);

  const srcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>${css}</style>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `;

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FiCode className="text-blue-400 text-xl" />
          <h1 className="text-white font-bold text-lg">{t('editor.title')}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={resetCode}
            className="flex items-center space-x-1 px-3 py-1.5 text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-sm"
          >
            <FiRotateCcw className="text-xs" />
            <span className="hidden sm:inline">{t('editor.reset')}</span>
          </button>
          <button
            onClick={runCode}
            className="flex items-center space-x-1 px-4 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all text-sm font-medium"
          >
            <FiPlay className="text-xs" />
            <span>{t('editor.run')}</span>
          </button>
        </div>
      </div>

      {/* Editor & Preview */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Code Panel */}
        <div className={`${isMobile ? 'w-full' : 'w-1/2'} flex flex-col border-r border-gray-700`}>
          {/* Tabs */}
          <div className="flex bg-gray-800 border-b border-gray-700">
            <button
              onClick={() => setActiveTab('html')}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'html'
                  ? 'text-orange-400 border-b-2 border-orange-400 bg-gray-750'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <span className="text-orange-400">&lt;/&gt;</span>
              <span>{t('editor.html')}</span>
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'css'
                  ? 'text-blue-400 border-b-2 border-blue-400 bg-gray-750'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <span className="text-blue-400">#</span>
              <span>{t('editor.css')}</span>
            </button>
          </div>

          {/* Code Editors */}
          <div className="flex-1 overflow-hidden">
            <textarea
              value={activeTab === 'html' ? html : css}
              onChange={(e) => {
                if (activeTab === 'html') setHtml(e.target.value);
                else setCss(e.target.value);
              }}
              className="w-full h-full bg-gray-900 text-gray-100 p-4 font-mono text-sm resize-none focus:outline-none focus:ring-0"
              spellCheck={false}
              placeholder={activeTab === 'html' ? 'Write HTML here...' : 'Write CSS here...'}
            />
          </div>
        </div>

        {/* Preview Panel */}
        <div className={`${isMobile ? 'w-full' : 'w-1/2'} flex flex-col`}>
          <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800 border-b border-gray-700">
            <FiEye className="text-gray-400 text-sm" />
            <span className="text-gray-300 text-sm font-medium">{t('editor.preview')}</span>
          </div>
          <div className="flex-1 bg-white overflow-hidden">
            <iframe
              key={previewKey}
              srcDoc={srcDoc}
              title="Preview"
              className="w-full h-full border-0"
              sandbox="allow-scripts"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
