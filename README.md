## 📄 Other Languages
- 🇮🇷 [نسخه فارسی (Persian)](README-fa.md)

<br><br>

## About the Project

This is third version of an extension designed to automate the process of filling out instructor evaluation forms on the Islamic Azad University system (https://stdn.iau.ir). The extension fills in all evaluation questions with the student's selected options and automatically clicks the "Submit" and (if possible) "Back" buttons, making the repetitive and time-consuming instructor evaluation process easier for students. This project was developed with the goal of saving students' time, and its initial version was written in less than 15 minutes with the help of artificial intelligence.

<br><br>

**The initial version of this project was created by Ali Esmaeilbeigi with the help of Grok 3, an AI developed by xAI. Even the overall structure of this README file was written by Grok 3!**

**Special thanks to dear [Amirreza](https://github.com/amirrrreza1), who stood by me and played a vital role in the development of versions 2 and 3 of this extension.**

<br><br>

## Changes compared to the previous version (v2):
– Visual enhancements

– Added the "Random 🎲" option to the score selection list for randomly selecting options

– Displaying the instructor's name when choosing a score

– Improved automatic response submission (if users need to review and edit some of their answers)

– Added a pre-entry page to the extension (if the user is not on the valid instructor evaluation pages)



<br><br>


## Extension Screenshots:

![Screenshot 1](https://github.com/aliesmaeilbeigi/AzadFiller/blob/main/Screenshots/1.jpg)
![Screenshot 2](https://github.com/aliesmaeilbeigi/AzadFiller/blob/main/Screenshots/2.jpg)
![Screenshot 3](https://github.com/aliesmaeilbeigi/AzadFiller/blob/main/Screenshots/3.jpg)


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

The extension automatically selects your chosen option for all questions and submits the form.

Note: The extension only works on instructor evaluation pages.

<br><br>

## Limitations and Invitation for Contribution
Currently, the part related to automatically clicking the "Back" button (after submitting the form) does not fully work. This issue is due to the complexity of the DOM and the different behaviors of pages after refresh. I (Ali) haven’t spent much time fixing this problem, but I invite interested contributors to work on this part! If you have ideas for improvement, please create a Pull Request or contact me on Telegram at @hiaeb.

<br><br>

## ⚠️ Disclaimer:
This extension is designed solely for the convenience of students. Please use it responsibly. However, using this extension means I do not consider myself responsible for the university’s future! 😂
