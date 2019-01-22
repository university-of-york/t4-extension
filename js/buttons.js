(function () {

  // get random name for iframe
  var id = setTimeout(function(){});
  var iframeName = 'save-frame-'+id;

  // Find all the button wrappers (multiple IDs? Nice one, T4)
  var buttonWraps = document.querySelectorAll('#tab-button-dd-menu-wrap-top');
  if (buttonWraps.length === 0) return;

  var contentDiv = document.getElementById('content');
  var contentHeader = content.querySelector('h1');

  // Create a context for form target
  var iframe = document.createElement('iframe');
  iframe.name = iframeName;
  iframe.style.height = '0';
  iframe.style.width = '0';
  iframe.style.borderWidth = '0';
  document.body.appendChild(iframe);

  // Listen for the event - not being fired from parent
  // window.addEventListener('frameLoaded', function (e) {
  //   console.log('iFrame is ready!');
  // }, false);

  iframe.onload = function() {
    // Add message from iframe
    var iframeBanner = iframe.contentDocument.getElementById('pres-message');
    if (iframeBanner) {
      contentDiv.insertBefore(iframeBanner.cloneNode(true), contentHeader.nextSibling);
    }
  };

  Array.prototype.forEach.call(buttonWraps, function(wrap, i){

    var sampleDiv = wrap.children[0];
    var divClone = sampleDiv.cloneNode(true);
    var saveButton = divClone.querySelectorAll('button');

    if (saveButton.length === 0) return;

    var buttonText = saveButton[0].textContent.replace('Update', 'Save');
    saveButton[0].textContent = buttonText;
    saveButton[0].addEventListener('click', function(e) {
      // Remove old banner
      var oldBanner = document.getElementById('pres-message');
      if (oldBanner) {
        oldBanner.parentNode.removeChild(oldBanner);
      }
      // Set form action to open in iframe
      var parentForm = saveButton[0].closest('form');
      parentForm.setAttribute('target', iframeName);
      return true;
    });

    wrap.insertBefore(divClone, wrap.firstChild);

  });

})();