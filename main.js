document.getElementById("fillQuick").addEventListener("click", function () {
  const selectedTitle = document.getElementById("ratingSelect").value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs.length > 0) {
      const tabId = tabs[0].id;
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: fillQuickly,
        args: [selectedTitle],
      });

      chrome.tabs.onUpdated.addListener(function listener(
        updatedTabId,
        changeInfo
      ) {
        if (updatedTabId === tabId && changeInfo.status === "complete") {
          chrome.scripting.executeScript({
            target: { tabId: updatedTabId },
            func: monitorPageAndSubmitBack,
          });
          chrome.tabs.onUpdated.removeListener(listener);
        }
      });
    }
  });
});

function fillQuickly(selectedTitle) {
  const titleMap = {
    "خیلی خوب": "خیلی خوب",
    "خوب": "خوب",
    "متوسط": "متوسط",
    "قابل قبول": "قابل قبول",
    "ضعیف": "ضعیف",
  };

  const title = titleMap[selectedTitle] || "متوسط";

  let radioButtons = document.querySelectorAll(
    `input[type="radio"][title="${title}"]`
  );

  if (radioButtons.length === 0) {
    alert(`گزینه‌ای با عنوان "${title}" پیدا نشد!`);
    return;
  }

  radioButtons.forEach((radio) => {
    radio.checked = true;

    radio.dispatchEvent(new Event("click", { bubbles: true }));
    radio.dispatchEvent(new Event("change", { bubbles: true }));

    if (radio.hasAttribute("onclick")) {
      const onclickString = radio.getAttribute("onclick");
      const match = onclickString.match(/changeValue\('(\d+)','(\d+)'\)/);
      if (match) {
        const [, param1, param2] = match;
        window.changeValue(param1, param2);
      }
    }
  });

  let submitButton = document.querySelector(
    'input.button[onclick="javascript:saveQuestionarieResponse()"]'
  );
  if (!submitButton) {
    submitButton = Array.from(document.querySelectorAll("input.button")).find(
      (btn) =>
        btn.getAttribute("value") && btn.getAttribute("value").trim() === "ثبت"
    );
  }
  if (submitButton) {
    submitButton.click();
  } else {
    alert("دکمه 'ثبت' پیدا نشد!");
  }
}

function monitorPageAndSubmitBack() {
  window.addEventListener("load", () => {
    setTimeout(() => {
      let backButton = document.querySelector(
        'input.returnbutton2[onclick="submitForm(this.form)"]'
      );
      if (!backButton) {
        backButton = Array.from(
          document.querySelectorAll("input.returnbutton2")
        ).find(
          (btn) =>
            btn.getAttribute("value") &&
            btn.getAttribute("value").trim() === "بازگشت"
        );
      }
      if (backButton) {
        let form = backButton.closest("form");
        if (form) {
          window.submitForm(form); // Submit the form directly
        } else {
          backButton.click(); // Fallback to direct click
        }
      } else {
        alert(
          "دکمه 'بازگشت' بعد از رفرش پیدا نشد! لطفاً HTML فرم را بررسی کنید."
        );
      }
    }, 3000); // Small delay to ensure DOM is ready
  });
}
