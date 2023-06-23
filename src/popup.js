'use strict';

function convertToNumber(str) {
    const suffixes = {
        K: 1000,
        M: 1000000,
        B: 1000000000
    };
  
    const numericPart = parseFloat(str);
    const suffix = str[str.length - 1];
  
    if (suffixes.hasOwnProperty(suffix)) {
        return numericPart * suffixes[suffix];
    }
  
    return numericPart;
}

document.addEventListener('DOMContentLoaded', () => {
    // Place ID
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

    // Hours
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

    // Reviews
    document.getElementById('getReviews').addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            chrome.tabs.sendMessage(tab.id, { action: 'getReviewsValue' }, (response) => {
                var reviews = document.getElementById('data')
                if (chrome.runtime.lastError) {
                    reviews.innerText = "No Reviews"
                  } else if (response && response.attributeValue) {
                    var response = response.attributeValue
                    if (response.includes("(")) {
                        response = response.replace(/[()]/g, '')
                        reviews.innerText = convertToNumber(response)
                    } else {
                        reviews.innerText = parseInt(response.replace(',', ''))
                    }
                    navigator.clipboard.writeText(reviews.innerText)
                    reviews.innerText = "Reviews Copied!"
                  } else {
                    reviews.innerText = "Error on Reviews"
                  }
            });
        });
    });

    // Phone Number
    document.getElementById('getPhone').addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            chrome.tabs.sendMessage(tab.id, { action: 'getPhoneValue' }, (response) => {
                var phone = document.getElementById('data')
                if (chrome.runtime.lastError) {
                    phone.innerText = "No Phone"
                  } else if (response && response.attributeValue) {
                    phone.innerText = response.attributeValue
                    navigator.clipboard.writeText(phone.innerText)
                    phone.innerText = "Phone Copied!"
                  } else {
                    phone.innerText = "Error on Phone"
                  }
            });
        });
    });

    // Website
    document.getElementById('getWebsite').addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            chrome.tabs.sendMessage(tab.id, { action: 'getWebsiteValue' }, (response) => {
                var website = document.getElementById('data')
                if (chrome.runtime.lastError) {
                    website.innerText = "No Website"
                  } else if (response && response.attributeValue) {
                    website.innerText = response.attributeValue
                    navigator.clipboard.writeText(website.innerText)
                    website.innerText = "Website Copied!"
                  } else {
                    website.innerText = "Error on Website"
                  }
            });
        });
    });

    // Competitors
    document.getElementById('getComps').addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            chrome.tabs.sendMessage(tab.id, { action: 'getCompsValue' }, (response) => {
                var comps = document.getElementById('data')
                if (chrome.runtime.lastError) {
                    comps.innerText = "No Competitors"
                  } else if (response && response.attributeValue) {
                    comps.innerText = response.attributeValue.replaceAll('.com', '')
                    navigator.clipboard.writeText(comps.innerText)
                    comps.innerText = "Competitors Copied!"
                  } else {
                    comps.innerText = "Error on Competitors"
                  }
            });
        });
    });

});