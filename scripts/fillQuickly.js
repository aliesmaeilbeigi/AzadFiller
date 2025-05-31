export function fillQuickly(selectedTitle, autoSubmit) {
  const titles = ["خیلی خوب", "خوب", "متوسط", "قابل قبول", "ضعیف"];

  if (selectedTitle === "random") {
    const groups = {};

    document.querySelectorAll('input[type="radio"]').forEach((radio) => {
      const title = radio.getAttribute("title");
      const name = radio.getAttribute("name");
      if (titles.includes(title)) {
        if (!groups[name]) groups[name] = [];
        groups[name].push(radio);
      }
    });

    Object.values(groups).forEach((radios) => {
      const randomRadio = radios[Math.floor(Math.random() * radios.length)];
      randomRadio.checked = true;
      randomRadio.dispatchEvent(new Event("click", { bubbles: true }));
      randomRadio.dispatchEvent(new Event("change", { bubbles: true }));

      if (randomRadio.hasAttribute("onclick")) {
        const onclickString = randomRadio.getAttribute("onclick");
        const match = onclickString.match(/changeValue\('(\d+)','(\d+)'\)/);
        if (match) {
          const [, param1, param2] = match;
          window.changeValue(param1, param2);
        }
      }
    });
  } else {
    let radioButtons = document.querySelectorAll(
      `input[type="radio"][title="${selectedTitle}"]`
    );
    if (radioButtons.length === 0) {
      alert(
        `گزینه‌ای با عنوان "${selectedTitle}" پیدا نشد! دقت کنید این افزونه در صفحه ارزشیابی هر استاد (دانشگاه آزاد) قابل استفاده است. در صورت وجود مشکل لطفا به آیدی های موجود در کانال تلگرام پشتیبانی افزونه پیام دهید: azadfiller`
      );
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
  }

  if (autoSubmit) {
    let submitButton = document.querySelector(
      'input.button[onclick="javascript:saveQuestionarieResponse()"]'
    );
    if (!submitButton) {
      submitButton = Array.from(document.querySelectorAll("input.button")).find(
        (btn) => btn.getAttribute("value")?.trim() === "ثبت"
      );
    }
    if (submitButton) {
      submitButton.click();
    } else {
      alert("دکمه 'ثبت' پیدا نشد!");
    }
  }
}
