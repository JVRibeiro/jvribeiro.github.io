if (annyang) {


	var fecharSophia = function() {$("#sophia-reply").html("Tchau tchau!"); $("#log4").val("Tchau tchau!"); voz(); setTimeout(window.location.href = "about:blank", 5000);};
	var refresh = function() {window.location.reload();};



var wdt = screen.width;
var hgt = screen.availHeight;

	var fbrec = function(facebook) {abrirFb = window.open('https://www.facebook.com/?sk=h_chr', 'facebook', 'width='+wdt+', height='+hgt+', top=25, left=0'); $("#sophia-reply").html(afirmativo+ userRef +". Mostrando as publicações mais recentes do Facebook."); $("#log4").val(afirmativo+ userRef +"Okey. Mostrando as publicações mais recentes do feicebook."); voz(); /*saveHist()*/};
	var fbpop = function(facebook) {abrirFb = window.open('https://www.facebook.com/?sk=h_nor', 'facebook', 'width='+wdt+', height='+hgt+', top=25, left=0'); $("#sophia-reply").html(afirmativo+ userRef +". Mostrando as publicações mais populares do Facebook."); $("#log4").val(afirmativo+ userRef +"Okey. Mostrando as publicações mais populares do feicebook."); voz(); /*saveHist()*/};
	var fbperfil = function(facebook) {abrirFb = window.open('https://www.facebook.com/profile.php', 'facebook', 'width='+wdt+', height='+hgt+', top=25, left=0'); $("#sophia-reply").html(afirmativo+ userRef +". Abrindo seu perfil"+ userRef +"."); $("#log4").val(afirmativo+ userRef +"Abrindo seu perfil."); voz(); /*saveHist()*/};
	var fbalbum = function(facebook) {abrirFb = window.open('https://www.facebook.com/photos.php', 'facebook', 'width='+wdt+', height='+hgt+', top=25, left=0'); $("#sophia-reply").html(afirmativo+ userRef +". Vou abrir suas fotos."); $("#log4").val(afirmativo+ userRef +"Aguarde. Vou abrir suas fotos."); voz(); /*saveHist()*/};
	var fbmensagens = function(facebook) {abrirFb = window.open('https://www.facebook.com/messages', 'facebook', 'width='+wdt+', height='+hgt+', top=25, left=0'); $("#sophia-reply").html(afirmativo+ userRef +". Vou abrir suas mensagens."); $("log4").val(afirmativo+ userRef +"Vou tentar abrir suas mensagens."); voz(); /*saveHist()*/};
	var fbnotificacoes = function() {fbNotifications(); openNotifications();};


var siteCom = function(algo) {abrirSite = window.open('http://'+algo+'.com', 'site', 'width=1400, height=640, top=25, left=0'); $("#sophia-reply").html("Okey, "+gen+". Vou abrir o "+algo+".com."); voz(); /*saveHist()*/};
var siteComBr = function(algo) {abrirSite = window.open('http://'+algo+'.com.br', 'site', 'width=1400, height=640, top=25, left=0'); $("#sophia-reply").html("Okey, "+gen+". Vou abrir o "+algo+".com.br."); voz(); /*saveHist()*/};
var siteOrg = function(algo) {abrirSite = window.open('http://'+algo+'.org', 'site', 'width=1400, height=640, top=25, left=0'); $("#sophia-reply").html("Okey, "+gen+". Vou abrir o "+algo+".org."); voz(); /*saveHist()*/};
var siteOrgBr = function(algo) {abrirSite = window.open('http://'+algo+'.org.br', 'site', 'width=1400, height=640, top=25, left=0'); $("#sophia-reply").html("Okey, "+gen+". Vou abrir o "+algo+".org.br."); voz(); /*saveHist()*/};

// Pesquisa global nos navegadores mais conhecidos - Google, Bing, Yahoo
	var p_global = function(algo) {
		abrirWindowG = window.open('http://google.com/search?q='+algo, 'google', 'width=700, height=700, top=25, left=0');
		abrirWindowB = window.open('http://bing.com/search?q='+algo, 'bing', 'width=700, height=700, top=25, left=500');
		abrirWindowY = window.open('http://br.search.yahoo.com/search;_ylt=Anmgv8ykk.JD03hZwN3Ah2eU7q5_?p='+algo+'&toggle=1&cop=mss&ei=UTF-8&fr=yfp-t-403&fp=1', 'yahoo', 'width=800, height=700, top=25, left=800');
	$("#sophia-reply").html("Tá bom. Vou procurar nos melhores mecanismos de buscas por "+algo+"."); voz(); /*saveHist()*/};

var g1 = function(algo) {abrirWindowG1 = window.open('http://g1.globo.com/', 'g1', 'width=1400, height=640, top=25, left=0'); $("#sophia-reply").html("Vou abrir o G1."); voz(); /*saveHist()*/};
// * Pesquisa individual - Google, Bing, Yahoo

// * Google
	var google = function(algo) {abrirWindowG = window.open('http://google.com/', 'google', 'width=1400, height=640, top=25, left=0'); $("#sophia-reply").html("Vou abrir o Google."); voz(); /*saveHist()*/};
	var pgoogle = function(algo) {abrirWindowG = window.open('http://google.com/search?q='+algo, 'google', 'width=1400, height=640, top=25, left=0'); $("#sophia-reply").html("Vou procurar por "+algo+" no Google, "+gen+"."); voz(); /*saveHist()*/};

// * Wikipédia
  var pwiki = function(algo) {abrirWindowW = window.open('http://pt.wikipedia.org/wiki/'+algo, 'wiki', 'width=600, height=700, top=25, right=0')};

// * Definições
//if(document.getElementById('q').value !== "") {
//var algo = document.getElementById('q').value
//}
/*
var definir = function(algo) {
startFetch(algo, 12, 1000);
$('#q').val(algo);
	$('#user-submited-text').html("Definir > "+ algo);
			search();
				$('#sophia-reply').html("Só um momento...");
				ImgSrchInput();
					voz();
};
	var textbox = document.getElementById("resposta");
	var tempscript = null, minchars, maxchars, attempts;
function startFetch(algo, minimumCharacters, maximumCharacters, isRetry) {
if (tempscript) return;
	if (!isRetry) {
		attempts = 0;
		minchars = minimumCharacters;
		maxchars = maximumCharacters
	}
tempscript = document.createElement("script");
	tempscript.type = "text/javascript";
		tempscript.id = "tempscript";
			tempscript.src = "https://pt.wikipedia.org/w/api.php"
+"?action=query"
	+"&titles="
		+ algo // Palavra ou sentença a ser definida
			+ "&redirects=1"
				+ "&prop=extracts"
					+ "&exchars="
						+ maxchars // Máximo de caracteres a ser "puxado"
							+ "&exintro"
								+ "&format=json"
									+ "&callback=onFetchComplete"
										+ "&requestid="
											+ Math.floor(Math.random()*999999).toString();
											$("body").append(tempscript);
										}
function onFetchComplete(data) {
	var dialogo = document.getElementById('dialogo');
	var algo = document.getElementById('q').value;
$('#tempscript').remove();

tempscript = null
var s = getFirstProp(data.query.pages).extract;
s = htmlDecode(stripTags(s));

if (s.length > minchars || attempts++ > 2) {
$('#sophia-reply').html(s);
$('#user-submited-text').html("Definindo \""+algo+"\"..."
+ "<br><br>Fonte: <a href=\'https:\/\/pt.wikipedia.org\/wiki\/"+algo+"\' target=\'_blank\'>Wikipédia<\/a>.");
voz(); // Lê em voz alta a definição da palavra ou sentença
espera(); // Delay para se aproximar do carregamento do áudio
dialogo.innerHTML += "<br>Definir > "
+ algo // Palavra ou sentença a ser definida
	+ "<br>"
		+ "Solicitado por "
			+ nome
				+ " em " + dia
					+ "/" + omes
						+ "/" + ano
							+ " às " + hora
								+ ":" + min
									+ ": <br><br>"
										+ s // Definição carregada
											+ "<br>"
													+ "<br>Fonte: <a href=\'https:\/\/pt.wikipedia.org\/wiki\/"
														+ algo
															+ "\' target=\'_blank\'>Wikipédia<\/a>."
															+ "<br>"
													+ "<hr><br>";
	//*saveHist(); // Salva a definição no log de conversa
	$("#dialogo").animate({
			scrollTop:$("#dialogo")[0].scrollHeight
			}, 1000);
	} else {
	$('#sophia-reply').html("Não encontrei a definição para \""+algo+"\", "+gen+".");
	$('#log4').val("Não encontrei a definição para \""+algo+"\", "+gen+".");
	voz();
}

}

function getFirstProp(obj) {
for (var i in obj) return obj[i];
}

function stripTags(s) {
return s.replace(/(\[.*?\])|(>)|\"|(\s\(.*?\))|<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
}

function htmlDecode(input){
var e = document.createElement("div");
e.innerHTML = input;
return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
};
*/

/*
// * Pesquisa de imagens interna*
  var p_img = function(algo) {$("#q").val(algo); search()};
  var p_img_mais = function() {search()};
  var p_img_del = function() {$("#q").val(""); search()};
	// * *A I.A. usa o Google Imagens para obter as imagens e o Google Sphere (Mr. Doob) com algumas modificações para a visualização em globo.
*/


// * Bing
	var bing = function(algo) {abrirWindowB = window.open('http://bing.com/', 'bing', 'width=1400, height=640, top=25, left=0'); $("#sophia-reply").html("Certo. Vou abrir o Bing."); voz(); /*saveHist()*/};
	var pbing = function(algo) {abrirWindowB = window.open('http://bing.com/search?q='+algo, 'bing', 'width=1400, height=640, top=25, left=0'); $("#sophia-reply").html("Certo. Vou usar o Bing para fazer a busca."); voz(); /*saveHist()*/};
	var pbing_img = function(algo) {abrirWindowB = window.open('http://bing.com/images/search?q='+algo, 'bing', 'width=1400, height=640, top=25, left=0'); $("#sophia-reply").html("Okey. Vou procurar no Bing algumas imagens de "+algo+"."); voz(); /*saveHist()*/};
	var pbing_vid = function(video) {abrirWindowB = window.open('http://bing.com/videos/search?q='+video, 'bing', 'width=1400, height=640, top=25, left=0'); $("#sophia-reply").html("Reuni alguns resultados de vídeos sobre "+video+"."); voz(); /*saveHist()*/};

// * Yahoo!
	var yahoo = function(algo) {abrirWindowY = window.open('http://br.yahoo.com/', 'yahoo', 'width=1400, height=640, top=25, left=0'); $("#sophia-reply").html("Okey. Vou abrir o Yahoo."); voz(); /*saveHist()*/};
	var pyahoo = function(algo) {abrirWindowY = window.open('http://br.search.yahoo.com/search;_ylt=Anmgv8ykk.JD03hZwN3Ah2eU7q5_?p='+algo+'&toggle=1&cop=mss&ei=UTF-8&fr=yfp-t-403&fp=1', 'yahoo', 'width=1400, height=640, top=25, left=0'); $("#sophia-reply").html("Okey. Vou procurar por "+algo+" no Yahoo."); voz(); /*saveHist()*/};

// * YouTube
	var pyoutube = function(video) {abrirWindowYt = window.open('http://youtube.com/results?search_query='+video, 'yt', 'width=1400, height=640, top=25, left=0'); $("#sophia-reply").html("Consegui achar esses vídeos de "+video+" no YouTube."); voz(); /*saveHist()*/};
	var pyoutube_t = function(video) {abrirWindowYt = window.open('http://youtube.com/results?search_query=allintitle:'+video, 'yt'); $("#sophia-reply").html("Estou procurando só pelo título dos vídeos."); voz(); /*saveHist()*/};


// * A variável "perguntar" e suas variantes retornam um ponto de interrogação ao final da frase.

	var perguntar_qual = function(algo) {$("#user-input").val("Qual "+algo+"?"); };
	var perguntar_como = function(algo) {$("#user-input").val("Como "+algo+"?"); };
	var perguntar_pq = function(algo) {$("#user-input").val("Por que "+algo+"?"); };
	var perguntar_oque = function(algo) {$("#user-input").val("O que "+algo+"?"); };
	var perguntar_quantos = function(algo) {$("#user-input").val("Quantos "+algo+"?"); };
	var perguntar_quando = function(algo) {$("#user-input").val("Quando "+algo+"?"); };
	var perguntar_quem = function(algo) {$("#user-input").val("Quem "+algo+"?"); };
	var perguntar_doque = function(algo) {$("#user-input").val("Do que "+algo+"?"); };


// * Abre uma pop-up de ajuda
	var ajuda = function abrirA() {};




// * Fechar janelas abertas pela Sophia
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
// * Aqui definimos todos os comandos que a Sophia entenderá (cortesia da biblioteca de reconhecimento de fala Annyang.js)
// *
// * --------------------------------------------------------------------------------------------------------------------

var commands = {





/* Comandos relacionados ao mini App Calculadora
	autor	: Victor Ribeiro (twitter: @JVRibeiiro)
*/
	// Soma
	'(Sophia)(Sofia) (soma)(calcula)(quanto é) :val1 mais :val2 (Sophia)(Sofia)': function(val1, val2) {
		var valor1 = val1, valor2 = val2;
			if(val1 == "dois") {valor1 = 2};
			if(val2 == "dois") {valor2 = 2};
		var n1 = Number(valor1), n2 = Number(valor2);
		var result = console.log(n1 + n2);
		$('#sophia-reply').html(n1 + n2);
		$('#user-submited-text').html("Soma > "+n1+" mais "+n2+".");
		voz(); /*saveHist()*/
	},
	// Subtração
	'(Sophia)(Sofia) (subtrai)(subtração)(calcula)(quanto é) :val1 por :val2 (Sophia)(Sofia)': function(val1, val2) {
		var valor1 = val1, valor2 = val2;
			if(val1 == "dois") {valor1 = 2};
			if(val2 == "dois") {valor2 = 2};
		var n1 = Number(valor1), n2 = Number(valor2);
		var result = console.log(n1 - n2);
		$('#sophia-reply').html(n1 - n2);
		$('#user-submited-text').html("Subtração > "+n1+" menos "+n2+".");
		voz(); /*saveHist()*/
	},
	// Multiplicação
	'(Sophia)(Sofia) (multiplica)(multiplicação)(calcula)(quanto é)( ):val1 vezes :val2 (Sophia)(Sofia)': function(val1, val2) {
		var valor1 = val1, valor2 = val2;
			if(val1 == "dois") {valor1 = 2};
			if(val2 == "dois") {valor2 = 2};
		var n1 = Number(valor1), n2 = Number(valor2);
		var result = console.log(n1 * n2);
		$('#sophia-reply').html(n1 * n2);
		$('#user-submited-text').html("Multiplicação > "+n1+" vezes "+n2+".");
		voz(); /*saveHist()*/
	},
	// Divisão
	'(Sophia)(Sofia) (divisão)(divide)(calcula)(quanto é) :val1 dividido p(or)(a)(ra) :val2 (Sophia)(Sofia)': function(val1, val2) {
		var valor1 = val1, valor2 = val2;
			if(val1 == "dois") {valor1 = 2};
			if(val2 == "dois") {valor2 = 2};
		var n1 = Number(valor1), n2 = Number(valor2);
		var n3 = n1 / n2;
		var result = console.log(n3);
		$('#sophia-reply').html(n3.toFixed(2));
		$('#user-submited-text').html("Divisão > "+n1+" dividido por "+n2+".");
		voz(); /*saveHist()*/
	},
//


/*
	'(abrir) alarme': function () {
		openReminder();
	},

	'(Sophia)(Sofia) ativa(r) (o) alarme (par)(pr)(a) daqui (a) :min minutos': function (algo, hora, min) {
		window.localStorage.setItem('AlarmM',alarmMinute.value+min);
		var now = new Date();
		var m = now.getMinutes();
		var minuteReminder = document.getElementById('minuteReminder');
		if(min === "dois") {min = 2};
		$('#log4').val("Okey"+vocativo+tratamento+", irei chamá-l"+_x+" às "+aH+" horas e "+aM+" minutos.");
		$('#sophia-reply').html("Okey"+vocativo+tratamento+", irei chamá-l"+_x+" às "+aH+" horas e "+aM+" minutos.");
		voz();
		minuteReminder.value = aM+m;
		setAlarm();
	},

	'(Sophia)(Sofia) ativa(r) (o) alarme (par)(pr)(à)(a)(s) :hora horas e :min minutos': function (algo, hora, min) {
		$('#log4').val("Okey"+vocativo+tratamento+", irei chamá-l"+_x+" às "+aH+" horas e "+aM+" minutos.");
		$('#sophia-reply').html("Okey"+vocativo+tratamento+", irei chamá-l"+_x+" às "+aH+" horas e "+aM+" minutos.");
		voz();
		document.getElementById('hourReminder').value = hora;
		document.getElementById('minuteReminder').value = min;
		document.getElementById('textReminder').value = "";
		setAlarm();
	},

	'(Sophia)(Sofia) me lembr(a)(e)(r) de *algo (à)(a)(s) :hora horas e :min minutos': function (algo, hora, min) {
		$('#log4').val("Okey"+vocativo+tratamento+", irei lembrá-l"+_x+" de "+algo+", às "+hora+" horas e "+min+" minutos.");
		$('#sophia-reply').html("Okey"+vocativo+tratamento+", irei lembrá-l"+_x+" de "+algo+", às "+hora+" horas e "+min+" minutos.");
		voz();
		document.getElementById('hourReminder').value = hora;
		document.getElementById('minuteReminder').value = min;
		document.getElementById('textReminder').value = algo;
		setAlarm();
	},

	'(Sophia)(Sofia) me lembr(a)(e)(r) de *algo (à)(a)(s) :hora e (i):min': function (algo, hora, min) {
		$('#log4').val("Okey"+vocativo+tratamento+", irei lembrá-l"+_x+" de "+algo+", às "+hora+" horas e "+min+" minutos.");
		$('#sophia-reply').html("Okey"+vocativo+tratamento+", irei lembrá-l"+_x+" de "+algo+", às "+hora+" horas e "+min+" minutos.");
		voz();
		document.getElementById('hourReminder').value = hora;
		document.getElementById('minuteReminder').value = min;
		document.getElementById('textReminder').value = algo;
		setAlarm();
	},

	'(Sophia)(Sofia) me lembr(a)(e)(r) de *algo (à)(a)(s) :hora de :min': function (algo, hora, min) {
		$('#log4').val("Okey"+vocativo+tratamento+", irei lembrá-l"+_x+" de "+algo+", às "+hora+" horas e "+min+" minutos.");
		$('#sophia-reply').html("Okey"+vocativo+tratamento+", irei lembrá-l"+_x+" de "+algo+", às "+hora+" horas e "+min+" minutos.");
		voz();
		document.getElementById('hourReminder').value = hora;
		document.getElementById('minuteReminder').value = min;
		document.getElementById('textReminder').value = algo;
		setAlarm();
	},

	'(Sophia)(Sofia) me lembr(a)(e)(r) de *algo (à)(a)(s) :hora:min': function (algo, hora, min) {
		$('#log4').val("Okey"+vocativo+tratamento+", irei lembrá-l"+_x+" de "+algo+", às "+hora+" horas e "+min+" minutos.");
		$('#sophia-reply').html("Okey"+vocativo+tratamento+", irei lembrá-l"+_x+" de "+algo+", às "+hora+" horas e "+min+" minutos.");
		voz();
		document.getElementById('hourReminder').value = hora;
		document.getElementById('minuteReminder').value = min;
		document.getElementById('textReminder').value = algo;
		setAlarm();
	},




	'(Sophia)(Sofia) me lembr(a)(e)(r) de *algo (à)(a)(s) :hora horas': function (algo, hora) {
		$('#log4').val("Okey"+vocativo+tratamento+", irei lembrá-l"+_x+" de "+algo+", às "+hora+" horas.");
		$('#sophia-reply').html("Okey"+vocativo+tratamento+", irei lembrá-l"+_x+" de "+algo+", às "+hora+" horas.");
		voz();
		document.getElementById('hourReminder').value = hora;
		document.getElementById('minuteReminder').value = 0;
		document.getElementById('textReminder').value = algo;
		setarAlarme();
	},

	'(Sophia)(Sofia) me lembr(a)(e)(r) de *algo (à)(a)(s) :hora': function (algo, hora) {
		$('#log4').val("Okey"+vocativo+tratamento+", irei lembrá-l"+_x+" de "+algo+", às "+hora+" horas.");
		$('#sophia-reply').html("Okey"+vocativo+tratamento+", irei lembrá-l"+_x+" de "+algo+", às "+hora+" horas.");
		voz();
		document.getElementById('hourReminder').value = hora;
		document.getElementById('minuteReminder').value = 0;
		document.getElementById('textReminder').value = algo;
		setarAlarme();
	},



	'(Sophia)(Sofia) deslig(a)(ue)(r) (o) despertador': function () {
		$('#log4').val("Alarme desligado.");
		$('#sophia-reply').html("Alarme desligado.");
		voz();
		document.getElementById('hourReminder').value = "";
		document.getElementById('minuteReminder').value = "";
		document.getElementById('textReminder').value = "";
		pararAlarme();
	},
	*/










	'escreve(r)': function() {
		annyang.removeCommands();
		annyang.addCommands(commands2);
		sophiaTextIt();
		$('#documentVoiceTextEditor').focus();
		},


	'repet(e)(i)(r) (por favor) (o que) (tu)(você) (falou)(disse)': function () {
	$("#user-submited-text").html("Repetindo...");
	voz(); /*saveHist()*/
	},


	'(pode)( )me cham(a)(e)(r) de senhor': function(genero) {
	var uGeSo = document.getElementById("senhor");
	uGeSo.selected = "true";
	$("#sophia-reply").html("Chamarei você de senhor a partir de agora.");
	$("#user-submited-text").html("Mudando gênero para > Senhor");
	voz(); /*saveHist()*/
	salvarDados();
	},

	'(pode)( )me cham(a)(e)(r) de senhorita': function(genero) {
	var uGeSa = document.getElementById("senhorita");
	uGeSa.selected = "true";
	$("#sophia-reply").html("Chamarei você de senhorita a partir de agora.");
	$("#user-submited-text").html("Mudando gênero para > Senhorita");
	voz(); /*saveHist()*/
	salvarDados();
	},

	'(pode)( )me cham(a)(e)(r) de *nome': function(nome) {
	var uNa = document.getElementById("userName");
	uNa.value = nome;
	salvarDados();

	},

//	'(agora) (abrir)(abre as) configurações (por favor) (Sophia)(Sofia) (por favor)':	config,
//	'(agora) fecha(r) (as) configurações (por favor) (Sophia)(Sofia) (por favor)':		closeConfig,

	'(se) atualiza(r) (por favor) (Sophia)(Sofia) (por favor)': refresh,

	'tchau': fecharSophia,
	'adeus': fecharSophia,
	'se fecha': fecharSophia,
	'bye bye': fecharSophia,
	'good bye': fecharSophia,

// * Ajuda
	'ajuda':				ajuda,
	'o que (eu) posso dizer (Sophia)(Sofia)':	ajuda,
	'(agora) fecha(r) (a) (página de) ajuda (aí) (pra mim) (por favor) (Sophia)(Sofia) (por favor)':	ajuda_close,


	'pergunta *algo':	function(algo) {
		$("#user-input").val(algo+"?");

		},

	'(tenho uma) dúvida *algo':	function(algo) { $("#user-input").val(algo+"?");  },
	'tenho uma pergunta *algo':	function(algo) { $("#user-input").val(algo+"?");  },
	'e se eu (te)(lhe) perguntar *algo': function(algo) { $("#user-input").val(algo+"?");  },


// * Sites pela URL
  'abr(e)(a)(ir) (o) (site) *algo.com': siteCom,
	'abr(e)(a)(ir) (o) (site) *algo.com.br': siteComBr,
	'abr(e)(a)(ir) (o) (site) *algo.org': siteOrg,
	'abr(e)(a)(ir) (o) (site) *algo.org.br': siteOrgBr,

// * G1
  'abr(e)(a)(ir) (o) (site) g1 (ponto com)': g1,
	'abr(e)(a)(ir) (o) (site) g1.com': g1,
	'me mostr(e)(a) as notícias (de hoje)': g1,
  'mostr(e)(a) as notícias (de hoje)': g1,
	'(agora) fecha(r) (o) g1 (aí) (pra mim) (por favor) (Sophia)(Sofia) (por favor)':	g1_close,


	'(abr)(e)(i)(r) (feed de notícias) (do) face(book) (*algo)':	function (facebook) {abrirFb = window.open('https://www.facebook.com/', 'facebook', 'width='+wdt+', height='+hgt+', top=0, left=0'); $('#log4').val('Abrindo Facebook...'); voz(); saveHist()},
	'(abr)(e)(i)(r) feed (do) (face)(book) (*algo)':	function (facebook) {abrirFb = window.open('https://www.facebook.com/', 'facebook', 'width='+wdt+', height='+hgt+', top=0, left=0'); $('#log4').val('Abrindo Facebook...'); voz(); saveHist()},
	'(abr)(e)(i)(r) mostra (o) (meu) feed (do) (face)(book) (por favor) (Sophia)(Sofia) (por favor)':function (facebook) {abrirFb = window.open('https://www.facebook.com/', 'facebook', 'width='+wdt+', height='+hgt+', top=0, left=0'); $('#log4').val('Abrindo Facebook...'); voz(); saveHist()},
	'(abr)(e)(i)(r) volta pro feed (por favor) (*algo)':	function (facebook) {abrirFb = window.open('https://www.facebook.com/', 'facebook', 'width='+wdt+', height='+hgt+', top=0, left=0'); $('#log4').val('Abrindo Facebook...'); voz(); saveHist()},

	'me (mostr)(e)(a)(r)(mostre-me) (as)(os) (publicações)(posts) (mais) recentes (do) face(book) (por favor) (Sophia)(Sofia) (por favor)':	fbrec,
	'(mostr)(e)(a)(r)(mostre-me) (as)(os) (publicações)(posts) (mais) recentes (do) face(book) (por favor) (Sophia)(Sofia) (por favor)':	fbrec,
	'me (mostr)(e)(a)(r)(mostre-me) (as)(os) (publicações)(posts) (mais) populares (do) face(book) (por favor) (Sophia)(Sofia) (por favor)':	fbpop,
	'(mostr)(e)(a)(r)(mostre-me) (as)(os) (publicações)(posts) (mais) populares (do) face(book) (por favor) (Sophia)(Sofia) (por favor)':		fbpop,

	'abrir perfil (do) (face)(book)': fbperfil,
	'abre o meu perfil (do) (face)(book) (por favor) (Sophia)(Sofia) (por favor)': fbperfil,
	'abre o perfil (do) (face)(book) (por favor) (Sophia)(Sofia) (por favor)': fbperfil,
	'mostra o meu perfil (do) (face)(book) (por favor) (Sophia)(Sofia) (por favor)': fbperfil,
	'agora o meu perfil (do) (face)(book) (por favor) (Sophia)(Sofia) (por favor)': fbperfil,
	'facebook perfil': fbperfil,
	'perfil (do) (face)(book)': fbperfil,

	'abrir álbu(ns)(m)':				fbalbum,
	'quero ver as (minhas) fotos (do) (face)(book) (Sophia)(Sofia)': fbalbum,
	'fotos': fbalbum,
	'mostr(a)(e)(r) as minhas fotos (do) (face)(book) (por favor) (Sophia)(Sofia) (por favor)': fbalbum,
	'abr(a)(i)(r) as fotos (do) (face)(book) (por favor) (Sophia)(Sofia) (por favor)': fbalbum,
	'agora as (minhas) fotos (do) (face)(book) (por favor) (Sophia)(Sofia) (por favor)': fbalbum,
	'abr(a)(i)(r) as minhas fotos do face(book) (por favor) (Sophia)(Sofia) (por favor)': fbalbum,
	'facebook álbuns':								fbalbum,

	'abr(a)(i)(r) (as) (minhas) mensagens': fbmensagens,
	'mensagens': fbmensagens,
	'abr(a)(e) as minhas mensagens (por favor) (Sophia)(Sofia) (por favor)': fbmensagens,
	'(me) mostra as minhas mensagens (por favor) (Sophia)(Sofia) (por favor)': fbmensagens,
	'facebook mensagens': fbmensagens,

	'(me) (mostr)(a)(e) (as) notificaç(ões)(ão) (do) (face)(book) (por favor) (Sophia)(Sofia) (por favor)':		fbnotificacoes,
	'mostr(a)(e) as notificações (do) (face)(book) (por favor) (Sophia)(Sofia) (por favor)':			fbnotificacoes,
	'abr(a)(i)(r) (pra mim) as notificações (do) (face)(book) (pra mim) (por favor) (Sophia)(Sofia) (por favor)':	fbnotificacoes,
	'facebook notificações':									fbnotificacoes,

	'(agora) fecha(r) (o) face(book) (aí) (pra mim) (por favor) (Sophia)(Sofia) (por favor)':		fb_close,

	'(agora) sai(r) (do) face(book) (aí) (pra mim) (por favor) (Sophia)(Sofia) (por favor)':		function () {fbLogout();},

// * Pesquisa global
	'pesquis(a)(e)(r) global (sobre) *algo':		p_global, // * Faz uma pesquisa global em três mecanismos de busca diferentes ao mesmo tempo
  'pesquis(a)(e)(r) avançada (sobre) *algo':		p_global,

	// * Yahoo!
	'(abre) (aí) (o) yahoo (pra mim) (Sophia)(Sofia)':			          yahoo,
	'pesquis(a)(e)(r) no yahoo *algo':			                	pyahoo,
	'procur(a)(e)(r) p(or)(elo)(s)(ela)(s) *algo no yahoo':		pyahoo,
	'pesquisa(r) *algo no yahoo':			                 	pyahoo,
	'yahoo *algo':					                              		pyahoo,
	'(agora) fech(a)(o)(e)(r) (o) yahoo (aí) (pra mim) (Sophia)(Sofia)':		pyahoo_close,

/*
// * Definições (retorna a definição de uma palavra com recursos visuais)
  '(Sophia)(Sofia) defin(e)(a) :algo': definir,
  '(Sophia)(Sofia) defin(e)(a) (a) *algo': definir,
  '(Sophia)(Sofia) defin(e)(a) o *algo': definir,
  '(Sophia)(Sofia) defin(e)(a) as *algo': definir,
  '(Sophia)(Sofia) defin(e)(a) os *algo': definir,
*/
	'(Sophia)(Sofia) o que significa (o) (s)(t)eu nome (Sophia)(Sofia)':
	function() {
	$('#user-input').val('o que significa o seu nome?');

	},

/*
  '(Sophia)(Sofia) quem é *algo (Sophia)(Sofia)': definir,
	'(Sophia)(Sofia) quem foi *algo (Sophia)(Sofia)': definir,
	'(Sophia)(Sofia) quem era *algo (Sophia)(Sofia)': definir,
  '(Sophia)(Sofia) o que é o *algo (Sophia)(Sofia)': definir,
	'(Sophia)(Sofia) o que é a *algo (Sophia)(Sofia)': definir,
	'(Sophia)(Sofia) o que é um *algo (Sophia)(Sofia)': definir,
	'(Sophia)(Sofia) o que é uma *algo (Sophia)(Sofia)': definir,
	'(Sophia)(Sofia) o que significa *algo (Sophia)(Sofia)': definir,
	'(Sophia)(Sofia) qual (é) o significado de *algo (Sophia)(Sofia)': definir,
	'(Sophia)(Sofia) qual (é) o significado da palavra *algo (Sophia)(Sofia)': definir,
	'(Sophia)(Sofia) o que são os *algo (Sophia)(Sofia)': definir,
	'(Sophia)(Sofia) o que são as *algo (Sophia)(Sofia)': definir,
	'(Sophia)(Sofia) o que foi o *algo (Sophia)(Sofia)': definir,
	'(Sophia)(Sofia) o que foi a *algo (Sophia)(Sofia)': definir,
	'(Sophia)(Sofia) o que era o *algo (Sophia)(Sofia)': definir,
	'(Sophia)(Sofia) o que era a *algo (Sophia)(Sofia)': definir,
	'(Sophia)(Sofia) o que era os *algo (Sophia)(Sofia)': definir,
	'(Sophia)(Sofia) o que era as *algo (Sophia)(Sofia)': definir,
	'(Sophia)(Sofia) o que era um *algo (Sophia)(Sofia)': definir,
	'(Sophia)(Sofia) o que era uma *algo (Sophia)(Sofia)': definir,
	'(Sophia)(Sofia) o que era uns *algo (Sophia)(Sofia)': definir,
	'(Sophia)(Sofia) o que era umas *algo (Sophia)(Sofia)': definir,
  '(Sophia)(Sofia) (*jdhnibf) informação d(e)(o)(a)(os)(as) *algo (Sophia)(Sofia)': definir,
	'(Sophia)(Sofia) me fala sobre *algo (Sophia)(Sofia)': definir,
*/

/*
	// * Pesquisa de imagens

	'image(ns)(m) de *algo':	p_img,
  'pesquis(a)(o)(e)(r) (por)(uma)(s) image(ns)(m) d(e)(o)(a)(os)(as) *algo':	p_img,
  'procur(a)(o)(e)(r) (por)(uma)(s) foto(s) d(e)(o)(a)(os)(as) *algo':				p_img,
  'pesquis(a)(o)(e)(r) (por)(uma)(s) foto(s) d(e)(o)(a)(os)(as) *algo':				p_img,
  'me mostr(a)(e) (uma)(s) (foto)(image)(m)(n)(s) d(e)(o)(a)(os)(as) *algo':	p_img,
  'mostr(a)(e) (uma)(s) (foto)(image)(m)(n)(s) d(e)(o)(a)(os)(as) *algo':		p_img,
  '(*algo) fecha(r) (essas)(as)(às) imagens (daí) (*algo)': p_img_del,
  '(*algo) fecha(s) imagens (daí) (*algo)': p_img_del,
  '(*algo) ficha(s) imagens (daí) (*algo)': p_img_del,
  '(*algo) tira(r) (essas)(as)(às) imagens (daí) (*algo)': p_img_del,
  '(*algo) tira(s) (essas) imagens (daí) (*algo)': p_img_del,
	'(*algo) remov(e)(r) (as)(essas) imagens (daí) (*algo)': p_img_del,
  '(*algo) não quero ver (essas)(as)(às) imagens (*algo)': p_img_del,
  '(*algo) não quero ver (essas)(as)(às) fotos (*algo)': p_img_del,
  '(*algo) mostr(a)(e)(r) mais (imagens) (*algo)': p_img_mais,
	'(*algo) mais imagens (de) (*algo)': p_img_mais,
*/
  // * Wikipédia
	'(procura)(vê)(olha) na wikipédia quem (é)(foi)(era) *algo': pwiki,
	'(procura)(vê)(olha) na wikipédia o que (é)(foi)(era) *algo':	pwiki,
	'procur(a)(o)(e)(r) p(or)(elo)(s)(ela)(s) *algo na wikipédia': pwiki,
	'(agora) fech(a)(o)(e)(r) (o)(a) wikipédia (aí) (pra mim) (Sophia)(Sofia)':	pwiki_close,

  // * Bing
	'(abre)(abrir) (o) bing (Sophia)(Sofia)':	bing,
	'pesquis(a)(o)(e)(r) *algo no bing': pbing,
	'procur(a)(o)(e)(r) p(or)(elo)(s)(ela)(s) *algo no bing':	pbing,
	'bing *algo':	pbing,
	'(agora) fech(a)(o)(r) (o) bing (aí) (pra mim) (Sophia)(Sofia)': pbing_close,
  '(agora) fech(a)(o)(r) (o) ping (aí) (pra mim) (Sophia)(Sofia)': pbing_close,

	'procur(a)(o)(e)(r) (por) image(ns)(m) de *algo no bing':	pbing_img,
	'pesquis(a)(o)(e)(r) (por) image(ns)(m) de *algo no bing': pbing_img,
	'procur(a)(o)(e)(r) (por) foto(s) de *algo no bing': pbing_img,
	'pesquis(a)(o)(e)(r) (por) foto(s) de *algo no bing': pbing_img,
	'me mostr(a)(e) (foto)(image)(m)(n)(s) d(e)(o)(a)(os)(as) *algo no bing':	pbing_img,
	'mostr(a)(e) (foto)(image)(m)(n)(s) d(e)(o)(a)(os)(as) *algo no bing':		pbing_img,
	'image(ns)(m) d(e)(a)(os)(as) *algo no bing':	pbing_img,

// * Youtube
	'procura no youtube por *video': pyoutube,
	'procura o vídeo *video':	pyoutube_t,
	'procurar p(or)(elo)(s)(ela)(s) :video no youtube':	pyoutube,
	'procurar (o)(a)(os)(as) :video no youtube': pyoutube,
	'youtube *video': pyoutube,

// * Bing Vídeos
	'procura (pel)(o) vídeo *video': pbing_vid,
	'acha o vídeo *video': pbing_vid,
	'quero assistir (o)(a)(os)(as) *video': pbing_vid,
	'(procura)(acha)(pesquisa) (um) vídeo(s) d(e)(o)(a)(os)(as) *video': pbing_vid,

	// * Google
	'(pesquisa)(procura)(r) (no) google': pgoogle,
	'pesquisa(r) (por) *algo no google': pgoogle,
	'procura(r) (por) *algo no google': pgoogle,
	'(abr)(e)(ir) (aí) (o) google (pra mim) (Sophia)(Sofia)': google,
	'(abr)(e)(ir) (aí) (o) (google) (e) pesquis(a)(e)(r) (por) *algo': pgoogle,
	'(abr)(e)(ir) (aí) (o) (google) (e) procur(a)(e)(r) (por) *algo': pgoogle,
	'(abr)(e)(ir) (aí) (o) (google) (e) procur(a)(e)(r) p(or)(elo)(s)(ela)(s) *algo no google': pgoogle,
	'google *algo': pgoogle,
	'(agora) fech(a)(o)(e)(r) (o) google (aí) (pra mim) (Sophia)(Sofia)': pgoogle_close,


		'*algo': function(algo) {$("#user-input").val(algo); rotina();}
	//
};


var commands2 = { // Editor de texto
	'(agora) (so)(ph)(f)(ia) leia (pra mim) (agora) (so)(ph)(f)(ia)': function () {$('#sophia-reply').html(documentVoiceTextEditor.value); $('#log4').val($('#sophia-reply').val()); voz()},
	'(agora) (so)(ph)(f)(ia) lê (pra mim) (agora) (so)(ph)(f)(ia)': function () {$('#sophia-reply').html(documentVoiceTextEditor.value); $('#log4').val($('#sophia-reply').val()); voz()},
	'(agora) (so)(ph)(f)(ia) ler (pra mim) (agora) (so)(ph)(f)(ia)': function () {$('#sophia-reply').html(documentVoiceTextEditor.value); $('#log4').val($('#sophia-reply').val()); voz()},

	'ponto': function () {documentVoiceTextEditor.value += ". "},
	'ponto parágrafo': function () {documentVoiceTextEditor.value += ". \n\n"},
	'ponto (em) seguida': function () {documentVoiceTextEditor.value += ". "},

	'virgula': function () {documentVoiceTextEditor.value += ", "},
	'vírgula': function () {documentVoiceTextEditor.value += ", "},

	'(dá) enter': function () {documentVoiceTextEditor.value += " \n\n"; document.getElementById('documentVoiceTextEditor').focus()},
	'nova linha': function () {documentVoiceTextEditor.value += " \n\n"; document.getElementById('documentVoiceTextEditor').focus()},
	'na outra linha': function () {documentVoiceTextEditor.value += " \n\n"; document.getElementById('documentVoiceTextEditor').focus()},

	'(ponto de) interrogação': function () {documentVoiceTextEditor.value += "? "},

	'(ponto de) exclamação': function () {documentVoiceTextEditor.value += "! "},

	'dois pontos': function () {documentVoiceTextEditor.value += ": "},

	'apaga(r)': function () {var lastIndex = documentVoiceTextEditor.value.lastIndexOf(" "); var str = documentVoiceTextEditor.value.substring(0, lastIndex);documentVoiceTextEditor.value = str},
	'limpa(r) tudo': function () {documentVoiceTextEditor.value = ""},
	'apaga(r) tudo': function () {documentVoiceTextEditor.value = ""},
	'apaga(r) até (n)(a)(o)(em) *word': function (word) {var lastIndex = documentVoiceTextEditor.value.lastIndexOf(word);var str = documentVoiceTextEditor.value.substring(0, lastIndex);documentVoiceTextEditor.value = str},
	'deleta(r) até (n)(a)(o)(em) *word': function (word) {var lastIndex = documentVoiceTextEditor.value.lastIndexOf(word);var str = documentVoiceTextEditor.value.substring(0, lastIndex);documentVoiceTextEditor.value = str},

	'fecha(r)': function() {documentVoiceTextEditor.value = ""; annyang.removeCommands(); annyang.addCommands(commands); sophiaTextItClose()},

	'imprim(ir)(e)': function () {printTextArea()},

	'*texto': function(texto) {
		documentVoiceTextEditor.value += " "+texto
		}
	};






/*
Esses são os comandos para o nome de usuário na inicialização.
*/

var userSaysYes = function() {
			if ( $('#introducing-screen-name-input').val() !== ''
				|| $( '#introducing-screen-conf-button-yes' ).attr( 'onclick','showThrirdSetting()' ) )
				{
				$('#introducing-screen-conf-button-yes').focus();
				setTimeout(function() {
					$('#introducing-screen-conf-button-yes').click();
    		}, 1000);
			}
			else {
				say('Sim o quê?');
			}
		};

var commandsUserName = {
		'(se) atualiza(r) (por favor) (Sophia)(Sofia) (por favor)': refresh,

		'não': function() {
			bootstrap.title.animation('fadeInUp','fadeOut');
			bootstrap.title.text('<span class=\'title_Big\'>Diga seu nome</span>');

			$('#introducing-screen-name-input').val('');
		},
		'now': function() {
			bootstrap.title.animation('fadeInUp','fadeOut');
			bootstrap.title.text('<span class=\'title_Big\'>Diga seu nome</span>');

			$('#introducing-screen-name-input').val('');
		},
		'no': function() {
			bootstrap.title.animation('fadeInUp','fadeOut');
			bootstrap.title.text('<span class=\'title_Big\'>Diga seu nome</span>');

			$('#introducing-screen-name-input').val('');

			$( '#introducing-screen-conf-button' ).removeClass
    ( 'animated zoomInUp' ).addClass
    ( 'animated zoomOutDown' );
		},

		':sim': {
			'regexp': /((|pode(|mos))(| )(sim|sing|c|si|se)|(|es)tá(| )(|certo|correto)(| )(|sim|sing|c|si|se)|(avanç(a|o)(|r))|(próxim(a|o)))$/,
			'callback': userSaysYes
			},

		'(eu)(me)(u) (chamo)(nome) (é) :texto': function(texto) {
			$('#introducing-screen-name-input').val(texto);
			bootstrap.title.animation('fadeInUp','fadeOut');
			bootstrap.title.text('<span class=\'title_Big\'>Correto?');
		},

		'(eu)(me)(u) (chamo)(nome) (é) *texto': function(texto) {
			$('#avatar').removeClass('av-animation').addClass('animated shake');

			bootstrap.title.animation('fadeInUp','fadeOut',5000);
			bootstrap.title.text('Por favor, apenas o seu primeiro nome.');
			say('Por favor, apenas o seu primeiro nome.');

			$('#introducing-screen-name-input').val('').focus();

			setTimeout(function() {
      $('#avatar').removeClass('animated shake').addClass('av-animation')
    }, 2000);
		}
};




/*
Esses são os comandos para a forma de tratamento
que a assistente utilizará com o usuário na inicialização.
*/
var commandsUserGender = {
		'(se) atualiza(r) (por favor) (Sophia)(Sofia) (por favor)': refresh,

		':sim': {
			'regexp': /(pode|(|pode)(| )(sim|sing|c|si|se)|(|es)tá(| )(|certo|correto)(| )(|sim|sing|c|si|se)|(avanç(a|o)(|r))|(próxim(a|o)))$/,
			'callback': userSaysYes
			},

		'não': function() {
			$('.cs-placeholder').click();
			bootstrap.title.animation('fadeInUp','fadeOut');
			bootstrap.title.text('<span style=\'font-size: 18pt;\'>Como quer que eu trate você?</span>');
		},
		'now': function() {
			$('.cs-placeholder').click();
			bootstrap.title.animation('fadeInUp','fadeOut');
			bootstrap.title.text('<span style=\'font-size: 18pt;\'>Como quer que eu trate você?</span>');
		},
		'no': function() {
			$('.cs-placeholder').click();
			bootstrap.title.animation('fadeInUp','fadeOut');
			bootstrap.title.text('<span style=\'font-size: 18pt;\'>Como quer que eu trate você?</span>');
		},

		'senhor': function(texto) {
			$('div ul li:nth-child(1)').click();
			document.getElementById('user-gender').value = $('.cs-placeholder').html();
			bootstrap.title.animation('fadeInUp','fadeOut');
			bootstrap.title.text('<span style=\'font-size: 25pt;\'>Podemos avançar?</span>');
		},

		'senhorita': function(texto) {
			$('div ul li:nth-child(1)').click();
			bootstrap.title.animation('fadeInUp','fadeOut');
			bootstrap.title.text('<span style=\'font-size: 25pt;\'>Podemos avançar?</span>');
		},

		'senhorita': function(texto) {
			$('div ul li:nth-child(1)').click();
			bootstrap.title.animation('fadeInUp','fadeOut');
			bootstrap.title.text('<span style=\'font-size: 25pt;\'>Podemos avançar?</span>');
		},

		'nenhum': function(texto) {
			$('div ul li:nth-child(3)').click();
			bootstrap.title.animation('fadeInUp','fadeOut');
			bootstrap.title.text('<span style=\'font-size: 25pt;\'>Podemos avançar?</span>');
		},

		'*texto': function(texto) {
			$('#avatar').removeClass('av-animation').addClass('animated shake');

			say('Escolha uma das opções disponíveis.');

			setTimeout(function() {
      $('#avatar').removeClass('animated shake').addClass('av-animation')
    }, 2000);
		}
};




/*
Esses são os comandos para a forma de tratamento
que a assistente utilizará com o usuário na inicialização.
*/
var commandsOcious = {
		'(Sophia)(Sofia)': refresh,

		'sim': function() {
			$('#introducing-screen-conf-button-yes').focus();
				setTimeout(function() {
					$('#introducing-screen-conf-button-yes').click();
    		}, 1000);
		},
		'sing': function() {
			$('#introducing-screen-conf-button-yes').focus();
				setTimeout(function() {
					$('#introducing-screen-conf-button-yes').click();
    		}, 1000);
		}
};

annyang.addCommands(commands);
annyang.setLanguage('pt-BR');
annyang.addCallback('errorPermissionDenied', function() {
	notification.create(
		'warning',
		'Permissão do uso do microfone negada.',
		'img/icons/ios7-mic-off.png',
		5000
	);
});

annyang.addCallback('errorPermissionBlocked', function() {
	notification.create(
		'warning',
		'Permissão do uso do microfone negada.',
		'img/icons/ios7-mic-off.png',
		5000
	);
});

annyang.addCallback('error', function ()
{
	listening('false');
});

annyang.addCallback('soundstart', function ()
{
	listening('true');
});

}

else {alert('Seu navegador não suporta todas as funcionalidades da Sophia.');}
