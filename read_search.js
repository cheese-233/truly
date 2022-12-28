function getQueryString(name) {//get search Content
    let r = window.location.search.split(name + "=")[1];
    if (r != undefined) {
        return decodeURIComponent(r.replace(/\+/g, " "));
    }
    return null;
}
let searchResult = getQueryString("q");
if (searchResult == (null || "")) {
    window.location.href = "index.html";
}
document.title = searchResult + " - Truly";
document.getElementsByClassName("search-input")[0].value = searchResult;
let baidu_site = undefined;
let google_site = undefined;
let bing_site = undefined;
let so_site = undefined;
let Page = 0;
let OpenedSearchEngine = 0;
function requestPage(page) {
    let search_result_all = {};
    let RequestState = 0;
    function formatTitle(El, Tag1) {
        try {
            let els = El.getElementsByTagName(Tag1);
            for (let i = 0; i < els.length; i++) {
                els[i].outerHTML = els[i].innerHTML;
            }
        }
        catch (e) {

        }
    }
    function addPages() {
        let la = document.createElement("label");
        let pages = String(page + 1)
        la.id = "page" + pages;
        document.getElementById("search-div").appendChild(la);
        addPageBtn(la.id, pages);
    }
    let AlreadyDelete = []; //去重
    function addDiv() {
        if (RequestState == OpenedSearchEngine) {
            LoadingAnimation(true);
            addPages();
            for (let key in search_result_all) {
                if (AlreadyDelete.indexOf(key) == -1) {
                    document.getElementById("search-div").appendChild(search_result_all[key]);
                    AlreadyDelete.push(key);
                    delete search_result_all[key];
                    document.getElementById("search-div").innerHTML += "<br>";
                }
            }
            isReadyRequest = true;
        }
    }
    function reqListener() {
        let div = document.createElement('div');
        div.innerHTML = this.responseText;
        let a = div.getElementsByClassName("c-title");
        for (let i = 0; i < a.length; i++) {
            let baidu_div = a[i].parentElement;
            let baidu_title = baidu_div.getElementsByTagName("h3")[0];
            let baidu_texts = baidu_div.getElementsByTagName("em");
            let baidu_text;
            for (let i = 0; i < baidu_texts.length; i++) {
                if (baidu_texts[i].parentElement.tagName == ("SPAN" || "DIV")) {
                    baidu_text = baidu_texts[i].parentElement;
                    break;
                }
            }
            let baidu_img = baidu_div.getElementsByTagName("img")[0];
            let b_div = document.createElement('div');
            let b_text_div = document.createElement('div');
            let b_box_div = document.createElement('div');
            b_box_div.className = "row";
            try {
                let Ele = baidu_title.getElementsByClassName("icon-official");
                for (let i = 0; i < Ele.length; i++) {
                    Ele[i].outerHTML = "";
                }
                Ele = baidu_title.getElementsByClassName("c-gap-left-small");
                for (let i = 0; i < Ele.length; i++) {
                    Ele[i].outerHTML = "";
                }
            }
            catch (err) {
                console.log(err);
            }
            try {
                baidu_title.className = "result_title";
                formatTitle(baidu_title, "em");
                b_text_div.appendChild(baidu_title);
            }
            catch (err) {
                console.log(err);
            }
            try {
                baidu_img.className = "result_img";
                baidu_img.loading = "lazy";
                b_box_div.appendChild(baidu_img);
            }
            catch (err) {
                let baidu_img_box = document.createElement('div');
                baidu_img_box.className = "result_img";
                b_box_div.appendChild(baidu_img_box);
                console.log(err);
            }
            try {
                b_text_div.className = "result_text_box";
                b_text_div.appendChild(baidu_text);
            }
            catch (err) {
                console.log(err);
            }
            b_box_div.appendChild(b_text_div);
            try {
                b_div.className = "result_div";
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
        let div = document.createElement('div');
        div.innerHTML = this.responseText;
        let a = div.getElementsByTagName("h3");
        for (let i = 0; i < a.length; i++) {
            let google_div = a[i].parentElement.parentElement.parentElement.parentElement.parentElement;
            let google_title = google_div.getElementsByTagName("h3")[0].parentElement;
            if (google_title.tagName != "A") {
                continue;
            }
            let google_texts = google_div.getElementsByTagName("em");
            let google_text;
            for (let i = 0; i < google_texts.length; i++) {
                if (google_texts[i].parentElement.tagName == ("SPAN" || "DIV")) {
                    google_text = google_texts[i].parentElement;
                    break;
                }
            }
            let b_div = document.createElement('div');
            let b_text_div = document.createElement('div');
            let b_box_div = document.createElement('div');
            let cites = google_div.getElementsByTagName("cite")
            for (let c = 0; c < cites.length; c++) {
                cites[c].outerHTML = "";
            }
            let google_img_box = document.createElement('div');
            google_img_box.className = "result_img";
            b_box_div.className = "row";
            b_box_div.appendChild(google_img_box);
            try {
                google_title.className = "result_title";
                b_text_div.appendChild(google_title);
            }
            catch (err) {
                console.log(err);
            }
            try {
                b_text_div.className = "result_text_box";
                b_text_div.appendChild(google_text);
            }
            catch (err) {
                console.log(err);
            }
            b_box_div.appendChild(b_text_div);
            try {
                b_div.className = "result_div";
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
        let div = document.createElement('div');
        div.innerHTML = this.responseText;
        let a = div.getElementsByClassName('b_algo');
        for (let i = 0; i < a.length; i++) {
            let bing_div = a[i];
            if (bing_div.getElementsByTagName("h2").length <= 0) {
                continue;
            }
            let bing_title = bing_div.getElementsByTagName("h2")[0];
            let bing_texts = bing_div.getElementsByTagName("strong");
            let bing_text = undefined;
            for (let i = 0; i < bing_texts.length; i++) {
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
            let b_div = document.createElement('div');
            let b_text_div = document.createElement('div');
            let b_box_div = document.createElement('div');
            let bing_img_box = document.createElement('div');
            bing_img_box.className = "result_img";
            b_box_div.className = "row";
            let bing_img = bing_div.getElementsByTagName("img")[0];
            try {
                bing_img.className = "result_img";
                bing_img.loading = "lazy";
                b_box_div.appendChild(bing_img);
            }
            catch (err) {
                let bing_img_box = document.createElement('div');
                bing_img_box.className = "result_img";
                b_box_div.appendChild(bing_img_box);
                console.log(err);
            }
            try {
                bing_title.className = "result_title";
                formatTitle(bing_title, "strong");
                b_text_div.appendChild(bing_title);
            }
            catch (err) {
                console.log(err);
            }
            try {
                b_text_div.className = "result_text_box";
                b_text_div.appendChild(bing_text);
            }
            catch (err) {
                console.log(err);
            }
            b_box_div.appendChild(b_text_div);
            try {
                b_div.className = "result_div";
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
        let div = document.createElement('div');
        div.innerHTML = this.responseText;
        let a = div.getElementsByClassName("res-title");
        for (let i = 0; i < a.length; i++) {
            let so_div = a[i].parentElement;
            let so_title = so_div.getElementsByTagName("h3")[0];
            let so_img = so_div.getElementsByTagName("img")[0];
            let so_text;
            if (so_img != undefined) {
                so_text = so_div.getElementsByClassName("res-comm-con")[0];
            }
            else {
                so_text = so_div.getElementsByClassName("res-desc")[0];
            }
            try {
                let t = so_text.getElementsByTagName("a");
                for (let i = 0; i < t.length; i++) {
                    t[i].outerHTML = "";
                }
            }
            catch (err) {
                console.log(err);
            }
            try {
                so_img.src = so_img.outerHTML.split("data-isrc=\"")[1].split("\"")[0];
            }
            catch (e) {

            }
            let b_div = document.createElement('div');
            let b_text_div = document.createElement('div');
            let b_box_div = document.createElement('div');
            b_box_div.className = "row";
            try {
                let Ele = so_title.getElementsByClassName("icon-official");
                for (let i = 0; i < Ele.length; i++) {
                    Ele[i].outerHTML = "";
                }
            }
            catch (err) {
                console.log(err);
            }
            try {
                so_title.className = "result_title";
                formatTitle(so_title, "em");
                b_text_div.appendChild(so_title);
            }
            catch (err) {
                console.log(err);
            }
            try {
                so_img.className = "result_img";
                so_img.loading = "lazy";
                b_box_div.appendChild(so_img);
            }
            catch (err) {
                let so_img_box = document.createElement('div');
                so_img_box.className = "result_img";
                b_box_div.appendChild(so_img_box);
                console.log(err);
            }
            try {
                b_text_div.className = "result_text_box";
                b_text_div.appendChild(so_text);
            }
            catch (err) {
                console.log(err);
            }
            b_box_div.appendChild(b_text_div);
            try {
                for (let i in b_text_div.getElementsByClassName("g-linkinfo")) {
                    i.outerHTML = "";
                }
            }
            catch (err) {
                console.log(err);
            }
            try {
                b_div.className = "result_div";
                b_div.appendChild(b_box_div);
            }
            catch (err) {
                console.log(err);
            }
            search_result_all[so_title.innerText] = b_div;
        }
        addDiv();
    }
    if (so_site != undefined) {
        const reqS = new XMLHttpRequest();
        reqS.addEventListener("load", reqListenerS);
        reqS.open("GET", so_site + "&pn=" + (page + 1));//360's search results
        reqS.send();
        reqS.onreadystatechange = function () {
            if (reqS.readyState == XMLHttpRequest.DONE) {
                RequestState++;
            }
        }
    }
}
let isReadyRequest = true;
function requestPagePlus() {//Turn the page
    if (isReadyRequest) {
        isReadyRequest = false;
        LoadingAnimation(false);
        requestPage(Page);
        Page++;
    }
}
(chrome || browser).storage.local.get(function (result) {
    let all = result['isSearchEngine'];
    if (all == undefined) {
        DontHaveEngine();
        return;
    }
    if (NotForPhone()) {
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
    if (OpenedSearchEngine == 0) {
        DontHaveEngine();
        return;
    }
    requestPagePlus();//Turn to the first page
});