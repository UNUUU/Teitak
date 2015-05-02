$(function() {
  var chromeBackground = chrome.extension.getBackgroundPage();
  $('input[name="enable"]:radio').change(function() {
    var enable = parseInt($(this).val(), 10);
    chromeBackground.saveSetting(enable);
  });

  var enable = chromeBackground.getSetting();
  if (!enable) {
    chromeBackground.saveSetting('1');
    enable = chromeBackground.getSetting();
  }
  $('input[name="enable"]').val([enable])
});