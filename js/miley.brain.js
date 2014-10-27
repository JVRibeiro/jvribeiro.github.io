// **************************
//  ** miley.brain.js
// ***************************
// ** Versão/Version: 1.0.8
// ** Autor/Author: Victor Ribeiro (@JVRibeiiro)
// ** Licença: MIT
// ** Baseado no projeto de inteligência artificial E.L.I.Z.A.
// ***************************

// * Informações da I.A.
var AIname = "Miley";   // * Nome da I.A.
var AInick = "Mi";      // * Apelido da I.A.
var version = "1.0.9";  // * Versão da I.A.
//

// * Abreviação de window e document
var w = window;
var d = document;
//

// * Dados na localStorage
var nome = window.localStorage.getItem('nome');
var gen = window.localStorage.getItem('genero');
var dialog = window.localStorage.getItem('histórico');
//

// * Identificador de browser
var bname = navigator.userAgent;
if (bname.match("Chrome")) {bname = "Google Chrome"};
if (bname.match("MSIE")) {bname = "Internet Explorer"};
if (bname.match("IEMobile")) {bname = "Internet Explorer para smartphone"};
if (bname.match("Firefox")) {bname = "Mozilla Firefox"};
//

// * Identificadores de Data e Hora
var agora = new Date();
var hora = agora.getHours(), min = agora.getMinutes(), seg = agora.getSeconds(), ano = agora.getFullYear(), dia = agora.getDate();
var mes = new Array();
    mes[0] = "Janeiro";
    mes[1] = "Fevereiro";
    mes[2] = "Março";
    mes[3] = "Abril";
    mes[4] = "Maio";
    mes[5] = "Junho";
    mes[6] = "Julho";
    mes[7] = "Agosto";
    mes[8] = "Setembro";
    mes[9] = "Outubro";
    mes[10] = "Novembro";
    mes[11] = "Dezembro";
var sem = new Array();
    sem[0] = "Domingo";
    sem[1] = "Segunda-feira";
    sem[2] = "Terça-feira";
    sem[3] = "Quarta-feira";
    sem[4] = "Quinta-feira";
    sem[5] = "Sexta-feira";
    sem[6] = "Sábado";
var omes = mes[agora.getMonth()];
var osem = sem[agora.getDay()];
//

// * Idade da I.A.
var idade = 2014 - ano + " anos";
//

// * Delay de 2s na resposta (sincroniza com a resposta falada)
function mostra() {d.getElementById('resposta').style.opacity = '1';};
function espera() {d.getElementById('resposta').style.opacity = '0'; setTimeout("mostra()", 2000);};
//

// * Algoritmo de renomeação caso estejam vazio os campos de informação do usuário
if (gen == null || gen == undefined)  {gen = "usuário";};
if (nome == null || nome == undefined){nome = "anônimo";};
if (dialog == null)                   {dialog = "";};
if (nome == "" && gen == "senhor")    {nome = "anônimo";};
if (nome == "" && gen == "senhorita") {nome = "anônima";};
if (nome == "" && gen == "você")      {gen = "pessoa";};
if (nome.length > 0 && gen == "você") {gen = "";};
//

// * Algoritmo de saudações dependentes do horário
if(hora < 5.59) {saud = "Boa madrugada";} else if(hora < 8) {saud = "Bom dia";} else if(hora < 11.59) {saud = "Bom dia";} else if(hora < 18) {saud = "Boa tarde";} else {saud = "Boa noite";}
//

// * Relógio digital
function clock() {
now = new Date(); h = now.getHours(); m = now.getMinutes(); s = now.getSeconds();
strSeg = new String (s); if (strSeg.length == 1) {s = "0"+s};
strMin = new String (m); if (strMin.length == 1) {m = "0"+m};
strHor = new String (h); if (strHor.length == 1) {h = "0"+h};
  d.getElementById('hor').value = h;
  d.getElementById('min').value = m;
  d.getElementById('seg').value = s;
     setTimeout("clock()",1000);
};
//

// * Script de Síntese de voz (TTS) - Uma cortesia da VoiceRSS.org
// * *************************************************************
function voz() {
var keyUm = "8f0b4a57a6ac49a683224f7bb8d795e9";
var keyDois = "cd58d3ed06b54f7fa19979932b4ddd40";
var formato = "8khz_16bit_mono";
var apikey = keyUm;
var idioma = "pt-br";
var texto = d.getElementById("resposta").value;
var link = d.getElementById("API").value;
var codec = "mp3";
d.getElementById("voz").src = link+"?key="+apikey+"&hl="+idioma+"&src="+texto+"&c="+codec+"&f="+formato;};
//

// * Algoritmo de conversação
// * ***************************************
usuario = "Aqui aparecerá sua fala. \nPara ajuda, diga \'O que posso dizer?\'";
sistema = "Olá, "+gen+" "+nome+".";
historico = dialog;

function rotina(nome) {
var nome = window.localStorage.getItem('nome');
if (nome == null || nome == undefined){nome = "anônimo";};
if (usuario == null || usuario == undefined || usuario == ""){usuario = "(Não houve fala alguma).";};
usuario = d.miley.Texto.value;
historico = historico + nome + " disse em "+dia+" de "+omes+" de "+ano+" às "+h+":"+m+": \n" + usuario +  '\r' + "\n\n";
padroesMiley()
historico = historico  +  '\r' + "\n";
atualizarTela();
}

function padroesMiley() {
for (i=0; i < brain.length; i++) { // Inicia um loop que executa apenas uma vez cada elemento da array brain.
exReg = new RegExp (brain[i][0], "i"); // Usando o contador [i] do loop, coloca um padrão da array no mecanismo de expressão regular na variável "exReg".
if (exReg.test(usuario)) { // testa a entrada do usuário contra o "exReg" e se ele corresponder executa o próximo bloco de instruções - se não houver correspondência o loop vai continuar a carregar o próximo valor.
tamanho = brain[i].length - 1; // cria uma variável "len" e a deixa igual ao número de respostas possíveis
index = Math.ceil(tamanho * Math.random());
reply = brain[i][index];
sistema = usuario.replace(exReg, reply);
sistema = capitalizar(sistema);
historico = historico + "Eu ("+AIname+") disse: \n" +sistema+  "\r" + "\n\n\n";
break;
  }
 }
}

function mileyIni() {atualizarTela()}

function atualizarTela() {
d.miley.dialogo.value = historico;
d.miley.Resposta.value = sistema;
d.miley.Pergunta.value = usuario;
d.miley.Texto.value = "";
}
//

// * Função que capitaliza (deixa maiúscula) a primeira letra do campo #resposta
function capitalizar(mileyField) {mileyField = mileyField.substr(0, 1).toUpperCase() + mileyField.substr(1);
return mileyField
loop;
}
//

// * Função de abrir ajuda
// * ****************************************************************
function abrirAjuda() {
var ajuda = new Array (new Array ("Abrir ajuda"));
for (h=0; h < ajuda.length; h++) {
d.miley.Texto.value = ajuda[h];
rotina()
 }
};
function abrir(URL) {w.open(URL,'janela','width=550, height=640, top=25, left=400, toolbar=no, fullscreen=yes');};
//

// * Função de Pesquisa de imagens
// * ****************************************************************
function pImagens() {
d.getElementById('q').style.display = "block";
d.getElementById('b-im-tr').innerHTML = "Fechar Miley imagens";
d.getElementById('b-im-tr').setAttribute("onclick","pImagensClose(); removeResults();")
};

function pImagensClose() {
d.getElementById('q').style.display = "none";
d.getElementById('b-im-tr').innerHTML = "Pesquisa de imagens";
d.getElementById('b-im-tr').setAttribute("onclick","pImagens()")
};
//

// * *****************************************
// * * Menu de contexto com botão direto do mouse.
// * * Script por: Henrique Barcelos.
// * * link: http://forum.imasters.com.br/topic/374916-menu-de-contexto-personalizado-boto-direito-do-mouse/
// * *****************************************
function click(z){d.getElementById("right_btn").innerHTML="";var t=d.getElementById("context_menu");var n=z||event;if(n.button==2||n.button==3){mostrar(n);t.onmouseout=function(z){var t=z||event;var n=t.relatedTarget||t.toElement;if(n.nodeName!="LI"){}}}if(n.button==0||n.button==1){esconder()}}function mostrar(z){var t=d.getElementById("context_menu");t.style.display="block";t.style.top=z.clientY+0+"px";t.style.left=z.clientX+2+"px"}function esconder(){setTimeout(function(){var z=d.getElementById("context_menu");z.style.display="none"},300)}d.onmousedown=click;d.oncontextmenu=function(){return false};
//
