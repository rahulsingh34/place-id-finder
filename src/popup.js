'use strict';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('getPID').addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            chrome.tabs.sendMessage(tab.id, { action: 'getPIDValue' }, (response) => {
                var pid = document.getElementById('data')
                if (chrome.runtime.lastError) {
                    pid.innerText = "No PID"
                  } else if (response && response.attributeValue) {
                    pid.innerText = response.attributeValue
                    navigator.clipboard.writeText(pid.innerText)
                    pid.innerText = "PID Copied!"
                  } else {
                    pid.innerText = "Error on PID"
                  }
            });
        });
    });

    document.getElementById('getHours').addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            chrome.tabs.sendMessage(tab.id, { action: 'getHoursValue' }, (response) => {
                var hours = document.getElementById('data')
                if (chrome.runtime.lastError) {
                    hours.innerText = "No Hours"
                  } else if (response && response.attributeValue) {
                    hours.innerText = response.attributeValue
                    navigator.clipboard.writeText(hours.innerText)
                    hours.innerText = "Hours Copied!"
                  } else {
                    hours.innerText = "Error on Hours"
                  }
            });
        });
    });

});
