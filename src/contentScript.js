'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).

// Place ID
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getPIDValue') {
      const element = document.querySelector('[data-pid]');
      const attributeValue = element ? element.getAttribute('data-pid') : null;
      sendResponse({ attributeValue: attributeValue });
    }
})

// Hours
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getHoursValue') {
      const tableData = []
      const table = document.querySelector('table.WgFkxc');
      if (table) {
        const tbody = table.querySelector('tbody');
        const rows = tbody.querySelectorAll('tr');
        rows.forEach((row) => {
            const rowData = []
            const cells = row.querySelectorAll('td');
            cells.forEach((cell) => {
                rowData.push(cell.innerText)
            })
            tableData.push(rowData)
        })
      }

      // Remove holiday hours
      const modifiedArray = tableData.map((element) => {
        const modifiedElement = [...element];
        let firstSubElement = modifiedElement[0];
        let secondSubElement = modifiedElement[1];
      
        // Remove '\n' and subsequent text from the first sub-element
        const newlineIndex1 = firstSubElement.indexOf('\n');
        const newlineIndex2 = secondSubElement.indexOf('\n')
        if (newlineIndex1 !== -1) {
          firstSubElement = firstSubElement.substring(0, newlineIndex1);
          secondSubElement = secondSubElement.substring(0, newlineIndex2)
        }
      
        // Remove '(' and subsequent text from the first sub-element
        const parenIndex = firstSubElement.indexOf('(');
        if (parenIndex !== -1) {
          firstSubElement = firstSubElement.substring(0, parenIndex);
        }
      
        // Find the index of the fourth '.' in the second sub-element
        let dotCount = 0;
        let dotIndex = -1;
      
        for (let i = 0; i < secondSubElement.length; i++) {
          if (secondSubElement[i] === '.') {
            dotCount++;
            if (dotCount === 4) {
              dotIndex = i;
              break;
            }
          }
        }
      
        // Remove everything after the fourth '.' from the second sub-element
        if (dotIndex !== -1) {
          secondSubElement = secondSubElement.substring(0, dotIndex+1);
        }
      
        modifiedElement[0] = firstSubElement;
        modifiedElement[1] = secondSubElement;
        return modifiedElement;
      });
      
      const rawTable = modifiedArray.join(' ')

      // Split the schedule string into individual day-time pairs
      const pairs = rawTable.split(" ");

      // Map each pair into an object with day and time properties
      const hoursArray = pairs.map((pair) => {
        const [day, time] = pair.split(",");
        return { day: day, time: time };
      });

      // Define the order of the days of the week
      const dayOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      // Sort the scheduleArray based on the dayOrder
      hoursArray.sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));

      // Format the schedule in "Day - Time" format
      const attributeValue = hoursArray.map((entry) => `${entry.day} - ${entry.time}`).join("\n");

      sendResponse({ attributeValue: attributeValue });
    }
})

// Reviews
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getReviewsValue') {
      var element = document.querySelector('[data-async-trigger="reviewDialog"]');
      if (!element.innerText) {
        element = document.querySelector('.RDApEe.YrbPuc');
      }
      const attributeValue = element ? element.innerText : null;
      sendResponse({ attributeValue: attributeValue });
    }
})

// Phone Number
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getPhoneValue') {
      const element = document.querySelector('[data-dtype="d3ph"]');
      const attributeValue = element ? element.innerText : null;
      sendResponse({ attributeValue: attributeValue });
    }
})

// Website
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getWebsiteValue') {
      var website = document.querySelector('div.QqG1Sd');
      var attributeValue = ''
      if (!website) {
        website = document.querySelector('a.dHS6jb');
        attributeValue = website.href
      } else {
        website = website.getElementsByTagName('a')[0];
        attributeValue = website.href;
      }
      sendResponse({ attributeValue: attributeValue });
    }
})

// Competitors
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getCompsValue') {
      const elements = document.querySelectorAll('a.xFAlBc');

      const elementsText = []
      elements.forEach((element) => {
        const text = element.innerText
        if (text.includes('doordash') || text.includes('ubereats')) {
            elementsText.push(text);
        }
      });

      const attributeValue = elementsText.join('; ');
      sendResponse({ attributeValue: attributeValue });
    }
})