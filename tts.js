// Sistema de TTS da VoiceRSS.org
var d = document;
    function STT() {
var format = "8khz_16bit_mono";
var apikey = "8f0b4a57a6ac49a683224f7bb8d795e9"; // 8f0b4a57a6ac49a683224f7bb8d795e9 - cd58d3ed06b54f7fa19979932b4ddd40
var idioma = d.getElementById("miley_idioma").value;
var texto = d.getElementById("resposta").value;
var link = d.getElementById("API").value;
var codec = "";
    if (idioma != "" && texto != "") {if (d.getElementById("voz") != null) {
    if (d.getElementById("voz").canPlayType('audio/mpeg') != "")
    codec = "mp3";
    else
    codec = "ogg";
d.getElementById("voz").src = link + "?key=" +apikey+ "&hl=" +idioma+ "&src=" +texto+ "&c=" +codec+ "&f=" +format;}
 }
};
