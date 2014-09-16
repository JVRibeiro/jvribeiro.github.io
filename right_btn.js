  var d = document;
function click(esc){
    d.getElementById("right_btn").innerHTML = "";
  var menu = d.getElementById("context_menu");
  var mouseEvent = esc || event;
if (mouseEvent.button == 2 || mouseEvent.button == 3) {
mostrar(mouseEvent);
menu.onmouseout = function(esc){
  var mouseEvent = esc || event;
  var element = mouseEvent.relatedTarget || mouseEvent.toElement;
if (element.nodeName != "LI") {

  }
 };
}
if (mouseEvent.button == 0 || mouseEvent.button == 1) {
esconder();
 }
}

    d.onmousedown = click;
    d.oncontextmenu = function() {
return false
};

function mostrar(esc) {
  var menu = d.getElementById("context_menu");
menu.style.display = "block";
menu.style.top = esc.clientY + 0 + "px";
menu.style.left = esc.clientX + 2 + "px";
}

function esconder() {
setTimeout(function() {
  var menu = d.getElementById("context_menu");
menu.style.display = "none";
 }, 300);
}
