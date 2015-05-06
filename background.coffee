@saveSetting = (isEnable) ->
    enable = 'true'
    if isEnable
        enable = 'true'
    else
        enable = 'false'
    localStorage.setItem 'teitaku_enable', enable
    sendSetting getSetting()
    return

@getSetting = () ->
    enable = localStorage.getItem 'teitaku_enable'
    isEnable = false
    if enable == 'true'
        isEnable = true
    else
        isEnable = false
    isEnable

sendSetting = (isEnable) ->
    chrome.windows.getAll populate: true, (windows) ->
        for key of windows
            tabs = windows[key].tabs
            for t of tabs
                chrome.tabs.sendRequest tabs[t].id, enable: isEnable, (response) ->
        return

chrome.runtime.onMessage.addListener((request, sender, sendResponse) ->
    sendResponse enable: getSetting()
    return
)

sendSetting getSetting()
