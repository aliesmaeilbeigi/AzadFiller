export function fetchProfessorName(tabId, callback) {
  chrome.scripting.executeScript(
    {
      target: { tabId },
      func: () => {
        try {
          const input = document.querySelector(
            'input[name="field(professor.personnel.person.text)"]'
          );
          if (input?.value && !/^\d+$/.test(input.value.trim())) {
            return input.value.trim();
          }
          return "";
        } catch (e) {
          console.warn("خطا:", e);
          return "";
        }
      },
    },
    (results) => {
      callback(results?.[0]?.result || "");
    }
  );
}
