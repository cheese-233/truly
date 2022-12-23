document.getElementById("setting_nav").addEventListener("click", function () {
    try {
        browser.runtime.openOptionsPage();//for firefox
    } catch (err) {
        chrome.runtime.openOptionsPage();//for chrome
    }
});
document.getElementById("submitBtn").addEventListener("click", function () {
    document.getElementsByTagName("form")[0].submit();
});
document.getElementById("q").addEventListener("submit", function () {
    document.getElementsByTagName("form")[0].submit();
});
SearchSug().on('onShowDropdown', function () {
    document.getElementById('submitBtn').style = "border-radius:0px;border-top-left-radius:25px;";
    document.getElementById('dropdownBtn').style = "border-radius:0px;border-top-right-radius:25px;";
}).on('onHideDropdown', function () {
    document.getElementById('submitBtn').style = "";
    document.getElementById('dropdownBtn').style = "";
});