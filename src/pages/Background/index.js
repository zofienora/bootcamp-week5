// Background script for Page Summarizer extension
console.log('Background script loaded');

chrome.runtime.onInstalled.addListener(() => {
  console.log('Page Summarizer extension installed');
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request);
  
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
