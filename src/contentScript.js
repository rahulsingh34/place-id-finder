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
      const rawTable = tableData.join(' ')

      // Split the schedule string into individual day-time pairs
      const pairs = rawTable.split(" ");

      // Map each pair into an object with day and time properties
      const hoursArray = pairs.map((pair) => {
        const [day, time] = pair.split(",");
        return { day: day.trim(), time: time.trim() };
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
      const website = document.querySelector('div.QqG1Sd');
      const aTag = website.getElementsByTagName('a')[0];
      const attributeValue = aTag.href;
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