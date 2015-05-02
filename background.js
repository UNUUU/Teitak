var saveSetting = function(isEnable) {
    var enable = 0;
    if (isEnable) {
        enable = 1;
    } else {
        enable = 0;
    }
    localStorage.setItem('teitaku_enable', enable);

    sendSetting(getSetting());
}

var getSetting = function() {
    var enable = localStorage.getItem('teitaku_enable');
    var isEnable = false;
    if (enable == 1) {
        isEnable = true;
    } else {
        isEnable = false;
    }
    return isEnable;
}

var sendSetting = function(isEnable) {
    chrome.windows.getAll({populate: true}, function(windows) {
        for (var w in windows) {
            var tabs = windows[w].tabs;
            for (var t in tabs) {
                chrome.tabs.sendRequest(tabs[t].id, {enable: isEnable}, function(response) {
                                        });
            }
        }
    });
}

chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
    sendResponse({enable: getSetting()});
});

sendSetting(getSetting());
