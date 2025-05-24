## 📄 Other Languages
- 🇮🇷 [نسخه فارسی (Persian)](README-fa.md)

<br><br>

## About the Project

This is an extension designed to automate the process of filling out faculty evaluation forms on the Islamic Azad University system (https://stdn.iau.ir). It simplifies the repetitive and time-consuming evaluation process for students by automatically selecting the "Average" option for all questions and clicking the "Submit" and (if possible) "Back" buttons.

The project was developed to save students time, and its initial version was written in under 15 minutes with the help of artificial intelligence.

**This project was created by Ali Esmaeilbeigi with the help of Grok 3, an AI developed by xAI. Even the overall structure of this README file was written by Grok 3!**

<br><br>

## Extension Screenshots:

![Screenshot 1](https://github.com/aliesmaeilbeigi/AzadFiller/blob/main/Screenshots/0.jpg)  
![Screenshot 2](https://github.com/aliesmaeilbeigi/AzadFiller/blob/main/Screenshots/2.jpg)  
![Screenshot 3](https://github.com/aliesmaeilbeigi/AzadFiller/blob/main/Screenshots/1.jpg)

<br><br>

## 🛠 Technologies Used

- **JavaScript**: Core logic of the extension and interaction with web page DOMs.
- **Chrome Extension APIs**: Uses `chrome.scripting` to inject scripts and `chrome.tabs` to manage tabs.
- **HTML/CSS**: Simple popup user interface for the extension.

<br><br>

## ⚙️ Installation and Usage

✅ **Download the Project:**

Clone the repository from GitHub or download and extract the ZIP file:

```bash
git clone https://github.com/aliesmaeilbeigi/AzadFiller.git
```

✅ Install the extension:

On Chrome and Edge:
Go to the extensions page. Enable "Developer mode." Click "Load unpacked" and select the project folder.

On Firefox:
Coming soon to Firefox Add-ons (link will be provided).

✅ Usage:

Go to the instructor evaluation page at https://stdn.iau.ir.

Click the extension icon and press the "Quick Fill & Submit" button.

The extension will automatically select the "Average" options and submit the form.

Note: The extension only works on instructor evaluation pages.

<br><br>

## Limitations and Invitation for Contribution
Currently, the part related to automatically clicking the "Back" button (after submitting the form) does not fully work. This issue is due to the complexity of the DOM and the different behaviors of pages after refresh. I (Ali) haven’t spent much time fixing this problem, but I invite interested contributors to work on this part! If you have ideas for improvement, please create a Pull Request or contact me on Telegram at @hiaeb.

<br><br>

## ⚠️ Disclaimer:
This extension is designed solely for the convenience of students. Please use it responsibly. However, using this extension means I do not consider myself responsible for the university’s future! 😂
