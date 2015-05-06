(function() {
  var sendSetting;

  this.saveSetting = function(isEnable) {
    var enable;
    enable = 'true';
    if (isEnable) {
      enable = 'true';
    } else {
      enable = 'false';
    }
    localStorage.setItem('teitaku_enable', enable);
    sendSetting(getSetting());
  };

  this.getSetting = function() {
    var enable, isEnable;
    enable = localStorage.getItem('teitaku_enable');
    isEnable = false;
    if (enable === 'true') {
      isEnable = true;
    } else {
      isEnable = false;
    }
    return isEnable;
  };

  sendSetting = function(isEnable) {
    return chrome.windows.getAll({
      populate: true
    }, function(windows) {
      var key, t, tabs;
      for (key in windows) {
        tabs = windows[key].tabs;
        for (t in tabs) {
          chrome.tabs.sendRequest(tabs[t].id, {
            enable: isEnable
          }, function(response) {});
        }
      }
    });
  };

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    sendResponse({
      enable: getSetting()
    });
  });

  sendSetting(getSetting());

}).call(this);
