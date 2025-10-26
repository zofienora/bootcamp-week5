// Click Tracker Chrome Extension
// Tracks clicks per website and shows emoji at 10 clicks

(function() {
    'use strict';
    
    // Get current website domain
    const currentDomain = window.location.hostname;
    
    // Initialize click counter for this domain
    let clickCount = 0;
    
    // Create the UI overlay
    function createClickCounter() {
        // Remove existing counter if it exists
        const existingCounter = document.getElementById('click-tracker-counter');
        if (existingCounter) {
            existingCounter.remove();
        }
        
        // Create counter element
        const counter = document.createElement('div');
        counter.id = 'click-tracker-counter';
        counter.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
            cursor: pointer;
            user-select: none;
        `;
        
        updateCounterDisplay(counter);
        document.body.appendChild(counter);
        
        return counter;
    }
    
    // Update counter display
    function updateCounterDisplay(counter) {
        if (clickCount >= 10) {
            counter.innerHTML = `🎉 ${clickCount} clicks! 🎉`;
            counter.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
            counter.style.animation = 'pulse 1s infinite';
            
            // Add pulse animation
            if (!document.getElementById('click-tracker-styles')) {
                const style = document.createElement('style');
                style.id = 'click-tracker-styles';
                style.textContent = `
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                        100% { transform: scale(1); }
                    }
                `;
                document.head.appendChild(style);
            }
        } else {
            counter.innerHTML = `Clicks: ${clickCount}`;
            counter.style.background = 'rgba(0, 0, 0, 0.8)';
            counter.style.animation = 'none';
        }
    }
    
    // Handle click events
    function handleClick(event) {
        clickCount++;
        
        const counter = document.getElementById('click-tracker-counter');
        if (counter) {
            updateCounterDisplay(counter);
        }
        
        // Optional: Log to console for debugging
        console.log(`Click count for ${currentDomain}: ${clickCount}`);
    }
    
    // Reset counter when navigating to a new domain
    function resetCounterIfNewDomain() {
        const newDomain = window.location.hostname;
        if (newDomain !== currentDomain) {
            clickCount = 0;
            const counter = document.getElementById('click-tracker-counter');
            if (counter) {
                updateCounterDisplay(counter);
            }
        }
    }
    
    // Initialize the extension
    function init() {
        // Create the counter UI
        createClickCounter();
        
        // Add click event listener to the document
        document.addEventListener('click', handleClick, true);
        
        // Listen for navigation changes (for SPAs)
        let lastUrl = location.href;
        new MutationObserver(() => {
            const url = location.href;
            if (url !== lastUrl) {
                lastUrl = url;
                resetCounterIfNewDomain();
            }
        }).observe(document, { subtree: true, childList: true });
        
        // Also listen for popstate events (back/forward navigation)
        window.addEventListener('popstate', resetCounterIfNewDomain);
    }
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
