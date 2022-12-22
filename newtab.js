(chrome || browser).storage.local.get(function (result) {
    isNewTabOn = result['isNewTab'];
    if (isNewTabOn) {
        (chrome || browser).runtime.sendMessage({ Sresult: "" });
    }
});