class Utility
    @ResourceType:
        SWITCH_ON: 0,
        SWITCH_OFF: 1

    @get: (resourceType) ->
        image = ''
        switch resourceType
            when @ResourceType.SWITCH_ON
                image = 'image/switch_on.png'
            when @ResourceType.SWITCH_OFF
                image = 'image/switch_off.png'
        resourceUrl = chrome.extension.getURL(image)
        return resourceUrl

    @getIsTouchEnableFromImage: (image) ->
        if @get(@ResourceType.SWITCH_ON) == image
            return true
        return false

    @changeButton: () ->
        isTouchEnable = @getIsTouchEnableFromImage $('.toggle_button').attr 'src'
        Utility.setButton !isTouchEnable

    @setButton: (isTouchEnable) ->
        b = $('.toggle_button')
        if isTouchEnable
            b.attr 'src', @get(@ResourceType.SWITCH_ON)
        else
            b.attr 'src', @get(@ResourceType.SWITCH_OFF)

$(() ->
    chromeBackground = chrome.extension.getBackgroundPage()
    $('.toggle_button').click (event) ->
        Utility.changeButton()
        chromeBackground.saveSetting Utility.getIsTouchEnableFromImage $('.toggle_button').attr 'src'
    isTouchEnable = chromeBackground.getSetting()
    if isTouchEnable == null
        chromeBackground.saveSetting true
        isTouchEnable = chromeBackground.getSetting()
    Utility.setButton isTouchEnable
    return
)
