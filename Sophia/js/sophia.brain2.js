// **************************
//  ** sophia.brain.js
// ***************************
// ** Autor/Author: Victor Ribeiro (@JVRibeiiro)
// ** Licença: MIT
// ***************************
// Changelogs previstos para a partir da versao 2.0

/*
.........................................................................................|
...Sistema Operacional Portatil em HTML5 com Inteligência Aritificial....................|
....___________.....________......_________....___.....___......___..........___.........|
.../           |.../        \....|         \..|   |...|   |....|   |......./     \.......|
..|     .______|../   .__.   \...|   ._.    |.|   |...|   |....|___|....../       \......|
..|    |.........|    |..|    |..|   |..|   |.|   |...|   |.....___....../   ._.   \.....|
...\    \_____...|    |..|    |..|   |__|   |.|   |._.|   |....|   |....|   |...|   |....|
....\_____    \..|    |..|    |..|   ._____/..|           |....|   |....|   |___|   |....|
..........\    |.|    |..|    |..|   |........|   .___.   |....|   |....|           |....|
....______|    |.|    |__|    |..|   |........|   |...|   |....|   |....|   _____   |....|
..|           /._.\          /._.|   |....._..|   |...|   |._..|   |._..|   |...|   |....|
..|__________/.|_|.\________/.|_||___|....|_|.|___|...|___||_|.|___||_|.|___|...|___|....|
...Portable Operating System in HTML5 with Aritificial Intelligence......................|
_________________________________________________________________________________________|
..+..Developed by: Victor Ribeiro........................................................|
.....+..GitHub: github.com/JVRibeiro.....................................................|
........+..Licence: MIT..................................................................|
...........+..Copyright: Victor Ribeiro (2014) All rights reserved.......................|
..............+..Contact: victor_ribeiro135@hotmail.com..................................|
_________________________________________________________________________________________|
*/

// * Dados na localStorage comecam com um _
var _userName = window.localStorage.getItem('user-name'),
    _userAge = window.localStorage.getItem('user-age'),
    _userBirthday = window.localStorage.getItem('user-birthday'),
    _userGender = window.localStorage.getItem('user-gender'),
    _userDefArticle = window.localStorage.getItem('ls-user-defArticle'),

    local = window.localStorage.getItem('user_city'),
    dialog = window.localStorage.getItem('histórico'),
    ip_remoto = window.localStorage.getItem('ip_remoto'),
    user_lat = window.localStorage.getItem('user_lat'),
    user_lon = window.localStorage.getItem('user_lon'),


// Define a data de "nascimento" da assistente
    aiBorn = new Date(2015,8,24,21,01,46), // Data de criacao: ano, mes (-1), dia
    born = aiBorn.getFullYear(), // Ano de criacao
    bornM = aiBorn.getMonth(), // Mes de criacao
    bornD = aiBorn.getDate(), // Dia de criacao

// Compara com a data atual
    now = new Date(),
    y = now.getFullYear(), // Ano atual
    m = now.getMonth(), // Mes atual
    d = now.getDate(); // Dia atual

// Corrige de acordo com o dia de aniversario
function age(aiBorn, now) {
var ageDif = y - born;

if ( new Date(y, m, d) < new Date(y, bornM, bornD) )
  {
    ageDif--;
    return ageDif;
}
 else
   {
    return ageDif;
    }
};

var ageY = age(aiBorn, now), // Idade (anos)
    ageM = month - bornM, // Idade (meses)

// Corrige o plural em "anos"
    _years, _months,
    years = ['ano','anos'],
    months = ['mês','meses'];

    if (ageY === 1)
    {
        _years = years[0];
    }
     else
       if (ageY > 1 || ageY < 1)
        {
          _years = years[1];
        };

    if (ageM === 1)
    {
        _months = months[0];
    }
     else
       if (ageM > 1 || ageM < 1)
        {
          _months = months[1];
        };

// Idade final
if (ageY >= 1)
{ // Se ela tiver 1 ano de idade ou mais, a idade e contada em anos e meses
var age = ageY
        + ' '
        + _years // ano(s)
        + ' e '
        + ageM
        + ' '
        + _months; // mes(es)
}
 else
   { // Se nao, e contada apenas em meses
     var age = ageM
        + ' '
        + _months; // mes(es)
    };

var ai =
  { // Informacoes da Assistente
    name        :   'Sophia', // Nome
    nick        :   'Sofia com F',
    age         :   age, // Idade
    birthday    :   aiBorn.toLocaleString(), // Criacao
    gender      :   'feminino', // Genero
    article     :   'a', // Artigo definido
    version     :   '1' // Versao do APP
  };



var user =
  { // Informacoes do usuario
    name        :   _userName, // Nome
    age         :   _userAge, // Idade
    birthday    :   _userBirthday, // Criacao
    gender      :   _userGender, // Genero
    article     :   _userDefArticle, // Artigo definido
  };
//






// * Identificadores de Data e Hora
var h = now.getHours(),
      min = now.getMinutes(),
        sec = now.getSeconds();

var _mes = ["01","02","03","04","05","06","07","08","09","10","11","12"];
var __mes = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
var week = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];

var month = _mes[m];
var _month = __mes[m];
var w = week[now.getDay()];

strSeg = new String (sec);
if ( strSeg.length === 1 )
  {
    sec = "0" + sec
    };
strMin = new String (min);
if ( strMin.length === 1 )
  {
    min = "0" + min
    };
strHor = new String (h);
if ( strHor.length === 1 )
  {
    h = "0" + h
    };
strDia = new String (d);
if ( strDia.length === 1 )
  {
    d = "0" + d
    };
//








// * Conversação
// * ***************************************

// * Algoritmo de saudações dependentes do horário
if ( h < 5.59 )
{
  greetings = "Boa madrugada";
}
else
  if ( h < 8 )
  {
  greetings = "Bom dia";
}
else
  if( h < 11.59 )
  {
    greetings = "Bom dia";
  }
  else
    if( h < 18 )
    {
      greetings = "Boa tarde";
      }
      else
      {
        greetings = "Boa noite";
        };
//

function _falar() {
      texto = document.getElementById('texto').value;
      if (event.keyCode === 13 && texto === "") {
        return false
      } else if (event.keyCode === 13 && texto !== "") {
        falar();
        return false
      }
    };

var usuario = "";
var historico = dialog;
sistemaArray = [greetings+vocativo2+tratamento+" "+nome+".", greetings+vocativo+tratamento+"."];
sistema = sistemaArray[Math.floor(Math.random()*2)];

function rotina(nome) {
var nome = window.localStorage.getItem('nome');
if (nome === null || nome === undefined) {
  nome = "anônimo";
};

usuario = $('#texto').val();

historico = historico
+ nome
  + " em " + dia
    + "\/" + omes
      + "\/" + ano
        + " às " + hora
          + ":" + min
            + ": <br>"
              + "<div style=\'color: #fff\'>" + usuario +  "</div>\r"
                + "<br>";

padroesSophia();
/*
$("#dialogo").animate({scrollTop:$("#dialogo")[0].scrollHeight}, 1000);
$( "#sophia-user--reply" ).show('bounce', 500, callback);
function callback() {
			setTimeout(function() {
				$( "#sophia-user--reply:visible" ).removeAttr( "style" ).fadeOut();
			}, 10000 );
		};
*/
historico = historico
  +  "\r"
    + "<br>";
atualizarTela();
//saveHist();

$('#log4').val($('#resposta').html()); voz();
$('#log5').val($('#pergunta').html());
};
//

function padroesSophia()
{
for ( i in brain )
  { // Inicia um loop que executa apenas uma vez cada elemento da array brain.
exReg = new RegExp (brain[i][0], "i"); // Usando o contador [i] do loop, coloca um padrão da array no mecanismo de expressão regular na variável "exReg".
if ( exReg.test(usuario) )
  { // testa a entrada do usuário contra o "exReg" e se ele corresponder executa o próximo bloco de instruções - se não houver correspondência o loop vai continuar a carregar o próximo valor.
tamanho = brain[i].length - 1; // cria uma variável "tamanho" e a deixa igual ao número de respostas possíveis
index = Math.ceil(tamanho * Math.random()); // gera um número aleatório baseado no número de respostas possíveis
reply = brain[i][index]; // cria uma variável temporária "reply" para manter a resposta escolhida aleatoriamente
sistema = usuario.replace(exReg, reply); // usa o método de expressão regular replace para transformar o padrão de resposta e colocar o resultado variável na "soutput"
sistema = capitalizar(sistema); // faz da primeira letra da variavel "sistema" maiúscula se ela ainda não for

historico = historico
+ "<div class=\'--reply\' style=\'color: #0ff\'>"
+ sistema
+ "</div>\r<br><br>"
+ "<hr>"
+ "<br>";
break
  }
 }
};

function sophiaIni() {atualizarTela()}

function atualizarTela() {
$('#dialogo').html(historico);
$('#resposta').html(sistema);
$('#pergunta').html(usuario);
$('#texto').val("");
};
//
