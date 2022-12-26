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
window.addEventListener('scroll', () => {
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
SearchSug();