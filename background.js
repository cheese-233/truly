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
    var searchText = "search.html?q=" + text;
    (chrome || browser).tabs.create({//for firefox
        url: searchText
    });
}
(chrome || browser).omnibox.onInputEntered.addListener((text, disposition) => {//for chrome
    openSearch(text);
});


(chrome || browser).runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        ocurTabId = sender.tab.id;
        if (request.Sresult) {
            var searchText = "search.html?q=" + request.Sresult;
        } else {
            var searchText = "index.html";
        }
        (chrome || browser).tabs.create({//for firefox
            url: searchText
        });
        (chrome || browser).tabs.remove(ocurTabId);
        sendResponse({ status: 200 });
    });  