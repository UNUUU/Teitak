(function() {
  var Utility;

  Utility = (function() {
    function Utility() {}

    Utility.ResourceType = {
      SWITCH_ON: 0,
      SWITCH_OFF: 1
    };

    Utility.get = function(resourceType) {
      var image, resourceUrl;
      image = '';
      switch (resourceType) {
        case this.ResourceType.SWITCH_ON:
          image = 'image/switch_on.png';
          break;
        case this.ResourceType.SWITCH_OFF:
          image = 'image/switch_off.png';
      }
      resourceUrl = chrome.extension.getURL(image);
      return resourceUrl;
    };

    Utility.getIsTouchEnableFromImage = function(image) {
      if (this.get(this.ResourceType.SWITCH_ON) === image) {
        return true;
      }
      return false;
    };

    Utility.changeButton = function() {
      var isTouchEnable;
      isTouchEnable = this.getIsTouchEnableFromImage($('.toggle_button').attr('src'));
      return Utility.setButton(!isTouchEnable);
    };

    Utility.setButton = function(isTouchEnable) {
      var b;
      b = $('.toggle_button');
      if (isTouchEnable) {
        return b.attr('src', this.get(this.ResourceType.SWITCH_ON));
      } else {
        return b.attr('src', this.get(this.ResourceType.SWITCH_OFF));
      }
    };

    return Utility;

  })();

  $(function() {
    var chromeBackground, isTouchEnable;
    chromeBackground = chrome.extension.getBackgroundPage();
    $('.toggle_button').click(function(event) {
      Utility.changeButton();
      return chromeBackground.saveSetting(Utility.getIsTouchEnableFromImage($('.toggle_button').attr('src')));
    });
    isTouchEnable = chromeBackground.getSetting();
    if (isTouchEnable === null) {
      chromeBackground.saveSetting(true);
      isTouchEnable = chromeBackground.getSetting();
    }
    Utility.setButton(isTouchEnable);
  });

}).call(this);
