// Simple background script
console.log('Background script loaded successfully');

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});