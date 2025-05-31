import { fetchProfessorName } from "./scripts/fetchProfessorName.js";
import { updateLabel } from "./scripts/updateLabel.js";
import { fillQuickly } from "./scripts/fillQuickly.js";


document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("autoSubmitCheckbox");
  const button = document.getElementById("fillQuick");
  const overlay = document.getElementById("customOverlay");
  const forceShowBtn = document.getElementById("forceShowBtn");

  function updateButtonName() {
    button.textContent = checkbox.checked
      ? "پر کردن و ثبت خودکار فرم"
      : "پر کردن فرم";
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    const validUrlPattern =
      /^(https:\/\/(stdn|stdn2)\.iau\.ir\/Student\/studentProffEvaluation\.do|https:\/\/eserv\.iau\.ir\/EServices\/studentProffEvaluation\.do)/;

    if (!validUrlPattern.test(tab.url)) {
      overlay.classList.add("active");
      return;
    }

    fetchProfessorName(tab.id, updateLabel);
  });

  forceShowBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
  });

  checkbox.addEventListener("change", updateButtonName);
  updateButtonName();

  button.addEventListener("click", () => {
    const selectedTitle = document.getElementById("ratingSelect").value;
    const autoSubmit = checkbox.checked;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) return;
      const tabId = tabs[0].id;

      chrome.scripting.executeScript({
        target: { tabId },
        func: fillQuickly,
        args: [selectedTitle, autoSubmit],
      });

      if (autoSubmit) {
        chrome.tabs.onUpdated.addListener(function listener(id, info) {
          if (id === tabId && info.status === "complete") {
            chrome.scripting.executeScript({
              target: { tabId },
              func: monitorPageAndSubmitBack,
            });
            chrome.tabs.onUpdated.removeListener(listener);
          }
        });
      }
    });
  });
});
