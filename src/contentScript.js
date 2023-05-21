'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getAttributeValue') {
      const element = document.querySelector('[data-pid]');
      const attributeValue = element ? element.getAttribute('data-pid') : null;
      sendResponse({ attributeValue: attributeValue });
    }
  })