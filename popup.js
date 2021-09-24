document
  .querySelectorAll('input[type=radio][name="resolution"]')
  .forEach((radio) =>
    radio.addEventListener("change", () => {
      chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, radio.value, function (response) {
          chrome.action.setBadgeText({ text: response });
        });
        chrome.storage.sync.set({ resolution: radio.value });
      });
    })
  );

chrome.storage.sync.get(["resolution"], function (result) {
  document.getElementById(result.resolution).checked = true;
});
