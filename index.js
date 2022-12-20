document.getElementById("setting_nav").addEventListener("click", function () {
    try {
        browser.runtime.openOptionsPage();//for firefox
    } catch (err) {
        chrome.runtime.openOptionsPage();//for chrome
    }
});