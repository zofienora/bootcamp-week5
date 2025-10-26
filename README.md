# Click Tracker Chrome Extension

A simple Chrome extension that tracks the number of clicks on any website and displays a fun emoji celebration when you reach 10 clicks.

## Features

- ✅ Tracks clicks per website
- ✅ Resets counter when visiting a new website
- ✅ Shows celebration emoji (🎉) at 10 clicks
- ✅ Minimal, unobtrusive UI
- ✅ Works on all websites

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the folder containing the extension files
5. The extension will now be active on all websites

## How it works

- A small counter appears in the top-right corner of every webpage
- Click anywhere on the page to increment the counter
- When you reach 10 clicks, the counter shows a celebration emoji with a pulsing animation
- The counter resets when you navigate to a different website
- The counter is website-specific, so each site has its own click count

## Files

- `manifest.json` - Extension configuration
- `content.js` - Main script that handles click tracking and UI

## Customization

You can easily modify the extension by editing `content.js`:
- Change the click threshold (currently 10)
- Modify the emoji or celebration message
- Adjust the UI styling and position
- Add sound effects or other visual elements

Enjoy tracking your clicks! 🎉
