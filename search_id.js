var ext_id;
try {
    ext_id = browser.runtime.getURL("");
}
catch (e) {
    ext_id = chrome.runtime.getURL("");
}
document.getElementById('id_search').innerText = ext_id;