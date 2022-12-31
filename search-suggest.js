function getDatas(keyword, $input, callback, options) {
    let timer;
    if (options.searchingTip) {
        timer = setTimeout(function () {
            $input.parent().find('ul').html('<div style="padding:10px 5px 5px">' + options.searchingTip + '</div>').show();
            ProcessAdjustDropMenuPos($input, $input.parent().find('ul'), options);
        }, 600);
    }
    let dataList = { value: [] };
    let req = new XMLHttpRequest();
    req.onprogress = function () {
        timer && clearTimeout(timer);
    }
    req.open("GET", "https://www.baidu.com/sugrec?prod=pc&wd=" + keyword, true);
    req.send();
    req.onreadystatechange = function () {
        if (req.readyState == XMLHttpRequest.DONE) {
            let re = JSON.parse(this.responseText).g;
            if (re != null) {
                for (let r of re) {
                    dataList.value.push({
                        word: r.q
                    });
                }
            }
            options.data = dataList;
            $input.trigger('onDataRequestSuccess', dataList);
            callback($input, dataList, options);
        }
    }
}
function SearchSug(El = "#q") {
    return $(El).bsSuggest({
        url: "https://www.baidu.com/sugrec?prod=pc&wd=",
        getDataMethod: "url",
        inputWarnColor: '',
        indexId: 1,
        allowNoKeyword: false,
        listStyle: {
            'padding-top': 0,
            'max-width': '800px',
            'overflow': 'auto',
            'width': 'auto',
            'height': "auto",
            'cursor': 'pointer'
        },
        listHoverStyle: 'color: var(--link-color);',
        fnGetData: getDatas,
    });
}