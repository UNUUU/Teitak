var saveSetting = function(enable) {
    localStorage.setItem('teitaku_enable', enable);

    sendSetting(getSetting());
}

var getSetting = function() {
    return localStorage.getItem('teitaku_enable');
}

var sendSetting = function(enable) {
    console.log('sendSetting:' + enable);
    chrome.tabs.getSelected(null, function(tab) {
                                chrome.tabs.sendRequest(tab.id, {enable: enable}, function(response) {
                                                        });
                            });
}

sendSetting(getSetting());
