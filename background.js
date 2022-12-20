function openPage() {
    try {
        browser.tabs.create({//for firefox
            url: "index.html"
        });

    }
    catch (err) {
        chrome.tabs.create({//for chrome
            url: "index.html"
        });
    }

}
try {
    browser.browserAction.onClicked.addListener(openPage);//for firefox
}
catch (err) {
    chrome.browserAction.onClicked.addListener(openPage);//for chrome
}
try {
    browser.omnibox.setDefaultSuggestion({//for firefox
        description: `Search`
    });
}
catch (err) {
    chrome.omnibox.setDefaultSuggestion({//for chrome
        description: `Search`
    });
}

function openSearch(text) {
    var searchText = "search.html?q=" + text;
    try {
        browser.tabs.create({//for firefox
            url: searchText
        });
    }
    catch (err) {
        chrome.tabs.create({//for chrome
            url: searchText
        });
    }
}
try {
    browser.omnibox.onInputEntered.addListener((text, disposition) => {//for firefox
        openSearch(text);
    });
}
catch (err) {
    chrome.omnibox.onInputEntered.addListener((text, disposition) => {//for chrome
        openSearch(text);
    });
}