chrome.tabs.query({ active: true, currentWindow: true }, async function(tabs) {
    const url = tabs[0].url;

    // Use the URL to check with Google Safe Browsing (You'll need an API key)
    // Update this part with actual Safe Browsing API integration
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

    const statusElement = document.getElementById("status");
    statusElement.textContent = isSafe ? "Safe website" : "Potentially harmful website";
});
