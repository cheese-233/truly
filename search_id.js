if (window.location.pathname.indexOf("search.html") != -1) {
    function getQueryString(name) {//get search Content
        let r = window.location.search.split(name + "=")[1];
        if (r != undefined) {
            return r;
        }
        return null;
    }
    let searchResult = getQueryString("q");
    (chrome || browser).runtime.sendMessage({ Sresult: searchResult }, function () {
    });
}