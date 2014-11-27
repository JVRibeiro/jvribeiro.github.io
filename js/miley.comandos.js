﻿//! annyang
//! version : 1.1.0
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://www.TalAter.com/annyang/
(function(a){"use strict";var b=this,c=b.SpeechRecognition||b.webkitSpeechRecognition||b.mozSpeechRecognition||b.msSpeechRecognition||b.oSpeechRecognition;if(!c)return b.annyang=null,a;var d,e,f=[],g={start:[],error:[],end:[],result:[],resultMatch:[],resultNoMatch:[],errorNetwork:[],errorPermissionBlocked:[],errorPermissionDenied:[]},h=0,i=!1,j="font-weight: bold; color: #008b00;",k=/\s*\((.*?)\)\s*/g,l=/(\(\?:[^)]+\))\?/g,m=/(\(\?)?:\w+/g,n=/\*\w+/g,o=/[\-{}\[\]+?.,\\\^$|#]/g,p=function(a){return a=a.replace(o,"\\$&").replace(k,"(?:$1)?").replace(m,function(a,b){return b?a:"([^\\s]+)"}).replace(n,"(.*?)").replace(l,"\\s*$1?\\s*"),new RegExp("^"+a+"$","i")},q=function(a){a.forEach(function(a){a.callback.apply(a.context)})},r=function(){d===a&&b.annyang.init({},!1)};b.annyang={init:function(k,l){l=l===a?!0:!!l,d&&d.abort&&d.abort(),d=new c,d.maxAlternatives=5,d.continuous=!0,d.lang="pt-BR",d.onstart=function(){q(g.start)},d.onerror=function(a){switch(q(g.error),a.error){case"network":q(g.errorNetwork);break;case"not-allowed":case"service-not-allowed":e=!1,(new Date).getTime()-h<200?q(g.errorPermissionBlocked):q(g.errorPermissionDenied)}},d.onend=function(){if(q(g.end),e){var a=(new Date).getTime()-h;1e3>a?setTimeout(b.annyang.start,1e3-a):b.annyang.start()}},d.onresult=function(a){q(g.result);for(var c,d=a.results[a.resultIndex],e=0;e<d.length;e++){c=d[e].transcript.trim(),i&&b.console.log("Comando reconhecido: %c"+c,j);for(var h=0,k=f.length;k>h;h++){var l=f[h].command.exec(c);if(l){var m=l.slice(1);return i&&(b.console.log("comando confere com: %c"+f[h].originalPhrase,j),m.length&&b.console.log("com os parametros",m)),f[h].callback.apply(this,m),q(g.resultMatch),!0}}}return q(g.resultNoMatch),!1},l&&(f=[]),k.length&&this.addCommands(k)},start:function(b){r(),b=b||{},e=b.autoRestart!==a?!!b.autoRestart:!0,h=(new Date).getTime(),d.start()},abort:function(){r(),e=!1,d.abort()},debug:function(a){i=arguments.length>0?!!a:!0},setLanguage:function(a){r(),d.lang=a},addCommands:function(a){var c,d;r();for(var e in a)if(a.hasOwnProperty(e)){if(c=b[a[e]]||a[e],"function"!=typeof c)continue;d=p(e),f.push({command:d,callback:c,originalPhrase:e})}i&&b.console.log("Comandos carregados: %c"+f.length,j)},removeCommands:function(a){a=Array.isArray(a)?a:[a],f=f.filter(function(b){for(var c=0;c<a.length;c++)if(a[c]===b.originalPhrase)return!1;return!0})},addCallback:function(c,d,e){if(g[c]!==a){var f=b[d]||d;"function"==typeof f&&g[c].push({callback:f,context:e||this})}}}}).call(this);





// * miley.comandos.js
// * autor	: Victor Ribeiro @JVRibeiiro
// * licença: MIT
// * https://jvribeiro.github.io/
// * ************************************
"use strict";

var w = window;
var d = document;
var nome = w.localStorage.getItem('nome');
var gen = w.localStorage.getItem('genero');

// * Algoritmo de renomeação caso estejam vazio os campos de informação do usuário
if (gen == null || gen == undefined) {gen = "usuário";};
if (nome == null || nome == undefined) {nome = "anônimo";};
if (dialog == null) {dialog = "";};
if (nome == "" && gen == "senhor") {nome = "anônimo";};
if (nome == "" && gen == "senhorita") {nome = "anônima";};
if (nome == "" && gen == "você") {gen = "pessoa";};
if (nome.length > 0 && gen == "você") {gen = "";};
//

var permissaoNegada = "000111011010101011111000010101000110011000111111001010101010101101001100101001010010010110100";

function _EaDsVr() {
espera(); rotina(); voz(); saveHist();
};


if (annyang) {
	var calcularSoma = function(val1, val2) {

		var valor1 = val1;
		var valor2 = val2;

if(val1 == "dois") {valor1 = 2};
if(val2 == "dois") {valor2 = 2};

		var n1 = Number(valor1);
		var n2 = Number(valor2);

		var result = console.log(n1 + n2);
		d.getElementById('resposta').value = n1 + n2;
		d.getElementById('pergunta').value = "Soma > "+n1+" mais "+n2+".";
		voz(); saveHist();
		}

	var calcularSubtrai = function(val1, val2) {
		var valor1 = val1;
		var valor2 = val2;

if(val1 == "dois") {valor1 = 2};
if(val2 == "dois") {valor2 = 2};

		var n1 = Number(valor1);
		var n2 = Number(valor2);

		var result = console.log(n1 - n2);
		d.getElementById('resposta').value = n1 - n2;
		d.getElementById('pergunta').value = "Subtração > "+n1+" menos "+n2+".";
		voz(); saveHist();
		}

	var calcularMultiplica = function(val1, val2) {
		var valor1 = val1;
		var valor2 = val2;

if(val1 == "dois") {valor1 = 2};
if(val2 == "dois") {valor2 = 2};

		var n1 = Number(valor1);
		var n2 = Number(valor2);

		var result = console.log(n1 * n2);
		d.getElementById('resposta').value = n1 * n2;
		d.getElementById('pergunta').value = "Multiplicação > "+n1+" vezes "+n2+".";
		voz(); saveHist();
		}

	var calcularDivide = function(val1, val2) {
		var valor1 = val1;
		var valor2 = val2;

if(val1 == "dois") {valor1 = 2};
if(val2 == "dois") {valor2 = 2};

		var n1 = Number(valor1);
		var n2 = Number(valor2);

		var result = console.log(n1 / n2);
		d.getElementById('resposta').value = n1 / n2;
		d.getElementById('pergunta').value = "Divisão > "+n1+" dividido por "+n2+".";
		voz(); saveHist();
		}

	var fecharMiley = function() {d.getElementById("resposta").value = "Tchau tchau!"; voz(); setTimeout(w.location.href = "about:blank", 5000);};
	var refresh = function() {w.location.reload();};
	var dialog_true = function() {d.getElementById("dialogo").style.display = "block"; d.getElementById("dialogo").focus(); d.getElementById("resposta").value = "Certo, "+gen+". Aqui está o histórico de conversa."; voz();}; // Mostra o histórico de conversação da sessão
	var dialog_false = function() {d.getElementById("dialogo").style.display = "none";  d.getElementById("resposta").value = "Entendido. Já ocultei."; voz();}; // Esconde o histórico de conversação da sessão
	var alfa = function() {d.getElementById('resposta').focus(); d.getElementById("texto").value = "Miley"; _EaDsVr(); saveHist();};

// Navegação nas páginas do Facebook
	var fb = function(facebook) {abrirFb = w.open('http://www.facebook.com/', 'facebook', 'width=1400, height=740, top=25, left=0'); d.getElementById("resposta").value = "Tudo bem. Estou abrindo sua rede social, "+gen+" "+nome+"."; voz(); saveHist();};
	var fbrec = function(facebook) {abrirFb = w.open('http://www.facebook.com/?sk=h_chr', 'facebook', 'width=1400, height=740, top=25, left=0'); d.getElementById("resposta").value = "Okey. Mostrando as publicações mais recentes do feicebook."; voz(); saveHist();};
	var fbpop = function(facebook) {abrirFb = w.open('http://www.facebook.com/?sk=h_nor', 'facebook', 'width=1400, height=740, top=25, left=0'); d.getElementById("resposta").value = "Okey. Mostrando as publicações mais populares do feicebook."; voz(); saveHist();};
	var fbperfil = function(facebook) {abrirFb = w.open('http://www.facebook.com/profile.php', 'facebook', 'width=1400, height=740, top=25, left=0'); d.getElementById("resposta").value = "Tudo bem. Estou abrindo seu perfil do feicebook, "+nome+"."; voz(); saveHist();};
	var fbalbum = function(facebook) {abrirFb = w.open('http://www.facebook.com/photos.php', 'facebook', 'width=1400, height=740, top=25, left=0'); d.getElementById("resposta").value = "Aguarde. Vou abrir suas fotos do feicebook."; voz(); saveHist();};
	var fbmensagens = function(facebook) {abrirFb = w.open('http://www.facebook.com/messages', 'facebook', 'width=1400, height=740, top=25, left=0'); d.getElementById("resposta").value = "Vou tentar abrir suas mensagens."; voz(); saveHist();};
	var fbnotificacoes = function(facebook) {abrirFb = w.open('http://www.facebook.com/notifications.php', 'facebook', 'width=1400, height=740, top=25, left=0'); d.getElementById("resposta").value = "Certo. Estou abrindo suas notificações."; voz(); saveHist();};


var siteCom = function(algo) {abrirSite = w.open('http://'+algo+'.com', 'site', 'width=1400, height=640, top=25, left=0'); d.getElementById("resposta").value = "Okey, "+gen+". Vou abrir o "+algo+".com."; voz(); saveHist();};
var siteComBr = function(algo) {abrirSite = w.open('http://'+algo+'.com.br', 'site', 'width=1400, height=640, top=25, left=0'); d.getElementById("resposta").value = "Okey, "+gen+". Vou abrir o "+algo+".com.br."; voz(); saveHist();};
var siteOrg = function(algo) {abrirSite = w.open('http://'+algo+'.org', 'site', 'width=1400, height=640, top=25, left=0'); d.getElementById("resposta").value = "Okey, "+gen+". Vou abrir o "+algo+".org."; voz(); saveHist();};
var siteOrgBr = function(algo) {abrirSite = w.open('http://'+algo+'.org.br', 'site', 'width=1400, height=640, top=25, left=0'); d.getElementById("resposta").value = "Okey, "+gen+". Vou abrir o "+algo+".org.br."; voz(); saveHist();};

// Pesquisa global nos navegadores mais conhecidos - Google, Bing, Yahoo
	var p_global = function(algo) {
		abrirWindowG = w.open('http://google.com/search?q='+algo, 'google', 'width=700, height=700, top=25, left=0');
		abrirWindowB = w.open('http://bing.com/search?q='+algo, 'bing', 'width=700, height=700, top=25, left=500');
		abrirWindowY = w.open('http://br.search.yahoo.com/search;_ylt=Anmgv8ykk.JD03hZwN3Ah2eU7q5_?p='+algo+'&toggle=1&cop=mss&ei=UTF-8&fr=yfp-t-403&fp=1', 'yahoo', 'width=800, height=700, top=25, left=800');
	d.getElementById("resposta").value = "Tá bom. Vou procurar nos melhores mecanismos de buscas por "+algo+"."; voz(); saveHist();};

var g1 = function(algo) {abrirWindowG1 = w.open('http://g1.globo.com/', 'g1', 'width=1400, height=640, top=25, left=0'); d.getElementById("resposta").value = "Vou abrir o G1."; voz(); saveHist();};
// * Pesquisa individual - Google, Bing, Yahoo

// * Google
	var google = function(algo) {abrirWindowG = w.open('http://google.com/', 'google', 'width=1400, height=640, top=25, left=0'); d.getElementById("resposta").value = "Vou abrir o Google."; voz(); saveHist();};
	var pgoogle = function(algo) {abrirWindowG = w.open('http://google.com/search?q='+algo, 'google', 'width=1400, height=640, top=25, left=0'); d.getElementById("resposta").value = "Vou procurar por "+algo+" no Google, "+gen+"."; voz(); saveHist();};

// * Wikipédia
  var pwiki = function(algo) {abrirWindowW = w.open('http://pt.wikipedia.org/wiki/'+algo, 'wiki', 'width=600, height=700, top=25, right=0')};

// * Definições
if(d.getElementById('q').value !== "") {
algo = d.getElementById('q').value
}

var definir = function(algo) {
startFetch(algo, 1, 1000);
d.getElementById("pergunta").value = "Definir > "
+ algo; // Palavra ou sentença a ser definida
d.getElementById('q').value = algo;
search();
d.getElementById("resposta").value = "Só um momento...";
voz();
}

var textbox = d.getElementById("resposta");
var button = d.getElementById("botaoFalar");
var tempscript = null, minchars, maxchars, attempts;

function startFetch(algo, minimumCharacters, maximumCharacters, isRetry) {
if (tempscript) return;
if (!isRetry) {attempts = 0;
minchars = minimumCharacters;
maxchars = maximumCharacters;
}

tempscript = d.createElement("script");
tempscript.type = "text/javascript";
tempscript.id = "tempscript";
tempscript.src = "https://pt.wikipedia.org/w/api.php?action=query&titles="
+ algo // Palavra ou sentença a ser definida
+ "&redirects="
+ "&prop=extracts"
+ "&exchars="
+ maxchars // Máximo de caracteres a ser "puxado"
+ "&exintro"
+ "&format=json"
+ "&callback=onFetchComplete"
+ "&requestid="
+ Math.floor(Math.random()*999999).toString();
d.body.appendChild(tempscript);
}

function onFetchComplete(data) {
d.body.removeChild(tempscript);
tempscript = null
var s = getFirstProp(data.query.pages).extract;
s = htmlDecode(stripTags(s));
if (s.length > minchars || attempts++ > 5) {
d.getElementById("resposta").value = s;
d.getElementById("pergunta").value = "Definindo...";
voz(); // Lê em voz alta a definição da palavra ou sentença
espera(); // Delay para se aproximar do carregamento do áudio
d.getElementById("dialogo").value += "Definir > "
+ algo // Palavra ou sentença a ser definida
+ "\n"
+ s // Definição carregada
+ "\n|_______________________________________________________|"
+ "\n--------------------------------------------------------------------";
saveHist(); // Salva a definição no log de conversa
}

else {
d.getElementById('resposta').value = "Não encontrei a definição, "+gen+". Tente a pesquisa do Google.";
voz();
}
}
function getFirstProp(obj) {
for (var i in obj) return obj[i];
}
function stripTags(s) {
return s.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, "");
}
function htmlDecode(input){
var e = document.createElement("div"); e.innerHTML = input; return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

// * Pesquisa de imagens interna*
  var p_img = function(algo) {d.getElementById('q').style.display = "block"; d.getElementById('q').value = algo; search();};
  var p_img_mais = function() {search();};
  var p_img_del = function() {d.getElementById('q').value = ""; search();};
	// * *A I.A. usa o Google Imagens para obter as imagens e o Google Sphere (Mr. Doob) com algumas modificações.

// * Bing
	var bing = function(algo) {abrirWindowB = w.open('http://bing.com/', 'bing', 'width=1400, height=640, top=25, left=0'); d.getElementById("resposta").value = "Certo. Vou abrir o Bing."; voz(); saveHist();};
	var pbing = function(algo) {abrirWindowB = w.open('http://bing.com/search?q='+algo, 'bing', 'width=1400, height=640, top=25, left=0'); d.getElementById("resposta").value = "Certo. Vou usar o Bing para fazer a busca."; voz(); saveHist();};
	var pbing_img = function(algo) {abrirWindowB = w.open('http://bing.com/images/search?q='+algo, 'bing', 'width=1400, height=640, top=25, left=0'); d.getElementById("resposta").value = "Okey. Vou procurar no Bing algumas imagens de "+algo+"."; voz(); saveHist();};
	var pbing_vid = function(video) {abrirWindowB = w.open('http://bing.com/videos/search?q='+video, 'bing', 'width=1400, height=640, top=25, left=0'); d.getElementById("resposta").value = "Reuni alguns resultados de vídeos sobre "+algo+"."; voz(); saveHist();};

// * Yahoo!
	var yahoo = function(algo) {abrirWindowY = w.open('http://br.yahoo.com/', 'yahoo', 'width=1400, height=640, top=25, left=0'); d.getElementById("resposta").value = "Okey. Vou abrir o Yahoo."; voz(); saveHist();};
	var pyahoo = function(algo) {abrirWindowY = w.open('http://br.search.yahoo.com/search;_ylt=Anmgv8ykk.JD03hZwN3Ah2eU7q5_?p='+algo+'&toggle=1&cop=mss&ei=UTF-8&fr=yfp-t-403&fp=1', 'yahoo', 'width=1400, height=640, top=25, left=0'); d.getElementById("resposta").value = "Okey. Vou procurar por "+algo+" no Yahoo."; voz(); saveHist();};

// * YouTube
	var pyoutube = function(video) {abrirWindowYt = w.open('http://youtube.com/results?search_query='+video, 'yt', 'width=1400, height=640, top=25, left=0'); d.getElementById("resposta").value = "Consegui achar esses vídeos de "+video+" no YouTube."; voz(); saveHist();};
	var pyoutube_t = function(video) {abrirWindowYt = w.open('http://youtube.com/results?search_query=allintitle:'+video, 'yt'); d.getElementById("resposta").value = "Estou procurando só pelo título dos vídeos."; voz(); saveHist();};

	var escrever = function(repeat) {d.getElementById("texto").value = repeat; _EaDsVr();};
  var sim = function(repeat) {d.getElementById("texto").value = "Sim"; _EaDsVr();};
  var nao = function(repeat) {d.getElementById("texto").value = "Não"; _EaDsVr();};

// * A variável "perguntar" e suas variantes retornam um ponto de interrogação ao final da frase.

	var perguntar = function(repeat) {d.getElementById("texto").value = repeat+"?"; /* A variável perguntar_x adiciona uma interrogação ao final da frase */ _EaDsVr();};
	var perguntar_qual = function(repeat) {d.getElementById("texto").value = "Qual "+repeat+"?"; _EaDsVr();};
	var perguntar_como = function(repeat) {d.getElementById("texto").value = "Como "+repeat+"?"; _EaDsVr();};
	var perguntar_pq = function(repeat) {d.getElementById("texto").value = "Por que "+repeat+"?"; _EaDsVr();};
	var perguntar_oque = function(repeat) {d.getElementById("texto").value = "O que "+repeat+"?"; _EaDsVr();};
	var perguntar_quantos = function(repeat) {d.getElementById("texto").value = "Quantos "+repeat+"?"; _EaDsVr();};
	var perguntar_quando = function(repeat) {d.getElementById("texto").value = "Quando "+repeat+"?"; _EaDsVr();};
	var perguntar_quem = function(repeat) {d.getElementById("texto").value = "Quem "+repeat+"?"; _EaDsVr();};
	var perguntar_doque = function(repeat) {d.getElementById("texto").value = "Do que "+repeat+"?"; _EaDsVr();};

// * As variáveis "falar_x" permitem que o usuário mantenha uma conversa mesmo estando no modo de comandos

// * Pronomes pessoais
	var falar_eu = function(repeat) {d.getElementById("texto").value = "Eu "+repeat; _EaDsVr();};
	var falar_tu = function(repeat) {d.getElementById("texto").value = "Tu "+repeat; _EaDsVr();};
	var falar_vc = function(repeat) {d.getElementById("texto").value = "Você "+repeat; _EaDsVr();};
	var falar_ele = function(repeat) {d.getElementById("texto").value = "Ele "+repeat; _EaDsVr();};
	var falar_ela = function(repeat) {d.getElementById("texto").value = "Ela "+repeat; _EaDsVr();};
	var falar_nohs = function(repeat) {d.getElementById("texto").value = "Nós "+repeat; _EaDsVr();};
	var falar_vcs = function(repeat) {d.getElementById("texto").value = "Vocês "+repeat; _EaDsVr();};
	var falar_eles = function(repeat) {d.getElementById("texto").value = "Eles "+repeat; _EaDsVr();};
	var falar_elas = function(repeat) {d.getElementById("texto").value = "Elas "+repeat; _EaDsVr();};

// * Artigos definidos
	var falar_o = function(repeat) {d.getElementById("texto").value = "O "+repeat; _EaDsVr();};
	var falar_a = function(repeat) {d.getElementById("texto").value = "A "+repeat; _EaDsVr();};
	var falar_os = function(repeat) {d.getElementById("texto").value = "Os "+repeat; _EaDsVr();};
	var falar_as = function(repeat) {d.getElementById("texto").value = "As "+repeat; _EaDsVr();};

// * Artigos indefinidos
	var falar_um = function(repeat) {d.getElementById("texto").value = "Um "+repeat; _EaDsVr();};
	var falar_uma = function(repeat) {d.getElementById("texto").value = "Uma "+repeat; _EaDsVr();};
	var falar_uns = function(repeat) {d.getElementById("texto").value = "Uns "+repeat; _EaDsVr();};
	var falar_umas = function(repeat) {d.getElementById("texto").value = "Umas "+repeat; _EaDsVr();};

// * Palavras avulsas
	var falar_oi = function(repeat) {d.getElementById("texto").value = "Oi."; _EaDsVr();};
	var falar_ola = function(repeat) {d.getElementById("texto").value = "Olá."; _EaDsVr();};
	var falar_obrigado = function(repeat) {d.getElementById("texto").value = "Obrigado."; _EaDsVr();};
	var falar_obrigada = function(repeat) {d.getElementById("texto").value = "Obrigada."; _EaDsVr();};
	var falar_desculpa = function(repeat) {d.getElementById("texto").value = "Desculpa."; _EaDsVr();};

// * Pronomes possessivos
	var falar_meu = function(repeat) {d.getElementById("texto").value = "Meu "+repeat; _EaDsVr();};
	var falar_minha = function(repeat) {d.getElementById("texto").value = "Minha "+repeat; _EaDsVr();};
	var falar_meus = function(repeat) {d.getElementById("texto").value = "Meus "+repeat; _EaDsVr();};
	var falar_minhas = function(repeat) {d.getElementById("texto").value = "Minhas "+repeat; _EaDsVr();};
	var falar_teu = function(repeat) {d.getElementById("texto").value = "Teu "+repeat; _EaDsVr();};
	var falar_tua = function(repeat) {d.getElementById("texto").value = "Tua "+repeat; _EaDsVr();};
	var falar_teus = function(repeat) {d.getElementById("texto").value = "Teus "+repeat; _EaDsVr();};
	var falar_tuas = function(repeat) {d.getElementById("texto").value = "Tuas "+repeat; _EaDsVr();};
	var falar_nosso = function(repeat) {d.getElementById("texto").value = "Nosso "+repeat; _EaDsVr();};
	var falar_nossa = function(repeat) {d.getElementById("texto").value = "Nossa "+repeat; _EaDsVr();};
	var falar_nossos = function(repeat) {d.getElementById("texto").value = "Nossos "+repeat; _EaDsVr();};
	var falar_nossas = function(repeat) {d.getElementById("texto").value = "Nossas "+repeat; _EaDsVr();};
	var falar_dele = function(repeat) {d.getElementById("texto").value = "Dele "+repeat; _EaDsVr();};
	var falar_dela = function(repeat) {d.getElementById("texto").value = "Dela "+repeat; _EaDsVr();};
	var falar_deles = function(repeat) {d.getElementById("texto").value = "Deles "+repeat; _EaDsVr();};
	var falar_delas = function(repeat) {d.getElementById("texto").value = "Delas "+repeat; _EaDsVr();};

	var falar_pq = function(repeat) {d.getElementById("texto").value = "Por que "+repeat; _EaDsVr();};
	var falar_que = function(repeat) {d.getElementById("texto").value = "Que "+repeat; _EaDsVr();};
	var falar_eh = function(repeat) {d.getElementById("texto").value = "É "+repeat; _EaDsVr();};
	var falar_de = function(repeat) {d.getElementById("texto").value = "De "+repeat; _EaDsVr();};
	var falar_e = function(repeat) {d.getElementById("texto").value = "E "+repeat; _EaDsVr();};
	var falar_eai = function(repeat) {d.getElementById("texto").value = "E aí, "+repeat; _EaDsVr();};
	var falar_nao = function(repeat) {d.getElementById("texto").value = "Não "+repeat; _EaDsVr();};
	var falar_muito = function(repeat) {d.getElementById("texto").value = "Muito "+repeat; _EaDsVr();};
	var falar_isso = function(repeat) {d.getElementById("texto").value = "Isso "+repeat; _EaDsVr();};
	var falar_isto = function(repeat) {d.getElementById("texto").value = "Isto "+repeat; _EaDsVr();};
	var falar_repete = function(repeat) {d.getElementById("texto").value = "Repete "+repeat; _EaDsVr();};
	var falar_fala = function(repeat) {d.getElementById("texto").value = "Fala "+repeat; _EaDsVr();};
	var falar_tudo = function(repeat) {d.getElementById("texto").value = "Tudo "+repeat; _EaDsVr();};
	var falar_em = function(repeat) {d.getElementById("texto").value = "Em "+repeat; _EaDsVr();};
	var falar_diz = function(repeat) {d.getElementById("texto").value = "Diz "+repeat; _EaDsVr();};
	var falar_diga = function(repeat) {d.getElementById("texto").value = "Diga "+repeat; _EaDsVr();};
	var falar_mas = function(repeat) {d.getElementById("texto").value = "Mas "+repeat; _EaDsVr();};
	var falar_ate = function(repeat) {d.getElementById("texto").value = "Até "+repeat; _EaDsVr();};
	var falar_mediz = function(repeat) {d.getElementById("texto").value = "Me diz "+repeat; _EaDsVr();};
	var falar_mediga = function(repeat) {d.getElementById("texto").value = "Me diga "+repeat; _EaDsVr();};
	var falar_mefala = function(repeat) {d.getElementById("texto").value = "Me fala "+repeat; _EaDsVr();};
	var falar_mefale = function(repeat) {d.getElementById("texto").value = "Me fale "+repeat; _EaDsVr();};
	var falar_tbm = function(repeat) {d.getElementById("texto").value = "Também "+repeat; _EaDsVr();};

	var falar_bem = function(repeat) {d.getElementById("texto").value = "Bem "+repeat; _EaDsVr();};
	var falar_bom = function(repeat) {d.getElementById("texto").value = "Bom "+repeat; _EaDsVr();};
	var falar_boa = function(repeat) {d.getElementById("texto").value = "Boa "+repeat; _EaDsVr();};
	var falar_mal = function(repeat) {d.getElementById("texto").value = "Mal "+repeat; _EaDsVr();};
	var falar_mau = function(repeat) {d.getElementById("texto").value = "Mau "+repeat; _EaDsVr();};
	var falar_mah = function(repeat) {d.getElementById("texto").value = "Má "+repeat; _EaDsVr();};
	var falar_pessimo = function(repeat) {d.getElementById("texto").value = "Péssimo "+repeat; _EaDsVr();};
	var falar_pessima = function(repeat) {d.getElementById("texto").value = "Péssima "+repeat; _EaDsVr();};
	var falar_melhor = function(repeat) {d.getElementById("texto").value = "Melhor "+repeat; _EaDsVr();};
	var falar_desculpaAlgo = function(repeat) {d.getElementById("texto").value = "Desculpa "+repeat; _EaDsVr();};
	var falar_sua = function(repeat) {d.getElementById("texto").value = "Sua "+repeat; _EaDsVr();};
	var falar_te = function(repeat) {d.getElementById("texto").value = "Te "+repeat; _EaDsVr();};
	var falar_olaAlgo = function(repeat) {d.getElementById("texto").value = "Olá, "+repeat; _EaDsVr();};
	var falar_oiAlgo = function(repeat) {d.getElementById("texto").value = "Oi, "+repeat; _EaDsVr();};
	var falar_mileyAlgo = function(repeat) {d.getElementById("texto").value = "Miley, "+repeat; _EaDsVr();};
	var falar_obrigadoAlgo = function(repeat) {d.getElementById("texto").value = "Obrigado, "+repeat; _EaDsVr();};
	var falar_obrigadaAlgo = function(repeat) {d.getElementById("texto").value = "Obrigada, "+repeat; _EaDsVr();};
  var falar_silencio = function(repeat) {d.getElementById("texto").value = "Silêncio"; _EaDsVr();};
  var falar_paraAlgo = function(repeat) {d.getElementById("texto").value = "Para "+repeat; _EaDsVr();};
  var falar_para = function(repeat) {d.getElementById("texto").value = "Para"; _EaDsVr();};
  var falar_ta = function(repeat) {d.getElementById("texto").value = "Tá"; _EaDsVr();};
  var falar_taAlgo = function(repeat) {d.getElementById("texto").value = "Tá "+repeat; _EaDsVr();};

// * Abre uma pop-up de ajuda
	var ajuda = function abrirA() {abrirWindowA = w.open('ajuda.html', 'ajuda', 'width=500, height=700, top=25, left=0'); abrirAjuda(); voz();};

	var lembrarNome = function(nome) {
	var uNa = d.getElementById("userName");
	uNa.value = nome;
	salvarDados();
	};

	var lembrarGeneroSenhor = function(genero) {
	var uGeSo = d.getElementById("senhor");
	uGeSo.selected = "true";
	d.getElementById("resposta").value = "Chamarei você de senhor. \n\nSalvo ou Cancelo?";
	d.getElementById("pergunta").value = "Mudando gênero para > Senhor";
	voz(); saveHist();
	};

	var lembrarGeneroSenhorita = function(genero) {
	var uGeSa = d.getElementById("senhorita");
	uGeSa.selected = "true";
	d.getElementById("resposta").value = "Chamarei você de senhorita. \n\nSalvo ou Cancelo?";
	d.getElementById("pergunta").value = "Mudando gênero para > Senhorita";
	voz(); saveHist();
	};

	var salvar = function salvar() {
	d.getElementById("resposta").value = "Informação salva. \n\nAtualizando..."; voz(); saveHist();
	setTimeout(salvarDados(), 5000);
	};

	var cancelar = function cancelar() {
	d.getElementById("resposta").value = "Cancelei, "+gen+"."; voz(); saveHist();
	console.log('Operação cancelada');
	};

	var repetir = function repetir() {
	d.getElementById("pergunta").value = "Repetindo...";
	voz(); saveHist();
	};

	var config = function() {config_voice(); autocom()};
	var closeConfig = function() {closeConfig_voice()};

// * Fechar janelas abertas pela Miley
	var fb_close = function() {abrirFb.close()};
	var pgoogle_close = function() {abrirWindowG.close()};
	var pbing_close = function() {abrirWindowB.close()};
	var pwiki_close = function() {abrirWindowW.close()};
	var pyahoo_close = function() {abrirWindowY.close()};
	var pyt_close = function() {abrirWindowYt.close()};
	var g1_close = function() {abrirWindowG1.close()};
	var ajuda_close = function() {abrirWindowA.close()};
















// * --------------------------------------------------------------------------------------------------------------------
// *
// * Aqui definimos todos os comandos que a Miley entenderá (cortesia da biblioteca de reconhecimento de fala Annyang.js)
// *
// * --------------------------------------------------------------------------------------------------------------------

var commands = {
	'soma :val1 mais :val2': calcularSoma,
	'soma pra mim :val1 + :val2': calcularSoma,
	'quanto é :val1 mais :val2': calcularSoma,
	'calcula :val1 mais :val2': calcularSoma,

	'subtrai :val1 por :val2': calcularSubtrai,
	'subtração :val1 menos :val2': calcularSubtrai,
	'quanto é :val1 menos :val2': calcularSubtrai,
	'calcula :val1 menos :val2': calcularSubtrai,

	'multiplica :val1 vezes :val2': calcularMultiplica,
	'calcula :val1 vezes :val2': calcularMultiplica,
	'quanto é :val1 vezes :val2': calcularMultiplica,
	'multiplicação :val1 vezes :val2': calcularMultiplica,

	'divisão :val1 dividido p(or)(ra) :val2': calcularDivide,
	'divide :val1 p(or)(ra) :val2': calcularDivide,
	'calcula :val1 dividido p(or)(ra) :val2': calcularDivide,
	'quanto é :val1 dividido p(or)(ra) :val2': calcularDivide,
	'quanto é :val1 sobre :val2': calcularDivide,

  'sim': sim,
  'não': nao,

	'salva(r)': salvar,
	'cancela(r)': cancelar,
	'repet(e)(i)(r) (por favor) (o que) (tu)(você) (falou)(disse)': repetir,

  'sou eu o *nome (miley)':	lembrarNome,
  'tu pode(s) me chamar de *nome (miley)':	lembrarNome,
	'você pode me chamar de *nome (miley)':	lembrarNome,
	'pode me cham(e)(a)(r) de *nome (miley)':	lembrarNome,

	'me cham(a)(e) de senhor': lembrarGeneroSenhor,
	'me cham(a)(e) de senhorita': lembrarGeneroSenhorita,

	'(agora) (abrir)(abre as) configurações (por favor) (miley) (por favor)':	config,
	'(agora) fecha(r) (as) configurações (por favor) (miley) (por favor)':		closeConfig,

	'(se) atualiza(r) (por favor) (miley) (por favor)': refresh,

	'tchau':	  fecharMiley,
	'adeus':	  fecharMiley,
	'se fecha':	fecharMiley,
	'bye bye':	fecharMiley,
	'good bye':	fecharMiley,

// * Ajuda
	'ajuda':				ajuda,
	'o que (eu) posso dizer (miley)':	ajuda,
	'(agora) fecha(r) (a) (página de) ajuda (aí) (pra mim) (por favor) (miley) (por favor)':	ajuda_close,

// * Histórico de conversa
	'me mostr(a)(e)(r) (noss)(o) histórico (de conversa)(ção) (por favor) (miley) (por favor)':	dialog_true,
	'mostr(a)(e)(r) (noss)(o) histórico (de conversa)(ção) (por favor) (miley) (por favor)':	dialog_true,
	'fecha(r) (noss)(o)(esse) histórico (de conversa)(ção) (por favor) (miley) (por favor)':	dialog_false,
  'histórico': dialog_true,

// * Fazer a Miley responder mesmo no modo de comando
	'agora me diz *repeat':	escrever,
	'pergunta *repeat':			                      perguntar,
	'*repeat interrogação':			                  perguntar,
	'tenho uma dúvida *repeat':	                 	perguntar,
	'tenho uma pergunta *repeat':	               	perguntar,
	'e se eu (te)(lhe) perguntar *repeat':	      perguntar,
	'qual *repeat':			                         	perguntar_qual,
	'como *repeat':			                         	perguntar_como,
	'quantos *repeat':			                      perguntar_quantos,
	'quando *repeat':		                        	perguntar_quando,
	'quem *repeat':			                         	perguntar_quem,
	'do que *repeat':		                         	perguntar_doque,
	'(pergunta)(e) porque *repeat pergunta':	  	perguntar_pq, /*-------------------------*/
	'(pergunta)(e) por que *repeat pergunta':	   	perguntar_pq, //  Aqui se encontram as   //
	'(pergunta)(e) porquê *repeat pergunta':	  	perguntar_pq, // Variações dos "porquês" //
	'(pergunta)(e) por quê *repeat pergunta':	   	perguntar_pq, /*-------------------------*/
//

// * Pronomes pessoais
	'eu *repeat':		falar_eu,
	'tu *repeat':		falar_tu,
	'você *repeat':		falar_vc,
	'ele *repeat':		falar_ele,
	'ela *repeat':		falar_ela,
	'nós *repeat':		falar_nohs,
	'vocês *repeat':	falar_vcs,
	'eles *repeat':		falar_eles,
	'elas *repeat':		falar_elas,

// * Artigos definidos
	'o *repeat':		falar_o,
	'a *repeat':		falar_a,
	'os *repeat':		falar_os,
	'as *repeat':		falar_as,

// * Artigos indefinidos
	'um *repeat':		falar_um,
	'uma *repeat':		falar_uma,
	'uns *repeat':		falar_uns,
	'umas *repeat':		falar_umas,

// * Pronomes possessivos
	'meu *repeat':		falar_meu,
	'minha *repeat':	falar_minha,
	'meus *repeat':		falar_meus,
	'minhas *repeat':	falar_minhas,
	'teu *repeat':		falar_teu,
	'tua *repeat':		falar_tua,
	'teus *repeat':		falar_teus,
	'tuas *repeat':		falar_tuas,
	'nosso *repeat':	falar_nosso,
	'nossa *repeat':	falar_nossa,
	'nossos *repeat':	falar_nossos,
	'nossas *repeat':	falar_nossas,
	'dele *repeat':		falar_dele,
	'dela *repeat':		falar_dela,
	'deles *repeat':	falar_deles,
	'delas *repeat':	falar_delas,

// * Palavras avulsas
	'oi':		falar_oi,
	'olá':		falar_ola,
	'obrigado':	falar_obrigado,
	'obrigada':	falar_obrigada,
	'desculpa':	falar_desculpa,

	'desculpa *repeat':	falar_desculpaAlgo,
	'que *repeat':		falar_que,
	'porque *repeat':	falar_pq,
	'por que *repeat':	falar_pq,
	'porquê *repeat':	falar_pq,
	'por quê *repeat':	falar_pq,
	'é *repeat':		falar_eh,
	'de *repeat':		falar_de,
	'e aí (miley)':		falar_eai,
	'não *repeat':		falar_nao,
	'muito *repeat':	falar_muito,
	'isso *repeat':		falar_isso,
	'isto *repeat':		falar_isto,
	'repete *repeat':	falar_repete,
	'fala *repeat':		falar_fala,
	'tudo *repeat':		falar_tudo,
	'em *repeat':		falar_em,
	'diz *repeat':		falar_diz,
	'diga *repeat':		falar_diga,
	'mas *repeat':		falar_mas,
	'até *repeat':		falar_ate,
	'me diz *repeat':	falar_mediz,
	'me diga *repeat':	falar_mediga,
	'me fala *repeat':	falar_mefala,
	'me fale *repeat':	falar_mefale,
	'também *repeat':	falar_tbm,
	'obrigado *repeat':	falar_obrigadoAlgo,
	'obrigada *repeat':	falar_obrigadaAlgo,
	'olá *repeat':		falar_olaAlgo,
	'oi *repeat':		falar_oiAlgo,
	'bem *repeat':		falar_bem,
	'bom *repeat':		falar_bom,
	'boa *repeat':		falar_boa,
	'mal *repeat':		falar_mal,
	'mau *repeat':		falar_mau,
	'má *repeat':		falar_mah,
	'péssimo *repeat':	falar_pessimo,
	'péssima *repeat':	falar_pessima,
  'silêncio': falar_silencio,
  'para *algo': falar_paraAlgo,
  'para': falar_para,
  'tá': falar_ta,
  'tá *repeat': falar_taAlgo,
  'miley *repeat': falar_mileyAlgo,

	'miley':		alfa,
	'ei (miley)':			alfa,

// * Sites pela URL
  'abr(e)(a)(ir) o site *algo.com': siteCom,
	'abr(e)(a)(ir) o site *algo.com.br': siteComBr,
	'abr(e)(a)(ir) o site *algo.org': siteOrg,
	'abr(e)(a)(ir) o site *algo.org.br': siteOrgBr,

// * Facebook
  'abr(e)(a)(ir) o g1':						g1,
	'me mostr(e)(a) as notícias (de hoje)':						g1,
  'mostr(e)(a) as notícias (de hoje)':						g1,
	'(agora) fecha(r) (o) g1 (aí) (pra mim) (por favor) (miley) (por favor)':	g1_close,

	'(abre)(abrir) (aí) (o) face(book) (aí) (por favor) (miley) (por favor)':	fb,
	'início (do) (face)(book)':							fb,
	'feed de notícias (do) (face)(book)':						fb,
	'feed (do) (face)(book)':							fb,
	'mostra (o) (meu) feed (do) (face)(book) (por favor) (miley) (por favor)':	fb,
	'volta pro feed (por favor) (miley) (por favor)':				fb,
	'volta pro início (por favor) (miley) (por favor)':				fb,

	'me (mostr)(e)(a)(r)(mostre-me) (as)(os) (publicações)(posts) (mais) recentes (do) face(book) (por favor) (miley) (por favor)':	fbrec,
	'(mostr)(e)(a)(r)(mostre-me) (as)(os) (publicações)(posts) (mais) recentes (do) face(book) (por favor) (miley) (por favor)':	fbrec,
	'me (mostr)(e)(a)(r)(mostre-me) (as)(os) (publicações)(posts) (mais) populares (do) face(book) (por favor) (miley) (por favor)':	fbpop,
	'(mostr)(e)(a)(r)(mostre-me) (as)(os) (publicações)(posts) (mais) populares (do) face(book) (por favor) (miley) (por favor)':		fbpop,

	'abrir perfil (do) (face)(book)':					fbperfil,
	'abre o meu perfil (do) (face)(book) (por favor) (miley) (por favor)':	fbperfil,
	'abre o perfil (do) (face)(book) (por favor) (miley) (por favor)':	fbperfil,
	'mostra o meu perfil (do) (face)(book) (por favor) (miley) (por favor)':fbperfil,
	'agora o meu perfil (do) (face)(book) (por favor) (miley) (por favor)':	fbperfil,
	'facebook perfil':							fbperfil,
	'perfil (do) (face)(book)':						fbperfil,

	'abrir álbuns':				fbalbum,
	'quero ver as (minhas) fotos (do) (face)(book) (miley)':			fbalbum,
	'fotos':									fbalbum,
	'mostr(a)(e)(r) as minhas fotos (do) (face)(book) (por favor) (miley) (por favor)':	fbalbum,
	'abr(a)(i)(r) as fotos (do) (face)(book) (por favor) (miley) (por favor)':		fbalbum,
	'agora as (minhas) fotos (do) (face)(book) (por favor) (miley) (por favor)':	fbalbum,
	'abr(a)(i)(r) as minhas fotos do face(book) (por favor) (miley) (por favor)':		fbalbum,
	'facebook álbuns':								fbalbum,

	'abr(a)(i)(r) (as) (minhas) mensagens':							fbmensagens,
	'mensagens':								fbmensagens,
	'abr(a)(e) as minhas mensagens (por favor) (miley) (por favor)':		fbmensagens,
	'(me) mostra as minhas mensagens (por favor) (miley) (por favor)':	fbmensagens,
	'facebook mensagens':							fbmensagens,

	'me (mostra) (as) notificações (do) (face)(book) (por favor) (miley) (por favor)':		fbnotificacoes,
	'mostra as notificações (do) (face)(book) (por favor) (miley) (por favor)':			fbnotificacoes,
	'abr(a)(i)(r) (pra mim) as notificações (do) (face)(book) (pra mim) (por favor) (miley) (por favor)':	fbnotificacoes,
	'facebook notificações':									fbnotificacoes,

	'(agora) fecha(r) (o) face(book) (aí) (pra mim) (por favor) (miley) (por favor)':		fb_close,

// * Pesquisa global
	'pesquis(a)(e)(r) global (sobre) *algo':		p_global, // * Faz uma pesquisa global em três mecanismos de busca diferentes ao mesmo tempo
  'pesquis(a)(e)(r) avançada (sobre) *algo':		p_global,

	// * Google
	'(abr)(e)(ir) (aí) (o) google (pra mim) (miley)':			google,
	'pesquis(a)(e)(r) *algo':				pgoogle,
	'procur(a)(e)(r) *algo':				pgoogle,
	'procur(a)(e)(r) p(or)(elo)(s)(ela)(s) *algo no google':		pgoogle,
	'pesquisa(r) (por) *algo no google':				pgoogle,
	'google *algo':							pgoogle,
	'(agora) fech(a)(o)(e)(r) (o) google (aí) (pra mim) (miley)':		pgoogle_close,

	// * Yahoo!
	'(abre) (aí) (o) yahoo (pra mim) (miley)':			          yahoo,
	'pesquis(a)(e)(r) no yahoo *algo':			                	pyahoo,
	'procur(a)(e)(r) p(or)(elo)(s)(ela)(s) *algo no yahoo':		pyahoo,
	'pesquisa(r) *algo no yahoo':			                 	pyahoo,
	'yahoo *algo':					                              		pyahoo,
	'(agora) fech(a)(o)(e)(r) (o) yahoo (aí) (pra mim) (miley)':		pyahoo_close,

// * Definições (retorna a definição de uma palavra com recursos visuais)
  '(miley) defin(e)(a) :algo': definir,
  '(miley) defin(e)(a) (a) *algo': definir,
  '(miley) defin(e)(a) o *algo': definir,
  '(miley) defin(e)(a) as *algo': definir,
  '(miley) defin(e)(a) os *algo': definir,

  '(miley) quem é *algo':			definir,
	'(miley) quem foi *algo':			definir,
	'(miley) quem era *algo':			definir,
  '(miley) o que é *algo':			definir,
	'(miley) o que foi *algo':			definir,
	'(miley) o que era *algo':			definir,
  '(miley) informação d(e)(o)(a)(os)(as) *algo':		definir,

  'procur(a)(o)(e)(r) (por)(uma)(s) image(ns)(m) de *algo':		p_img,
  'pesquis(a)(o)(e)(r) (por)(uma)(s) image(ns)(m) de *algo':	p_img,
  'procur(a)(o)(e)(r) (por)(uma)(s) foto(s) de *algo':				p_img,
  'pesquis(a)(o)(e)(r) (por)(uma)(s) foto(s) de *algo':				p_img,
  'me mostr(a)(e) (uma)(s) (foto)(image)(m)(n)(s) d(e)(o)(a)(os)(as) *algo':	p_img,
  'mostr(a)(e) (uma)(s) (foto)(image)(m)(n)(s) d(e)(o)(a)(os)(as) *algo':		p_img,
  'image(ns)(m) d(e)(a)(os)(as) *algo':			       		p_img,
  'fecha(r) (essas)(as)(às) imagens': p_img_del,
  'fecha(s) imagens': p_img_del,
  'ficha(s) imagens': p_img_del,
  'tira(r) (essas)(as)(às) imagens': p_img_del,
  'tira(s) (essas) imagens': p_img_del,
  'não quero ver (essas)(as)(às) imagens': p_img_del,
  'não quero ver (essas)(as)(às) fotos': p_img_del,
  'mostra(r) mais (imagens)': p_img_mais,
	'mais (imagens)': p_img_mais,

  // * Wikipédia
	'(procura)(vê)(olha) na wikipédia quem (é)(foi)(era) *algo':			pwiki,
	'(procura)(vê)(olha) na wikipédia o que (é)(foi)(era) *algo':			pwiki,
	'procur(a)(o)(e)(r) p(or)(elo)(s)(ela)(s) *algo na wikipédia':		pwiki,
	'(agora) fech(a)(o)(e)(r) (o)(a) wikipédia (aí) (pra mim) (miley)':	pwiki_close,

  // * Bing
	'(abre)(abrir) (o) bing (miley)':			bing,
	'pesquis(a)(o)(e)(r) *algo no bing':				pbing,
	'procur(a)(o)(e)(r) p(or)(elo)(s)(ela)(s) *algo no bing':		pbing,
	'bing *algo':						pbing,
	'(agora) fech(a)(o)(r) (o) bing (aí) (pra mim) (miley)':	pbing_close,
  '(agora) fech(a)(o)(r) (o) ping (aí) (pra mim) (miley)':	pbing_close,

	'procur(a)(o)(e)(r) (por) image(ns)(m) de *algo no bing':		pbing_img,
	'pesquis(a)(o)(e)(r) (por) image(ns)(m) de *algo no bing':	pbing_img,
	'procur(a)(o)(e)(r) (por) foto(s) de *algo no bing':				pbing_img,
	'pesquis(a)(o)(e)(r) (por) foto(s) de *algo no bing':				pbing_img,
	'me mostr(a)(e) (foto)(image)(m)(n)(s) d(e)(o)(a)(os)(as) *algo no bing':	pbing_img,
	'mostr(a)(e) (foto)(image)(m)(n)(s) d(e)(o)(a)(os)(as) *algo no bing':		pbing_img,
	'image(ns)(m) d(e)(a)(os)(as) *algo no bing':			       		pbing_img,

// * Youtube
	'procura no youtube por *video':			pyoutube,
	'procura o vídeo *video':				pyoutube_t,
	'procurar p(or)(elo)(s)(ela)(s) :video no youtube':	pyoutube,
	'procurar (o)(a)(os)(as) :video no youtube':		pyoutube,
	'youtube *video': 					pyoutube,

// * Bing Vídeos
	'procura (pel)(o) vídeo *video':					pbing_vid,
	'acha o vídeo *video':							pbing_vid,
	'quero assistir (o)(a)(os)(as) *video':					pbing_vid,
	'(procura)(acha)(pesquisa) (um) vídeo(s) d(e)(o)(a)(os)(as) *video':	pbing_vid
};

annyang.debug();
annyang.addCommands(commands);
annyang.setLanguage('pt-BR');
annyang.addCallback('resultNoMatch', function() {d.getElementById("texto").value = "Comando ou sentença desconhecidos."; _EaDsVr();
});
annyang.addCallback('errorPermissionDenied', function() {d.getElementById("texto").value = permissaoNegada; _EaDsVr();
});

annyang.start();
}

else {alert('Seu navegador não suporta comandos de voz. \nVocê pode, no entanto, usar o campo de digitação para falar comigo (sem comandos). \nAperte Ok para continuar.');}
