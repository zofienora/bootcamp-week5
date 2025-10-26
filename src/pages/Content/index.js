// Page Summarizer Chrome Extension - Content Script
// Summarizes web pages using OpenAI API

let isSummarizing = false;
let currentSummary = '';

// Create the Summarize button
function createSummarizeButton() {
    // Remove existing button if it exists
    const existingButton = document.getElementById('page-summarizer-btn');
    if (existingButton) {
        existingButton.remove();
    }
    
    const button = document.createElement('button');
    button.id = 'page-summarizer-btn';
    button.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
        </svg>
        Summarize
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
        </svg>
    `;
    
    button.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        background: #8B5CF6;
        color: white;
        border: none;
        padding: 12px 16px;
        border-radius: 8px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.2s ease;
    `;
    
    button.addEventListener('mouseenter', () => {
        button.style.background = '#7C3AED';
        button.style.transform = 'translateY(-1px)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.background = '#8B5CF6';
        button.style.transform = 'translateY(0)';
    });
    
    button.addEventListener('click', handleSummarize);
    document.body.appendChild(button);
    
    return button;
}

// Create modal overlay
function createModal(title, content, buttons = []) {
    // Remove existing modal
    const existingModal = document.getElementById('page-summarizer-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = 'page-summarizer-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        border-radius: 12px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow: hidden;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    `;
    
    const header = document.createElement('div');
    header.style.cssText = `
        background: #8B5CF6;
        color: white;
        padding: 16px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    header.innerHTML = `
        <h2 style="margin: 0; font-size: 18px; font-weight: 600;">${title}</h2>
        <button id="close-modal" style="background: none; border: none; color: white; cursor: pointer; font-size: 20px;">×</button>
    `;
    
    const body = document.createElement('div');
    body.style.cssText = `
        padding: 20px;
        max-height: 60vh;
        overflow-y: auto;
    `;
    body.innerHTML = content;
    
    const footer = document.createElement('div');
    footer.style.cssText = `
        padding: 16px 20px;
        border-top: 1px solid #E5E7EB;
        display: flex;
        gap: 12px;
        justify-content: flex-end;
    `;
    
    buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.innerHTML = button.text;
        btn.style.cssText = button.style;
        btn.addEventListener('click', button.onClick);
        footer.appendChild(btn);
    });
    
    modalContent.appendChild(header);
    modalContent.appendChild(body);
    modalContent.appendChild(footer);
    modal.appendChild(modalContent);
    
    // Close modal handlers
    const closeBtn = header.querySelector('#close-modal');
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
    
    document.body.appendChild(modal);
    return modal;
}

// Show API configuration modal
function showAPIConfigModal() {
    const content = `
        <div style="margin-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#8B5CF6">
                    <path d="M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.68 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                </svg>
                <h3 style="margin: 0; color: #374151;">OpenAI API Configuration</h3>
            </div>
            <p style="color: #6B7280; margin-bottom: 16px;">Enter your OpenAI API key to enable webpage summarization. Your API key is stored securely and never shared.</p>
            
            <div style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #374151;">API KEY</label>
                <div style="position: relative;">
                    <input type="password" id="api-key-input" placeholder="sk-proj-..." style="width: 100%; padding: 12px; border: 1px solid #D1D5DB; border-radius: 6px; font-family: monospace;">
                    <button id="toggle-key-visibility" style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer;">👁️</button>
                </div>
            </div>
            
            <div id="current-key-display" style="margin-bottom: 20px; padding: 12px; background: #F3F4F6; border-radius: 6px; font-family: monospace; font-size: 14px;">
                Current key: <span id="current-key-text">Not set</span>
            </div>
            
            <div>
                <h4 style="margin: 0 0 8px 0; color: #374151;">How to get your API key:</h4>
                <ol style="margin: 0; padding-left: 20px; color: #6B7280;">
                    <li><a href="https://platform.openai.com/api-keys" target="_blank" style="color: #8B5CF6;">Go to OpenAI API Keys</a></li>
                    <li>Sign in or create an account</li>
                    <li>Click "Create new secret key"</li>
                    <li>Copy the key and paste it above</li>
                </ol>
            </div>
        </div>
    `;
    
    const modal = createModal('Page Summarizer', content, [
        {
            text: 'Save API Key',
            style: 'background: #8B5CF6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 500;',
            onClick: saveAPIKey
        },
        {
            text: '🗑️ Clear Key',
            style: 'background: white; color: #DC2626; border: 1px solid #DC2626; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 500;',
            onClick: clearAPIKey
        }
    ]);
    
    // Load current API key
    chrome.storage.local.get(['openai_api_key'], (result) => {
        const currentKeyText = document.getElementById('current-key-text');
        const apiKeyInput = document.getElementById('api-key-input');
        
        if (result.openai_api_key) {
            const maskedKey = result.openai_api_key.substring(0, 8) + '...' + result.openai_api_key.substring(result.openai_api_key.length - 4);
            currentKeyText.textContent = maskedKey;
            apiKeyInput.value = result.openai_api_key;
        }
    });
    
    // Toggle key visibility
    const toggleBtn = document.getElementById('toggle-key-visibility');
    const apiKeyInput = document.getElementById('api-key-input');
    toggleBtn.addEventListener('click', () => {
        if (apiKeyInput.type === 'password') {
            apiKeyInput.type = 'text';
            toggleBtn.textContent = '🙈';
        } else {
            apiKeyInput.type = 'password';
            toggleBtn.textContent = '👁️';
        }
    });
}

// Save API key
function saveAPIKey() {
    const apiKeyInput = document.getElementById('api-key-input');
    const apiKey = apiKeyInput.value.trim();
    
    if (!apiKey) {
        alert('Please enter an API key');
        return;
    }
    
    if (!apiKey.startsWith('sk-')) {
        alert('Please enter a valid OpenAI API key (should start with "sk-")');
        return;
    }
    
    chrome.storage.local.set({ openai_api_key: apiKey }, () => {
        document.getElementById('page-summarizer-modal').remove();
        alert('API key saved successfully!');
    });
}

// Clear API key
function clearAPIKey() {
    if (confirm('Are you sure you want to clear your API key?')) {
        chrome.storage.local.remove(['openai_api_key'], () => {
            document.getElementById('page-summarizer-modal').remove();
            alert('API key cleared');
        });
    }
}

// Show summary modal
function showSummaryModal(summary) {
    currentSummary = summary;
    
    const content = `
        <div style="line-height: 1.6; color: #374151;">
            ${summary.split('\n').map(paragraph => `<p style="margin-bottom: 16px;">${paragraph}</p>`).join('')}
        </div>
        <div style="margin-top: 20px; text-align: right;">
            <button id="copy-summary" style="background: #8B5CF6; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 500;">Copy</button>
        </div>
    `;
    
    const modal = createModal('Page Summarizer', content, [
        {
            text: 'Discard',
            style: 'background: white; color: #6B7280; border: 1px solid #D1D5DB; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 500;',
            onClick: () => modal.remove()
        },
        {
            text: 'Save',
            style: 'background: #8B5CF6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 500;',
            onClick: saveSummary
        }
    ]);
    
    // Copy functionality
    document.getElementById('copy-summary').addEventListener('click', () => {
        navigator.clipboard.writeText(summary).then(() => {
            alert('Summary copied to clipboard!');
        });
    });
}

// Save summary
function saveSummary() {
    const summaries = JSON.parse(localStorage.getItem('page-summaries') || '[]');
    summaries.push({
        url: window.location.href,
        title: document.title,
        summary: currentSummary,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('page-summaries', JSON.stringify(summaries));
    document.getElementById('page-summarizer-modal').remove();
    alert('Summary saved!');
}

// Handle summarize button click
async function handleSummarize() {
    if (isSummarizing) return;
    
    // Check if API key exists
    chrome.storage.local.get(['openai_api_key'], async (result) => {
        if (!result.openai_api_key) {
            showAPIConfigModal();
            return;
        }
        
        await performSummarization(result.openai_api_key);
    });
}

// Perform summarization
async function performSummarization(apiKey) {
    isSummarizing = true;
    const button = document.getElementById('page-summarizer-btn');
    const originalText = button.innerHTML;
    button.innerHTML = '⏳ Summarizing...';
    button.disabled = true;
    
    try {
        // Extract page content
        const pageContent = extractPageContent();
        
        // Call OpenAI API
        const summary = await summarizeWithOpenAI(pageContent, apiKey);
        
        // Show summary modal
        showSummaryModal(summary);
        
    } catch (error) {
        console.error('Summarization error:', error);
        alert('Error generating summary. Please check your API key and try again.');
    } finally {
        isSummarizing = false;
        button.innerHTML = originalText;
        button.disabled = false;
    }
}

// Extract page content
function extractPageContent() {
    // Remove script and style elements
    const scripts = document.querySelectorAll('script, style, nav, header, footer, aside');
    scripts.forEach(el => el.remove());
    
    // Get main content
    const mainContent = document.querySelector('main, article, .content, #content') || document.body;
    
    // Extract text content
    const textContent = mainContent.innerText || mainContent.textContent || '';
    
    // Clean up text
    const cleanedText = textContent
        .replace(/\s+/g, ' ')
        .replace(/\n+/g, '\n')
        .trim();
    
    // Limit content length (OpenAI has token limits)
    return cleanedText.substring(0, 8000);
}

// Summarize with OpenAI API
async function summarizeWithOpenAI(content, apiKey) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant that creates concise, informative summaries of web page content. Focus on the main points and key information.'
                },
                {
                    role: 'user',
                    content: `Please summarize the following web page content:\n\n${content}`
                }
            ],
            max_tokens: 500,
            temperature: 0.7
        })
    });
    
    if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
}

// Initialize the extension
function init() {
    createSummarizeButton();
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
