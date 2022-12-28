function saveOptions(e) {
    var b = document.getElementById("baidu").checked;
    var g = document.getElementById("google").checked;
    var bi = document.getElementById("bing").checked;
    var so = document.getElementById("360").checked;
    var fake = document.getElementById("fake").checked;
    if (fake) {
        var fakeWeb = document.getElementById("fakeWebsite").value;
        var fakeWd = document.getElementById("fakeWd").value;
        var fakeW = { "isEnable": true, "Website": fakeWeb, "wd": fakeWd };
        (chrome || browser).storage.local.set({ "fake": fakeW }, function () {
        });
    }
    else {
        var fakeW = { "isEnable": false };
        (chrome || browser).storage.local.set({ "fake": fakeW }, function () {
        });
    }
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
        let all = result['isSearchEngine'];
        document.getElementById("baidu").checked = all["baidu"];
        document.getElementById("google").checked = all["google"];
        document.getElementById("bing").checked = all["bing"];
        document.getElementById("360").checked = all["360"];
        let fake = result['fake'];
        console.log(fake);
        document.getElementById("fake").checked = fake["isEnable"];
        if (document.getElementById("fake").checked) {
            document.getElementById("fakeWebsite").value = fake["Website"];
            document.getElementById("fakeWd").value = fake["wd"];
        }
    });
    if (!document.getElementById("fake").checked) {
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
        (chrome || browser).permissions.request({
            permissions: ["tabs"]
        }, function (granted) {
            // The callback argument will be true if the user granted the permissions.
            if (!granted) {
                alert("申请失败！");
                document.getElementById("fake").checked = false;
            }
            else {
                console.log("申请权限成功");
            }
        });
        document.getElementById("fakeWebsite").disabled = false;
        document.getElementById("fakeWd").disabled = false;
    }
    else {
        (chrome || browser).permissions.remove({
            permissions: ["tabs"]
        });
        document.getElementById("fakeWebsite").disabled = true;
        document.getElementById("fakeWd").disabled = true;
    }
});