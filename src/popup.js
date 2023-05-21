'use strict';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('runScript').addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            chrome.tabs.sendMessage(tab.id, { action: 'getAttributeValue' }, (response) => {
                var pid = document.getElementById('pid')
                if (chrome.runtime.lastError) {
                    pid.innerText = "No PID"
                  } else if (response && response.attributeValue) {
                    pid.innerText = response.attributeValue
                  } else {
                    pid.innerText = "Error"
                  }
            });
        });
    });

    document.getElementById('copy').addEventListener('click', () => {
        let pid = document.getElementById('pid')
        navigator.clipboard.writeText(pid.innerText)
        pid.innerText = "Copied!"
    });
});
