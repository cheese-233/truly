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
function handleNewRequestTab(Keyword, tab, ocurTabId) {
    let reg = new RegExp(Keyword + "=([^&]*)(&|$)", "i");
    let searchText = "search.html?q=" + tab.url.match(reg)[1];
    (chrome || browser).tabs.create({
        url: searchText,
        index: tab.index + 1,
        windowId: tab.windowId,
        active: tab.active
    });
    (chrome || browser).tabs.remove(ocurTabId);
}
function handleTab(ocurTabId, state, tab) {
    if (state["status"] == "loading") {
        if (tab.url.indexOf("https://search.truly.eu.org/") == 0) {
            handleNewRequestTab("q", tab, ocurTabId);
            return;
        }
        (chrome || browser).storage.local.get(function (result) {
            if (result['fake'] == null) {
                return;
            }
            if (result['fake']['isEnable']) {
                if (tab.url == null) {
                    return;
                }
                if (tab.url.indexOf(result['fake']["Website"]) == 0) {
                    handleNewRequestTab(result['fake']["wd"], tab, ocurTabId);
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
function handleInstalled(reason) {
    if (reason.reason == "install") {
        try {
            browser.runtime.openOptionsPage();//for firefox
        } catch (err) {
            chrome.runtime.openOptionsPage();//for chrome
        }
    }
}

(chrome || browser).runtime.onInstalled.addListener(handleInstalled);