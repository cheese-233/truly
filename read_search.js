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
document.getElementById("q").value = searchResult;
const ua = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36";
let baidu_site = undefined;
let google_site = undefined;
let bing_site = undefined;
let so_site = undefined;
let Page = 0;
let OpenedSearchEngine = 0;
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let pivotIndex = Math.floor(arr.length / 2);
    let pivot = arr.splice(pivotIndex, 1)[0];
    let left = [];
    let right = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i][1] < pivot[1]) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
};
async function formatTitle(El, Tag1) {
    let els = El.getElementsByTagName(Tag1);
    while (els.length != 0) {
        for (let i = 0; i < els.length; i++) {
            els[i].outerHTML = els[i].innerHTML;
        }
        els = El.getElementsByTagName(Tag1);
    }
}
function toSBC(str) {
    var result = "";
    var len = str.length;
    for (var i = 0; i < len; i++) {
        var cCode = str.charCodeAt(i);
        //65248
        cCode = (cCode >= 0xFF01 && cCode <= 0xFF5E) ? (cCode - 65248) : cCode;
        cCode = (cCode == 0x03000) ? 0x0020 : cCode;
        result += String.fromCharCode(cCode);
    }
    return result;
}
function formatInputTitle(title) {
    let t1 = title;
    let replace = {
        " ": "", "【": "[", "】": "", "（": "", "）": "", "——": "--", "。": ".", "，": ","
    };
    for (let key in replace) {
        const re = new RegExp(key, "g");
        t1 = t1.replace(re, replace[key]);
    }
    t1 = toSBC(t1);
    t1 = t1.toLowerCase();
    return t1;
}
function requestPage(page) {
    let search_result_all = {};
    let RequestState = 0;
    function addPages() {
        let la = document.createElement("label");
        la.className = "label-none";
        let pages = String(page + 1)
        la.id = "page" + pages;
        document.getElementById("search-div").appendChild(la);
        addPageBtn(la.id, pages);
    }
    function HandleError(e, engineText) {
        try {
            LoadingAnimation(true);
        }
        catch {

        }
        if (e == null || e.statusText == "") {
            document.getElementById("search-div").innerHTML += "<h4>" + engineText + "加载失败 </h4>";
        }
        else {
            document.getElementById("search-div").innerHTML += "<h4>" + engineText + "加载失败 错误：" + String(e.statusText) + "</h4>";
        }
    }
    let AlreadyDelete = []; //去重
    function addDiv() {
        if (RequestState == OpenedSearchEngine) {
            LoadingAnimation(true);
            addPages();
            let tempKeys = [];
            for (let key in search_result_all) {
                tempKeys.push(search_result_all[key]);
            }
            tempKeys = quickSort(tempKeys);
            for (let i in tempKeys) {
                if (AlreadyDelete.indexOf(tempKeys[i]) == -1) {
                    document.getElementById("search-div").appendChild(tempKeys[i][0]);
                    AlreadyDelete.push(tempKeys[i]);
                    delete tempKeys[i];
                }
            }
            isReadyRequest = true;
        }
    }

    // browser.declarativeNetRequest.getDynamicRules().then(function (Rules) {
    //     let rmRulesIds = [];
    //     for (let i = 0; i < Rules.length; i++) {
    //         rmRulesIds.push(Rules[i].id);
    //     }
    //     browser.declarativeNetRequest.updateDynamicRules({
    //         removeRuleIds: rmRulesIds
    //     });
    // });
    let DynamicRuleId = 0;
    async function requestXHR(site, listener, onStateChange) {
        DynamicRuleId++;
        // await browser.declarativeNetRequest.updateDynamicRules({
        //     addRules: [{
        //         "id": DynamicRuleId,
        //         "priority": 1,
        //         "action": {
        //             "type": "modifyHeaders",
        //             "requestHeaders": [
        //                 { "header": "user-agent", "operation": "set", "value": ua }
        //             ]
        //         },
        //         "condition": {
        //             "domains": ["*://www.baidu.com/*"],
        //             "resourceTypes": ["xmlhttprequest"]
        //         }
        //     }]
        // });
        const req = new XMLHttpRequest();
        req.addEventListener("load", listener);
        req.open("GET", site);//search results
        req.withCredentials = false;
        req.send();
        req.onreadystatechange = onStateChange;
        return req;
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
            let b_favicon = document.createElement('img');
            getFavicon("https://www.baidu.com/", b_favicon);
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
            catch {
            }
            try {
                baidu_title.className = "result_title";
                formatTitle(baidu_title, "em");
                formatTitle(baidu_title, "span");
                baidu_title.appendChild(b_favicon);
                b_text_div.appendChild(baidu_title);
            }
            catch {
            }
            try {
                baidu_img.className = "result_img";
                baidu_img.loading = "lazy";
                b_box_div.appendChild(baidu_img);
            }
            catch {
                let baidu_img_box = document.createElement('div');
                baidu_img_box.className = "result_img";
                b_box_div.appendChild(baidu_img_box);
            }
            try {
                b_text_div.className = "result_text_box";
                b_text_div.appendChild(baidu_text);
            }
            catch {
            }
            b_box_div.appendChild(b_text_div);
            try {
                b_div.className = "result_div";
                b_div.appendChild(b_box_div);
            }
            catch {
            }
            search_result_all[formatInputTitle(baidu_title.innerText)] = [b_div, i];
        }
        addDiv();
    }
    if (baidu_site != undefined) {
        requestXHR(baidu_site + "&pn=" + page * 10, reqListener, function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                RequestState++;
            }
            else if (this.readyState == XMLHttpRequest.DONE) {
                HandleError(this, "百度");
            }
        });
    }

    function reqListenerG() {
        let div = document.createElement('div');
        div.innerHTML = this.responseText;
        let a = div.getElementsByTagName("h3");
        let ii = 0;
        for (let i = 0; i < a.length; i++) {
            let google_div = a[i].parentElement.parentElement.parentElement.parentElement.parentElement;
            let google_title = google_div.getElementsByTagName("h3")[0].parentElement;
            let b_title = document.createElement("h3");
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
            let b_favicon = document.createElement('img');
            getFavicon("https://www.google.com/", b_favicon);
            let cites = google_div.getElementsByTagName("cite")
            for (let c = 0; c < cites.length; c++) {
                cites[c].outerHTML = "";
            }
            let google_img_box = document.createElement('div');
            google_img_box.className = "result_img";
            b_box_div.className = "row";
            b_box_div.appendChild(google_img_box);
            try {
                formatTitle(google_title, "br");
                formatTitle(google_title, "h3");
                formatTitle(google_title, "div");
            }
            catch {
            }
            try {
                b_title.appendChild(google_title);
                b_title.className = "result_title";
                b_title.appendChild(b_favicon);
                b_text_div.appendChild(b_title);
            }
            catch {
            }
            try {
                b_text_div.className = "result_text_box";
                b_text_div.appendChild(google_text);
            }
            catch {
            }
            b_box_div.appendChild(b_text_div);
            try {
                b_div.className = "result_div";
                b_div.appendChild(b_box_div);
            }
            catch {

            }
            search_result_all[formatInputTitle(google_title.innerText)] = [b_div, ii];
            ii++;
        }
        addDiv();
    }
    if (google_site != undefined) {
        requestXHR(google_site + "&start=" + page * 10, reqListenerG, function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                RequestState++;
            }
            else if (this.readyState == XMLHttpRequest.DONE) {
                HandleError(this, "谷歌");
            }
        })
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
            let b_favicon = document.createElement('img');
            getFavicon("https://www.bing.com/", b_favicon);
            bing_img_box.className = "result_img";
            b_box_div.className = "row";
            let bing_img = bing_div.getElementsByTagName("img")[0];
            try {
                bing_img.className = "result_img";
                bing_img.loading = "lazy";
                b_box_div.appendChild(bing_img);
            }
            catch {
                let bing_img_box = document.createElement('div');
                bing_img_box.className = "result_img";
                b_box_div.appendChild(bing_img_box);
            }
            try {
                bing_title.className = "result_title";
                formatTitle(bing_title, "strong");
                bing_title.appendChild(b_favicon);
                b_text_div.appendChild(bing_title);
            }
            catch {
            }
            try {
                b_text_div.className = "result_text_box";
                b_text_div.appendChild(bing_text);
            }
            catch {
            }
            b_box_div.appendChild(b_text_div);
            try {
                b_div.className = "result_div";
                b_div.appendChild(b_box_div);
            }
            catch {
            }
            search_result_all[formatInputTitle(bing_title.innerText)] = [b_div, i];
        }
        addDiv();
    }
    if (bing_site != undefined) {
        requestXHR(bing_site + "&first=" + (page * 10 + 1) + "&search=", reqListenerB, function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                RequestState++;
            }
            else if (this.readyState == XMLHttpRequest.DONE) {
                HandleError(this, "必应");
            }
        })
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
            catch {
            }
            try {
                so_img.src = so_img.outerHTML.split("data-isrc=\"")[1].split("\"")[0];
            }
            catch {

            }
            let b_div = document.createElement('div');
            let b_text_div = document.createElement('div');
            let b_box_div = document.createElement('div');
            let b_favicon = document.createElement('img');
            getFavicon("https://www.so.com/", b_favicon);
            b_box_div.className = "row";
            try {
                let Ele = so_title.getElementsByClassName("icon-official");
                for (let i = 0; i < Ele.length; i++) {
                    Ele[i].outerHTML = "";
                }
            }
            catch {
            }
            try {
                so_title.className = "result_title";
                formatTitle(so_title, "em");
                so_title.appendChild(b_favicon);
                b_text_div.appendChild(so_title);
            }
            catch {
            }
            try {
                so_img.className = "result_img";
                so_img.loading = "lazy";
                b_box_div.appendChild(so_img);
            }
            catch {
                let so_img_box = document.createElement('div');
                so_img_box.className = "result_img";
                b_box_div.appendChild(so_img_box);
            }
            try {
                b_text_div.className = "result_text_box";
                b_text_div.appendChild(so_text);
            }
            catch {
            }
            b_box_div.appendChild(b_text_div);
            try {
                for (let i in b_text_div.getElementsByClassName("g-linkinfo")) {
                    i.outerHTML = "";
                }
            }
            catch {
            }
            try {
                b_div.className = "result_div";
                b_div.appendChild(b_box_div);
            }
            catch {
            }
            search_result_all[formatInputTitle(so_title.innerText)] = [b_div, i];
        }
        addDiv();
    }
    if (so_site != undefined) {
        requestXHR(so_site + "&pn=" + (page + 1), reqListenerS, function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                RequestState++;
            }
            else if (this.readyState == XMLHttpRequest.DONE) {
                HandleError(this, "360");
            }
        });
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
chrome.storage.local.get(function (result) {
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
        bing_site = "https://cn.bing.com/search?q=" + searchResult;
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
const ruleId = 1;

const rules = {
    removeRuleIds: [ruleId],
    addRules: [{
        id: ruleId,
        priority: 1,
        condition: {
            domains: ["www.google.com"],
            resourceTypes: ["main_frame", "xmlhttprequest"],
        },
        action: {
            type: "modifyHeaders",
            requestHeaders: [{
                header: "user-agent",
                operation: "set",
                value: ua
            }]
        }
    }],
};

chrome.declarativeNetRequest.updateDynamicRules(rules, () => {
    if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
    } else {
        chrome.declarativeNetRequest.getDynamicRules(rules => console.log(rules));
    }
});