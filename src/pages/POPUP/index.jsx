import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Popup.css';

const Popup = () => {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [savedSummaries, setSavedSummaries] = useState([]);
  const [currentTab, setCurrentTab] = useState('config');

  useEffect(() => {
    // Load saved API key
    chrome.storage.local.get(['openai_api_key'], (result) => {
      if (result.openai_api_key) {
        setApiKey(result.openai_api_key);
      }
    });

    // Load saved summaries
    chrome.storage.local.get(['page_summaries'], (result) => {
      if (result.page_summaries) {
        setSavedSummaries(result.page_summaries);
      }
    });
  }, []);

  const handleSaveAPIKey = () => {
    if (!apiKey.trim()) {
      alert('Please enter an API key');
      return;
    }

    if (!apiKey.startsWith('sk-')) {
      alert('Please enter a valid OpenAI API key (should start with "sk-")');
      return;
    }

    chrome.storage.local.set({ openai_api_key: apiKey }, () => {
      alert('API key saved successfully!');
    });
  };

  const handleClearAPIKey = () => {
    if (confirm('Are you sure you want to clear your API key?')) {
      setApiKey('');
      chrome.storage.local.remove(['openai_api_key'], () => {
        alert('API key cleared');
      });
    }
  };

  const handleSummarizeCurrentPage = async () => {
    setIsLoading(true);
    
    try {
      // Get current active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Send message to content script to trigger summarization
      await chrome.tabs.sendMessage(tab.id, { action: 'summarize' });
      
      // Close popup
      window.close();
    } catch (error) {
      console.error('Error:', error);
      alert('Error triggering summarization. Make sure you\'re on a valid webpage.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSummary = (index) => {
    if (confirm('Are you sure you want to delete this summary?')) {
      const newSummaries = savedSummaries.filter((_, i) => i !== index);
      setSavedSummaries(newSummaries);
      chrome.storage.local.set({ page_summaries: newSummaries });
    }
  };

  const handleCopySummary = (summary) => {
    navigator.clipboard.writeText(summary.summary).then(() => {
      alert('Summary copied to clipboard!');
    });
  };

  return (
    <div className="popup-container">
      <div className="popup-header">
        <h1>Page Summarizer</h1>
        <div className="tab-buttons">
          <button 
            className={currentTab === 'config' ? 'active' : ''}
            onClick={() => setCurrentTab('config')}
          >
            Config
          </button>
          <button 
            className={currentTab === 'summaries' ? 'active' : ''}
            onClick={() => setCurrentTab('summaries')}
          >
            Saved ({savedSummaries.length})
          </button>
        </div>
      </div>

      <div className="popup-content">
        {currentTab === 'config' && (
          <div className="config-tab">
            <div className="api-section">
              <h3>OpenAI API Configuration</h3>
              <p>Enter your OpenAI API key to enable webpage summarization.</p>
              
              <div className="input-group">
                <label>API Key</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-proj-..."
                />
              </div>

              <div className="button-group">
                <button onClick={handleSaveAPIKey} className="save-btn">
                  Save API Key
                </button>
                <button onClick={handleClearAPIKey} className="clear-btn">
                  Clear Key
                </button>
              </div>

              <div className="instructions">
                <h4>How to get your API key:</h4>
                <ol>
                  <li><a href="https://platform.openai.com/api-keys" target="_blank">Go to OpenAI API Keys</a></li>
                  <li>Sign in or create an account</li>
                  <li>Click "Create new secret key"</li>
                  <li>Copy the key and paste it above</li>
                </ol>
              </div>
            </div>

            <div className="action-section">
              <button 
                onClick={handleSummarizeCurrentPage}
                disabled={isLoading || !apiKey}
                className="summarize-btn"
              >
                {isLoading ? 'Summarizing...' : 'Summarize Current Page'}
              </button>
            </div>
          </div>
        )}

        {currentTab === 'summaries' && (
          <div className="summaries-tab">
            {savedSummaries.length === 0 ? (
              <div className="empty-state">
                <p>No saved summaries yet.</p>
                <p>Summarize some pages to see them here!</p>
              </div>
            ) : (
              <div className="summaries-list">
                {savedSummaries.map((summary, index) => (
                  <div key={index} className="summary-item">
                    <div className="summary-header">
                      <h4>{summary.title}</h4>
                      <div className="summary-actions">
                        <button onClick={() => handleCopySummary(summary)}>
                          Copy
                        </button>
                        <button onClick={() => handleDeleteSummary(index)}>
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="summary-url">{summary.url}</p>
                    <p className="summary-date">
                      {new Date(summary.timestamp).toLocaleDateString()}
                    </p>
                    <div className="summary-content">
                      {summary.summary.substring(0, 200)}...
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<Popup />, document.getElementById('app-container'));
