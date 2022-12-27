if (window.location.pathname.indexOf("search.html") != -1) {
    function getQueryString(name) {//get search Content
        var r = window.location.search.split(name + "=")[1];
        if (r != undefined) {
            return r;
        }
        return null;
    }
    var searchResult = getQueryString("q");
    (chrome || browser).runtime.sendMessage({ Sresult: searchResult }, function (response) {
        if (response) {

        }
    });
}