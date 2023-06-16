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
      const element = document.querySelector('[data-async-trigger="reviewDialog"]');
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
