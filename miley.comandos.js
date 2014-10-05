//! annyang
//! version : 1.1.0
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://www.TalAter.com/annyang/
(function(a){"use strict";var b=this,c=b.SpeechRecognition||b.webkitSpeechRecognition||b.mozSpeechRecognition||b.msSpeechRecognition||b.oSpeechRecognition;if(!c)return b.annyang=null,a;var d,e,f=[],g={start:[],error:[],end:[],result:[],resultMatch:[],resultNoMatch:[],errorNetwork:[],errorPermissionBlocked:[],errorPermissionDenied:[]},h=0,i=!1,j="font-weight: bold; color: #00f;",k=/\s*\((.*?)\)\s*/g,l=/(\(\?:[^)]+\))\?/g,m=/(\(\?)?:\w+/g,n=/\*\w+/g,o=/[\-{}\[\]+?.,\\\^$|#]/g,p=function(a){return a=a.replace(o,"\\$&").replace(k,"(?:$1)?").replace(m,function(a,b){return b?a:"([^\\s]+)"}).replace(n,"(.*?)").replace(l,"\\s*$1?\\s*"),new RegExp("^"+a+"$","i")},q=function(a){a.forEach(function(a){a.callback.apply(a.context)})},r=function(){d===a&&b.annyang.init({},!1)};b.annyang={init:function(k,l){l=l===a?!0:!!l,d&&d.abort&&d.abort(),d=new c,d.maxAlternatives=5,d.continuous=!0,d.lang="en-US",d.onstart=function(){q(g.start)},d.onerror=function(a){switch(q(g.error),a.error){case"network":q(g.errorNetwork);break;case"not-allowed":case"service-not-allowed":e=!1,(new Date).getTime()-h<200?q(g.errorPermissionBlocked):q(g.errorPermissionDenied)}},d.onend=function(){if(q(g.end),e){var a=(new Date).getTime()-h;1e3>a?setTimeout(b.annyang.start,1e3-a):b.annyang.start()}},d.onresult=function(a){q(g.result);for(var c,d=a.results[a.resultIndex],e=0;e<d.length;e++){c=d[e].transcript.trim(),i&&b.console.log("Speech recognized: %c"+c,j);for(var h=0,k=f.length;k>h;h++){var l=f[h].command.exec(c);if(l){var m=l.slice(1);return i&&(b.console.log("command matched: %c"+f[h].originalPhrase,j),m.length&&b.console.log("with parameters",m)),f[h].callback.apply(this,m),q(g.resultMatch),!0}}}return q(g.resultNoMatch),!1},l&&(f=[]),k.length&&this.addCommands(k)},start:function(b){r(),b=b||{},e=b.autoRestart!==a?!!b.autoRestart:!0,h=(new Date).getTime(),d.start()},abort:function(){r(),e=!1,d.abort()},debug:function(a){i=arguments.length>0?!!a:!0},setLanguage:function(a){r(),d.lang=a},addCommands:function(a){var c,d;r();for(var e in a)if(a.hasOwnProperty(e)){if(c=b[a[e]]||a[e],"function"!=typeof c)continue;d=p(e),f.push({command:d,callback:c,originalPhrase:e})}i&&b.console.log("Commands successfully loaded: %c"+f.length,j)},removeCommands:function(a){a=Array.isArray(a)?a:[a],f=f.filter(function(b){for(var c=0;c<a.length;c++)if(a[c]===b.originalPhrase)return!1;return!0})},addCallback:function(c,d,e){if(g[c]!==a){var f=b[d]||d;"function"==typeof f&&g[c].push({callback:f,context:e||this})}}}}).call(this);

// * miley.comandos.js
// * Versão: 1.0.6
// * Autor: Victor Ribeiro (https://twitter.com/JVRibeiiro)
"use strict";

var w = window;
var d = document;
var _apikey = "8f0b4a57a6ac49a683224f7bb8d795e9"; // cd58d3ed06b54f7fa19979932b4ddd40 - 8f0b4a57a6ac49a683224f7bb8d795e9
var _codec = "mp3"; // mp3 - ogg - wav - aac - caff
var nome = w.localStorage.getItem('nome');

if (annyang) {
	var fecharMiley = function() {w.location.href = "about:blank";};
	var refresh = function() {w.location.reload();};
	var dialog_true = function() {d.getElementById("dialogo").style.display = "block"; d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Certo. Aqui está nosso histórico de conversa.\' autoplay><\/audio>";}; // Mostra o histórico de conversação da sessão
	var dialog_false = function() {d.getElementById("dialogo").style.display = "none";  d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Entendido. Ocultei nosso histórico de conversa.\' autoplay><\/audio>";}; // Esconde o histórico de conversação da sessão
	var alfa = function() {d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Estou aqui, "+nome+".\' autoplay><\/audio>";};

// Navegação nas páginas do Facebook
	var fb = function() {abrirFb = w.open('https://www.facebook.com/', 'fb', 'width=1400, height=640, top=25, left=0'); d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Tudo bem. Estou abrindo o feicebook.\' autoplay><\/audio>";};
	var fbrec = function() {abrirFb = w.open('https://www.facebook.com/?sk=h_chr', 'fbrec', 'width=1400, height=640, top=25, left=0'); d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Okey. Mostrando as publicações mais recentes do feicebook.\' autoplay><\/audio>";};
	var fbpop = function() {abrirFb = w.open('https://www.facebook.com/?sk=h_nor', 'fbpop', 'width=1400, height=640, top=25, left=0'); d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Okey. Mostrando as publicações mais populares do feicebook.\' autoplay><\/audio>";};
	var fbperfil = function() {abrirFb = w.open('https://www.facebook.com/profile.php', 'fbperfil'); d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Tudo bem. Estou abrindo seu perfil do feicebook, "+nome+".\' autoplay><\/audio>";};
	var fbalbum = function() {abrirFb = w.open('https://www.facebook.com/photos.php', 'fbalbum'); d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Aguarde. Vou abrir suas fotos do feicebook.\' autoplay><\/audio>";};
	var fbmensagens = function() {abrirFb = w.open('https://www.facebook.com/messages', 'fbmensagens'); d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Vou tentar abrir suas mensagens.\' autoplay><\/audio>";};
	var fbnotificacoes = function() {abrirFb = w.open('https://www.facebook.com/notifications.php', 'fbnotificacoes'); d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Certo. Estou abrindo suas notificações.\' autoplay><\/audio>";};

// Pesquisa global nos navegadores mais conhecidos - Google, Bing, Yahoo
	var p_global = function(algo) {
		abrirWindowG = w.open('https://google.com/#q='+algo, 'google', 'width=700, height=700, top=25, left=0'); 
		abrirWindowB = w.open('https://bing.com/search?q='+algo, 'bing', 'width=700, height=700, top=25, left=500');
		abrirWindowY = w.open('https://br.search.yahoo.com/search;_ylt=Anmgv8ykk.JD03hZwN3Ah2eU7q5_?p='+algo+'&toggle=1&cop=mss&ei=UTF-8&fr=yfp-t-403&fp=1', 'yahoo', 'width=800, height=700, top=25, left=800');
	d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Tá bom. Vou procurar nos melhores mecanismos de buscas por "+algo+".\' autoplay><\/audio>";};

// Pesquisa individual - Google, Bing, Yahoo
	// Google
	var google = function(algo) {abrirWindowG = w.open('https://google.com/', 'google', 'width=1400, height=640, top=25, left=0'); d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Okey. Vou abrir o Google.\' autoplay><\/audio>";};
	var pgoogle = function(algo) {abrirWindowG = w.open('https://google.com/#q='+algo, 'google', 'width=1400, height=640, top=25, left=0'); d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Okey. Vou procurar por "+algo+" no Google.\' autoplay><\/audio>";};
	// Wikipédia
	var pwiki = function(algo) {abrirWindowW = w.open('http://pt.wikipedia.com/wiki/'+algo, 'wiki', 'width=1400, height=640, top=25, left=0'); d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Vamos ver na Wikipédia.\' autoplay><\/audio>";};
	// Bing
	var bing = function(algo) {abrirWindowB = w.open('http://bing.com/', 'bing', 'width=1400, height=640, top=25, left=0'); d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Certo. Vou abrir o Bing.\' autoplay><\/audio>";};
	var pbing = function(algo) {abrirWindowB = w.open('http://bing.com/search?q='+algo, 'bing', 'width=1400, height=640, top=25, left=0'); d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Certo. Vou usar o Bing para fazer a busca.\' autoplay><\/audio>";};
	var pbing_img = function(algo) {abrirWindowB = w.open('http://bing.com/images/search?q='+algo, 'bing', 'width=1400, height=640, top=25, left=0');  d.getElementById("m_voz").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Okey. Vou procurar no Bing algumas imagens de "+algo+".\' autoplay><\/audio>";};
	var pbing_vid = function(video) {abrirWindowB = w.open('http://bing.com/videos/search?q='+video, 'bing', 'width=1400, height=640, top=25, left=0'); d.getElementById("m_voz").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Reuni alguns resultados de vídeo.\' autoplay><\/audio>";};
	// YouTube
	var pyoutube = function(video) {abrirWindowYt = w.open('http://youtube.com/results?search_query='+video, 'yt', 'width=1400, height=640, top=25, left=0'); d.getElementById("m_voz").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Consegui achar esses vídeos de "+video+" no YouTube.\' autoplay><\/audio>";};
	var pyoutube_t = function(video) {abrirWindowYt = w.open('http://youtube.com/results?search_query=allintitle:'+video, 'yt'); d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Estou procurando só pelo título dos vídeos.\' autoplay><\/audio>";};

// A variável "escrever" retorna a pergunta que o usuário fizer usando as palavras "e", "Miley", "me diz", "agora me diz", "me fala", "eu"
	var escrever = function(repeat) {d.getElementById("texto").value = repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};

// A variável "perguntar" e suas variantes retornam um ponto de interrogação ao final da frase.
	var perguntar = function(repeat) {d.getElementById("texto").value = repeat+"?"; /* A variável perguntar_x adiciona uma interrogação ao final da frase */ setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var perguntar_qual = function(repeat) {d.getElementById("texto").value = "qual "+repeat+"?"; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var perguntar_como = function(repeat) {d.getElementById("texto").value = "como "+repeat+"?"; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var perguntar_pq = function(repeat) {d.getElementById("texto").value = "por que "+repeat+"?"; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var perguntar_oque = function(repeat) {d.getElementById("texto").value = "o que "+repeat+"?"; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var perguntar_quantos = function(repeat) {d.getElementById("texto").value = "quantos "+repeat+"?"; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var perguntar_quando = function(repeat) {d.getElementById("texto").value = "quando "+repeat+"?"; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var perguntar_quem = function(repeat) {d.getElementById("texto").value = "quem "+repeat+"?"; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var perguntar_doque = function(repeat) {d.getElementById("texto").value = "do que "+repeat+"?"; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};

// As variáveis "falar_x" permitem que o usuário mantenha uma conversa mesmo estando no modo de comandos
	var falar_eu = function(repeat) {d.getElementById("texto").value = "eu "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_tu = function(repeat) {d.getElementById("texto").value = "tu "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_vc = function(repeat) {d.getElementById("texto").value = "você "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_ele = function(repeat) {d.getElementById("texto").value = "ele "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_nohs = function(repeat) {d.getElementById("texto").value = "nós "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_vcs = function(repeat) {d.getElementById("texto").value = "vocês "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_eles = function(repeat) {d.getElementById("texto").value = "eles "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	
	var falar_o = function(repeat) {d.getElementById("texto").value = "o "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_a = function(repeat) {d.getElementById("texto").value = "a "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_os = function(repeat) {d.getElementById("texto").value = "os "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_as = function(repeat) {d.getElementById("texto").value = "as "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	
	var falar_pq = function(repeat) {d.getElementById("texto").value = "por que "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_que = function(repeat) {d.getElementById("texto").value = "que "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_oi = function(repeat) {d.getElementById("texto").value = "oi"; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_ola = function(repeat) {d.getElementById("texto").value = "olá"; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_obrigado = function(repeat) {d.getElementById("texto").value = "obrigado"; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_obrigada = function(repeat) {d.getElementById("texto").value = "obrigada"; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_me = function(repeat) {d.getElementById("texto").value = "me "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_eh = function(repeat) {d.getElementById("texto").value = "é "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_meu = function(repeat) {d.getElementById("texto").value = "meu "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_minha = function(repeat) {d.getElementById("texto").value = "minha "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_de = function(repeat) {d.getElementById("texto").value = "de "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_e = function(repeat) {d.getElementById("texto").value = "e "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_eai = function(repeat) {d.getElementById("texto").value = "e aí "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_nao = function(repeat) {d.getElementById("texto").value = "não "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_muito = function(repeat) {d.getElementById("texto").value = "muito "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_isso = function(repeat) {d.getElementById("texto").value = "isso "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_isto = function(repeat) {d.getElementById("texto").value = "isto "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_repete = function(repeat) {d.getElementById("texto").value = "repete "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_isto = function(repeat) {d.getElementById("texto").value = "isto "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_fala = function(repeat) {d.getElementById("texto").value = "fala "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_tudo = function(repeat) {d.getElementById("texto").value = "tudo "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_em = function(repeat) {d.getElementById("texto").value = "em "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_diz = function(repeat) {d.getElementById("texto").value = "diz "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_diga = function(repeat) {d.getElementById("texto").value = "diga "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};
	var falar_mas = function(repeat) {d.getElementById("texto").value = "mas "+repeat; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);};

	var conversa = function() {d.location.href = "https://jvribeiro.github.io/miley/miley.html";};

// Abre uma pop-up de ajuda
	var ajuda = function abrirA() {abrirWindowA = w.open('ajuda.html', 'fb', 'width=500, height=700, top=25, left=0'); abrirAjuda(); voz();};
	
// Bloqueia ou desbloqueia o teclado
	var cap = function() {c_cc()};
	
	var lembrarNome = function(nome) {
	d.getElementById("userName").value = nome;
	salvarDados();
	};

	var config = function() {config_voice()};
	var closeConfig = function() {closeConfig_voice()};
	
	var fb_close = function() {abrirFb.close()};
	var pgoogle_close = function fecharG(){fecharWindow = abrirWindowG.close()};
	var pbing_close = function fecharB(){fecharWindow = abrirWindowB.close()};
	var pwiki_close = function fecharW(){fecharWindow = abrirWindowW.close()};
	var pyahoo_close = function fecharY(){fecharWindow = abrirWindowY.close()};
	var pyt_close = function fecharYt(){fecharWindow = abrirWindowYt.close()};
	var ajuda_close = function fecharA(){fecharWindow = abrirWindowA.close()};

var commands = {
	'(o) meu nome é *nome': 			lembrarNome,
	'(você) (pode) me cham(e)(a)(r) de *nome':	lembrarNome,

	'(abrir) configurações':	config,
	'fecha(r) configurações':	closeConfig,

	'(se) atualiza(r) (miley)': refresh,

	'(tchau)(adeus)(se fecha)(bye bye)(good bye)(fechar)': fecharMiley,

	'libera o teclado (miley)':	cap,
// Ajuda
	'ajuda':				ajuda,
	'o que (eu) posso dizer (miley)':	ajuda,
// Histórico de conversa	
	'(me) mostr(a)(e)(r) (noss)(o) histórico (de conversa)(ção) (miley)':	dialog_true,
	'fecha(r) (noss)(o)(esse) histórico (de conversa)(ção) (miley)':	dialog_false,
	'fecha isso (miley)':							dialog_false,
// Fazer a Miley responder mesmo no modo de comando
	'agora me diz *repeat':	escrever,
	'pergunta *repeat':			perguntar,
	'tenho uma dúvida *repeat':		perguntar,
	'tenho uma pergunta *repeat':		perguntar,
	'e se eu (te)(lhe) perguntar *repeat':	perguntar,
	'qual *repeat':				perguntar_qual,
	'como *repeat':				perguntar_como,
	'o (que é) que *repeat':		perguntar_oque,
	'quantos *repeat':			perguntar_quantos,
	'quando *repeat':			perguntar_quando,
	'quem *repeat':				perguntar_quem,
	'do que *repeat':			perguntar_doque,
	'(pergunta)(e) porque *repeat':		perguntar_pq, /*-------------------------*/
	'(pergunta)(e) por que *repeat':	perguntar_pq, //  Aqui se encontram as   //
	'(pergunta)(e) porquê *repeat':		perguntar_pq, // Variações dos "porquês" //
	'(pergunta)(e) por quê *repeat':	perguntar_pq, /*-------------------------*/
//
	
	'eu *repeat':		falar_eu,
	'tu *repeat':		falar_tu,
	'você *repeat':		falar_vc,
	'ele *repeat':		falar_ele,
	'nós *repeat':		falar_nohs,
	'vocês *repeat':	falar_vcs,
	'eles *repeat':		falar_eles,
	
	'o *repeat':		falar_o,
	'a *repeat':		falar_a,
	'os *repeat':		falar_os,
	'as *repeat':		falar_as,
	
	'que *repeat':		falar_que,
	'porque *repeat':	falar_pq,
	'por que *repeat':	falar_pq,
	'porquê *repeat':	falar_pq,
	'por quê *repeat':	falar_pq,
	'é *repeat':		falar_eh,
	'(o) meu *repeat':	falar_meu,
	'(a) minha *repeat':	falar_minha,
	'de *repeat':		falar_de,
	'oi (miley)':		falar_oi,
	'olá (miley)':		falar_ola,
	'e aí (miley)':		falar_eai,
	'não *repeat':		falar_nao,
	'muito *repeat':	falar_muito,
	'isso *repeat':		falar_isso,
	'isto *repeat':		falar_isto,
	'repete *repeat':	falar_repete,
	'me *repeat':		falar_me,
	'fala *repeat':		falar_fala,
	'tudo *repeat':		falar_tudo,
	'em *repeat':		falar_em,
	'diz *repeat':		falar_diz,
	'diga *repeat':		falar_diga,
	'mas *repeat':		falar_mas,
	
	'(miley) (muito) obrigado (mesmo) (miley)':	falar_obrigado,
	'(miley) (muito) obrigada (mesmo) (miley)':	falar_obrigada,
	
// Mudar para o modo de conversa (não executa comandos)
	'quero conversar (miley)':	conversa,
	'modo de conversa (miley)':	conversa,
	'vamos conversar (miley)':	conversa,
	'miley':		alfa,
	'ei':			alfa,
// 1
	'(abre)(abrir) (aí) (o) face(book) (aí) (miley)':	fb,
	'início':						fb,
	'feed de notícias':					fb,
	'feed':							fb,
	'mostra (o) (meu) feed (miley)':			fb,
	'volta pro feed (miley)':				fb,
	'volta pro início (miley)':				fb,
	
	'(me) (mostra)(mostre-me) (as)(os) (publicações)(posts) (mais) recentes (do) face(book) (miley)':	fbrec,
	'(me) (mostra)(mostre-me) (as)(os) (publicações)(posts) (mais) populares (do) face(book) (miley)':	fbpop,
// 2
	'abrir perfil':			fbperfil,
	'abre o meu perfil (miley)':	fbperfil,
	'abre o perfil (miley)':	fbperfil,
	'mostra o meu perfil (miley)':	fbperfil,
	'agora o meu perfil (miley)':	fbperfil,
	'facebook perfil':		fbperfil,
	'perfil':			fbperfil,
// 3
	'abrir álbuns':				fbalbum,
	'quero ver as (minhas) fotos (miley)':	fbalbum,
	'fotos':				fbalbum,
	'mostra as minhas fotos (miley)':	fbalbum,
	'abre as fotos (miley)':		fbalbum,
	'agora as fotos (miley)':		fbalbum,
	'abre as minhas fotos do face (miley)':	fbalbum,
	'facebook álbuns':			fbalbum,
// 4
	'abrir mensagens':			fbmensagens,
	'mensagens':				fbmensagens,
	'abre as minhas mensagens (miley)':	fbmensagens,
	'mostra as minhas mensagens (miley)':	fbmensagens,
	'facebook mensagens':			fbmensagens,
// 5
	'me (mostra) (as) notificações (miley)':		fbnotificacoes,
	'mostra as notificações (miley)':			fbnotificacoes,
	'abre (pra mim) as notificações (pra mim) (miley)':	fbnotificacoes,
	'facebook notificações':				fbnotificacoes,
	'(agora) fecha(r) (o) face(book) (aí) (pra mim) (miley)':		fb_close,
// 7
	'pesquis(a)(e)(r) (global)(mente) (sobre) *algo':		p_global,
	// Google
	'(abre) (aí) (o) google (pra mim) (miley)':			google,
	'pesquis(a)(e)(r) no google *algo':				pgoogle,
	'procur(a)(e)(r) p(or)(elo)(s)(ela)(s) :algo no google':		pgoogle,
	'pesquisa(r) (por) :algo no google':				pgoogle,
	'quanto é *algo':						pgoogle,
	'google *algo':							pgoogle,
	'(agora) fech(a)(o)(e)(r) (o) google (aí) (pra mim) (miley)':		pgoogle_close,
	
	'(procura)(vê)(olha) na wikipédia quem é *algo':			pwiki,
	'(procura)(vê)(olha) na wikipédia o que é *algo':			pwiki,
	'procur(a)(o)(e)(r) p(or)(elo)(s)(ela)(s) :algo na wikipédia':		pwiki,
	'(agora) fech(a)(o)(e)(r) (o)(a) wikipédia (aí) (pra mim) (miley)':	pwiki_close,
	
// 8
	'(abre)(abrir) (o) bing (miley)':			bing,
	'pesquis(a)(o)(e)(r) :algo no bing':				pbing,
	'procur(a)(o)(e)(r) p(or)(elo)(ela) :algo no bing':		pbing,
	'bing *algo':						pbing,
	'(agora) fech(a)(o)(r) (o) bing (aí) (pra mim) (miley)':	pbing_close,
// 9
	'procur(a)(o)(e)(r) (por) image(ns)(m) de *algo':			pbing_img,
	'procur(a)(o)(e)(r) (por) foto(s) de *algo':				pbing_img,
	'me mostr(a)(e) (foto)(image)(m)(n)(s) d(e)(o)(a)(os)(as) *algo':	pbing_img,
	'mostr(a)(e) (foto)(image)(m)(n)(s) d(e)(o)(a)(os)(as) *algo':		pbing_img,
	'image(ns)(m) d(e)(a)(os)(as) *algo':					pbing_img,
// 10
	'procura no youtube por *video':			pyoutube,
	'procura o vídeo *video':				pyoutube_t,
	'procurar p(or)(elo)(s)(ela)(s) :video no youtube':	pyoutube,
	'procurar (o)(a)(os)(as) :video no youtube':		pyoutube,
	'youtube *video': 					pyoutube,
// 11
	'procura (pel)(o) vídeo *video':					pbing_vid,
	'acha o (vídeo) *video':						pbing_vid,
	'quero assistir o (vídeo)(filme) *video':				pbing_vid,
	'quero assistir (o)(a)(os)(as) *video':					pbing_vid,
	'(procura)(acha)(pesquisa) (um) vídeo(s) d(e)(o)(a)(os)(as) *video':	pbing_vid
};

annyang.debug(); annyang.addCommands(commands); annyang.setLanguage('pt-BR');
annyang.addCallback('resultNoMatch', function() {
d.getElementById("texto").value = ""; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);
});

annyang.addCallback('errorPermissionDenied', function() {
d.getElementById("texto").value = "000111011010101011111000010101000110011000111111001010101010101101001100101001010010010110100"; setTimeout(rotina(), 100); setTimeout(voz(), 100); setTimeout(espera(), 100);
});

annyang.start();
}

else {voz()}
