var getResource = function(resourceName) {
    return chrome.extension.getURL(resourceName) + '?' + new Date().getTime();
}

var ENABLE_BUTTON_IMAGE = getResource('image/switch_on.png');
var DISABLE_BUTTON_IMAGE = getResource('image/switch_off.png');

var getIsEnableFromImage = function(src) {
    if (ENABLE_BUTTON_IMAGE == src) {
        return true;
    }
    return false;
}

var changeButton = function() {
    var isEnable = getIsEnableFromImage($('.toggle_button').attr('src'));
    setButton(!isEnable);
}

var setButton = function(isEnable) {
    if (isEnable) {
        $('.toggle_button').attr('src', ENABLE_BUTTON_IMAGE);
    } else {
        $('.toggle_button').attr('src', DISABLE_BUTTON_IMAGE);
    }
}

$(function() {
  var chromeBackground = chrome.extension.getBackgroundPage();
  $('.toggle_button').click(function(event) {
    changeButton();

    var isEnable = getIsEnableFromImage($('.toggle_button').attr('src'));
    chromeBackground.saveSetting(isEnable);
  });

  var isEnable = chromeBackground.getSetting();
  if (isEnable === null) {
    chromeBackground.saveSetting(true);
    isEnable = chromeBackground.getSetting();
  }
  setButton(isEnable);
});