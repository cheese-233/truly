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
    if (!isDelete) { document.getElementById("search-div").outerHTML += "<div class='loadingThree'><span></span><span></span><span></span><span></span><span></span></div>"; }
    else { document.getElementsByClassName("loadingThree")[document.getElementsByClassName("loadingThree").length - 1].outerHTML = ""; }
}