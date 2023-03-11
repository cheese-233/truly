const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top

    return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) *
        (percentageScroll / 100)
    )
}
const handleScrollAnimation = () => {
    if (elementInView(document.getElementById("search-div"), 0)) {
        document.getElementById("home_button").style = "font-size:1.5rem;";
    }
    else if (elementInView(document.getElementById("search-div"), 5)) {
        document.getElementById("home_button").style = "font-size:1.6rem;";
    }
    else if (elementInView(document.getElementById("search-div"), 10)) {
        document.getElementById("home_button").style = "font-size:1.8rem;";
    }
    else {
        document.getElementById("home_button").style = "font-size:2rem;";
    }

}
function handleScrollUpdate() {
    var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0;
    var scrollHeight = document.body.scrollHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
        requestPagePlus();
    }
}
window.addEventListener('scroll', function () {
    handleScrollAnimation();
    handleScrollUpdate();
})
function LoadingAnimation(isDelete = false) {
    if (!isDelete) {
        let loadingThree = document.createElement("div");
        loadingThree.className = "loadingThree";
        loadingThree.innerHTML = "";
        document.body.appendChild(loadingThree);
    }
    else { document.getElementsByClassName("loadingThree")[document.getElementsByClassName("loadingThree").length - 1].outerHTML = ""; }
}
function DontHaveEngine() {
    document.getElementById("search-div").innerHTML += "<h3>还没有添加搜索引擎。请先在<a href='#' id='setting_a'>设置</a>中添加一个。</h3>";
    document.getElementById("setting_a").addEventListener("click", function () {
        browser.runtime.openOptionsPage();
    });
}
function NotForPhone() {
    let userAgentInfo = navigator.userAgent;

    let mobileAgents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPod"];

    //Detect phone and Alert User
    for (const element of mobileAgents) {
        if (userAgentInfo.indexOf(element) > 0) {
            document.getElementById("search-div").innerHTML += "<h3>请勾选桌面版模式。</h3>";
            return true;
        }
    }
    return false;
}
function addPageBtn(pageId, showText) {
    if (showText == "1") {
        let b = document.createElement("button");
        b.className = "btn btn-link btn-sm";
        b.id = "pagebtn";
        b.type = "button";
        b.innerHTML = "<h5><svg xmlns='http://www.w3.org/2000/svg' style='width:1.5rem;height:1.5rem;' fill='currentColor' class='bi bi-chevron-bar-right'viewBox='0 0 16 16'><path fill-rule='evenodd' d='M4.146 3.646a.5.5 0 0 0 0 .708L7.793 8l-3.647 3.646a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708 0zM11.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5z' /></svg></h5>";
        document.getElementById("pages").parentNode.appendChild(b);
        b.addEventListener("click", function () {
            requestPagePlus();
        });//Connect the Button
    }
    let a = document.createElement("a");
    a.href = "#" + pageId;
    a.innerText = showText;
    document.getElementById("pages").appendChild(a);
}
async function addIframe(href, left, top) {
    let create = await browser.windows.create({
        url: href,
        type: 'popup',
        width: parseInt(window.outerWidth * 0.5),
        height: parseInt(window.outerHeight * 0.5),
        top: top,
        left: left
    });
    return create;
}
let tabId;
function handleRemove(value) {
    const tabid = tabId;
    if (value != tabid) {
        browser.windows.getCurrent().then(function (w) {
            try {
                browser.windows.get(tabid, { populate: true }).then((e) => {
                    let tab = e.tabs;
                    for (let i = 0; i < tab.length; i++) {
                        browser.tabs.move(tab[i].id, { index: -1, windowId: w.id });
                    }
                });
            }
            catch { }
        });
        browser.windows.onFocusChanged.removeListener(handleRemove);
    }
}
document.ondragend = function (e) {
    if (e.target.parentNode.className == "result_title" && e.target.tagName.toLowerCase() == "a") {
        if (e.pageX >= 0 && e.pageY >= 0) {
            addIframe(e.target.href, e.x, e.y).then(function (Tab) {
                tabId = Tab.id;
                browser.windows.onFocusChanged.addListener(handleRemove);
            });
        }
    }
}
async function getFavicon(url, img) {
    img.src = url + "favicon.ico";
    img.style.width = "1.5rem";
    img.style.height = "1.5rem";
    img.className = "favicon_img";
}
SearchSug();