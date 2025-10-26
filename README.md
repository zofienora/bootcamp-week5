# Page Summarizer Chrome Extension

A professional Chrome extension that summarizes web pages using OpenAI's API, built with React and Webpack.

## Features

- ✅ **AI-Powered Summarization**: Uses OpenAI GPT-3.5-turbo for intelligent page summaries
- ✅ **React-Based Popup**: Modern UI with tabbed interface for configuration and saved summaries
- ✅ **Secure API Key Storage**: Chrome storage API for secure key management
- ✅ **Summary Management**: Save, view, and delete previous summaries
- ✅ **Professional Build System**: Webpack, Babel, and development server
- ✅ **Content Script Integration**: Seamless webpage integration

## Project Structure

```
src/
├── pages/
│   ├── Background/          # Service worker
│   ├── Content/             # Content script for webpage interaction
│   ├── Popup/              # React-based popup interface
│   ├── Devtools/           # Chrome DevTools integration
│   ├── Newtab/             # New tab page
│   ├── Options/            # Extension options page
│   └── Panel/              # Side panel
├── utils/
│   ├── build.js            # Build script
│   ├── env.js              # Environment configuration
│   └── webserver.js        # Development server
└── assets/                 # Static assets
```

## Development Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Development Mode**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Load Extension**:
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `build/` folder

## Usage

1. **Configure API Key**:
   - Click the extension icon
   - Go to "Config" tab
   - Enter your OpenAI API key
   - Get your key from: https://platform.openai.com/api-keys

2. **Summarize Pages**:
   - Click "Summarize Current Page" in the popup
   - Or use the purple "Summarize" button on web pages

3. **Manage Summaries**:
   - View saved summaries in the "Saved" tab
   - Copy or delete summaries as needed

## Technologies Used

- **React 18**: Modern UI components
- **Webpack 5**: Module bundling and build system
- **Babel**: JavaScript transpilation
- **Chrome Extensions API**: Extension functionality
- **OpenAI API**: AI-powered summarization

## Build Commands

- `npm run build`: Build production version
- `npm run dev`: Start development server with hot reload
- `npm run watch`: Watch mode for development

## File Structure Details

- **manifest.json**: Extension configuration
- **src/pages/Popup/**: React popup interface
- **src/pages/Content/**: Content script for webpage interaction
- **src/pages/Background/**: Service worker for background tasks
- **webpack.config.js**: Webpack configuration
- **package.json**: Dependencies and scripts
