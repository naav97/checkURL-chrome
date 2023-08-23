chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "getStatus") {
    // Forward the request to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "updateStatus" }, function(response) {
        sendResponse(response);
      });
    });
    return true; // Indicates that the response will be sent asynchronously
  }
});
