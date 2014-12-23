// **************************
//  ** miley.brain.js
// ***************************
// ** Versão/Version: 1.5
// ** Autor/Author: Victor Ribeiro (@JVRibeiiro)
// ** Licença: MIT
// ***************************

// * Informações da I.A.
var AIname = "Miley";   // * Nome da I.A.
var AInick = "Mi";      // * Apelido da I.A.
var version = "1.5.79";  // * Versão da I.A.
//

// * Abreviação de window e document
var w = window;
var d = document;
//

// * Simplificação das chamadas de funções
function mileyOnLoad() {/*mileyCorGet();*/ fbCaps(); mileyIni(); getHist(); clock(); onLoad(); $(".v").html("v"+version);}
function mileyOps() {config(); autocom();}
function mileyApps() {d.getElementById('lado2').style.display = 'block'; d.getElementById('lado2').focus()}
function mileyAppsClose() {d.getElementById('lado2').style.display = "none"}
function textoFalar() {d.getElementById('resposta').value = ""; rotina(); espera(); saveHist(); d.getElementById('texto').focus(); voz();}
function mileyAbrirAjuda() {d.getElementById('ajuda').focus(); w.open('ajuda.html', 'ajuda', 'width=500, height=700, top=25, left=0'); abrirAjuda(); voz();}
function mileyFb() {d.getElementById('miley-fb').style.display = 'block'; d.getElementById('fb_message').focus();}
function mileyFbClose() {d.getElementById('miley-fb').style.display = 'none';}
function mileyCalc() {d.getElementById('calc').style.display = 'block';}
function mileyCalcClose() {d.getElementById('calc').style.display = 'none';}
function mileyConvLog() {d.getElementById('miley-dialog').style.display = 'block'; d.getElementById('dialogo').focus()}
function mileyConvLogClose() {d.getElementById('miley-dialog').style.display = 'none';}
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

  d.getElementById('dia').innerHTML = dia+" / ";
  d.getElementById('mes').innerHTML = omes+" / ";
  d.getElementById('ano').innerHTML = ano;

  d.getElementById('semana').innerHTML = osem;
     setTimeout("clock()",1000);
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
+ "\n_____________________________________________"
+ "\n|------------------------------------------------------|\n";
break;
  }
 }
}

function mileyIni() {atualizarTela()}

function atualizarTela() {
var userInputCheck = "";
if(usuario == "") {userInputCheck = " Me parece que você não digitou nada."}
d.getElementById('dialogo').value = historico;
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



// * Aqui são usadas as funções da biblioteca "jQuery UI"
// * Proprietário/Owner :       jQuery Foundation
// * Link               :       http://jqueryui.com

// Chama a função para todos os elementos arrastáveis da interface
$(function() {
    $( ".ui-draggable" ).draggable();
});

// Muda o "z-index" dos elementos arrastáveis para que eles fiquem por cima dos não utilizados no arraste
$(function() {
$( ".set div" ).draggable({ stack: ".set div" });
});


$(function() {
  // Muda a posição do cursor do mouse ao arrastar os ícones para que, ao soltá-los não haja a função "click".
    $( "#calcIcone" ).draggable({ cursor: "defalut", cursorAt: { top: -5, left: -5 } });
    $( "#fbIcone" ).draggable({ cursor: "defalut", cursorAt: { top: -5, left: -5 } });
  // Permite que os elementos sejam arrastados apenas por um manipulador
    $( ".miley" ).draggable({ handle: "div" });
  // Define em qual conteiner o elemento estará contido
    $( "#miley-avatar" ).draggable({ containment: "body", scroll: false });
    $( "#calcIcone" ).draggable({ containment: "#lado2", scroll: false });
    $( "#fbIcone" ).draggable({ containment: "#lado2", scroll: false });
    $( "#calc" ).draggable({ containment: "body", scroll: false });
    $( ".miley" ).draggable({ containment: "body", scroll: false });
    $( "#def-img-srch" ).draggable({ containment: "body", scroll: false });
    $( "#rel" ).draggable({ containment: "body", scroll: false });
  });

  $(document).on("input", "#q", function () {
// Mostra opções ao começar a digitar na Pesquisa de Imagens
    $("#img-srch").fadeIn();
    $("#def-srch").fadeIn();
    $("#enter-p-srch").fadeIn();
    $("#def-img-srch-x").fadeIn();
// Oculta as opções caso o campo esteja vazio
    if($('#q').val() == "") {
      $("#img-srch").fadeOut();
      $("#def-srch").fadeOut();
      $("#enter-p-srch").fadeOut();
      $("#def-img-srch-x").fadeOut();
    }
});

// Oculta as opções ao clicar no botão X
function defImgSrchX() {
  if($('#q').val() == "") {
    $("#img-srch").fadeOut();
    $("#def-srch").fadeOut();
    $("#enter-p-srch").fadeOut();
    $("#def-img-srch-x").fadeOut();
  }
}

// Seleciona as abas do menu de configurações com um clique.
$(function() {
  $( "#tabs" ).tabs({
    event: "click"
  });
});



// ! * API DO FACEBOOK
// ! * Esse script foi compartilhado por: Tahir Yasin
// ! * http://tahiryasin.wordpress.com/2012/12/06/post-to-your-facebook-wall-using-javascript-sdk
// ! * Meus sinceros agradecimentos ao autor. Indiretamente você colaborou com o Projeto S.O.P.H.I.A.
// ! * Muito Obrigado! (Thank you very much!)

  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      mileyFbApi();
      d.getElementById('fb-login-buttom').style.display = "none";
      d.getElementById('fb-logout-buttom').style.display = "block";
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      d.getElementById('status').innerHTML = 'Existe uma conta logada. Permita meu acesso ao seu Facebook, por favor.';
    } else {
      d.getElementById('status').innerHTML = 'Nenhuma conta logada no Facebook.';
        d.getElementById('fb-login-buttom').style.display = "block";
        d.getElementById('fb-logout-buttom').style.display = "none";
        console.log('Desconectado');
    }
  }

  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '410082289142337',
    status     : true,
    cookie     : true,
    xfbml      : true,
    version    : 'v2.2',
    oauth : true
  });

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };


function post_on_wall() {
    FB.login(function(response) {
        if (response.authResponse) {
            console.log('Usuário conectado...');

            var fbmsg = d.getElementById('fb_message').value;
            var opts = {
                        message : fbmsg
                        };

            FB.api('/me/feed', 'post', opts, function(response) {
                if (!response || response.error) {
                    console.log('Ocorreu um erro ao postar');
                    d.getElementById('resposta').value = "Não consegui postar, "+gen+".";
                    voz();
                }
                else {
                    console.log('Postado com sucesso! - Post ID: ' + response.id);
                    d.getElementById('fb_message').value = "";
                    window.open('https://www.facebook.com/me','facebook','width=1400, height=740, top=25, left=0');
                    d.getElementById('resposta').value = "Pronto, "+gen+". Postei a frase: \'"+fbmsg+"\'. Deseja algo mais?";
                    voz();
                }
            });
        }
        else {
            console.log('Não conectado!');
        }
    }, { scope : 'publish_stream' });
}


  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "js/facebook/fbapi-sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function mileyFbApi() {
    console.log('Bem-vindo! Recebendo informações... ');
    FB.api('/me', function(response) {
      console.log('Logado como: ' + response.name);
      d.getElementById('status').innerHTML =
        'Olá, ' + response.name + '!';
        d.getElementById('resposta').value = "Seu FB está agora logado como "+response.name+", "+gen+".";
        voz();
    });
  }


  function fbCaps() {
$(document).on("input", "#fb_message", function () {
    $("#fb-postar").fadeIn();

    if($('#fb_message').val() == "") {
      $("#fb-postar").fadeOut();
    }
});
  }
 /* ************************************************************** */



 // * Recurso de Síntese de voz (TTS) - Uma cortesia da VoiceRSS.org
 // *
 // * As barras de feedback visual de audio foram adquiridas
 // * http://www.developphp.com/view.php?tid=1348
 // * no artigo: "Analyser Bars Animation HTML5 Audio API JavaScript Tutorial"
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
}
 // Create a new instance of an audio object and adjust some of its properties
var audio = new Audio();
audio.src = link
+ "?key=" + apikey
+ "&r=" + rate
+ "&hl=" + idioma
+ "&c=" + codec
+ "&f=" + formato
+ "&src=" + texto;
audio.controls = false;
audio.loop = false;
audio.autoplay = true;
// Establish all variables that your Analyser will use
var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
// Initialize the MP3 player after the page loads all of its HTML into the window
window.addEventListener("load", initMp3Player, false);
function initMp3Player(){
	d.getElementById('voz').appendChild(audio);
	context = new webkitAudioContext(); // AudioContext object instance
	analyser = context.createAnalyser(); // AnalyserNode method
	canvas = d.getElementById('analyser_render');
	ctx = canvas.getContext('2d');
	// Re-route audio playback into the processing graph of the AudioContext
	source = context.createMediaElementSource(audio);
	source.connect(analyser);
	analyser.connect(context.destination);
	frameLooper();
}
// frameLooper() animates any style of graphics you wish to the audio frequency
// Looping at the default frame rate that the browser provides(approx. 60 FPS)
function frameLooper(){
	window.requestAnimationFrame(frameLooper);
	fbc_array = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(fbc_array);
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
	ctx.fillStyle = '#00ffff'; // Color of the bars
	bars = 100;
	for (var i = 0; i < bars; i++) {
		bar_x = i * 3;
		bar_width = 2;
		bar_height = -(fbc_array[i] / 2);
		//fillRect( x, y, width, height ) // Explanation of the parameters below
		ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
	}
}

initMp3Player()
};







// Créditos a: http://simpleweatherjs.com
function loadlink(){

$(document).ready(function () {
  $.simpleWeather({
    location: 'moju',
    woeid: '',
    unit: 'c',
    success: function(weather) {
      html = '<i class="icon-'+weather.code+'"></i> '+weather.temp+'°'+weather.units.temp;
      html += '<div class="w-location">'+weather.city+', '+weather.region+'</div>';

      val = weather.temp+'°'+weather.units.temp+' em ';
      val += weather.city;


      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
});



}

loadlink(); // This will run on page load
setInterval(function(){
    loadlink() // this will run after every 5 seconds
}, 5000);
