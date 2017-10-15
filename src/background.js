chrome.browserAction.onClicked.addListener(tab => {
  // for the current tab, inject the "inject.js" file & execute it
  chrome.tabs.executeScript(tab.id, {
    file: 'browser.js'
  })
})
