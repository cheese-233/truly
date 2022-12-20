function getQueryString(name) {//get search Content
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]).replace("+", " ");
    }
    return null;
}
var searchResult = getQueryString("q");
(chrome || browser).runtime.sendMessage({ Sresult: searchResult }, function (response) {
    if (response) {

    }
});