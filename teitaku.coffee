class Utility
    @isTouchEnable: false
    @ResourceType: {ONCE: 0, FIX: 1}
    @get: (resourceType) ->
        image = ''
        switch resourceType
            when @ResourceType.ONCE
                image = 'image/teitaku_in_once.gif'
            when @ResourceType.FIX
                image = 'image/teitaku_fix.gif'

        resourceUrl = chrome.extension.getURL(image) + '?' + new Date().getTime()
        resourceUrl

class Teitaku
    constructor: (x, y) ->
        @img = $('<img />').attr 'class', 'teitaku'
        @width = 200
        @height = 200
        @x = x - @width / 2
        @y = y - @height + 30
        @img.attr 'src', Utility.get(Utility.ResourceType.ONCE)
        @img.css 'top', @y + 'px'
        @img.css 'left', @x + 'px'
        $('body').append @img

    show: ->
        @img.css 'display', 'block'
        setTimeout =>
            @img.attr 'src', Utility.get(Utility.ResourceType.FIX)
        , 2000
        return

chrome.extension.onRequest.addListener(
    (request, sender, sendResponse) ->
        Utility.isTouchEnable = request.enable
        sendResponse({})
        return
)

chrome.runtime.sendMessage({}, (response) ->
    Utility.isTouchEnable = response.enable
    return
)

$('*').click (event) ->
    if !Utility.isTouchEnable
        return

    event.preventDefault()
    event.stopPropagation()

    x = event.clientX
    y = event.clientY + $('body').scrollTop()
    teitaku = new Teitaku x, y
    teitaku.show()
    return
