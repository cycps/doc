document.addEventListener('DOMContentLoaded', hijack, false);

function hijack() {
  var icon = document.getElementsByClassName("icon icon-home");
  icon[0].innerHTML =  '<img src="/img/CypressTitleLogoWeb.png" width="10">';
}
