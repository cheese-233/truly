function saveOptions(e) {
    var b = document.getElementById("baidu").checked;
    var g = document.getElementById("google").checked;
    var bi = document.getElementById("bing").checked;
    var so = document.getElementById("360").checked;
    var all = { "baidu": b, "google": g, "bing": bi, "360": so };
    (chrome || browser).storage.local.set({ "isSearchEngine": all }, function () {
    });
    try {
        window.close();
    }
    finally {
        alert("保存成功！");
    }
}


function restoreOptions() {
    (chrome || browser).storage.local.get(function (result) {
        var all = result['isSearchEngine'];
        document.getElementById("baidu").checked = all["baidu"];
        document.getElementById("google").checked = all["google"];
        document.getElementById("bing").checked = all["bing"];
        document.getElementById("360").checked = all["360"];
    });
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);