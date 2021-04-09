var link;

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // dark mode
  setDark();
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
   e.matches ? setDark() : setLight();
});

function setLight() {
  link.parentNode.removeChild(link);
}

function setDark() {
  link = document.createElement('link');
  link.href = '/styles/styles-dark.css';
  link.rel = 'stylesheet';
  link.id = 'dark-css'

  document.getElementsByTagName('head')[0].appendChild(link);
}
