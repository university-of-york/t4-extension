(function () {

  // Add autocomplete to password input on login page
  let loginInput = document.getElementById('login-password');
  loginInput.setAttribute('autocomplete', 'current-password');

  // Add new favicon
  let link = document.querySelector("link[rel*='ICON']") || document.createElement('link');
  const icon = chrome.extension.getURL('img/t4-blue.ico');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = icon;
  document.getElementsByTagName('head')[0].appendChild(link);

})();