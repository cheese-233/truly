function openPage() {
    try {
        browser.tabs.create({
            url: "index.html"
        });
    }
    catch (err) {
        chrome.tabs.create({
            url: "index.html"
        });
    }

}
try {
    browser.browserAction.onClicked.addListener(openPage);
}
catch (err) {
    chrome.browserAction.onClicked.addListener(openPage);
}
try {
    browser.omnibox.setDefaultSuggestion({
        description: `Search`
    });
}
catch (err) {
    chrome.omnibox.setDefaultSuggestion({
        description: `Search`
    });
}

function openSearch(text) {
    var searchText = "search.html?q=" + text;
    try {
        browser.tabs.create({
            url: searchText
        });
    }
    catch (err) {
        chrome.tabs.create({
            url: searchText
        });
    }
}
try {
    browser.omnibox.onInputEntered.addListener((text, disposition) => {
        openSearch(text);
    });
}
catch (err) {
    chrome.omnibox.onInputEntered.addListener((text, disposition) => {
        openSearch(text);
    });
}