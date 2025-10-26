// Popup script for Page Summarizer
document.addEventListener('DOMContentLoaded', function() {
    const apiKeyInput = document.getElementById('api-key-input');
    const currentKeyText = document.getElementById('current-key-text');
    const saveKeyBtn = document.getElementById('save-key');
    const clearKeyBtn = document.getElementById('clear-key');
    const summarizeBtn = document.getElementById('summarize-btn');
    
    // Load current API key
    chrome.storage.local.get(['openai_api_key'], function(result) {
        if (result.openai_api_key) {
            const maskedKey = result.openai_api_key.substring(0, 8) + '...' + result.openai_api_key.substring(result.openai_api_key.length - 4);
            currentKeyText.textContent = maskedKey;
            apiKeyInput.value = result.openai_api_key;
            summarizeBtn.disabled = false;
        }
    });
    
    // Save API key
    saveKeyBtn.addEventListener('click', function() {
        const apiKey = apiKeyInput.value.trim();
        
        if (!apiKey) {
            alert('Please enter an API key');
            return;
        }
        
        if (!apiKey.startsWith('sk-')) {
            alert('Please enter a valid OpenAI API key (should start with "sk-")');
            return;
        }
        
        chrome.storage.local.set({ openai_api_key: apiKey }, function() {
            const maskedKey = apiKey.substring(0, 8) + '...' + apiKey.substring(apiKey.length - 4);
            currentKeyText.textContent = maskedKey;
            summarizeBtn.disabled = false;
            alert('API key saved successfully!');
        });
    });
    
    // Clear API key
    clearKeyBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear your API key?')) {
            chrome.storage.local.remove(['openai_api_key'], function() {
                currentKeyText.textContent = 'Not set';
                apiKeyInput.value = '';
                summarizeBtn.disabled = true;
                alert('API key cleared');
            });
        }
    });
    
    // Summarize current page
    summarizeBtn.addEventListener('click', async function() {
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
        }
    });
    
    // Toggle key visibility
    apiKeyInput.addEventListener('focus', function() {
        this.type = 'text';
    });
    
    apiKeyInput.addEventListener('blur', function() {
        this.type = 'password';
    });
});
