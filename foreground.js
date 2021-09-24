function openSettingsPanel(msg) {
  if (!document.querySelector("[data-handle='settingsButton']")) return;
  if (
    document.querySelectorAll('input[type=radio][name="Quality"]').length === 0
  ) {
    document
      .querySelector("[data-handle='settingsButton']")
      .querySelector("button")
      .click();
  }
  const checkSettingsPanelExist = setInterval(function () {
    if (
      document
        .querySelector("[data-handle='settingsButton']")
        .querySelector(".w-dialog") &&
      document.querySelectorAll('input[type=radio][name="Quality"]').length !==
        0
    ) {
      clickResolution(msg);
      clearInterval(checkSettingsPanelExist);
    }
  }, 100);
}

function clickResolution(msg) {
  document
    .querySelectorAll('input[type=radio][name="Quality"]')
    .forEach((node) => {
      if (node.value === msg) {
        node.click();
      }
    });
  if (
    document
      .querySelector("[data-handle='settingsButton']")
      .querySelector(".w-dialog").style.display !== "none"
  ) {
    document
      .querySelector("[data-handle='settingsButton']")
      .querySelector("button")
      .click();
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const checkVideoExist = setInterval(function () {
    if (document.querySelector("[data-handle='settingsButton']")) {
      debugger;
      openSettingsPanel(request);
      clearInterval(checkVideoExist);
    }
  }, 100);
  sendResponse(request);
  return true;
});
