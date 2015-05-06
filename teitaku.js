(function() {
  var Teitaku, Utility;

  Utility = (function() {
    function Utility() {}

    Utility.isTouchEnable = false;

    Utility.ResourceType = {
      ONCE: 0,
      FIX: 1
    };

    Utility.get = function(resourceType) {
      var image, resourceUrl;
      image = '';
      switch (resourceType) {
        case this.ResourceType.ONCE:
          image = 'image/teitaku_in_once.gif';
          break;
        case this.ResourceType.FIX:
          image = 'image/teitaku_fix.gif';
      }
      resourceUrl = chrome.extension.getURL(image) + '?' + new Date().getTime();
      return resourceUrl;
    };

    return Utility;

  })();

  Teitaku = (function() {
    function Teitaku(x, y) {
      this.img = $('<img />').attr('class', 'teitaku');
      this.width = 200;
      this.height = 200;
      this.x = x - this.width / 2;
      this.y = y - this.height + 30;
      this.img.attr('src', Utility.get(Utility.ResourceType.ONCE));
      this.img.css('top', this.y + 'px');
      this.img.css('left', this.x + 'px');
      $('body').append(this.img);
    }

    Teitaku.prototype.show = function() {
      this.img.css('display', 'block');
      setTimeout((function(_this) {
        return function() {
          return _this.img.attr('src', Utility.get(Utility.ResourceType.FIX));
        };
      })(this), 2000);
    };

    return Teitaku;

  })();

  chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    Utility.isTouchEnable = request.enable;
    sendResponse({});
  });

  chrome.runtime.sendMessage({}, function(response) {
    Utility.isTouchEnable = response.enable;
  });

  $('*').click(function(event) {
    var teitaku, x, y;
    if (!Utility.isTouchEnable) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    x = event.clientX;
    y = event.clientY + $('body').scrollTop();
    teitaku = new Teitaku(x, y);
    teitaku.show();
  });

}).call(this);
