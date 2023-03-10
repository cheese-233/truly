document.getElementById("setting_nav").addEventListener("click", function () {
    browser.runtime.openOptionsPage();
});
document.getElementById("submitBtn").addEventListener("click", function () {
    document.getElementsByTagName("form")[0].submit();
});
document.getElementById("q").addEventListener("submit", function () {
    document.getElementsByTagName("form")[0].submit();
});
SearchSug().on('onShowDropdown', function () {
    document.getElementById('submitBtn').style = "border-radius:0px;border-top-left-radius:25px;";
    document.getElementById('q').style = "border-radius:0px !important;border-top-right-radius:25px !important;";
}).on('onHideDropdown', function () {
    document.getElementById('submitBtn').style = "";
    document.getElementById('q').style = "";
});
chrome.storage.local.get(function (result) {
    try {
        bg = result["background"];
        const addNewStyle = async function (newStyle) {
            var styleElement = document.getElementById('styles_js');

            if (!styleElement) {
                styleElement = document.createElement('style');
                styleElement.type = 'text/css';
                styleElement.id = 'styles_js';
                document.getElementsByTagName('head')[0].appendChild(styleElement);
            }

            styleElement.appendChild(document.createTextNode(newStyle));
        }
        if (bg == 1) {
            addNewStyle('.bg-div {' +
                '   background-image: url("bg.svg");' +
                '   background-repeat: repeat;' +
                '}');
        }
        else if (bg == 2) {
            addNewStyle('.bg-div {' +
                '   background: transparent;' +
                '   background-repeat: no-repeat;' +
                '}');
        }
    }
    catch { }
});
async function requestPermission() {
    let RequestWebPermission = {
        origins: [
            "*://*.baidu.com/*",
            "*://*.google.com/*",
            "*://*.bing.com/*",
            "*://*.so.com/*"
        ]
    }
    const isPermission = await browser.permissions.contains(RequestWebPermission);
    if (!isPermission) {
        document.body.addEventListener("click", function () {
            browser.permissions.request(RequestWebPermission).then(function (value) {
                if (value == false) {
                    alert("??????????????????");
                }
                else {
                    location.reload();
                }
            })
        });
    }
}
requestPermission();