var isEnable = false;

var getResource = function(resourceName) {
    return chrome.extension.getURL(resourceName) + '?' + new Date().getTime();
}

var Teitaku = function(x, y) {
  this.img = $('<img />', {
    'class': 'teitaku'
  });
  this.width = 200;
  this.height = 200;
  this.x = x - this.width / 2;
  this.y = y - this.height + 30;

  this.img.attr('src', getResource('image/teitaku_in_once.gif'));
  this.img.css('top', this.y + 'px');
  this.img.css('left', this.x + 'px');
  $('body').append(this.img);
}

Teitaku.prototype.show = function() {
  this.img.css('display', 'block');
  var self = this;
  setInterval(function() {
    self.img.attr('src', getResource('image/teitaku_fix.gif'));
  }, 2000);
}

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        console.log(request.enable);
        isEnable = request.enable == '1' ? true : false;
        sendResponse({});
    }
);


$('body').click(function(event) {
    if (!isEnable) {
        console.log('無効です')
        return;
    }

    var x = event.clientX;
    var y = event.clientY + $('body').scrollTop();
    var teitaku = new Teitaku(x, y);
    teitaku.show();
});
