// **************************
//  ** miley.brain.js
// ***************************
// ** Versão/Version: 1.3.4
// ** Autor/Author: Victor Ribeiro (@JVRibeiiro)
// ** Licença: MIT
// ***************************

// * Informações da I.A.
var AIname = "Miley";   // * Nome da I.A.
var AInick = "Mi";      // * Apelido da I.A.
var version = "1.3.4";  // * Versão da I.A.
//

// * Abreviação de window e document
var w = window;
var d = document;
//

// * Simplificação das chamadas de funções
function mileyOnLoad() {/*mileyCorGet();*/ mileyIni(); getHist(); clock(); onLoad(); d.getElementById("v").innerHTML = "v"+version; mileyFbApi();}
function mileyOps() {config(); autocom();}
function mileyApps() {d.getElementById('lado2').style.display = 'block'; d.getElementById('lado2').focus()}
function mileyAppsClose() {d.getElementById('lado2').style.display = "none"}
function textoFalar() {d.getElementById('resposta').value = ""; rotina(); espera(); saveHist(); d.getElementById('texto').focus(); voz();}
function mileyAbrirAjuda() {d.getElementById('ajuda').focus(); w.open('ajuda.html', 'ajuda', 'width=500, height=700, top=25, left=0'); abrirAjuda(); voz();}
function mileyHistorico() {d.getElementById('dialogo').style.display = 'block'; d.getElementById('dialogo').focus();}
function mileyHistoricoClose() {d.getElementById('dialogo').style.display = 'none';}
function mileyFbPost() {d.getElementById('fb_div').style.display = 'block'; d.getElementById('fb_message').focus();}
function mileyFbPostClose() {d.getElementById('fb_div').style.display = 'none';}
function mileyCalc() {d.getElementById('calc').style.display = 'block';}
function mileyCalcClose() {d.getElementById('calc').style.display = 'none';}
function mileyChromeBrowser() {d.getElementById('mini-browser').style.display = 'block';}
function mileyChromeBrowserClose() {d.getElementById('mini-browser').style.display = 'none';}
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

// * Idade da I.A. (tentando melhorar)
var idade = 2014 - ano + " anos";
//

// * Delay de 2.5s na resposta (sincroniza com a resposta falada)
function mostra() {d.getElementById('resposta').style.opacity = '1';};
function espera() {d.getElementById('resposta').style.opacity = '0'; setTimeout("mostra()", 2500);};
//

// * Algoritmo de renomeação caso estejam vazio os campos de informação do usuário
if (gen == null || gen == undefined) {gen = "usuário";};
if (nome == null || nome == undefined) {nome = "anônimo";};
if (dialog == null) {dialog = "";};
if (nome == "" && gen == "senhor") {nome = "anônimo";};
if (nome == "" && gen == "senhorita") {nome = "anônima";};
if (nome == "" && gen == "você") {gen = "pessoa";};
if (nome.length > 0 && gen == "você") {gen = "";};
//

// * Algoritmo de saudações dependentes do horário
if(hora < 5.59) {saud = "Boa madrugada";} else if(hora < 8) {saud = "Bom dia";} else if(hora < 11.59) {saud = "Bom dia";} else if(hora < 18) {saud = "Boa tarde";} else {saud = "Boa noite";}
//

// * Relógio digital
function clock() {
// * Identificadores de Data e Hora
var agora = new Date();
var hora = agora.getHours(), min = agora.getMinutes(), seg = agora.getSeconds(), ano = agora.getFullYear(), dia = agora.getDate();
var mes = new Array();
    mes[0] = "01";
    mes[1] = "02";
    mes[2] = "03";
    mes[3] = "04";
    mes[4] = "05";
    mes[5] = "06";
    mes[6] = "07";
    mes[7] = "08";
    mes[8] = "09";
    mes[9] = "10";
    mes[10] = "11";
    mes[11] = "12";
var sem = new Array();
    sem[0] = "Domingo";
    sem[1] = "Segunda";
    sem[2] = "Terça";
    sem[3] = "Quarta";
    sem[4] = "Quinta";
    sem[5] = "Sexta";
    sem[6] = "Sábado";
var omes = mes[agora.getMonth()];
var osem = sem[agora.getDay()];

strSeg = new String (seg); if (strSeg.length == 1) {seg = "0"+seg};
strMin = new String (min); if (strMin.length == 1) {min = "0"+min};
strHor = new String (hora); if (strHor.length == 1) {hora = "0"+hora};

strDia = new String (dia); if (strDia.length == 1) {dia = "0"+dia};

  d.getElementById('hor').innerHTML = hora+":";
  d.getElementById('min').innerHTML = min;
  d.getElementById('seg').innerHTML = seg;

  d.getElementById('dia').innerHTML = dia;
  d.getElementById('mes').innerHTML = omes;
  d.getElementById('ano').innerHTML = ano;

  d.getElementById('semana').innerHTML = osem;
     setTimeout("clock()",1000);
};
//

// * Script de Síntese de voz (TTS) - Uma cortesia da VoiceRSS.org
// * *************************************************************
function voz() {

  var gUsapikey = w.localStorage.getItem('sapikey');
  var gUsrate = w.localStorage.getItem('srate');
  var gUidioma = w.localStorage.getItem('idioma');
  var gUcodec = w.localStorage.getItem('codec');
  var gUformato = w.localStorage.getItem('formato');

var link = "https://api.voicerss.org/";
var apikey = gUsapikey;
var rate = gUsrate;
var idioma = gUidioma;
var codec = gUcodec;
var formato = gUformato;
var texto = d.getElementById("resposta").value;

if (texto.length > 1000) {
texto = texto.substring(0, 999);
};

d.getElementById("voz").src = link
+ "?key=" + apikey
+ "&r=" + rate
+ "&hl=" + idioma
+ "&c=" + codec
+ "&f=" + formato
+ "&src=" + texto
};
//

// * Algoritmo de conversação
// * ***************************************
usuario = "Aqui aparecerá sua fala. \nPara ajuda, diga \'O que posso dizer?\'";
sistema = "Olá, "+gen+" "+nome+".";
historico = dialog;

function rotina(nome) {
var nome = window.localStorage.getItem('nome');
if (nome == null || nome == undefined){nome = "anônimo";};
usuario = d.miley.Texto.value;
if (usuario == null || usuario == undefined || usuario == ""){usuario = "(Não houve fala alguma).";};
historico = historico + nome + " disse em "+dia+" de "+omes+" de "+ano+" às "+hora+":"+min+": \n" + usuario +  '\r' + "\n\n";
padroesMiley()
historico = historico  +  '\r' + "\n";
atualizarTela();
}

function padroesMiley() {
for (i=0; i < brain.length; i++) { // Inicia um loop que executa apenas uma vez cada elemento da array brain.

exReg = new RegExp (brain[i][0], "i"); // Usando o contador [i] do loop, coloca um padrão da array no mecanismo de expressão regular na variável "exReg".

if (exReg.test(usuario)) { // testa a entrada do usuário contra o "exReg" e se ele corresponder executa o próximo bloco de instruções - se não houver correspondência o loop vai continuar a carregar o próximo valor.

tamanho = brain[i].length - 1; // cria uma variável "tamanho" e a deixa igual ao número de respostas possíveis

index = Math.ceil(tamanho * Math.random());

reply = brain[i][index];

sistema = usuario.replace(exReg, reply);

sistema = capitalizar(sistema);

historico = historico
+ "Eu ("+AIname+") disse: \n"
+sistema
+ "\r"
+ "\n_______________________________________________"
+ "\n|---------------------------------------------------------|\n";
break;
  }
 }
}

function mileyIni() {atualizarTela()}

function atualizarTela() {
var userInputCheck = "";
if(usuario == "") {userInputCheck = " Me parece que você não digitou nada."}
d.miley.dialogo.value = historico;
d.miley.Resposta.value = sistema + userInputCheck;
d.miley.Pergunta.value = usuario;
d.miley.Texto.value = "";
}
//

// * Função que capitaliza (deixa maiúscula)
function capitalizar(mileyField) {
mileyField = mileyField.substr(0, 1).toUpperCase() + mileyField.substr(1);
return mileyField
loop;
}



// * Função de abrir ajuda
// * ****************************************************************
function abrirAjuda() {var ajuda = new Array (new Array ("Abrir ajuda"));for (h=0; h < ajuda.length; h++) {d.miley.Texto.value = ajuda[h];rotina()}};
function abrir(URL) {w.open(URL,'janela','width=550, height=640, top=25, left=400, toolbar=no, fullscreen=yes');};
//

// * *****************************************
// * * Menu de contexto com botão direto do mouse.
// * * Script por: Henrique Barcelos.
// * * link: http://forum.imasters.com.br/topic/374916-menu-de-contexto-personalizado-boto-direito-do-mouse/
// * *****************************************
function click(z){d.getElementById("right_btn").innerHTML="";var t=d.getElementById("context_menu");var n=z||event;if(n.button==2||n.button==3){mostrar(n);t.onmouseout=function(z){var t=z||event;var n=t.relatedTarget||t.toElement;if(n.nodeName!="LI"){}}}if(n.button==0||n.button==1){esconder()}}function mostrar(z){var t=d.getElementById("context_menu");t.style.display="block";t.style.top=z.clientY+0+"px";t.style.left=z.clientX+2+"px"}function esconder(){setTimeout(function(){var z=d.getElementById("context_menu");z.style.display="none"},300)}d.onmousedown=click;d.oncontextmenu=function(){return false};
//


// * Zoom usando o scroll do mouse
$(window).bind('mousewheel', function(e){
if(e.originalEvent.wheelDelta > 0) {
if (camera2.z > 400)
JSTweener.addTween(camera2, {time: 1.5, z: 300, transition: JSTweener.easingFunctions.easeOutExpo});
}
else {
if (camera2.z < 800)
JSTweener.addTween(camera2, {time: 1.5, z: 1000, transition: JSTweener.easingFunctions.easeOutExpo});
}
});


$(function() {
    $( ".ui-draggable" ).draggable();
});

$(function() {
$( ".set div" ).draggable({ stack: ".set div" });
});

$(function() {
    $( "#calcIcone" ).draggable({ cursor: "defalut", cursorAt: { top: -5, left: -5 } });
    $( "#mini-browserIcone" ).draggable({ cursor: "defalut", cursorAt: { top: -5, left: -5 } });
    $( ".miley" ).draggable({ handle: "div" });

    $( "#miley-avatar" ).draggable({ containment: "body", scroll: false });
    $( "#calcIcone" ).draggable({ containment: "body", scroll: false });
    $( "#mini-browserIcone" ).draggable({ containment: "body", scroll: false });
    $( "#calc" ).draggable({ containment: "body", scroll: false });
    $( ".miley" ).draggable({ containment: "body", scroll: false });
    $( "#def-img-srch" ).draggable({ containment: "body", scroll: false });
    $( "#rel" ).draggable({ containment: "body", scroll: false });
  });



  $(document).on("input", "#q", function () {
    $("#img-srch").fadeIn();
    $("#def-srch").fadeIn();
    $("#enter-p-srch").fadeIn();
    $("#def-img-srch-x").fadeIn();

    if($('#q').val() == "") {
      $("#img-srch").fadeOut();
      $("#def-srch").fadeOut();
      $("#enter-p-srch").fadeOut();
      $("#def-img-srch-x").fadeOut();
    }
});


function defImgSrchX() {
  if($('#q').val() == "") {
    $("#img-srch").fadeOut();
    $("#def-srch").fadeOut();
    $("#enter-p-srch").fadeOut();
    $("#def-img-srch-x").fadeOut();
  }
}






window.fbAsyncInit = function() {
				// init the FB JS SDK
				FB.init({
					appId      : '410082289142337',                    // App ID from the app dashboard
          status     : true,                                 // Check Facebook Login status
					xfbml      : true,                                  // Look for social plugins on the page
					oauth      : true                                  // Enable oauth authentication
				});

				// Additional initialization code such as adding Event Listeners goes here
post_on_wall() {
				FB.login(function(response)
				{
					if (response.authResponse)
					{
						console.log(response.authResponse.accessToken);


						/* SHARE STYLE POST TO WALL - START */
            var fbmsg = d.getElementById('fb_message').value;
						var opts = {
						message : fbmsg,
						picture : 'https://fbcdn-photos-g-a.akamaihd.net/hphotos-ak-xfa1/t39.2081-0/p128x128/10734310_410274512456448_2103690616_n.png'
						};
						FB.api('/me/feed', 'post', opts, function(response)
						{
							if (!response || response.error)
							{
								console.log(response.error);
								alert('Posting error occured');
							}else{
								alert('Success - Post ID: ' + response.id);
							}
						});
						/* SHARE STYLE POST TO WALL - END */


					}else{
						alert('Not logged in');
					}
				}, { scope : 'publish_stream' });

}



			};


			// Load the SDK asynchronously
			(function(d, s, id){
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) {return;}
				js = d.createElement(s); js.id = id;
				js.src = "//connect.facebook.net/pt_BR/all.js";
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
