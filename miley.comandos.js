//! annyang
//! version : 1.1.0
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://www.TalAter.com/annyang/
(function(a){"use strict";var b=this,c=b.SpeechRecognition||b.webkitSpeechRecognition||b.mozSpeechRecognition||b.msSpeechRecognition||b.oSpeechRecognition;if(!c)return b.annyang=null,a;var d,e,f=[],g={start:[],error:[],end:[],result:[],resultMatch:[],resultNoMatch:[],errorNetwork:[],errorPermissionBlocked:[],errorPermissionDenied:[]},h=0,i=!1,j="font-weight: bold; color: #008b00;",k=/\s*\((.*?)\)\s*/g,l=/(\(\?:[^)]+\))\?/g,m=/(\(\?)?:\w+/g,n=/\*\w+/g,o=/[\-{}\[\]+?.,\\\^$|#]/g,p=function(a){return a=a.replace(o,"\\$&").replace(k,"(?:$1)?").replace(m,function(a,b){return b?a:"([^\\s]+)"}).replace(n,"(.*?)").replace(l,"\\s*$1?\\s*"),new RegExp("^"+a+"$","i")},q=function(a){a.forEach(function(a){a.callback.apply(a.context)})},r=function(){d===a&&b.annyang.init({},!1)};b.annyang={init:function(k,l){l=l===a?!0:!!l,d&&d.abort&&d.abort(),d=new c,d.maxAlternatives=5,d.continuous=!0,d.lang="pt-BR",d.onstart=function(){q(g.start)},d.onerror=function(a){switch(q(g.error),a.error){case"network":q(g.errorNetwork);break;case"not-allowed":case"service-not-allowed":e=!1,(new Date).getTime()-h<200?q(g.errorPermissionBlocked):q(g.errorPermissionDenied)}},d.onend=function(){if(q(g.end),e){var a=(new Date).getTime()-h;1e3>a?setTimeout(b.annyang.start,1e3-a):b.annyang.start()}},d.onresult=function(a){q(g.result);for(var c,d=a.results[a.resultIndex],e=0;e<d.length;e++){c=d[e].transcript.trim(),i&&b.console.log("Comando reconhecido: %c"+c,j);for(var h=0,k=f.length;k>h;h++){var l=f[h].command.exec(c);if(l){var m=l.slice(1);return i&&(b.console.log("comando confere com: %c"+f[h].originalPhrase,j),m.length&&b.console.log("com os parametros",m)),f[h].callback.apply(this,m),q(g.resultMatch),!0}}}return q(g.resultNoMatch),!1},l&&(f=[]),k.length&&this.addCommands(k)},start:function(b){r(),b=b||{},e=b.autoRestart!==a?!!b.autoRestart:!0,h=(new Date).getTime(),d.start()},abort:function(){r(),e=!1,d.abort()},debug:function(a){i=arguments.length>0?!!a:!0},setLanguage:function(a){r(),d.lang=a},addCommands:function(a){var c,d;r();for(var e in a)if(a.hasOwnProperty(e)){if(c=b[a[e]]||a[e],"function"!=typeof c)continue;d=p(e),f.push({command:d,callback:c,originalPhrase:e})}i&&b.console.log("Comandos carregados: %c"+f.length,j)},removeCommands:function(a){a=Array.isArray(a)?a:[a],f=f.filter(function(b){for(var c=0;c<a.length;c++)if(a[c]===b.originalPhrase)return!1;return!0})},addCallback:function(c,d,e){if(g[c]!==a){var f=b[d]||d;"function"==typeof f&&g[c].push({callback:f,context:e||this})}}}}).call(this);

// * miley.comandos.js
// * Versão: 1.0.7
// * Autor: Victor Ribeiro (https://twitter.com/JVRibeiiro)

"use strict";

var w = window;
var d = document;
var nome = w.localStorage.getItem('nome');
var gen = w.localStorage.getItem('genero');
var permissaoNegada = "000111011010101011111000010101000110011000111111001010101010101101001100101001010010010110100";

function _EaDsVr() {
espera(); rotina(); voz();
};


if (annyang) {
	var fecharMiley = function() {w.location.href = "about:blank";};
	var refresh = function() {w.location.reload();};
	var dialog_true = function() {d.getElementById("dialogo").style.display = "block"; d.getElementById("resposta").value = "Certo. Aqui está nosso histórico de conversa."; voz();}; // Mostra o histórico de conversação da sessão
	var dialog_false = function() {d.getElementById("dialogo").style.display = "none";  d.getElementById("resposta").value = "Entendido. Ocultei nosso histórico de conversa."; voz();}; // Esconde o histórico de conversação da sessão
	var alfa = function() {self.focus();};

// Navegação nas páginas do Facebook
	var fb = function() {abrirFb = w.open('http://www.facebook.com/', 'fb', 'width=1400, height=640, top=25, left=0'); d.getElementById("resposta").value = "Tudo bem. Estou abrindo sua rede social, "+gen+" "+nome+"."; voz();};
	var fbrec = function() {abrirFb = w.open('http://www.facebook.com/?sk=h_chr', 'fb', 'width=1400, height=640, top=25, left=0'); d.getElementById("resposta").value = "Okey. Mostrando as publicações mais recentes do feicebook."; voz();};
	var fbpop = function() {abrirFb = w.open('http://www.facebook.com/?sk=h_nor', 'fb', 'width=1400, height=640, top=25, left=0'); d.getElementById("resposta").value = "Okey. Mostrando as publicações mais populares do feicebook."; voz();};
	var fbperfil = function() {abrirFb = w.open('http://www.facebook.com/profile.php', 'fb'); d.getElementById("resposta").value = "Tudo bem. Estou abrindo seu perfil do feicebook, "+nome+"."; voz();};
	var fbalbum = function() {abrirFb = w.open('http://www.facebook.com/photos.php', 'fb'); d.getElementById("resposta").value = "Aguarde. Vou abrir suas fotos do feicebook."; voz();};
	var fbmensagens = function() {abrirFb = w.open('http://www.facebook.com/messages', 'fb'); d.getElementById("resposta").value = "Vou tentar abrir suas mensagens."; voz();};
	var fbnotificacoes = function() {abrirFb = w.open('http://www.facebook.com/notifications.php', 'fb'); d.getElementById("resposta").value = "Certo. Estou abrindo suas notificações."; voz();};
	
// Pesquisa global nos navegadores mais conhecidos - Google, Bing, Yahoo
	var p_global = function(algo) {
		abrirWindowG = w.open('http://google.com/#q='+algo, 'google', 'width=700, height=700, top=25, left=0'); 
		abrirWindowB = w.open('http://bing.com/search?q='+algo, 'bing', 'width=700, height=700, top=25, left=500');
		abrirWindowY = w.open('http://br.search.yahoo.com/search;_ylt=Anmgv8ykk.JD03hZwN3Ah2eU7q5_?p='+algo+'&toggle=1&cop=mss&ei=UTF-8&fr=yfp-t-403&fp=1', 'yahoo', 'width=800, height=700, top=25, left=800');
	d.getElementById("resposta").value = "Tá bom. Vou procurar nos melhores mecanismos de buscas por "+algo+"."; voz();};

var g1 = function(algo) {abrirWindowG1 = w.open('http://g1.globo.com/', 'g1', 'width=1400, height=640, top=25, left=0'); d.getElementById("resposta").value = "Okey. Vou abrir o G1."; voz();};
// Pesquisa individual - Google, Bing, Yahoo
	// Google
	var google = function(algo) {abrirWindowG = w.open('http://google.com/', 'google', 'width=1400, height=640, top=25, left=0'); d.getElementById("resposta").value = "Okey. Vou abrir o Google."; voz();};
	var pgoogle = function(algo) {abrirWindowG = w.open('http://google.com/#q='+algo, 'google', 'width=1400, height=640, top=25, left=0'); d.getElementById("resposta").value = "Okey. Vou procurar por "+algo+" no Google."; voz();};
	// Wikipédia
	var pwiki = function(algo) {abrirWindowW = w.open('http://pt.wikipedia.com/wiki/'+algo, 'wiki', 'width=1400, height=640, top=25, left=0'); d.getElementById("resposta").value = "Vamos ver na Wikipédia."; voz();};
	// Bing
	var bing = function(algo) {abrirWindowB = w.open('http://bing.com/', 'bing', 'width=1400, height=640, top=25, left=0'); d.getElementById("resposta").value = "Certo. Vou abrir o Bing."; voz();};
	var pbing = function(algo) {abrirWindowB = w.open('http://bing.com/search?q='+algo, 'bing', 'width=1400, height=640, top=25, left=0'); d.getElementById("resposta").value = "Certo. Vou usar o Bing para fazer a busca."; voz();};
	var pbing_img = function(algo) {abrirWindowB = w.open('http://bing.com/images/search?q='+algo, 'bing', 'width=1400, height=640, top=25, left=0');  d.getElementById("m_voz").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8kOkey. Vou procurar no Bing algumas imagens de "+algo+"."; voz();};
	var pbing_vid = function(video) {abrirWindowB = w.open('http://bing.com/videos/search?q='+video, 'bing', 'width=1400, height=640, top=25, left=0'); d.getElementById("m_voz").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8kReuni alguns resultados de vídeo."; voz();};
	// Yahoo!
	var yahoo = function(algo) {abrirWindowY = w.open('http://br.yahoo.com/', 'yahoo', 'width=1400, height=640, top=25, left=0'); d.getElementById("resposta").value = "Okey. Vou abrir o Yahoo."; voz();};
	var pyahoo = function(algo) {abrirWindowY = w.open('http://br.search.yahoo.com/search;_ylt=Anmgv8ykk.JD03hZwN3Ah2eU7q5_?p='+algo+'&toggle=1&cop=mss&ei=UTF-8&fr=yfp-t-403&fp=1', 'yahoo', 'width=1400, height=640, top=25, left=0'); d.getElementById("resposta").value = "Okey. Vou procurar por "+algo+" no Yahoo."; voz();};
	// YouTube
	var pyoutube = function(video) {abrirWindowYt = w.open('http://youtube.com/results?search_query='+video, 'yt', 'width=1400, height=640, top=25, left=0'); d.getElementById("m_voz").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8kConsegui achar esses vídeos de "+video+" no YouTube."; voz();};
	var pyoutube_t = function(video) {abrirWindowYt = w.open('http://youtube.com/results?search_query=allintitle:'+video, 'yt'); d.getElementById("resposta").value = "Estou procurando só pelo título dos vídeos."; voz();};

	var escrever = function(repeat) {d.getElementById("texto").value = repeat; _EaDsVr();};

// A variável "perguntar" e suas variantes retornam um ponto de interrogação ao final da frase.
	var perguntar = function(repeat) {d.getElementById("texto").value = repeat+"?"; /* A variável perguntar_x adiciona uma interrogação ao final da frase */ _EaDsVr();};
	var perguntar_qual = function(repeat) {d.getElementById("texto").value = "Qual "+repeat+"?"; _EaDsVr();};
	var perguntar_como = function(repeat) {d.getElementById("texto").value = "Como "+repeat+"?"; _EaDsVr();};
	var perguntar_pq = function(repeat) {d.getElementById("texto").value = "Por que "+repeat+"?"; _EaDsVr();};
	var perguntar_oque = function(repeat) {d.getElementById("texto").value = "O que "+repeat+"?"; _EaDsVr();};
	var perguntar_quantos = function(repeat) {d.getElementById("texto").value = "Quantos "+repeat+"?"; _EaDsVr();};
	var perguntar_quando = function(repeat) {d.getElementById("texto").value = "Quando "+repeat+"?"; _EaDsVr();};
	var perguntar_quem = function(repeat) {d.getElementById("texto").value = "Quem "+repeat+"?"; _EaDsVr();};
	var perguntar_doque = function(repeat) {d.getElementById("texto").value = "Do que "+repeat+"?"; _EaDsVr();};

// As variáveis "falar_x" permitem que o usuário mantenha uma conversa mesmo estando no modo de comandos
	var falar_eu = function(repeat) {d.getElementById("texto").value = "Eu "+repeat; _EaDsVr();};
	var falar_tu = function(repeat) {d.getElementById("texto").value = "Tu "+repeat; _EaDsVr();};
	var falar_vc = function(repeat) {d.getElementById("texto").value = "Você "+repeat; _EaDsVr();};
	var falar_ele = function(repeat) {d.getElementById("texto").value = "Ele "+repeat; _EaDsVr();};
	var falar_nohs = function(repeat) {d.getElementById("texto").value = "Nós "+repeat; _EaDsVr();};
	var falar_vcs = function(repeat) {d.getElementById("texto").value = "Vocês "+repeat; _EaDsVr();};
	var falar_eles = function(repeat) {d.getElementById("texto").value = "Eles "+repeat; _EaDsVr();};
// Artigos definidos
	var falar_o = function(repeat) {d.getElementById("texto").value = "O "+repeat; _EaDsVr();};
	var falar_a = function(repeat) {d.getElementById("texto").value = "A "+repeat; _EaDsVr();};
	var falar_os = function(repeat) {d.getElementById("texto").value = "Os "+repeat; _EaDsVr();};
	var falar_as = function(repeat) {d.getElementById("texto").value = "As "+repeat; _EaDsVr();};
// Artigos indefinidos
	var falar_um = function(repeat) {d.getElementById("texto").value = "Um "+repeat; _EaDsVr();};
	var falar_uma = function(repeat) {d.getElementById("texto").value = "Uma "+repeat; _EaDsVr();};
	var falar_uns = function(repeat) {d.getElementById("texto").value = "Uns "+repeat; _EaDsVr();};
	var falar_umas = function(repeat) {d.getElementById("texto").value = "Umas "+repeat; _EaDsVr();};

	var falar_pq = function(repeat) {d.getElementById("texto").value = "Por que "+repeat; _EaDsVr();};
	var falar_que = function(repeat) {d.getElementById("texto").value = "Que "+repeat; _EaDsVr();};
	var falar_oi = function(repeat) {d.getElementById("texto").value = "Oi"; _EaDsVr();};
	var falar_ola = function(repeat) {d.getElementById("texto").value = "Olá"; _EaDsVr();};
	var falar_obrigado = function(repeat) {d.getElementById("texto").value = "Obrigado"; _EaDsVr();};
	var falar_obrigada = function(repeat) {d.getElementById("texto").value = "Obrigada"; _EaDsVr();};
	var falar_eh = function(repeat) {d.getElementById("texto").value = "É "+repeat; _EaDsVr();};
	var falar_meu = function(repeat) {d.getElementById("texto").value = "Meu "+repeat; _EaDsVr();};
	var falar_minha = function(repeat) {d.getElementById("texto").value = "Minha "+repeat; _EaDsVr();};
	var falar_de = function(repeat) {d.getElementById("texto").value = "De "+repeat; _EaDsVr();};
	var falar_e = function(repeat) {d.getElementById("texto").value = "E "+repeat; _EaDsVr();};
	var falar_eai = function(repeat) {d.getElementById("texto").value = "E aí "+repeat; _EaDsVr();};
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

	var conversa = function() {d.location.href = "https://jvribeiro.github.io/miley/miley.html";};

// Abre uma pop-up de ajuda
	var ajuda = function abrirA() {abrirWindowA = w.open('ajuda.html', 'ajuda', 'width=500, height=700, top=25, left=0'); abrirAjuda(); voz();};
	
// Bloqueia ou desbloqueia o teclado
	var cap = function() {c_cc()};
	
	var lembrarNome = function(nome) {
	d.getElementById("userName").value = nome;
	salvarDados();
	};

	var config = function() {config_voice(); autocom()};
	var closeConfig = function() {closeConfig_voice()};
	
	var fb_close = function() {abrirFb.close()};
	var pgoogle_close = function() {abrirWindowG.close()};
	var pbing_close = function() {abrirWindowB.close()};
	var pwiki_close = function() {abrirWindowW.close()};
	var pyahoo_close = function() {abrirWindowY.close()};
	var pyt_close = function() {abrirWindowYt.close()};
	var g1_close = function() {abrirWindowG1.close()};
	var ajuda_close = function() {abrirWindowA.close()};

var commands = {
	'(você) (pode) me cham(e)(a)(r) de :nome (miley)':	lembrarNome,

	'(agora) (abrir)(abre as) configurações (por favor) (miley) (por favor)':	config,
	'(agora) fecha(r) (as) configurações (por favor) (miley) (por favor)':		closeConfig,

	'(se) atualiza(r) (por favor) (miley) (por favor)': refresh,

	'tchau': fecharMiley,
	'adeus': fecharMiley,
	'se fecha': fecharMiley,
	'bye bye': fecharMiley,
	'good bye': fecharMiley,

	'libera o teclado (por favor) (miley) (por favor)':	cap,
	'bloqueia o teclado (por favor) (miley) (por favor)':	cap,
// Ajuda
	'ajuda':				ajuda,
	'o que (eu) posso dizer (miley)':	ajuda,
	'(agora) fecha(r) (a) (página de) ajuda (aí) (pra mim) (por favor) (miley) (por favor)':	ajuda_close,
// Histórico de conversa	
	'me mostr(a)(e)(r) (noss)(o) histórico (de conversa)(ção) (por favor) (miley) (por favor)':	dialog_true,
	'mostr(a)(e)(r) (noss)(o) histórico (de conversa)(ção) (por favor) (miley) (por favor)':	dialog_true,
	'fecha(r) (noss)(o)(esse) histórico (de conversa)(ção) (por favor) (miley) (por favor)':	dialog_false,
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
	'(pergunta)(e) porque *repeat pergunta':		perguntar_pq, /*-------------------------*/
	'(pergunta)(e) por que *repeat pergunta':		perguntar_pq, //  Aqui se encontram as   //
	'(pergunta)(e) porquê *repeat pergunta':		perguntar_pq, // Variações dos "porquês" //
	'(pergunta)(e) por quê *repeat pergunta':		perguntar_pq, /*-------------------------*/
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
	'um *repeat':		falar_um,
	'uma *repeat':		falar_uma,
	'uns *repeat':		falar_uns,
	'umas *repeat':		falar_umas,
	
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
	
	'(miley) (muito) obrigado (mesmo) (miley)':	falar_obrigado,
	'(miley) (muito) obrigada (mesmo) (miley)':	falar_obrigada,
	
// Mudar para o modo de conversa (não executa comandos)
//	'quero conversar (miley)':	conversa, ************ Função desabilitada
//	'modo de conversa (miley)':	conversa,
//	'vamos conversar (miley)':	conversa,

	'miley':		alfa,
	'ei':			alfa,
// 1

	'me mostra as notícias de hoje': g1,
	'(agora) fecha(r) (o) g1 (aí) (pra mim) (por favor) (miley) (por favor)':		g1_close,
	'(abre)(abrir) (aí) (o) face(book) (aí) (por favor) (miley) (por favor)':	fb,
	'início (do) (face)(book)':							fb,
	'feed de notícias (do) (face)(book)':						fb,
	'feed (do) (face)(book)':							fb,
	'mostra (o) (meu) feed (do) (face)(book) (por favor) (miley) (por favor)':	fb,
	'volta pro feed (por favor) (miley) (por favor)':				fb,
	'volta pro início (por favor) (miley) (por favor)':				fb,
	
	'me (mostra)(mostre-me) (as)(os) (publicações)(posts) (mais) recentes (do) face(book) (por favor) (miley) (por favor)':	fbrec,
	'(mostra)(mostre-me) (as)(os) (publicações)(posts) (mais) recentes (do) face(book) (por favor) (miley) (por favor)':	fbrec,
	'me (mostra)(mostre-me) (as)(os) (publicações)(posts) (mais) populares (do) face(book) (por favor) (miley) (por favor)':	fbpop,
	'(mostra)(mostre-me) (as)(os) (publicações)(posts) (mais) populares (do) face(book) (por favor) (miley) (por favor)':	fbpop,
// 2
	'abrir perfil (do) (face)(book)':					fbperfil,
	'abre o meu perfil (do) (face)(book) (por favor) (miley) (por favor)':	fbperfil,
	'abre o perfil (do) (face)(book) (por favor) (miley) (por favor)':	fbperfil,
	'mostra o meu perfil (do) (face)(book) (por favor) (miley) (por favor)':fbperfil,
	'agora o meu perfil (do) (face)(book) (por favor) (miley) (por favor)':	fbperfil,
	'facebook perfil':							fbperfil,
	'perfil (do) (face)(book)':						fbperfil,
// 3
	'abrir álbuns':				fbalbum,
	'quero ver as (minhas) fotos (do) (face)(book) (miley)':	fbalbum,
	'fotos':				fbalbum,
	'mostra as minhas fotos (do) (face)(book) (por favor) (miley) (por favor)':	fbalbum,
	'abre as fotos (do) (face)(book) (por favor) (miley) (por favor)':		fbalbum,
	'agora as (minhas) fotos (do) (face)(book) (por favor) (miley) (por favor)':		fbalbum,
	'abre as minhas fotos do face(book) (por favor) (miley) (por favor)':	fbalbum,
	'facebook álbuns':			fbalbum,
// 4
	'abrir mensagens':			fbmensagens,
	'mensagens':				fbmensagens,
	'abre as minhas mensagens (por favor) (miley) (por favor)':	fbmensagens,
	'(me) mostra as minhas mensagens (por favor) (miley) (por favor)':	fbmensagens,
	'facebook mensagens':			fbmensagens,
// 5
	'me (mostra) (as) notificações (do) (face)(book) (por favor) (miley) (por favor)':		fbnotificacoes,
	'mostra as notificações (do) (face)(book) (por favor) (miley) (por favor)':			fbnotificacoes,
	'abre (pra mim) as notificações (do) (face)(book) (pra mim) (por favor) (miley) (por favor)':	fbnotificacoes,
	'facebook notificações':				fbnotificacoes,
	'(agora) fecha(r) (o) face(book) (aí) (pra mim) (por favor) (miley) (por favor)':		fb_close,
// 7
	'pesquis(a)(e)(r) (global)(mente) (sobre) *algo':		p_global,
	// Google
	'(abre) (aí) (o) google (pra mim) (miley)':			google,
	'pesquis(a)(e)(r) no google *algo':				pgoogle,
	'procur(a)(e)(r) p(or)(elo)(s)(ela)(s) *algo no google':		pgoogle,
	'pesquisa(r) (por) *algo no google':				pgoogle,
	'quanto é *algo':						pgoogle,
	'google *algo':							pgoogle,
	'(agora) fech(a)(o)(e)(r) (o) google (aí) (pra mim) (miley)':		pgoogle_close,
	
	// Yahoo!
	'(abre) (aí) (o) yahoo (pra mim) (miley)':			yahoo,
	'pesquis(a)(e)(r) no yahoo *algo':				pyahoo,
	'procur(a)(e)(r) p(or)(elo)(s)(ela)(s) *algo no yahoo':		pyahoo,
	'pesquisa(r) (por) *algo no yahoo':				pyahoo,
	'yahoo *algo':							pyahoo,
	'(agora) fech(a)(o)(e)(r) (o) yahoo (aí) (pra mim) (miley)':		pyahoo_close,
	
	'(procura)(vê)(olha) na wikipédia quem (é)(foi)(era) *algo':			pwiki,
	'(procura)(vê)(olha) na wikipédia o que (é)(foi)(era) *algo':			pwiki,
	'procur(a)(o)(e)(r) p(or)(elo)(s)(ela)(s) *algo na wikipédia':		pwiki,
	'(agora) fech(a)(o)(e)(r) (o)(a) wikipédia (aí) (pra mim) (miley)':	pwiki_close,
	
// 8
	'(abre)(abrir) (o) bing (miley)':			bing,
	'pesquis(a)(o)(e)(r) *algo no bing':				pbing,
	'procur(a)(o)(e)(r) p(or)(elo)(s)(ela)(s) *algo no bing':		pbing,
	'bing *algo':						pbing,
	'(agora) fech(a)(o)(r) (o) bing (aí) (pra mim) (miley)':	pbing_close,
// 9
	'procur(a)(o)(e)(r) (por) image(ns)(m) de *algo':			pbing_img,
	'pesquis(a)(o)(e)(r) (por) image(ns)(m) de *algo':			pbing_img,
	'procur(a)(o)(e)(r) (por) foto(s) de *algo':				pbing_img,
	'pesquis(a)(o)(e)(r) (por) foto(s) de *algo':				pbing_img,
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
	'acha o vídeo *video':							pbing_vid,
	'quero assistir (o)(a)(os)(as) *video':					pbing_vid,
	'(procura)(acha)(pesquisa) (um) vídeo(s) d(e)(o)(a)(os)(as) *video':	pbing_vid
};

annyang.debug(); 
annyang.addCommands(commands); 
annyang.setLanguage('pt-BR');
annyang.addCallback('resultNoMatch', function() {d.getElementById("texto").value = "Comando desconhecido."; _EaDsVr();
});
annyang.addCallback('errorPermissionDenied', function() {d.getElementById("texto").value = permissaoNegada; _EaDsVr();
});

annyang.start();
}

else {voz()}
