try { browser; } catch { importScripts("frame/browser-polyfill.min.js"); }
function openPage() {
    browser.tabs.create({
        url: "index.html"
    });

}
browser.action.onClicked.addListener(openPage);
browser.omnibox.setDefaultSuggestion({//for firefox
    description: `Search`
});

function openSearch(text) {
    let searchText = "search.html?q=" + text;
    browser.tabs.create({//for firefox
        url: searchText
    });
}
browser.omnibox.onInputEntered.addListener((text, disposition) => {//for chrome
    openSearch(text);
});
function handleNewRequestTab(Keyword, tab, ocurTabId) {
    let reg = new RegExp(Keyword + "=([^&]*)(&|$)", "i");
    let searchText = "search.html?q=" + tab.url.match(reg)[1];
    browser.tabs.create({
        url: searchText,
        index: tab.index + 1,
        windowId: tab.windowId,
        active: tab.active
    });
    browser.tabs.remove(ocurTabId);
}
function handleTab(ocurTabId, state, tab) {
    if (state["url"] != null) {
        if (state["url"].indexOf("https://search.truly.eu.org/") == 0) {
            handleNewRequestTab("q", tab, ocurTabId);
            return;
        }
        chrome.storage.local.get(function (result) {
            if (result['fake'] == null) {
                return;
            }
            if (result['fake']['isEnable']) {
                if (state["url"].indexOf(result['fake']["Website"]) == 0) {
                    handleNewRequestTab(result['fake']["wd"], tab, ocurTabId);
                }
            }
        });
    }
}

browser.tabs.onUpdated.addListener(handleTab);