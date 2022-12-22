function getQueryString(name) {//get search Content
    var r = window.location.search.split(name + "=");
    if (r != null) {
        return decodeURIComponent(r[1].replace(/\+/g, " "));
    }
    return null;
}
var searchResult = getQueryString("q");
if (searchResult == (null || "")) {
    window.location.href = "index.html";
}
document.title = searchResult + " - Truly";
document.getElementsByClassName("search-input")[0].value = searchResult;
baidu_site = undefined;
google_site = undefined;
bing_site = undefined;
so_site = undefined;
page = 0;
OpenedSearchEngine = 0;
function DontHaveEngine() {
    document.getElementById("search-div").innerHTML += "<h3>还没有添加搜索引擎。请先在设置中添加一个。</h3>";
}
function requestPage(page) {
    search_result_all = {};
    var RequestState = 0;
    function addDiv() {
        if (RequestState == OpenedSearchEngine) {
            LoadingAnimation(true);
            for (var key in search_result_all) {
                document.getElementById("search-div").appendChild(search_result_all[key]);
                delete search_result_all[key];
                document.getElementById("search-div").innerHTML += "<br>";
            }
        }
    }
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
            search_result_all[baidu_title.innerText] = b_div;
        }
        addDiv();
    }
    if (baidu_site != undefined) {
        const req = new XMLHttpRequest();
        req.addEventListener("load", reqListener);
        req.open("GET", baidu_site + "&pn=" + page * 10);//Baidu's search results
        req.send();
        req.onreadystatechange = function () {
            if (req.readyState == XMLHttpRequest.DONE) {
                RequestState++;
            }
        }
    }
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
            var cites = google_div.getElementsByTagName("cite")
            for (var c = 0; c < cites.length; c++) {
                cites[c].outerHTML = "";
            }
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
            search_result_all[google_title.innerText] = b_div;
        }
        addDiv();
    }
    if (google_site != undefined) {
        const reqG = new XMLHttpRequest();
        reqG.addEventListener("load", reqListenerG);
        reqG.open("GET", google_site + "&start=" + page * 10);//Google's search results
        reqG.send();
        reqG.onreadystatechange = function () {
            if (reqG.readyState == XMLHttpRequest.DONE) {
                RequestState++;
            }
        }
    }
    function reqListenerB() {
        var div = document.createElement('div');
        div.innerHTML = this.responseText;
        var a = div.getElementsByClassName('b_algo');
        for (var i = 0; i < a.length; i++) {
            var bing_div = a[i];
            if (bing_div.getElementsByTagName("h2").length <= 0) {
                continue;
            }
            var bing_title = bing_div.getElementsByTagName("h2")[0];
            var bing_texts = bing_div.getElementsByTagName("strong");
            var bing_text = undefined;
            for (var i = 0; i < bing_texts.length; i++) {
                if (bing_texts[i].parentElement.tagName == ("P")) {
                    bing_text = bing_texts[i].parentElement;
                    break;
                }
            }
            if (bing_text == undefined) {
                try {
                    bing_text = bing_div.getElementsByClassName("algoSlug_icon")[0].parentElement;
                }
                catch (e) { }
            }
            var b_div = document.createElement('div');
            var b_text_div = document.createElement('div');
            var b_box_div = document.createElement('div');
            var bing_img_box = document.createElement('div');
            bing_img_box.className = "result_img";
            b_box_div.className = "row";
            var baidu_img = bing_div.getElementsByTagName("img")[0];
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
                bing_title.className = "result_title";
                b_div.appendChild(bing_title);
            }
            catch (err) {
                console.log(err);
            }
            try {
                b_text_div.className = "result_text_box";
                b_text_div.appendChild(bing_text);
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
            search_result_all[bing_title.innerText] = b_div;
        }
        addDiv();
    }
    if (bing_site != undefined) {
        const reqB = new XMLHttpRequest();
        reqB.addEventListener("load", reqListenerB);
        reqB.open("GET", bing_site + "&first=" + (page * 10 + 1));//Bing's search results
        reqB.send();
        reqB.onreadystatechange = function () {
            if (reqB.readyState == XMLHttpRequest.DONE) {
                RequestState++
            }
        }
    }
    function reqListenerS() {
        var div = document.createElement('div');
        div.innerHTML = this.responseText;
        var a = div.getElementsByClassName("res-title");
        for (var i = 0; i < a.length; i++) {
            var baidu_div = a[i].parentElement;
            var baidu_title = baidu_div.getElementsByTagName("h3")[0];
            var baidu_img = baidu_div.getElementsByTagName("img")[0];
            if (baidu_img != undefined) {
                var baidu_text = baidu_div.getElementsByClassName("res-comm-con")[0];
            }
            else {
                var baidu_text = baidu_div.getElementsByClassName("res-desc")[0];
            }
            try {
                baidu_img.src = baidu_img.outerHTML.split("data-isrc=\"")[1].split("\"")[0];
            }
            catch (e) {

            }
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
            search_result_all[baidu_title.innerText] = b_div;
        }
        addDiv();
    }
    if (so_site != undefined) {
        const reqS = new XMLHttpRequest();
        reqS.addEventListener("load", reqListenerS);
        reqS.open("GET", so_site + "&pn=" + (page + 1));//Baidu's search results
        reqS.send();
        reqS.onreadystatechange = function () {
            if (reqS.readyState == XMLHttpRequest.DONE) {
                RequestState++;
            }
        }
    }
}
function requestPagePlus() {//Turn the page
    LoadingAnimation(false);
    requestPage(page);
    page++;
}
(chrome || browser).storage.local.get(function (result) {
    var all = result['isSearchEngine'];
    if (all == undefined) {
        DontHaveEngine();
        return;
    }
    if (all["baidu"]) {
        baidu_site = "https://www.baidu.com/s?wd=" + searchResult;
        OpenedSearchEngine++;
    }
    if (all["google"]) {
        google_site = "https://www.google.com/search?q=" + searchResult;
        OpenedSearchEngine++;
    }
    if (all["bing"]) {
        bing_site = "https://www.bing.com/search?q=" + searchResult;
        OpenedSearchEngine++;
    }
    if (all["360"]) {
        so_site = "https://www.so.com/s?q=" + searchResult;
        OpenedSearchEngine++;
    }
    requestPagePlus();//Turn to the first page
    document.getElementById("pagebtn").addEventListener("click", function () { requestPagePlus(); });//Connect the Button
});