// Background script for Page Summarizer extension
// Handles extension lifecycle and communication

chrome.runtime.onInstalled.addListener(() => {
  console.log('Page Summarizer extension installed');
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'saveSummary') {
    // Save summary to storage
    chrome.storage.local.get(['page_summaries'], (result) => {
      const summaries = result.page_summaries || [];
      summaries.push({
        url: request.url,
        title: request.title,
        summary: request.summary,
        timestamp: new Date().toISOString()
      });
      
      chrome.storage.local.set({ page_summaries: summaries }, () => {
        sendResponse({ success: true });
      });
    });
    
    return true; // Keep message channel open for async response
  }
});

// Handle tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    // Inject content script if needed
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    }).catch(() => {
      // Ignore errors for chrome:// pages
    });
  }
});
