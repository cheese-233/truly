function openPage() {
    (chrome || browser).tabs.create({
        url: "index.html"
    });

}
(chrome || browser).action.onClicked.addListener(openPage);
(chrome || browser).omnibox.setDefaultSuggestion({//for firefox
    description: `Search`
});

function openSearch(text) {
    let searchText = "search.html?q=" + text;
    (chrome || browser).tabs.create({//for firefox
        url: searchText
    });
}
(chrome || browser).omnibox.onInputEntered.addListener((text, disposition) => {//for chrome
    openSearch(text);
});
function handleTab(ocurTabId, state, tab) {
    if (state["status"] == "loading") {
        (chrome || browser).storage.local.get(function (result) {
            if (result['fake'] == null) {
                return;
            }
            if (result['fake']['isEnable']) {
                if (tab.url == null) {
                    return;
                }
                if (tab.url.indexOf(result['fake']["Website"]) == 0) {
                    let reg = new RegExp("(^|&)" + result['fake']["wd"] + "=([^&]*)(&|$)", "i");
                    let searchText = "search.html?q=" + tab.url.match(reg)[2];
                    (chrome || browser).tabs.create({
                        url: searchText,
                        index: tab.index + 1,
                        windowId: tab.windowId,
                        active: tab.active
                    });
                    (chrome || browser).tabs.remove(ocurTabId);
                }
            }
        });
    }
}

(chrome || browser).tabs.onUpdated.addListener(handleTab);

(chrome || browser).runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        let ocurTabId = sender.tab.id;
        let searchText;
        if (request.Sresult) {
            searchText = "search.html?q=" + request.Sresult;
        } else {
            searchText = "index.html";
        }
        let openT = (chrome || browser).tabs.create({
            url: searchText,
            index: sender.tab.index + 1,
            windowId: sender.tab.windowId,
            active: sender.tab.active
        });
        let closeT = (chrome || browser).tabs.remove(ocurTabId);
        Promise.all([closeT, openT]);
        sendResponse({ status: 200 });
    });  