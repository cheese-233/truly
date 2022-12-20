function getQueryString(name) {//get search Content
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]).replace("+", " ");
    }
    return null;
}
var searchResult = getQueryString("q");
if (searchResult == (null || "")) {
    window.location.href = "index.html";
}
document.title = searchResult + " - Truly";
document.getElementsByClassName("search-input")[0].value = searchResult;
var baidu_site = "https://www.baidu.com/s?wd=" + searchResult;
var google_site = "https://www.google.com/search?q=" + searchResult;
var page = 0;
function requestPage(page) {
    function reqListener() {
        var div = document.createElement('div');
        div.innerHTML = this.responseText;
        var a = div.getElementsByClassName("c-title");
        for (var i = 0; i < a.length; i++) {
            var baidu_div = a[i].parentElement;
            var baidu_title = baidu_div.getElementsByTagName("h3")[0];
            if (baidu_div.getElementsByClassName("ec-tuiguang").length != 0) {
                console.log(baidu_title.innerHTML + " is ad!");
                continue;
            }
            var baidu_texts = baidu_div.getElementsByTagName("em");
            var baidu_text;
            for (var i = 0; i < baidu_texts.length; i++) {
                if (baidu_texts[i].parentElement.tagName == ("SPAN" || "DIV")) {
                    baidu_text = baidu_texts[i].parentElement;
                    break;
                }
            }
            var baidu_img = baidu_div.getElementsByTagName("img")[0];
            var b_div = document.createElement('div');
            var b_text_div = document.createElement('div');
            var b_box_div = document.createElement('div');
            b_box_div.className = "row";
            try {
                baidu_title.className = "result_title";
                b_div.appendChild(baidu_title);
            }
            catch (err) {
                console.log(err);
            }
            try {
                baidu_img.className = "result_img";
                b_box_div.appendChild(baidu_img);
            }
            catch (err) {
                var baidu_img_box = document.createElement('div');
                baidu_img_box.className = "result_img";
                b_box_div.appendChild(baidu_img_box);
                console.log(err);
            }
            try {
                b_text_div.className = "result_text_box";
                b_text_div.appendChild(baidu_text);
                b_box_div.appendChild(b_text_div);
            }
            catch (err) {
                console.log(err);
            }
            try {
                b_div.appendChild(b_box_div);
            }
            catch (err) {
                console.log(err);
            }
            document.getElementById("search-div").appendChild(b_div);
            document.getElementById("search-div").innerHTML += "<br>";
        }
    }
    const req = new XMLHttpRequest();
    req.addEventListener("load", reqListener);
    req.open("GET", baidu_site + "&pn=" + page * 10);//Baidu's search results
    req.send();
    function reqListenerG() {
        var div = document.createElement('div');
        div.innerHTML = this.responseText;
        var a = div.getElementsByTagName("h3");
        for (var i = 0; i < a.length; i++) {
            var google_div = a[i].parentElement.parentElement.parentElement.parentElement.parentElement;
            var google_title = google_div.getElementsByTagName("h3")[0].parentElement;
            if (google_title.tagName != "A") {
                continue;
            }
            var google_texts = google_div.getElementsByTagName("em");
            var google_text;
            for (var i = 0; i < google_texts.length; i++) {
                if (google_texts[i].parentElement.tagName == ("SPAN" || "DIV")) {
                    google_text = google_texts[i].parentElement;
                    break;
                }
            }
            var b_div = document.createElement('div');
            var b_text_div = document.createElement('div');
            var b_box_div = document.createElement('div');
            var google_img_box = document.createElement('div');
            google_img_box.className = "result_img";
            b_box_div.className = "row";
            b_box_div.appendChild(google_img_box);
            try {
                google_title.className = "result_title";
                b_div.appendChild(google_title);
            }
            catch (err) {
                console.log(err);
            }
            try {
                b_text_div.className = "result_text_box";
                b_text_div.appendChild(google_text);
                b_box_div.appendChild(b_text_div);
            }
            catch (err) {
                console.log(err);
            }
            try {
                b_div.appendChild(b_box_div);
            }
            catch (err) {
                console.log(err);
            }
            document.getElementById("search-div").appendChild(b_div);
            document.getElementById("search-div").innerHTML += "<br>";
        }
    }

    const reqG = new XMLHttpRequest();
    reqG.addEventListener("load", reqListenerG);
    reqG.open("GET", google_site + "&start=" + page * 10);//Google's search results
    reqG.send();
}
function requestPagePlus() {//Turn the page
    requestPage(page);
    page++;
}
document.getElementById("pagebtn").addEventListener("click", function () { requestPagePlus(); });//Connect the Button
requestPagePlus();//Turn to the first page