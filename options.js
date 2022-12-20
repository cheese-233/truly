function saveOptions(e) {
    var b = document.getElementById("baidu").checked;
    var g = document.getElementById("google").checked;
    var bi = document.getElementById("bing").checked;
    var f = document.getElementById("fsou").checked;

}


function restoreOptions() {
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);