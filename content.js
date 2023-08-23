chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  if (request.action === "updateStatus") {
    // Perform the check and update the popup interface
    // You'll need to integrate with Google Safe Browsing API here
    const apiKey = "AIzaSyDwUd1YfAGyX4Sk2e2OCSzq6CeN7YCrXA8";
    const apiEndpoint = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

    const requestBody = {
        client: {
            clientId: "Chrome",
            clientVersion: "0.0.1"
        },
        threatInfo: {
            threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [{ url }]
        }
    };
    const response = await fetch(apiEndpoint, {
        method: "POST",
        body: JSON.stringify(requestBody)
    });
    const data = await response.json();
    const isSafe = JSON.stringify(data) === '{}';

    sendResponse({ isSafe });
  }
});
