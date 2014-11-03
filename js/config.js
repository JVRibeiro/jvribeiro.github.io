var Unome = d.getElementById('userName');
var gUnome = w.localStorage.getItem('nome');
var Ugenero = d.getElementById('gen');
function autocom() {d.getElementById("userName").value = gUnome;};
function salvarDados() {
  w.localStorage.setItem('nome',Unome.value);
  w.localStorage.setItem('genero',Ugenero.value);
  setTimeout(d.location.href = "", 2000);
}
function apagarDados() {
confirmar = confirm("Seus dados não poderão ser recuperados.\n\n Você tem certeza que deseja apagar seus dados?");
  if (confirmar == true) {
    w.localStorage.clear();
    alert("Seus dados foram apagados. Aperte Ok para atualizar.");
    setTimeout(d.location.href = "", 2000);
} else {return false;}
};
dialog = d.getElementById('dialogo');
function getHist() {
  w.localStorage.getItem('dialog');
}
function saveHist() {
  w.localStorage.setItem('histórico',dialog.value);
}
function clearHist() {
  confirmar = confirm("Você tem certeza que deseja apagar o histórico de conversa?");
    if (confirmar == true) {
  w.localStorage.removeItem('histórico');
  setTimeout(d.location.href = "", 2000);
} else {return false;}
};
function clearNome() {
  confirmar = confirm("Você tem certeza que deseja apagar seu nome?");
    if (confirmar == true) {
  w.localStorage.removeItem('nome');
  setTimeout(d.location.href = "", 2000);
} else {return false;}
};
function corPadrao() {
  confirmar = confirm("Você deseja mesmo voltar à cor Lilás?");
    if (confirmar == true) {
  w.localStorage.removeItem('corIA');
  d.location.reload();
} else {return false;}
};

function config() {d.getElementById('config').style.display = 'block';};
function closeConfig() {d.getElementById('config').style.display = 'none';};
function config_voice() {d.getElementById('config').style.display = 'block';};
function closeConfig_voice() {d.getElementById('config').style.display = 'none';};

if (window.location.protocol == "http:") {
window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
}

// * Cores da Miley
function mileyCor() {
var cor = d.getElementById('cor-hex');
window.localStorage.setItem('corIA',cor.value);

d.getElementById('csaved').innerHTML = "Cor salva. <a onclick=\'d.location.reload()\'>Atualizar</a> ?"
}

function mileyCorGet() {
var getCor = window.localStorage.getItem('corIA');
var corField = d.getElementById('cor-hex').value;
if(getCor == null || getCor == undefined || getCor == "") {
d.getElementById('cor-hex').value = "#E351FF";
}
else {
d.getElementById('cor-hex').value = getCor;
};

var Ex = d.getElementById('Ex');
var In = d.getElementById('In');
var aLink = d.getElementById('a-link');
var ccLink = d.getElementById('cc-link');
var twtLink = d.getElementById('twt-link');
var fgtNmLink = d.getElementById('fgtnm-link');
var ptClLink = d.getElementById('ptcl-link');
var Resposta = d.getElementById('resposta');
var navBar = d.getElementById('navbar');
var ladoDois = d.getElementById('lado2');
var vers = d.getElementById('version');

Ex.style.borderTop = '5px solid '+getCor;
Ex.style.borderBottom = '5px solid '+getCor;
Ex.style.borderRight = '5px solid transparent';
Ex.style.borderLeft = '5px solid transparent';

In.style.borderTop = '2px solid '+getCor;
In.style.borderBottom = '2px solid '+getCor;
In.style.borderRight = '2px solid #fff';
In.style.borderLeft = '2px solid #fff';

Resposta.style.color = getCor;

aLink.style.color = getCor;
ccLink.style.color = getCor;
twtLink.style.color = getCor;
fgtNmLink.style.color = getCor;
ptClLink.style.color = getCor;
ladoDois.style.borderLeft = '2px solid '+getCor;
vers.style.color = getCor;

navBar.style.background = getCor;
}
//
