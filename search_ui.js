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
    else if (elementInView(document.getElementById("search-div"), 2)) {
        document.getElementById("home_button").style = "font-size:1.6rem;";
    }
    else if (elementInView(document.getElementById("search-div"), 3)) {
        document.getElementById("home_button").style = "font-size:1.8rem;";
    }
    else if (elementInView(document.getElementById("search-div"), 5)) {
        document.getElementById("home_button").style = "font-size:2rem;";
    }
    else {
        document.getElementById("home_button").style = "font-size:2rem;";
    }

}
window.addEventListener('scroll', function () {
    handleScrollAnimation()
})
function LoadingAnimation(isDelete = false) {
    if (!isDelete) { document.getElementById("search-div").innerHTML += "<div class='loadingThree'><span class='spinner-grow spinner-grow-sm'></span><span class='spinner-grow spinner-grow-sm'></span><span class='spinner-grow spinner-grow-sm'></span><span class='spinner-grow spinner-grow-sm'></span><span class='spinner-grow spinner-grow-sm'></span></div>"; }
    else { document.getElementsByClassName("loadingThree")[document.getElementsByClassName("loadingThree").length - 1].outerHTML = ""; }
}
function DontHaveEngine() {
    document.getElementById("search-div").innerHTML += "<h3>还没有添加搜索引擎。请先在<a href='#' id='setting_a'>设置</a>中添加一个。</h3>";
    document.getElementById("setting_a").addEventListener("click", function () {
        try {
            browser.runtime.openOptionsPage();//for firefox
        } catch (err) {
            chrome.runtime.openOptionsPage();//for chrome
        }
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
SearchSug();