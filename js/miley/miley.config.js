var d = document;
var w = window;

var Unome = d.getElementById('userName');
var Ugenero = d.getElementById('gen');
﻿var Uidioma = d.getElementById('miley_idioma');
﻿var Usrate = d.getElementById('miley_s_rate');
﻿var Ucodec = d.getElementById('miley_s_codec');
﻿var Uformato = d.getElementById('miley_s_format');
﻿var Usapikey = d.getElementById('miley_s_key');

var gUnome = w.localStorage.getItem('nome');
var gUgenero = w.localStorage.getItem('genero');
var gUidioma = w.localStorage.getItem('idioma');
var gUsrate = w.localStorage.getItem('srate');
var gUcodec = w.localStorage.getItem('codec');
var gUformato = w.localStorage.getItem('formato');
var gUsapikey = w.localStorage.getItem('sapikey');

function autocom() { // Autocompletar opções configuradas
  d.getElementById("userName").value = gUnome;
  d.getElementById("Ugenero").innerHTML = gUgenero;
  d.getElementById("Uidioma").innerHTML = gUidioma;
  d.getElementById("Usrate").innerHTML = gUsrate;
  d.getElementById("Ucodec").innerHTML = gUcodec;
  d.getElementById("Uformato").innerHTML = gUformato;
  d.getElementById("Usapikey").innerHTML = gUsapikey;

  if(gUgenero == "senhor") {d.getElementById("senhor").selected = "true";}
  if(gUgenero == "senhorita") {d.getElementById("senhorita").selected = "true";}
  if(gUgenero == "você") {d.getElementById("você").selected = "true";}

  if(gUidioma == "pt-br") {d.getElementById("pt-br").selected = "true";}
  if(gUidioma == "pt-pt") {d.getElementById("pt-pt").selected = "true";}

  if(gUsrate == "0") {d.getElementById("0").selected = "true";}
  if(gUsrate == "-2") {d.getElementById("-2").selected = "true";}
  if(gUsrate == "3") {d.getElementById("3").selected = "true";}

  if(gUcodec == "mp3") {d.getElementById("mp3").selected = "true";}
  if(gUcodec == "wav") {d.getElementById("wav").selected = "true";}
  if(gUcodec == "aac") {d.getElementById("aac").selected = "true";}
  if(gUcodec == "ogg") {d.getElementById("ogg").selected = "true";}
  if(gUcodec == "caf") {d.getElementById("caf").selected = "true";}

  if(gUformato == "8khz_8bit_mono") {d.getElementById("8khz_8bit_mono").selected = "true";}
  if(gUformato == "8khz_8bit_stereo") {d.getElementById("8khz_8bit_stereo").selected = "true";}
  if(gUformato == "16khz_16bit_mono") {d.getElementById("16khz_16bit_mono").selected = "true";}
  if(gUformato == "16khz_16bit_stereo") {d.getElementById("16khz_16bit_stereo").selected = "true";}
  if(gUformato == "48khz_16bit_mono") {d.getElementById("48khz_16bit_mono").selected = "true";}
  if(gUformato == "48khz_16bit_stereo") {d.getElementById("48khz_16bit_stereo").selected = "true";}

  if(gUsapikey == "8f0b4a57a6ac49a683224f7bb8d795e9") {d.getElementById("8f0b4a57a6ac49a683224f7bb8d795e9").selected = "true";}
  if(gUsapikey == "cd58d3ed06b54f7fa19979932b4ddd40") {d.getElementById("cd58d3ed06b54f7fa19979932b4ddd40").selected = "true";}
  };
//

function salvarDados() {
  w.localStorage.setItem('nome',Unome.value);
  w.localStorage.setItem('genero',Ugenero.value);
  w.localStorage.setItem('idioma',Uidioma.value);//
  w.localStorage.setItem('srate',Usrate.value);
  w.localStorage.setItem('codec',Ucodec.value);
  w.localStorage.setItem('formato',Uformato.value);
  w.localStorage.setItem('sapikey',Usapikey.value);
  d.location.reload();
}

function apagarDados() {
confirmar = confirm("Seus dados não poderão ser recuperados.\n\n Você tem certeza que deseja apagar seus dados?");
  if (confirmar == true) {
    w.localStorage.clear();
    alert("Seus dados foram apagados. Aperte Ok para atualizar.");
    setTimeout(d.location.href = "", 2000);
} else {return false;}
};

function getHist() {
  var dialog = d.getElementById('dialogo');
  w.localStorage.getItem('dialog');
}

function saveHist() {
  var dialog = d.getElementById('dialogo');
  w.localStorage.setItem('histórico',dialog.value);
}

function clearHist() {
  confirmar = confirm("Você tem certeza que deseja apagar o histórico de conversa?");
    if (confirmar == true) {
  w.localStorage.removeItem('histórico');
  setTimeout(d.location.href = "", 2000);
} else {return false;}
}

function clearNome() {
  confirmar = confirm("Você tem certeza que deseja apagar seu nome?");
    if (confirmar == true) {
  w.localStorage.removeItem('nome');
  setTimeout(d.location.href = "", 2000);
} else {return false;}
};


function config() {d.getElementById('config').style.display = 'block';};
function closeConfig() {d.getElementById('config').style.display = 'none';};
function config_voice() {d.getElementById('config').style.display = 'block';};
function closeConfig_voice() {d.getElementById('config').style.display = 'none';};

if (window.location.protocol == "http:") {
window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
}

// * Calculadora manual
// * ****************************************************************
function expoente(n) {
var valor = prompt("Elevado a quanto?", "2");
result=Math.pow(n,valor);
return result;
}
