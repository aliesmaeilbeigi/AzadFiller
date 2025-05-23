document.getElementById("fillQuick").addEventListener("click", function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs.length > 0) {
      const tabId = tabs[0].id;
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: fillQuickly
      });
      // Monitor tab updates to inject script after page refresh
      chrome.tabs.onUpdated.addListener(function listener(updatedTabId, changeInfo) {
        if (updatedTabId === tabId && changeInfo.status === 'complete') {
          chrome.scripting.executeScript({
            target: { tabId: updatedTabId },
            function: monitorPageAndSubmitBack
          });
          chrome.tabs.onUpdated.removeListener(listener); // Remove listener after execution
        }
      });
    }
  });
});

function fillQuickly() {
  // Select all radio buttons with title="متوسط" (average)
  let radioButtons = document.querySelectorAll('input[type="radio"][title="متوسط"]');
  
  // Fallback methods if title fails
  if (radioButtons.length === 0) {
    radioButtons = document.querySelectorAll('input[type="radio"][title*="متوسط"]');
  }
  if (radioButtons.length === 0) {
    radioButtons = document.querySelectorAll('input[type="radio"][value="7150024237"]');
  }

  if (radioButtons.length === 0) {
    alert("خطای افزونه: متاسفانه نتونستم گزینه ها رو پیدا کنم. دقت کنید فقط در قسمت ارزشیابی هر استاد قابل استفاده هست و اگر درست عمل نکرد لطفا به hiaeb در تلگرام پیام دهید");
    return;
  }

  // Check all radio buttons
  radioButtons.forEach(radio => {
    radio.checked = true;

    // Trigger the 'click' event
    const clickEvent = new Event('click', { bubbles: true });
    radio.dispatchEvent(clickEvent);

    // Trigger the 'change' event
    const changeEvent = new Event('change', { bubbles: true });
    radio.dispatchEvent(changeEvent);

    // Call the changeValue function if it exists
    if (radio.hasAttribute("onclick")) {
      const onclickString = radio.getAttribute("onclick");
      const match = onclickString.match(/changeValue\('(\d+)','(\d+)'\)/);
      if (match) {
        const [, param1, param2] = match;
        window.changeValue(param1, param2);
      }
    }
  });

  // Find and click the "Submit" button
  let submitButton = document.querySelector('input.button[onclick="javascript:saveQuestionarieResponse()"]');
  if (!submitButton) {
    submitButton = Array.from(document.querySelectorAll('input.button'))
      .find(btn => btn.getAttribute('value') && btn.getAttribute('value').trim() === 'ثبت');
  }
  if (submitButton) {
    submitButton.click();
  } else {
    alert("دکمه 'ثبت' پیدا نشد!");
    return;
  }
}

// Function to monitor page load and submit the form with "Back" button
function monitorPageAndSubmitBack() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      let backButton = document.querySelector('input.returnbutton2[onclick="submitForm(this.form)"]');
      if (!backButton) {
        backButton = Array.from(document.querySelectorAll('input.returnbutton2'))
          .find(btn => btn.getAttribute('value') && btn.getAttribute('value').trim() === 'بازگشت');
      }
      if (backButton) {
        let form = backButton.closest('form');
        if (form) {
          window.submitForm(form); // Submit the form directly
        } else {
          backButton.click(); // Fallback to direct click
        }
      } else {
        alert("دکمه 'بازگشت' بعد از رفرش پیدا نشد! لطفاً HTML فرم را بررسی کنید.");
      }
    }, 3000); // Small delay to ensure DOM is ready
  });
}