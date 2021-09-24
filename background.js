chrome.runtime.onInstalled.addListener(() =>
  chrome.storage.sync.set({ resolution: "360p" })
);

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
    chrome.scripting
      .executeScript({
        target: { tabId: tabId },
        files: ["./foreground.js"]
      })
      .then(() => {
        chrome.storage.sync.get(["resolution"], function (result) {
          chrome.tabs.sendMessage(
            tabId,
            result.resolution,
            function (response) {
              chrome.action.setBadgeText({ text: response });
            }
          );
        });
      })
      .catch((err) => console.log(err));
  }
});
