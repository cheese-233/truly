function getDatas(keyword, $input, callback, options) {
    var timer;
    if (options.searchingTip) {
        timer = setTimeout(function () {
            $input.parent().find('ul').html('<div style="padding:10px 5px 5px">' + options.searchingTip + '</div>').show();
            ProcessAdjustDropMenuPos($input, $input.parent().find('ul'), options);
        }, 600);
    }
    dataList = { value: [] };
    var req = new XMLHttpRequest();
    req.onprogress = function () {
        timer && clearTimeout(timer);
    }
    req.open("GET", "https://www.baidu.com/sugrec?prod=pc&wd=" + keyword, true);
    req.send();
    req.onreadystatechange = function () {
        if (req.readyState == XMLHttpRequest.DONE) {
            var re = JSON.parse(this.responseText).g;
            if (re != null) {
                for (var r of re) {
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
            'transition': '0.3s',
            '-webkit-transition': '0.3s',
            '-moz-transition': '0.3s',
            '-o-transition': '0.3s'
        },
        getDataMethod: "url",
        fnGetData: getDatas,
    });
}