function saveOptions(e) {
    var b = document.getElementById("baidu").value;
    var g = document.getElementById("google").value;
    var bi = document.getElementById("bing").value;
    var f = document.getElementById("fsou").value;
}

function restoreOptions() {
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);