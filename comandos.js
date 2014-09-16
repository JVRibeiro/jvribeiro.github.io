/*comandos.js
Autor: Victor Ribeiro (http://fb.com/ovictorribeiro)
Usando: 
Este arquivo faz parte do projeto Miley.*/

var w = window;
var d = document;
var _apikey = "8f0b4a57a6ac49a683224f7bb8d795e9"; // cd58d3ed06b54f7fa19979932b4ddd40 - 8f0b4a57a6ac49a683224f7bb8d795e9
var _codec = "mp3"; // mp3 - ogg - wav - aac - caff
"use strict"; if (annyang) 
{	var fecharMiley = function() {window.location.href = "about:blank";};
	var refresh = function() {w.location.reload();};
	var dialog_true = function() {d.getElementById("dialogo").style.display = "block"; d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Certo. Aqui está nosso histórico de conversa.\' autoplay><\/audio>";}; // Mostra o histórico de conversação da sessão
	var dialog_false = function() {d.getElementById("dialogo").style.display = "none";  d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Entendido. Ocultei nosso histórico de conversa.\' autoplay><\/audio>";}; // Esconde o histórico de conversação da sessão
	var alfa = function() {alert('Estou aqui.'); d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Deseja algo?\' autoplay><\/audio>";};
// Navegação nas páginas do Facebook
	var fb = function abrirFB() {abrirWindowFb = w.open('https://www.facebook.com/', 'fb', 'width=1400, height=640, top=25, left=0'); d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Tudo bem. Estou abrindo o feicebook.\' autoplay><\/audio>";};
	var fbrec = function abrirFB() {abrirWindowFb = w.open('https://www.facebook.com/?sk=h_chr', 'fbrec', 'width=1400, height=640, top=25, left=0'); d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Okey. Mostrando as publicações mais recentes.\' autoplay><\/audio>";};
	var fbpop = function abrirFB() {abrirWindowFb = w.open('https://www.facebook.com/?sk=h_nor', 'fbpop', 'width=1400, height=640, top=25, left=0'); d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Okey. Mostrando as publicações mais populares.\' autoplay><\/audio>";};
	var fbperfil = function abrirFB() {abrirWindowFb = w.open('https://www.facebook.com/profile.php', 'fbperfil'); d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Tudo bem. Estou abrindo seu perfil do feicebook.\' autoplay><\/audio>";};
	var fbalbum = function abrirFB() {abrirWindowFb = w.open('https://www.facebook.com/photos.php', 'fbalbum'); d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Aguarde. Vou abrir suas fotos do feicebook.\' autoplay><\/audio>";};
	var fbmensagens = function abrirFB() {abrirWindowFb = w.open('https://www.facebook.com/messages', 'fbmensagens'); d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Vou tentar abrir suas mensagens.\' autoplay><\/audio>";};
	var fbnotificacoes = function abrirFB() {abrirWindowFb = w.open('https://www.facebook.com/notifications.php', 'fbnotificacoes'); d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Certo. Estou abrindo suas notificações.\' autoplay><\/audio>";};
// Pesquisa global nos navegadores mais conhecidos - Google, Bing, Yahoo
	var p_global = function(algo) {
		abrirWindowG = w.open('https://google.com/#q='+algo, 'google', 'width=700, height=700, top=25, left=0'); 
		abrirWindowB = w.open('https://bing.com/search?q='+algo, 'bing', 'width=700, height=700, top=25, left=500');
		abrirWindowY = w.open('https://br.search.yahoo.com/search;_ylt=Anmgv8ykk.JD03hZwN3Ah2eU7q5_?p='+algo+'&toggle=1&cop=mss&ei=UTF-8&fr=yfp-t-403&fp=1', 'yahoo', 'width=800, height=700, top=25, left=800');
	d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Tá. Vou procurar nos melhores mecanismos de buscas por "+algo+".\' autoplay><\/audio>";};
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
	var escrever = function(repeat) {d.getElementById("texto").value = repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
// A variável "perguntar" e suas variantes retornam um ponto de interrogação ao final da frase.
	var perguntar = function(repeat) {d.getElementById("texto").value = repeat+"?"; /* A variável perguntar_x adiciona uma interrogação ao final da frase */ setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var perguntar_qual = function(repeat) {d.getElementById("texto").value = "qual "+repeat+"?"; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var perguntar_como = function(repeat) {d.getElementById("texto").value = "como "+repeat+"?"; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var perguntar_pq = function(repeat) {d.getElementById("texto").value = "por que "+repeat+"?"; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var perguntar_oque = function(repeat) {d.getElementById("texto").value = "o que "+repeat+"?"; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var perguntar_quantos = function(repeat) {d.getElementById("texto").value = "quantos "+repeat+"?"; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var perguntar_quando = function(repeat) {d.getElementById("texto").value = "quando "+repeat+"?"; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var perguntar_quem = function(repeat) {d.getElementById("texto").value = "quem "+repeat+"?"; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var perguntar_doque = function(repeat) {d.getElementById("texto").value = "do que "+repeat+"?"; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
// As variáveis "falar_x" permitem que o usuário mantenha uma conversa mesmo estando no modo de comandos
	var falar_eu = function(repeat) {d.getElementById("texto").value = "eu "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_tu = function(repeat) {d.getElementById("texto").value = "tu "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_vc = function(repeat) {d.getElementById("texto").value = "você "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_ele = function(repeat) {d.getElementById("texto").value = "ele "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_nohs = function(repeat) {d.getElementById("texto").value = "nós "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_vcs = function(repeat) {d.getElementById("texto").value = "vocês "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_eles = function(repeat) {d.getElementById("texto").value = "eles "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	
	var falar_o = function(repeat) {d.getElementById("texto").value = "o "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_a = function(repeat) {d.getElementById("texto").value = "a "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_os = function(repeat) {d.getElementById("texto").value = "os "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_as = function(repeat) {d.getElementById("texto").value = "as "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	
	var falar_pq = function(repeat) {d.getElementById("texto").value = "por que "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_que = function(repeat) {d.getElementById("texto").value = "que "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_oi = function(repeat) {d.getElementById("texto").value = "oi"; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_ola = function(repeat) {d.getElementById("texto").value = "olá"; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_obrigado = function(repeat) {d.getElementById("texto").value = "obrigado"; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_obrigada = function(repeat) {d.getElementById("texto").value = "obrigada"; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_me = function(repeat) {d.getElementById("texto").value = "me "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_eh = function(repeat) {d.getElementById("texto").value = "é "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_meu = function(repeat) {d.getElementById("texto").value = "meu "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_minha = function(repeat) {d.getElementById("texto").value = "minha "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_de = function(repeat) {d.getElementById("texto").value = "de "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_e = function(repeat) {d.getElementById("texto").value = "e "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_eai = function(repeat) {d.getElementById("texto").value = "e aí "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_nao = function(repeat) {d.getElementById("texto").value = "não "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_muito = function(repeat) {d.getElementById("texto").value = "muito "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_isso = function(repeat) {d.getElementById("texto").value = "isso "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_isto = function(repeat) {d.getElementById("texto").value = "isto "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_repete = function(repeat) {d.getElementById("texto").value = "repete "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_isto = function(repeat) {d.getElementById("texto").value = "isto "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_fala = function(repeat) {d.getElementById("texto").value = "fala "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_tudo = function(repeat) {d.getElementById("texto").value = "tudo "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_em = function(repeat) {d.getElementById("texto").value = "em "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_diz = function(repeat) {d.getElementById("texto").value = "diz "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_diga = function(repeat) {d.getElementById("texto").value = "diga "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};
	var falar_mas = function(repeat) {d.getElementById("texto").value = "mas "+repeat; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);};

	var conversa = function() {d.location.href = "https://jvribeiro.github.io/miley/miley.html";};
// Abre uma pop-up de ajuda
	var ajuda = function abrirA() {abrirWindowA = w.open('ajuda.html', 'fb', 'width=500, height=700, top=25, left=0'); abrirAjuda(); STT();};
	
	var cap = function() {c_cc();};
	
	var lembrarNome = function(nome) {
	w.localStorage.clear();
	w.localStorage.setItem('nome','nome');
	d.getElementById("texto").value = "meu nome é "+nome; setTimeout(rotina(), 1000); setTimeout(STT(), 100); setTimeout(espera(), 1000);
	}
	
	var fb_close = function fecharFB(){fecharWindow = abrirWindowFb.close()};
	var pgoogle_close = function fecharG(){fecharWindow = abrirWindowG.close()};
	var pbing_close = function fecharB(){fecharWindow = abrirWindowB.close()};
	var pwiki_close = function fecharW(){fecharWindow = abrirWindowW.close()};
	var pyahoo_close = function fecharY(){fecharWindow = abrirWindowY.close()};
	var pyt_close = function fecharYt(){fecharWindow = abrirWindowYt.close()};
	var ajuda_close = function fecharA(){fecharWindow = abrirWindowA.close()};

var commands = 
{	'(o) meu nome é *nome': lembrarNome,
	'(se) atualiza(r) (miley)': refresh,
	'(tchau)(adeus)(se fecha)(bye bye)(good bye)(fechar)': fecharMiley,
	'libera o teclado (miley)':	cap,
// Ajuda
	'ajuda':				ajuda,
	'o que (eu) posso dizer (miley)':	ajuda,
// Histórico de conversa	
	'mostra(r) (o) histórico (miley)':	dialog_true,
	'(me) mostr(a)(e) o histórico (miley)':	dialog_true,
	'fecha(r) (o)(esse) histórico (miley)':	dialog_false,
	'fecha isso (miley)':			dialog_false,
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
	'(pergunta)(e) porque *repeat':		perguntar_pq, // Variação dos "porquês" //
	'(pergunta)(e) por que *repeat':	perguntar_pq, //
	'(pergunta)(e) porquê *repeat':		perguntar_pq, //
	'(pergunta)(e) por quê *repeat':	perguntar_pq, ////////////////////////////
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
	'miley':		alfa, // A variável alfa coloca o foco na Miley usando um alert()
	'ei':			alfa,
// 1
	'abrir facebook':		fb,
	'abre o facebook (miley)':	fb,
	'abre aí o face (miley)':	fb,
	'abre o face (miley)':		fb,
	'abre o face aí (miley)':	fb,
	'início':			fb,
	'feed de notícias':		fb,
	'feed':				fb,
	'mostra o (meu) feed (miley)':	fb,
	'volta pro feed (miley)':	fb,
	'volta pro início (miley)':	fb,
	'facebook':			fb,
	
	'(me) (mostra)(mostre-me) (as)(os) (publicações)(posts) (mais) recentes (do) (face)(book) (miley)':	fbrec,
	'(me) (mostra)(mostre-me) (as)(os) (publicações)(posts) (mais) populares (do) (face)(book) (miley)':	fbpop,
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
	'notificações':			fbnotificacoes,
	'(me) mostra as notificações (miley)':	fbnotificacoes,
	'abre (pra mim) as notificações (pra mim) (miley)':		fbnotificacoes,
	'facebook notificações':	fbnotificacoes,
	'(agora) fecha(r) (o) face(book) (aí) (pra mim) (miley)':		fb_close,
// 7
	'pesquisa(r) global(mente) (sobre) *algo':	p_global,
	
	'(abre) (aí) (o) google (pra mim) (miley)':	google,
	'pesquisa(r) no google *algo':	pgoogle,
	'procura(r) por *algo no google':	pgoogle,
	'procura(r) pelo *algo no google':	pgoogle,
	'procura(r) pela *algo no google':	pgoogle,
	'pesquisa(r) por *algo no google':	pgoogle,
	'quanto é *algo':		pgoogle,
	'google *algo':			pgoogle,
	'(agora) fecha(r) (o) google (aí) (pra mim) (miley)': pgoogle_close,
	
	'(procura)(vê) na wikipédia quem é *algo':		pwiki,
	'(procura)(vê) na wikipédia o que é *algo':		pwiki,
	'(agora) fecha(r) (o)(a) wikipédia (aí) (pra mim) (miley)': pwiki_close,
	
// 8
	'(abre) (o) (bing) (miley)':	bing,
	'pesquisa(r) no bing *algo':	pbing,
	'procura por *algo no bing':	pbing,
	'procura pelo *algo no bing':	pbing,
	'procura pela *algo no bing':	pbing,
	'bing *algo':			pbing,
	'(agora) fecha(r) (o) bing (aí) (pra mim) (miley)': pbing_close,
// 9
	'procura (por) imagens de *algo':	pbing_img,
	'(me) mostra foto(s) de *algo':		pbing_img,
	'(me) mostra foto(s) do *algo':		pbing_img,
	'(me) mostra foto(s) da *algo':		pbing_img,
	'(me) mostra imagens de *algo':		pbing_img,
	'(me) mostra imagens do *algo':		pbing_img,
	'(me) mostra imagens da *algo':		pbing_img,
	'imagens de *algo':			pbing_img,
	'imagens do *algo':			pbing_img,
	'imagens da *algo':			pbing_img,
// 10
	'procura no youtube por *video':	pyoutube,
	'procura o vídeo *video':		pyoutube_t,
	'procurar por *video no youtube':	pyoutube,
	'procurar pelo *video no youtube':	pyoutube,
	'procurar pela *video no youtube':	pyoutube,
	'procurar o *video no youtube':		pyoutube,
	'procurar a *video no youtube':		pyoutube,
	'youtube *video': 			pyoutube,
// 11
	'procura pelo vídeo *video':	pbing_vid,
	'procura pelo filme *video':	pbing_vid,
	'procura o filme *video':	pbing_vid,
	'acha o filme *video':		pbing_vid,
	'quero assistir o filme *video':	pbing_vid,
	'quero ver o *video':		pbing_vid,
	'(procura)(acha)(pesquisa) (um) vídeo(s) de *video':	pbing_vid,
	'quero assistir (o)(a)(ao) *video':	pbing_vid
};

annyang.debug(); annyang.addCommands(commands); annyang.setLanguage('pt-BR');
annyang.addCallback('resultNoMatch', function() {
d.getElementById("resposta").value = "Não entendi. Você pode repetir?";
d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Não entendi. Você pode repetir?\' autoplay><\/audio>";
});

annyang.addCallback('errorPermissionDenied', function() {
d.getElementById("resposta").value = "Você não permitiu que eu use o microfone do seu dispositivo. Dessa forma, não posso ouvir o que você diz e nem posso executar comandos por voz. Permita o uso do microfone para eu funcionar corretamente.";
d.getElementById("m_rep").innerHTML = "<audio src=\'https:\/\/api.voicerss.org\/?key=" + _apikey + "&hl=pt-br&c="+_codec+"&f=8khz_16bit_mono&src=Você não permitiu que eu use o microfone do seu dispositivo. Dessa forma, não posso ouvir o que você diz e nem posso executar comandos por voz. Permita o uso do microfone para eu funcionar corretamente.\' autoplay><\/audio>";
});

annyang.start();
}

else {c_cc();}