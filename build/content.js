/******/ (() => { // webpackBootstrap
/*!************************************!*\
  !*** ./src/pages/Content/index.js ***!
  \************************************/
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Page Summarizer Chrome Extension - Content Script
// Summarizes web pages using OpenAI API

var isSummarizing = false;
var currentSummary = '';

// Create the Summarize button
function createSummarizeButton() {
  // Remove existing button if it exists
  var existingButton = document.getElementById('page-summarizer-btn');
  if (existingButton) {
    existingButton.remove();
  }
  var button = document.createElement('button');
  button.id = 'page-summarizer-btn';
  button.innerHTML = "\n        <svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\n            <path d=\"M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z\" />\n        </svg>\n        Summarize\n        <svg width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\">\n            <path d=\"M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z\" />\n        </svg>\n    ";
  button.style.cssText = "\n        position: fixed;\n        top: 20px;\n        left: 20px;\n        background: #8B5CF6;\n        color: white;\n        border: none;\n        padding: 12px 16px;\n        border-radius: 8px;\n        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n        font-size: 14px;\n        font-weight: 500;\n        cursor: pointer;\n        z-index: 10000;\n        box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);\n        display: flex;\n        align-items: center;\n        gap: 8px;\n        transition: all 0.2s ease;\n    ";
  button.addEventListener('mouseenter', function () {
    button.style.background = '#7C3AED';
    button.style.transform = 'translateY(-1px)';
  });
  button.addEventListener('mouseleave', function () {
    button.style.background = '#8B5CF6';
    button.style.transform = 'translateY(0)';
  });
  button.addEventListener('click', handleSummarize);
  document.body.appendChild(button);
  return button;
}

// Create modal overlay
function createModal(title, content) {
  var buttons = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  // Remove existing modal
  var existingModal = document.getElementById('page-summarizer-modal');
  if (existingModal) {
    existingModal.remove();
  }
  var modal = document.createElement('div');
  modal.id = 'page-summarizer-modal';
  modal.style.cssText = "\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background: rgba(0, 0, 0, 0.5);\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        z-index: 10001;\n        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n    ";
  var modalContent = document.createElement('div');
  modalContent.style.cssText = "\n        background: white;\n        border-radius: 12px;\n        max-width: 600px;\n        width: 90%;\n        max-height: 80vh;\n        overflow: hidden;\n        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);\n    ";
  var header = document.createElement('div');
  header.style.cssText = "\n        background: #8B5CF6;\n        color: white;\n        padding: 16px 20px;\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n    ";
  header.innerHTML = "\n        <h2 style=\"margin: 0; font-size: 18px; font-weight: 600;\">".concat(title, "</h2>\n        <button id=\"close-modal\" style=\"background: none; border: none; color: white; cursor: pointer; font-size: 20px;\">\xD7</button>\n    ");
  var body = document.createElement('div');
  body.style.cssText = "\n        padding: 20px;\n        max-height: 60vh;\n        overflow-y: auto;\n    ";
  body.innerHTML = content;
  var footer = document.createElement('div');
  footer.style.cssText = "\n        padding: 16px 20px;\n        border-top: 1px solid #E5E7EB;\n        display: flex;\n        gap: 12px;\n        justify-content: flex-end;\n    ";
  buttons.forEach(function (button) {
    var btn = document.createElement('button');
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
  var closeBtn = header.querySelector('#close-modal');
  closeBtn.addEventListener('click', function () {
    return modal.remove();
  });
  modal.addEventListener('click', function (e) {
    if (e.target === modal) modal.remove();
  });
  document.body.appendChild(modal);
  return modal;
}

// Show API configuration modal
function showAPIConfigModal() {
  var content = "\n        <div style=\"margin-bottom: 20px;\">\n            <div style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 12px;\">\n                <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"#8B5CF6\">\n                    <path d=\"M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.68 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z\" />\n                </svg>\n                <h3 style=\"margin: 0; color: #374151;\">OpenAI API Configuration</h3>\n            </div>\n            <p style=\"color: #6B7280; margin-bottom: 16px;\">Enter your OpenAI API key to enable webpage summarization. Your API key is stored securely and never shared.</p>\n            \n            <div style=\"margin-bottom: 16px;\">\n                <label style=\"display: block; margin-bottom: 8px; font-weight: 500; color: #374151;\">API KEY</label>\n                <div style=\"position: relative;\">\n                    <input type=\"password\" id=\"api-key-input\" placeholder=\"sk-proj-...\" style=\"width: 100%; padding: 12px; border: 1px solid #D1D5DB; border-radius: 6px; font-family: monospace;\">\n                    <button id=\"toggle-key-visibility\" style=\"position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer;\">\uD83D\uDC41\uFE0F</button>\n                </div>\n            </div>\n            \n            <div id=\"current-key-display\" style=\"margin-bottom: 20px; padding: 12px; background: #F3F4F6; border-radius: 6px; font-family: monospace; font-size: 14px;\">\n                Current key: <span id=\"current-key-text\">Not set</span>\n            </div>\n            \n            <div>\n                <h4 style=\"margin: 0 0 8px 0; color: #374151;\">How to get your API key:</h4>\n                <ol style=\"margin: 0; padding-left: 20px; color: #6B7280;\">\n                    <li><a href=\"https://platform.openai.com/api-keys\" target=\"_blank\" style=\"color: #8B5CF6;\">Go to OpenAI API Keys</a></li>\n                    <li>Sign in or create an account</li>\n                    <li>Click \"Create new secret key\"</li>\n                    <li>Copy the key and paste it above</li>\n                </ol>\n            </div>\n        </div>\n    ";
  var modal = createModal('Page Summarizer', content, [{
    text: 'Save API Key',
    style: 'background: #8B5CF6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 500;',
    onClick: saveAPIKey
  }, {
    text: '🗑️ Clear Key',
    style: 'background: white; color: #DC2626; border: 1px solid #DC2626; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 500;',
    onClick: clearAPIKey
  }]);

  // Load current API key
  chrome.storage.local.get(['openai_api_key'], function (result) {
    var currentKeyText = document.getElementById('current-key-text');
    var apiKeyInput = document.getElementById('api-key-input');
    if (result.openai_api_key) {
      var maskedKey = result.openai_api_key.substring(0, 8) + '...' + result.openai_api_key.substring(result.openai_api_key.length - 4);
      currentKeyText.textContent = maskedKey;
      apiKeyInput.value = result.openai_api_key;
    }
  });

  // Toggle key visibility
  var toggleBtn = document.getElementById('toggle-key-visibility');
  var apiKeyInput = document.getElementById('api-key-input');
  toggleBtn.addEventListener('click', function () {
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
  var apiKeyInput = document.getElementById('api-key-input');
  var apiKey = apiKeyInput.value.trim();
  if (!apiKey) {
    alert('Please enter an API key');
    return;
  }
  if (!apiKey.startsWith('sk-')) {
    alert('Please enter a valid OpenAI API key (should start with "sk-")');
    return;
  }
  chrome.storage.local.set({
    openai_api_key: apiKey
  }, function () {
    document.getElementById('page-summarizer-modal').remove();
    alert('API key saved successfully!');
  });
}

// Clear API key
function clearAPIKey() {
  if (confirm('Are you sure you want to clear your API key?')) {
    chrome.storage.local.remove(['openai_api_key'], function () {
      document.getElementById('page-summarizer-modal').remove();
      alert('API key cleared');
    });
  }
}

// Show summary modal
function showSummaryModal(summary) {
  currentSummary = summary;
  var content = "\n        <div style=\"line-height: 1.6; color: #374151;\">\n            ".concat(summary.split('\n').map(function (paragraph) {
    return "<p style=\"margin-bottom: 16px;\">".concat(paragraph, "</p>");
  }).join(''), "\n        </div>\n        <div style=\"margin-top: 20px; text-align: right;\">\n            <button id=\"copy-summary\" style=\"background: #8B5CF6; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 500;\">Copy</button>\n        </div>\n    ");
  var modal = createModal('Page Summarizer', content, [{
    text: 'Discard',
    style: 'background: white; color: #6B7280; border: 1px solid #D1D5DB; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 500;',
    onClick: function onClick() {
      return modal.remove();
    }
  }, {
    text: 'Save',
    style: 'background: #8B5CF6; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 500;',
    onClick: saveSummary
  }]);

  // Copy functionality
  document.getElementById('copy-summary').addEventListener('click', function () {
    navigator.clipboard.writeText(summary).then(function () {
      alert('Summary copied to clipboard!');
    });
  });
}

// Save summary
function saveSummary() {
  var summaries = JSON.parse(localStorage.getItem('page-summaries') || '[]');
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
function handleSummarize() {
  return _handleSummarize.apply(this, arguments);
} // Perform summarization
function _handleSummarize() {
  _handleSummarize = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          if (!isSummarizing) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2);
        case 1:
          // Check if API key exists
          chrome.storage.local.get(['openai_api_key'], /*#__PURE__*/function () {
            var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(result) {
              return _regenerator().w(function (_context) {
                while (1) switch (_context.n) {
                  case 0:
                    if (result.openai_api_key) {
                      _context.n = 1;
                      break;
                    }
                    showAPIConfigModal();
                    return _context.a(2);
                  case 1:
                    _context.n = 2;
                    return performSummarization(result.openai_api_key);
                  case 2:
                    return _context.a(2);
                }
              }, _callee);
            }));
            return function (_x4) {
              return _ref.apply(this, arguments);
            };
          }());
        case 2:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return _handleSummarize.apply(this, arguments);
}
function performSummarization(_x) {
  return _performSummarization.apply(this, arguments);
} // Extract page content
function _performSummarization() {
  _performSummarization = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(apiKey) {
    var button, originalText, pageContent, summary, _t;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          isSummarizing = true;
          button = document.getElementById('page-summarizer-btn');
          originalText = button.innerHTML;
          button.innerHTML = '⏳ Summarizing...';
          button.disabled = true;
          _context3.p = 1;
          // Extract page content
          pageContent = extractPageContent(); // Call OpenAI API
          _context3.n = 2;
          return summarizeWithOpenAI(pageContent, apiKey);
        case 2:
          summary = _context3.v;
          // Show summary modal
          showSummaryModal(summary);
          _context3.n = 4;
          break;
        case 3:
          _context3.p = 3;
          _t = _context3.v;
          console.error('Summarization error:', _t);
          alert('Error generating summary. Please check your API key and try again.');
        case 4:
          _context3.p = 4;
          isSummarizing = false;
          button.innerHTML = originalText;
          button.disabled = false;
          return _context3.f(4);
        case 5:
          return _context3.a(2);
      }
    }, _callee3, null, [[1, 3, 4, 5]]);
  }));
  return _performSummarization.apply(this, arguments);
}
function extractPageContent() {
  // Remove script and style elements
  var scripts = document.querySelectorAll('script, style, nav, header, footer, aside');
  scripts.forEach(function (el) {
    return el.remove();
  });

  // Get main content
  var mainContent = document.querySelector('main, article, .content, #content') || document.body;

  // Extract text content
  var textContent = mainContent.innerText || mainContent.textContent || '';

  // Clean up text
  var cleanedText = textContent.replace(/\s+/g, ' ').replace(/\n+/g, '\n').trim();

  // Limit content length (OpenAI has token limits)
  return cleanedText.substring(0, 8000);
}

// Summarize with OpenAI API
function summarizeWithOpenAI(_x2, _x3) {
  return _summarizeWithOpenAI.apply(this, arguments);
} // Initialize the extension
function _summarizeWithOpenAI() {
  _summarizeWithOpenAI = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(content, apiKey) {
    var response, data;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          _context4.n = 1;
          return fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer ".concat(apiKey)
            },
            body: JSON.stringify({
              model: 'gpt-3.5-turbo',
              messages: [{
                role: 'system',
                content: 'You are a helpful assistant that creates concise, informative summaries of web page content. Focus on the main points and key information.'
              }, {
                role: 'user',
                content: "Please summarize the following web page content:\n\n".concat(content)
              }],
              max_tokens: 500,
              temperature: 0.7
            })
          });
        case 1:
          response = _context4.v;
          if (response.ok) {
            _context4.n = 2;
            break;
          }
          throw new Error("OpenAI API error: ".concat(response.status));
        case 2:
          _context4.n = 3;
          return response.json();
        case 3:
          data = _context4.v;
          return _context4.a(2, data.choices[0].message.content);
      }
    }, _callee4);
  }));
  return _summarizeWithOpenAI.apply(this, arguments);
}
function init() {
  createSummarizeButton();
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
/******/ })()
;