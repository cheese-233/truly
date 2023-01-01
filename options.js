function saveOptions() {
    let b = document.getElementById("baidu").checked;
    let g = document.getElementById("google").checked;
    let bi = document.getElementById("bing").checked;
    let so = document.getElementById("360").checked;
    let fake = document.getElementById("fake").checked;
    let fakeW;
    let fakeWeb = document.getElementById("fakeWebsite").value;
    let fakeWd = document.getElementById("fakeWd").value;
    let bg;
    if (document.getElementById("bg1").checked) { bg = 1; } else if (document.getElementById("bg2").checked) { bg = 2 }
    if (fake && (fakeWeb || fakeWd) != "") {
        fakeW = { "isEnable": true, "Website": fakeWeb, "wd": fakeWd };
        chrome.storage.local.set({ "fake": fakeW }, function () {
        });
    }
    else {
        fakeW = { "isEnable": false };
        chrome.storage.local.set({ "fake": fakeW }, function () {
        });
    }
    let all = { "baidu": b, "google": g, "bing": bi, "360": so };
    chrome.storage.local.set({ "isSearchEngine": all, "background": bg }, function () {
    });
    try {
        window.close();
    }
    finally {
        alert("保存成功！");
    }
}


function restoreOptions() {
    chrome.storage.local.get(function (result) {
        try {
            let all = result['isSearchEngine'];
            document.getElementById("baidu").checked = all["baidu"];
            document.getElementById("google").checked = all["google"];
            document.getElementById("bing").checked = all["bing"];
            document.getElementById("360").checked = all["360"];
            let fake = result['fake'];
            document.getElementById("fake").checked = fake["isEnable"];
            if (document.getElementById("fake").checked) {
                document.getElementById("fakeWebsite").value = fake["Website"];
                document.getElementById("fakeWd").value = fake["wd"];
            }
            let bg = result["background"];
            if (bg == 1) { document.getElementById("bg1").click(); } else if (bg == 2) { document.getElementById("bg2").click(); }
        }
        catch {

        }
    });
    if (document.getElementById("fake").checked) {
        document.getElementById("fakeWebsite").disabled = false;
        document.getElementById("fakeWd").disabled = false;
    }
    else {
        document.getElementById("fakeWebsite").disabled = true;
        document.getElementById("fakeWd").disabled = true;
    }
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.getElementById("fake").addEventListener("change", function (option) {
    if (option.target.checked) {
        document.getElementById("fakeWebsite").disabled = false;
        document.getElementById("fakeWd").disabled = false;
    }
    else {
        document.getElementById("fakeWebsite").disabled = true;
        document.getElementById("fakeWd").disabled = true;
    }
});