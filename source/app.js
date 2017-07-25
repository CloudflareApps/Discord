(function () {
  'use strict'

  if (!window.addEventListener) return // Check for IE9+

  var options = INSTALL_OPTIONS
  var element
  var vendorIframe

  // updateElement runs every time the options are updated.
  // Most of your code will end up inside this function.
  function updateElement () {
    element = INSTALL.createElement(options.location, element)
    // Set the app attribute to your app's dash-delimited alias.
    element.setAttribute('app', 'discord')
    element.setAttribute('data-horizontal-alignment', options.horizontalAlignment)

    vendorIframe = document.createElement('iframe')
    var id = options.id === '' && INSTALL_ID === 'preview' ? '339515332702240769' : options.id

    if (!id) return

    vendorIframe.src = 'https://discordapp.com/widget?id=' + id + '&theme=' + options.theme
    vendorIframe.width = 350
    vendorIframe.height = 500
    vendorIframe.setAttribute('allowtransparency', '')
    vendorIframe.frameBorder = '0'

    element.appendChild(vendorIframe)
  }

  // This code ensures that the app doesn't run before the page is loaded.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateElement)
  } else {
    updateElement()
  }

  // INSTALL_SCOPE is an object that is used to handle option changes without refreshing the page.
  window.INSTALL_SCOPE = {
    setOptionsReset: function setOptionsReset (nextOptions) {
      options = nextOptions

      updateElement()
    },
    updateAlignment: function updateAlignment (nextOptions) {
      options = nextOptions

      element.setAttribute('data-horizontal-alignment', options.horizontalAlignment)
    }
  }
}())
