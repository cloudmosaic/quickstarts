// listen for clicking addon button in browser's UI
chrome.browserAction.onClicked.addListener(function (tab) {
  // add a stylesheet + script
  chrome.tabs.insertCSS(tab.id, {
    file: 'dist/chrome.css'
  });
	chrome.tabs.executeScript(tab.id, {
		file: 'dist/chrome.js'
	});
});
