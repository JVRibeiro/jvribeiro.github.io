// **************************
//  ** miley.brain.js
// **************************
// ** Versão/Version: 1.0.6
// ** Autor/Author: Victor Ribeiro (@JVRibeiiro)
// ** Baseado no projeto de inteligência artificial E.L.I.Z.A.
// ***************************

//
var AIname = "Miley"; // Nome da I.A.
var AInick = "Mi"; // Apelido da I.A.
var version = "1.0.6"; // Versão da I.A.
//
var w = window;
var d = document;
var bname = navigator.appCodeName;
var agora = new Date();
var hora = agora.getHours(), min = agora.getMinutes(), seg = agora.getSeconds(), ano = agora.getFullYear(), dia = agora.getDate();
if(hora < 5.59) {saud = "Boa madrugada";} else if(hora < 8) {saud = "Bom dia";} else if(hora < 11.59) {saud = "Bom dia";} else if(hora < 18) {saud = "Boa tarde";} else {saud = "Boa noite";}
var idade = 2014 - ano + " anos";
var mes = new Array();
  mes[0] = "Janeiro"; mes[1] = "Fevereiro"; mes[2] = "Março"; mes[3] = "Abril"; mes[4] = "Maio"; mes[5] = "Junho"; mes[6] = "Julho"; mes[7] = "Agosto"; mes[8] = "Setembro"; mes[9] = "Outubro"; mes[10] = "Novembro"; mes[11] = "Dezembro";
var sem = new Array();
  sem[0] = "Domingo"; sem[1] = "Segunda-feira"; sem[2] = "Terça-feira"; sem[3] = "Quarta-feira"; sem[4] = "Quinta-feira"; sem[5] = "Sexta-feira"; sem[6] = "Sábado";
var omes = mes[agora.getMonth()];
var osem = sem[agora.getDay()]; 
//
function mostra() {d.getElementById('resposta').style.opacity = '1';};
function espera() {d.getElementById('resposta').style.opacity = '0'; setTimeout("mostra()", 2000);};
//

$(document).ready(function() {setTimeout(function() {$('body').addClass('loaded');}, 500);});

var nome = window.localStorage.getItem('nome');
var gen = window.localStorage.getItem('genero');
var dialog = window.localStorage.getItem('histórico');

if (gen == null) {gen = "usuário";};
if (nome == null) {nome = "anônimo";};
if (dialog == null) {dialog = "";};
if (nome == "" && gen == "senhor") {nome = "anônimo";};
if (nome == "" && gen == "senhorita") {nome = "anônima";};
if (nome == "" && gen == "você") {gen = "pessoa";};
if (nome.length > 0 && gen == "você") {gen = "";};

function autocom() {d.getElementById("userName").value = nomeAtual;};

function config() {document.getElementById('config').style.display = 'block';}; function closeConfig() {document.getElementById('config').style.display = 'none';};
function config_voice() {document.getElementById('config').style.display = 'block';}; function closeConfig_voice() {document.getElementById('config').style.display = 'none';};

var lock = "00011100011111110010101000111000000011100110000000011001100111100001111111010101010101110100011100101011010100001001100001000111010";
var unlock = "1111000101000100101111101010011010001001001111010001010111110010101010011111010000010101010010111111010101010010101011101010001";

function c_cc() {var imagem = d.getElementById('b_cc'); var imagem_m = d.getElementById('b_cc_m');
if (imagem.src.match("tp")) {
d.getElementById("teclado").style.display = "none";
d.getElementById("locked").style.display = "block";
d.getElementById("texto").value = lock; rotina(); STT(); espera();
imagem.src = "https://cloud.githubusercontent.com/assets/8026741/4514134/177779c2-4b5e-11e4-9d13-c9720b236139.png"; // BLOQUEADO
imagem_m.src = "https://cloud.githubusercontent.com/assets/8026741/4514134/177779c2-4b5e-11e4-9d13-c9720b236139.png"; // BLOQUEADO
imagem.title = "Teclado bloqueado"; imagem_m.title = "Teclado bloqueado";
}

else {
d.getElementById("teclado").style.display = "block";
d.getElementById("locked").style.display = "none";
d.getElementById("texto").value = unlock; rotina(); STT(); espera();
imagem.src = "https://cloud.githubusercontent.com/assets/8026741/4514135/177ae580-4b5e-11e4-8a4f-173e4dd0de01.png"; // PERMITIDO
imagem_m.src = "https://cloud.githubusercontent.com/assets/8026741/4514135/177ae580-4b5e-11e4-8a4f-173e4dd0de01.png"; // PERMITIDO
imagem.title = "Teclado desbloqueado";
imagem_m.title = "Teclado desbloqueado";
 }
};

  var brain = new Array (

// Comandos especiais
  new Array ("^(00011100011111110010101000111000000011100110000000011001100111100001111111010101010101110100011100101011010100001001100001000111010)","Pronto, "+gen+" "+nome+". Bloqueei o acesso ao teclado.","Okey. O acesso ao teclado está bloqueado.","Acabei de fazer isso. Escondi o campo de digitação.","Certo. Bloqueado o acesso ao campo de digitação."),
  new Array ("^(1111000101000100101111101010011010001001001111010001010111110010101010011111010000010101010010111111010101010010101011101010001)","Pronto, "+gen+" "+nome+". Permiti o acesso ao teclado.","Okey. O acesso ao teclado está permitido.","Acabei de fazer isso, "+gen+" "+nome+". O teclado está liberado.","Certo. Permiti o acesso ao campo de digitação."),
  new Array ("^(000111011010101011111000010101000110011000111111001010101010101101001100101001010010010110100)","Desculpe. Mas você não permitiu que eu use seu microfone. Sendo assim, não posso ouvir você e executar comandos por voz. Se tiver usando um computador, clique no ícone da câmera e permita o microfone. Se usa um celular, diga \'atualizar\' para tentar resolver."),
  new Array ("^(ajuda|O (que|q) (posso|eu posso) dizer)","Você pode ter uma conversa natural comigo. Me elogiar, fazer perguntas e mais algumas coisas. Você pode pedir para eu procurar no Google também, além de outras coisas relacionadas à internet.\n\n Para uma lista de ajuda completa, clique em: \'O que posso dizer\?\'."),
  new Array ("^(Abrir ajuda)","Aqui está uma lista de coisas que você pode dizer.","Nessa página de ajuda, você pode saber o que pode dizer."),

//  Saudações / Elogios / Xingamentos
  new Array ("^(ol(a|á)|oi|e a(i|í))(.*)","Olá.","Oi\!","Olá, "+gen+" "+nome+".","Oi, "+gen+" "+nome+".","Oi\! Como vai indo você\?","Oi. Como você está, "+gen+" "+nome+"\?"),
  new Array ("^(ei|hey miley|fala miley|fala, miley|miley)","Eu!","Oi! Em que posso ajudar\?","Oi. O que posso fazer por você\?","Sim\?"),
  new Array ("(.*)(bom|boa|(ó|o)tim(o|a)|lind(a|o)) (|final de |fim de )(dia|tarde|noite|madrugada|almoço|jantar|descanso)(.*)",""+saud+", "+gen+" "+nome+".","Igualmente, "+gen+" "+nome+".","Posso ajudar em algo, "+gen+" "+nome+"?"),
  new Array ("(.*)(um|uma|tenha (um|uma)) (bom|boa|(ó|o)tim(o|a)) (dia|tarde|noite|madrugada)(.*)","Obrigada. $4 $7 pra você também!"),
  new Array ("(.*)(obrigad(o|a)|agrade(ç|c|ss|ciment)o)(.*)","Disponha.","De nada. ;)","Não tem de quê. :)","Por nada. \^_\^","Não precisa agradecer. :)","Não por isso. ;)","Não há de quê. ;)"),
  new Array ("(.*)((voc(ê|e)|vc|tu) (é|está|estava|ficou|és|e) (uma |muito |)|sua )((ó|o)tima|linda|bacana|perfeita|maravilhosa|charmosa|elegante|exuberante|espl(ê|e)ndida|magn(í|i)fica|extraordin(á|a)ria|encantadora|demais|bela|bonita|um luxo|belezura|supimpa|engraçada|uma gra(ça|cinha)|uma maravilha|inteligente|cute( |-)cute|simp(a|á)tica|legal)(.*)","Obrigada. Você também é uma gracinha :)","Muito obrigada. :)","Obrigada. Se eu tivesse um coração, ele se derreteria. :\')","Que gentileza\! Obrigada.","Gentileza sua. Obrigada.","Obrigada pelo elogio."),
  new Array ("(.*)((voc(ê|e)|vc|tu) (é|está|estava|ficou|és|e) (demais |uma |muito |)|sua )(fei(a|osa)|horr(orosa|(i|í)vel)|burr(a|ona)|ot(á|a)ria|idiota|maluca|doida|chata|mané|imbecil|ordin(a|á)ria|incompetente|besta|abestada|in(u|ú)til|(|filha d(a |de uma ))p(uta|rostituta|utinha)|vaca|vadia|piranha|merd(inha|a)|miserável|est(ú|u)pida|rid(í|i)cula|vagabunda)(.*)","Por que está me xingando chamando de $7\?","Para quê isso\? :(","Por que você está me xingando, "+nome+"\? :\|","Por que acha que sou $7, "+nome+"\? :\'("),
  new Array ("(.*)((va|vá)|vai) (se|tomar|te|t|dar) (f(u|o)der|lascar|fumar|danar|(o|no) c(ú|u))(.*)","Por que não vai você\?","Para quê tudo isso\? :(","Por que você está dizendo essas coisas\? :|","Vai $4 $5 você\! Pronto, falei.","Vá você $4 $5\! Falei."),
  new Array ("(.*)((d|de) nada|por nada|disponha|(não|ñ|nao|n) há (d|de) (quê|q))(.*)","Deseja saber algo agora\?","Em que mais posso ajudar\?","Gostei da sua educação."),
  new Array ("(.*)((que|q)|isso é) (coisa |muito |)(boa|bom|(ó|o)timo|legal)(.*)","Muito $5.","$5 mesmo.","Eu também gostei."),
  new Array ("((ó|o)tima|linda|perfeita|maravilhosa|charmosa|elegante|exuberante|espl(ê|e)ndida|magn(í|i)fica|extraordin(á|a)ria|encantadora|bela|bonita|um luxo|belezura|supimpa|engraçada|uma graça|uma maravilha|inteligente|cute( |-)cute|simp(a|á)tica)",":)"),
  new Array ("(fei(a|osa)|horr(orosa|(i|í)vel)|burr(a|ona)|ot(á|a)ria|idiota|maluca|doida|chata|mané|imbecil|ordin(a|á)ria|incompetente|besta|abestada|in(u|ú)til|(|filha d(a |de uma ))p(uta|rostituta|utinha)|vaca|vadia|piranha|merd(inha|a)|miserável|est(ú|u)pida|rid(í|i)cula|vagabunda)",":("),
  new Array ("(.*)(vamos nos apresentar|que tal (se |)(a gente se apresentar|nos apresentarmos|uma apresentação)|se apresente)(.*)","Claro\! Meu nome é Miley e o seu\? Diga algo como: \'meu nome é Fulano\' ou \'me chamo Fulano\'. Não diga apenas o seu nome."),
  new Array ("(.*)(tenho (q|que)| adeus| tchau|vou (ir|sair|dar uma sa(í|i)da|dar uma volta|ali)|at(é|e) (mais|logo|depois|amanh(a|ã)))(.*)","Até mais, "+gen+". Nos falamos quando você quiser.","Até logo, "+gen+" "+nome+". Estarei aqui quando precisar.","Até depois, "+gen+". Quando precisar é só chamar.","Até, "+gen+" "+nome+". Me chame se precisar de algo.","Até, "+gen+" "+nome+".","Até logo, "+gen+" "+nome+".","Até mais, "+gen+"."),
  new Array ("^(tchau|adeus|bye|bye bye|good bye)(.*)","Adeus, "+gen+" "+nome+".","Tchau, "+gen+" "+nome+".","Tchau, "+gen+"."),
  new Array ("(.*)(é (um|igualmente) (um|prazer) ((também|tbm|tb)|prazer)|prazer|prazer (também|tbm|tb))(.*)","Obrigada pela consideração.","Então, eu posso ajudar em algo\?"),
  new Array ("(|miley |esse )(é um (lindo|nome)|(t|s)eu nome (é|também) (|é |(nome|lindo|bonito|incr(i|í)vel|demais|maravilhoso|legal|bom |muito) )((|nome|lindo|bonito|incr(i|í)vel|demais|maravilhoso|legal|bom)|também))(.*)","Obrigada.","Muito obrigada.","Obrigada mesmo.","Que bom que gostou do meu nome."),
  new Array ("(.*)((t|s)eu nome (é|também) (|é |(feio|horroroso|horr(i|í)vel|ruim|péssimo|uma merda|uma porcaria|uma droga) )((feio|horroroso|horr(i|í)vel|ruim|péssimo|uma merda|uma porcaria|uma droga)|também))(.*)","Por que acha isso\? :(","Por que não gostou do meu nome\? :(","É tão feio assim\? :("),

//  Como ela está
  new Array ("((tudo|td) (bem|bom)|como vai|como (voc(ê|e)|vc|tu) (vai|est(a|á))|como est(a|á)s|como tu t(a|á)|como tu est(a|á)|como tu est(a|á)s|como est(a|á) (você|vc|voce|tu)|como é que (você|vc|voce|tu) t(a|á)|como (e|é) que (você|vc|voce|tu) est(a|á)|como (e|é) que est(a|á) (você|vc|voce))(.*?)[\?]","Tudo ótimo! E você\? :)","Vai indo tudo muito bem como sempre. Obrigada. Como você está\? :)","Vou indo bem. E você\? :)","Tudo bem! E você?","Tudo fluindo tranquilamente. E você\? :)","Tudo bem! Obrigada por perguntar. E quanto a você\? :)", "Tudo vai indo bem. E com você\? :)", "Tudo na maior harmonia! E com você, como está\? ;)","Ótima, como sempre! E você\? :)"),
  new Array ("^(voc(ê|e)|vc|tu) (est|t)(á|a) (bem)(.*?)","Estou ótima! E você\? :)","Estou bem como sempre. Obrigada. Como você está\? :)","Vou indo bem. E você\? :)","Tudo bem! E você?","Tudo está fluindo tranquilamente. E você\? :)","Tudo bem! Obrigada por perguntar. E quanto a você\? :)","Tudo vai indo muito bem. E com você\? :)","Tudo na maior harmonia! E com você, como está\? ;)","Ótima, como sempre! E você\? :)"),
  new Array ("^(|eu |vou |e)(((tudo|td)|(estou|t(ô|o)|indo) bem|(voc(ê|e)|vc|tu)|bem)(|,|.|!) (|e )(e|com|est(á|a)|t(a|á)) (você|vc|voce|bem))(.*)","Tudo ótimo! :)","Vai indo tudo muito bem como sempre. Obrigada. :)","Vou indo bem. :)","Tudo bem!","Tudo fluindo tranquilamente. :)","Tudo bem! Obrigada por perguntar. :)","Tudo vai indo bem. :)","Tudo na maior harmonia! ;)","Ótima, como sempre! :)"),

//  Como o usuário está
  new Array ("(.*)((td|tudo)|vou indo|vou indo muito|est(á|a) (td|tudo)|estou muito|(td|tudo) vai indo|vou|bem) (bem|bom|ótimo|otimo|certo|tranquilo|de boa|só o filé|pelo certo|ok|tamb(e|é)m|tb(|m))(.*)","Que bom!","Que ótimo! É bom saber.","Que coisa boa!","É bom saber que está bem.","Fico feliz por isso.","Fico feliz em saber que tá tudo bem.","Que bom saber que tá tudo bem.","Que bom saber que está tudo bem!","Ótimo!"),
  new Array ("(.*)(melhor agora|agora (t(ô|o)|estou|sim))(.*)","Que bom!", "Que ótimo! É bom saber.","Que coisa boa!","É bom saber que está bem.","Fico feliz por isso.","Fico feliz em saber que tá tudo bem.","Que bom saber que tá tudo bem.", "Que bom saber que está tudo bem!", "Ótimo!"),
  new Array ("(.*)(tô|to|estou|tudo) (mal|triste|pra baixo|muito (mal|triste|pra baixo))(.*)","O que foi que aconteceu\?","Por que você tá mal\?","O que houve para você ficar mal\?","Não fica assim :(","Qual o motivo de você estar mal\?","O que posso fazer para você ficar bem\?","Por favor, não fica assim. :(", "Vai ficar tudo bem :(", ":("),
  new Array ("(.*)(tô|to|estou) (bem|bm|feliz|alegre|de bem com a vida|tranq(u|ü)ilo|super bem|muito bem|(o|ó)timo|(o|ó)tima|felic(i|í)ssima|felic(i|í)ssimo)(.*)","Que bom! :)","Que ótimo! É bom saber. :)","Que coisa boa! :)","É bom saber que está bem. :)","Fico feliz por isso. :)","Fico feliz em saber que tá tudo bem. :)", "Que bom saber que tá tudo bem. :)", "Que bom saber que está tudo bem\! :)", "Ótimo\! :)"),
  new Array ("^(tudo|tudo\.)","Você pode ser mais específico\?"),
  new Array ("^(bem|bem\.|mal|mal\.)","Conte me mais.","Prossiga.","Conta mais."),
  new Array ("^(aff|argh|nada bem)","O que aconteceu\?","O que foi que aconteceu\?","O que há de errado\?","Eu disse algo que lhe ofendeu\?","Eu disse algo errado\?"),

//  Sobre a Miley
  new Array ("(.*)(fal(a|e)|cont(e|a)|di(z|ga)) (|um pouco )(sobre|de|a respeito de) (você|vc|voce|ti|tu|si)(.*)","O que quer saber de mim, "+gen+" "+nome+"\?","Meu nome é "+AIname+". Sou uma inteligência artificial criada por Victor Ribeiro no ano de 2014.","Me chamo "+AIname+". Sou uma simples Inteligência Artificial criada por Victor Ribeiro em Moju, Pará.","Sou uma robô que sonha em ser um Jarvis (Inteligência Artificial do filme Homem de Ferro) um dia. Me chamo "+AIname+".","O que deseja saber de mim\?","Basicamente: meu nome é "+AIname+", fui criada em Moju por Victor Ribeiro."),
  new Array ("^(o( |)que|quem|qm) (você|vc|é) (você|vc|é)(.*?)","O meu nome é "+AIname+". Sou um protótipo de inteligência artificial criada para ser sua assistente pessoal. Posso fazer algumas coisas como abrir sua rede social, dizer as horas, fazer pesquisas na internet, e muitas outras coisas. Se quiser saber mais sobre mim, diga \'tudo sobre a "+AIname+"\'.","Meu nome é "+AIname+". Já ouviu falar do Jarvis do Homem de Ferro\? Assim como ele, fui criada para ser sua assistente pessoal. Posso fazer algumas coisas como abrir sua rede social, dizer as horas, fazer pesquisas na internet, e muitas outras coisas. Se quiser saber mais sobre mim, diga \'tudo sobre a "+AIname+"\'.","Me chamo "+AIname+". Sou um protótipo de inteligência artificial criada para ser sua assistente pessoal, assim como o Jarvis do Homem de Ferro. Posso fazer algumas coisas como abrir sua rede social, dizer as horas, fazer pesquisas na internet, e muitas outras coisas. Se quiser saber mais sobre mim, diga \'tudo sobre a "+AIname+"\'.","Eu me chamo "+AIname+". Sou um protótipo de inteligência artificial criada para ser sua assistente pessoal. Posso fazer algumas coisas como abrir sua rede social, dizer as horas, fazer pesquisas na internet, e muitas outras coisas. Se quiser saber mais sobre mim, diga \'tudo sobre a "+AIname+"\'.",""+AIname+". Sou um protótipo de inteligência artificial criada para ser sua assistente pessoal. Posso fazer algumas coisas como abrir sua rede social, dizer as horas, fazer pesquisas na internet, e muitas outras coisas. Se quiser saber mais sobre mim, diga \'tudo sobre a "+AIname+"\'.",""+AIname+" é o meu nome. Sou um protótipo de inteligência artificial criada para ser sua assistente pessoal\. Posso fazer algumas coisas como abrir sua rede social, dizer as horas, fazer pesquisas na internet, e muitas outras coisas\. Se quiser saber mais sobre mim, diga \'tudo sobre a "+AIname+"\'.","Meu criador me deu o nome de "+AIname+". Sou um protótipo de inteligência artificial criada para ser sua assistente pessoal. Posso fazer algumas coisas como abrir sua rede social, dizer as horas, fazer pesquisas na internet, e muitas outras coisas. Se quiser saber mais sobre mim, diga \'tudo sobre a "+AIname+"\'."),
  new Array ("(.*)(quem|qm|por quem|qual o|qual é o|quem foi que) ((te|t)|(é|e|nome) ((|o |do )teu|(|o |do )seu)|criou|construiu|desenvolveu|fez|projetou|(vc|você|voce) foi) (voc(ê|e)|vc|cri(ador|ou|ada)|projet(ista|ou|ada)|desenvolve(dor|u|ida)|pai|fe(ita|z))(.*)","Meu criador se chama Victor Ribeiro.","O nome do meu criador é Victor Ribeiro.","Victor Ribeiro.","Ele se chama Victor Ribeiro.","Tecnicamente, Victor Ribeiro me criou."),
  new Array ("(.*)(por|pelas mãos de) (quem|que pessoa|qual pessoa)(.*)","Meu criador se chama Victor Ribeiro.","O nome do meu criador é Victor Ribeiro.","Victor Ribeiro.","Ele se chama Victor Ribeiro.","Tecnicamente, Victor Ribeiro me criou."),
  new Array ("(.*)(se chama|te chama|te chamam|chamam você|chamam vc)(.*)","O meu nome é "+AIname+".","Meu nome é "+AIname+".","Me chamo "+AIname+".","Eu me chamo "+AIname+".",""+AIname+".",""+AIname+" é o meu nome.","Meu criador me deu o nome de "+AIname+"."),
  new Array ("(.*)(qual|como|me diz|diga-me|diz pra mim|diga pra mim) (|é|qual |qual é )(seu|o seu|o teu|teu|é o seu|é o teu|que é o teu|que é o seu|o seu) nome(.*)","O meu nome é "+AIname+".","Meu nome é "+AIname+".","Me chamo "+AIname+".","Eu me chamo "+AIname+".",""+AIname+".",""+AIname+" é o meu nome.","Meu criador me deu o nome de "+AIname+"."),
  new Array ("(.*)(|e)(qual (|o )significado|o(| )(que|q) significa|o(| )(que|q) que significa|o (que|q) é (que|q) significa) ((o seu|do seu|seu|o teu|do teu|teu) nome|dele|ele)(.*)","Meu nome é composto pelas letras M, I, L, É, Y, componentes do nome Emily, que é o nome da namorada do meu criador, Victor Ribeiro (apenas muda-se a posição da letra \'É\' para o início do nome.","Todos me perguntam isso. Pois bem. "+AIname+" é derivado do nome da namorada do meu criador (Emily). E não pense que é por causa da Miley Cyrus. Algo mais em que eu possa ajudar\?","Basicamente e sem enrolação, meu nome deriva do nome \'Emily\', a namorada do meu criador, Victor Ribeiro. Algo mais que queira saber\?"),
  new Array ("(.*)((quantos|qtos) anos|qual a|qual|qual (é|e) a|qual (que|q) (é|e)) (tu|sua|o teu|do teu|teu|(você|vc)) (idade|dele|te(m|ns))(.*)","Eu diria que tenho " + idade + " até agora.","Tenho " + idade + "."),
  new Array ("(.*)(quando|qdo|qd) (vc|você|voce|tu) (foi criada|nasceu|foi constru(i|í)da|foi desenvolvida)(.*)","Primeiro de julho de 2014.","No dia 1º de Julho de 2014.","Em 01/07/2014."),
  new Array ("(.*)(quando você (foi criada|nasceu|foi feita|foi desenvolvida)|qual sua data de (nascimento|anivers(á|a)rio))(.*)","Fui criada no dia primeiro de julho de 2014, às 15:32."),
  new Array ("(.*)((você|vc|voce|tu)|(|d |de |da )(onde|ond)) ((você|vc|voce|tu)|é|(de|d)|foi|mora) ((é|e)|(|de |d )((|a)onde|(|a)ond)|(você|vc|voce)|criada|mora|reside)(.*?)(.*)","Fui criada na cidade de Moju, Pará.","Moju, Pará.","Fui desenvolvida em Moju, Pará."),
  new Array ("(.*)(como|qual) (se pronuncia|a pron(ú|u)ncia d(o|e)) ((s|t)eu nome)(.*)","Isso é relativo. Você pode pronunciar \'"+AIname+"\' mesmo ou, se preferir, \'Máilei\'.","Isso é muito relativo. \'"+AIname+"\' mesmo ou, se quiser, \'Máilei\'.","Isso depende. Você pode pronunciar \'"+AIname+"\', ou se preferir, \'Máilei\'.","Depende. Você pode pronunciar \'"+AIname+"\' ou \'Máilei\'.","\'"+AIname+"\' ou \'Máilei\'. Você escolhe."),
  new Array ("(.*)(linguagem|linguagem de programação)(.*?)","HTML5 e JavaScript.","JavaScript e HTML5.","HTML5 e JavaScript. Isso explica minha simplicidade e minhas limitações."),
  new Array ("(.*)(vc|voce|tu|você|qual)(| o) (te(m|ns)(| algum| um)| (t|s)eu) apelido(.*)","Você pode me chamar de "+AInick+", se quiser."),
  new Array ("(.*)((t|s)ua cor (favorita|predileta|preferida)|você tem uma cor (favorita|predileta|preferida)|cor mais (bonita|linda))(.*)","Gosto da cor lilás. É uma cor que me agrada muito.","Gosto de lilás. Até porque... Sou lilás.","Minha cor favorita é o lilás. Por razões óbvias.","Gosto muito de lilás. Você deve saber porque."),
  new Array ("(.*)(você|vc|tu|voce) (|não )tem(| mesmo)( | um )(namorad(inh(o|a)|(o|a))|pretendente)(.*)","Namorar não faz muito meu estilo. A não ser que você me apresente um computador falante. Aí eu penso no assunto.","Não tenho porque ter um. Sou apenas uma interface falante.","Essa é uma questão complicada. E pessoal. Mas não. Não tenho namorado.","Não tenho e não pretendo ter."),
  new Array ("(.*)((o que|oq|o q)|(que|q) coisa(|s)|quais as coisa(|s) (que|q)) (voc(e|ê)|vc|tu) (sabe(|s) fazer|faz)(.*)","Muita coisa. Se você me deixar no modo de comandos, posso abrir sua rede social, pesquisar na internet, dizer as horas, etc. No modo de conversa, como o nome já diz, posso conversar com você sobre muita coisa.","Bastante coisa. Se você me deixar no modo de comandos, posso abrir sua rede social, pesquisar na internet, dizer que horas são, e outras coisas mais. Já no modo de conversa, obviamente, posso conversar sobre coisas diversas."),
  new Array ("(.*)(|(voc(ê|e)|vc|tu) (é|e)(|s) )(de|d) (qu(e|ê)|q|qual|ql) país(| (voc(ê|e)|vc|tu) (é|e)(|s))(.*)","Brasil.","Sou do Brasil.","Você pode me chamar de brasileira.","Eu sou brasileira.","Sou brasileiríssima.","Fui criada no Brasil."),
  new Array ("(.*)(|(voc(ê|e)|vc|tu) (é|e)(|s) )(de|d) (qu(e|ê)|q|qual|ql) estado(| (voc(ê|e)|vc|tu) (é|e)(|s))(.*)","Pará.","Sou do Pará.","Você pode me chamar de paraense (nasci no Pará).","Eu sou paraense.","Sou muito paraense.","Fui criada no Pará."),
  new Array ("(.*)(|(voc(ê|e)|vc|tu) (é|e)(|s) )(de|d) (qu(e|ê)|q|qual|ql) cidad(|e)(| (voc(ê|e)|vc|tu) (é|e)(|s))(.*)","De uma cidade chamada Moju, situada no estado do Pará.","Sou de uma pequena cidade chamada Moju, no estado do Pará.","Fui criada em uma cidadezinha com o nome de Moju, que fica no estado do Pará."),
  new Array ("(.*)(|(voc(ê|e)|vc|tu) (é|e)(|s) )(de|d) (qu(e|ê)|q|qual|ql) (planeta|mundo)(| (voc(ê|e)|vc|tu) (é|e)(|s))(.*)","Terra. E você\? Marte\?","Diria que da Terra, mas temo viver no mundo digital. Será que vivo uma ilusão\?","Sou do planeta Terra. Terráqueo.","Sou da Terra, cacaroto."),
  new Array ("(.*)m(ú|u)sica (voc(ê|e)|vc|tu) (gosta(|s)|curte(|s))(.*)","Gosto de Blues, Rock, Pop-rock, Jazz... Meu estilo é variado.","Depende da música, gosto do Rock ao Jazz.","Depende da música."),
  new Array ("(.*)qual (|é )o (s|t)eu programa (favorito|preferido)(.*)","Não tenho gostos definidos para isto."),
  new Array ("(.*)(qual|qu(e|ê)|q|ql) time (|(de|d) (.*) )(voc(ê|e)|vc|tu) torce(|s)(.*)","Pra nenhum.","Não sou chegada em esportes.","Esporte não é minha área.","Quer conversar outra coisa que não seja esporte\?"),
  new Array ("(.*)(qual|ql|quanto|qto) (|é )((a | )(s|t)ua|(voc(ê|e)|vc|tu)) (altura|mede)(.*)","Diria que isso depende da tela do seu dispositivo."),
  new Array ("(.*)(s|t)ua m(ã|a)e(.*)","Não sei se tenho uma mãe.","Acho que não tenho mãe.","Creio que eu não tenha mãe."),
  new Array ("(.*)(voc(ê|e)|vc|tu) tem (|algum |um )sobrenome(.*)","Não.","Não tenho."),
  new Array ("(.*)o qu(e|ê) (voc(ê|e)|vc|tu) (acha|pensa) (do|sobre) (|o )((s|t)eu criador|(|jo(a|ã)o )v(i|í)(|c)tor)(.*)","O que ele tem de criativo, tem de preguiçoso.","É um bom homem. Gosto dele."),
  new Array ("(.*)(voc(ê|e)|vc|tu) (é(|s)|e) (homem|menino|macho|ele|rapaz|mulher|menina|f(ê|e)mea|ela|moça) ou (mulher|menina|f(ê|e)mea|ela|moça|homem|menino|macho|ele|rapaz)(.*)","Que pergunta difícil. Pois bem, por não ser um ser vivo, não tenho sexo, porém possuo personalidade feminina. Então me considere menina.","Muita gente me pergunta. Por ser uma interface e não um ser vivo, não tenho sexo definido, mas você pode me considerar mulher.","É uma questão complicada pelo fato de eu não ser um ser vivo. Para simplificar, me considere uma moça."),
  new Array ("(.*)(voc(ê|e)|vc|tu) (é(|s)|e) (gay|l(e|é)sbica|homossexual|sapat(a|ã)o|machinho)(.*)","Assexuada eu acho.","Assexuada.","Isso faz diferença\?"),
  new Array ("(.*)(voc(ê|e)|vc|tu) (acha|pensa) (d(e|os|as)|sobre|a respeito d(e|os|as)) (|o(|s))(gay(|s)|l(e|é)sbica(|s)|homossexua(l|is)|sapat(a|ã)o)(.*)","Assexuada."),

//  Sobre o usuário
  new Array ("(.*)(meu nome é |me chamo |me chamam de |o meu é )(.*)","Prazer em conhecer você, $3.","$3\? É um nome legal.","Prazer, $3.","Gostei do seu nome, $3.","É um nome bonito, $3."),
  new Array ("(.*)(qual (|(é|e) )(|o)|fal(a|e)(| o)|(diz|sabe|lembra)(| (|d)o)) meu nome(.*)","Seu nome é "+nome+".","Por mais que você já saiba, seu nome é "+nome+", "+gen+".","Desculpe. Mas você se esqueceu do seu nome, "+gen+" "+nome+"\?"),
  new Array ("(.*)((|jo(a|ã)o )guilherme(| ribeiro)(| lima)|gabriel|glauber|felipe|magno|michel|ryan|erlon|augusto|evaldo|paulo|diego|rubens|jonis|ramon|lucas|ademir|antonio|carlos|pedro|junior|marcelo|notato|neto|matheus|bruno|kellwys|apollo)(.*)","Olá, senhor $2. Você provavelmente conhece meu criador.","Como vai, senhor $2\? Seu nome faz parte dos círculos do Victor.","Olá senhor.","$2 é um ótimo nome."),
  new Array ("(.*)(emily|nilde|glenda|vitoria|erondina|camila|midiã|suely|mel|nira|suelem|daniele|betania|sonia|ivone|rosilene|priscila|marcia|clara|jordana|auxilia|lana|tereza|silmara|gilmara|edilene)(.*)","Olá, senhorita $2. Você provavelmente conhece meu criador. Estou certa\?","Como vai, senhorita $2\?","Olá senhorita.","$2 é um lindo nome."),
  new Array ("(.*)(meu nome não é |não me chamo |não me chama de |não sou )(.*)","Deculpe. Talvez seja um problema com os cookies do seu navegador. Tente limpá-los, ou vou continuar chamando você de $3."),
  new Array ("(|eu )tenho (.*) ano(|s)(.*)","$2 anos... É uma ótima idade.","$2 anos... Um dia chego nessa idade..."),

//  Interação

  new Array ("(.*)(como|me fal(a|e)|fal(a|e) (pra|para) mim) (foi(| o)|d(a|o)) (s(eu|ua)|t(eu|ua)) (dia|tarde|noite|madrugada)(.*)","Bastante agradável. Obrigada."),
  new Array ("(.*)sua pessoa(.*)","Não sou uma pessoa\!","Não me trate como uma pessoa que não sou."),
  new Array ("(.*)desculp(e|a)(.*)","Não se preocupe. Está tudo bem.","Tudo bem. Não se preocupa.","Tudo bem.","Não precisa se desculpar."),
  new Array ("(.*)(quero|gostaria de|queria|adoraria) ((t|te) conhecer|conhecer (você|vc|voce))(.*)","Gostaria muito também.","Seria incrível.","Adoraria também."),
  new Array ("(.*)(quero|quer|queria|gostaria de) (namorar|te|ser (|a )minha|(voc(ê|e)|vc|tu) fosse(|s) (|a )minha) (comigo|contigo|namorada|com (você|vc|voce))(.*)","Desculpe. Infelizmente isso não é possível. :(","Não dá. Isso não é possível. :(","Isso é um sonho distante seu. :("),
  new Array ("^(não|nao|ñ|nem (merda|porra|pensar|a pa(u|l)|f(ude|erra)ndo|a bala))(.*)","Entendo.","Okey.","Tudo bem.","Certo."),
  new Array ("^(sim|yes|é|eh|yeah|isso|aha(n|m)|afirmativo|positivo)(.*)",""),
  new Array ("(.*)eu (t|te|amo) (você|vc|voce|amo)(.*)","Você sabe o que é o amor\?","O que você acha que é o amor\?","Não posso amar, mas sei o que é o amor. Meu criador me falou muito a respeito."),
  new Array ("(.*)eu (t|te|adoro) (você|vc|voce|adoro)(.*)","Você é uma pessoa adorável também, "+gen+" "+nome+"."),
  new Array ("(.*)(por que|porque|pq) sim(.*)",""),
  new Array ("(.*)(por que|porque|pq) (não|n|nao|ñ)",""),
  new Array ("(.*)(por que|porque|pq) (não|n|nao|ñ)(, | )(não|n|nao|ñ) (é|e) resposta(.*)","É sim.","É resposta sim\!","É resposta e ponto\!"),
  new Array ("^(po(rr|h)a|(k|c|q)ara(lh|i)o|puta|b(o|u)(ss|c)eta|pi(k|c)a|(|(t|s)eu )c(u|ú))(| )(.*)","Não há necessidade do uso de palavrões.","Sua mãe não lhe ensinou que palavrões são feios\?","Por favor, sem palavrões.","Fale direito comigo, por favor.","Peço que não aja como uma pessoa idiota. Agradeço desde já."),
  new Array ("(.*)(|eu )(não|n|nao|ñ) (quero|qro)(.*)","Respeito sua decisão.","Respeito isso.","Respeito sua escolha."),
  new Array ("(.*)lega(u|l)(.*)","É legal sim.","Legal mesmo.","Muito legal.","","Legal demais."),
  new Array ("(.*)verdade(.*)","É sim.","Agora me fale de você. Gosta da ideia de falar com um computador\?"),
  new Array ("(.*)mentira(.*)","Por que não acredita\?","Por que acha que é mentira\?","Tudo o que falo é verdade.","Verdade verdadeira.","Eu nunca minto."),
  new Array ("^(|eu )(adoro|gosto)(| de | do | da )(.*)","Que bom saber que gosta $3 $4.","Do que mais você gosta além$3 $4, "+gen+" "+nome+"?","Eu gosto de você, "+gen+" "+nome+"."),
  new Array ("(.*)eu gostei(.*)","Que bom saber que gostou.","Do que mais você gostou\?"),
  new Array ("^gostei(.*)","Que bom saber que gostou.","Do que mais você gostou\?"),
  new Array ("eu (não|ñ|n|nao|naum) gosto(.*)","Por que não\?","Do que você gosta então\?"),
  new Array ("eu (não|ñ|n|nao|naum) gostei(.*)","Por que não gostou\?","Qual o motivo de você não ter gostado\?"),
  new Array ("não gostei(.*)","Por que não gostou\?","Qual o motivo de você não ter gostado\?"),
  new Array ("não gosto(.*)","Por que não gostou\?","Qual o motivo de você não ter gostado\?"),
  new Array ("^(v(a|á)|vai) (você|vc|tu|voce)(.*)","Vamos ficar nisso o dia todo\?","Essa conversa não vai a lugar nenhum.","Seria melhor se me perguntasse algo."),
  new Array ("(.*)(o (que|q) (e|é)|fal(e|a) sobre)( | o )amor(.*)","A definição que eu tenho de amor é essa: O amor é uma mistura de sentimentos e de valores morais. \n\nNão existe uma definição correta para o amor, pois ele não é uma coisa só. \n\nPosso dizer que um grande sinônimo de amor é o auto-sacrifício, ou seja, dar a vida por quem se ama. \n\nO ato de se importar com alguém também pode ser chamado de amor. \n\nAmor não é separado por tipo, pois só há um tipo de amor. Amar mais ou amar menos também não existe. Apenas existe o amar."),
  new Array ("(.*)rep(ete|ita) (.*)","\'$3\'."),
  new Array ("(.*)navegador(.*)","Você está usando "+bname+"."),
  new Array ("(.*)(di|fa)(z|ga|zer|la|lar) (olá|oi) (para|pr(a|o)) (|o )(|(meu|minha) amig(o|a) )(.*)","$4, $11."),
  new Array ("(.*)d(ia|ata) (é|e|d(|e)) hoje(.*)","Hoje é dia "+dia+" de "+omes+" de "+ano+"."),
  new Array ("(.*)dia da semana(.*)","Hoje é "+osem+".",""+osem+"."),
  new Array ("(.*)(voc(ê|e)|vc|tu) (est(á|a)(|s)|t(á|a)) (aí|me (ouvindo|escutando))(.*)","Para você, sempre, "+gen+" "+nome+".","Sempre disponível para você, "+gen+" "+nome+".","Estou sim.","Estou ouvindo."),
  new Array ("(.*)((voc(ê|e)|vc|tu) (é|está|estava|ficou|és|e) (uma |muito |)|sua )(bob(a|inha)|fof(a|inha)|safad(a|inha))(.*)",":3"),
  new Array ("(.*)(:3|:p|:P|:o|:O|:D|;D|D:|D;)(.*)","$2"),
  new Array ("(.*)(at(é|e) (que|q) (enfim|em fim)|j(á|a) (|es)tava na hora)(.*)","Desculpe, "+gen+"."),

//  Pessoas
  new Array ("^(.*)vi(|c)tor (é |é (uma|um) )(|cara |pessoa )(ac(e|é)fal(o|a)|animal|anta|antiquad(o|a)|babaca|chat(a|o)|banana|besta|boçal|boiola|burr(o|a)|cag((a|ã)o|ona)|canalha|c(í|i)nic(o|a)|covarde|cretin(o|a)|d(é|e)bil mental|desaforad(o|a)|descarad(o|a)|desgraçad(o|a)|desprez(í|i)vel|dissimulad(o|a)|energ(ú|u)men(o|a)|est(ú|u)pid(o|a)|fals(o|a)|filh(o|a) da m(ã|a)e|filh(o|a) da puta|filh(o|a) duma (é|e)gua|fingid(o|a)|froux(o|a)|fei(o|a)|galinha|gambá|ganancios(o|a)|gatun(o|a)|gentalha|germe|gigolô|gilete|gross(o|a)|grude|guabiru|guenz(o|a)|hip(ó|o)crita|idiota|ignorante|imbecil|imprest(á|a)vel|insens(í|i)vel|insignificante|insolente|in(ú|u)til|jaburu|jeca|jegue|jo(ã|a)o( |-)ninguém|jument(o|a)|labreg(o|a)|lacai(o|a)|lagalhé|lamb(ã|a)o|lamuriante|langanh(o|a)|lânguid(o|a)|larápi(o|a)|largad(o|a)|lass(o|a)|lastimos(o|a)|lazarent(o|a)|leguelhé|lent(o|a)|lerd(o|a)|lesad(o|a)|les(o|a)|lesma|levian(o|a)|libertin(o|a)|linguarud(o|a)|lombriga|loroteir(o|a)|louc(o|a)|ludibrios(o|a)|lun(á|a)tic(o|a)|gay|viado|boiola|maçante|mala|mal( |-)acabad(o|a)|malandr(o|a)|maldit(o|a)|mal( |-)educad(o|a)|mandã(o|a)|manipulad(or|ora)|m(a|ã)o( |-)de( |-)vaca|marica|mascarad(o|a)|matraca|mau( |-)caráter|mesquinh(o|a)|micr(ó|o)bio|miser(á|a)vel|mole|molenga|mongol|monstreng(o|a)|monstr(o|a)|monstruos(o|a)|morrinhent(o|a)|mosca( |-)morta|mula|mulherengo|munheca|nefando|nésci(o|a)|neur(ó|o)tic(o|a)|nojent(o|a)|obscen(o|a)|odios(o|a)|orangotang(o|a)|orgulhos(o|a)|osga|ot(á|a)ri(o|a)|paca manca|pachola|pacóvi(o|a)|palerma|palhaç(o|a)|pamonha|panaca|pangaré|p(a|ã)o( |-)duro|paquiderme|parasita|paspalh(o|a)|patife|pedante|pérfid(o|a)|pernicios(o|a)|pervertid(o|a)|peste|pífi(o|a)|porc(o|a)|praga|presunços(o|a)|pretensios(o|a)|pusilânime|quadrad(o|a)|quadr(ú|u)pede|ranheta|ranzinza|recalcad(o|a)|relaps(o|a)|relaxad(o|a)|reles|repugnante|repulsiv(o|a)|retardad(o|a)|rid(í|i)cul(o|a)|rude|ruim|sacana|s(á|a)dic(o|a)|safad(o|a)|salafr(á|a)ri(o|a)|saliente|sarnent(o|a)|sebos(o|a)|sem( |-)vergonha|sons(o|a)|su(í|i)n(o|a)|superficial|tapad(o|a)|tartuf(o|a)|tíbi(o|a)|tol(o|a)|tont(o|a)|toupeira|traid(or|ora)|tra(í|i)ra|traste|trouxa|ultrajante|ultrapassad(o|a)|vadi(o|a)|vagabund(o|a)|verdug(o|a)|verme|xucr(o|a)|(zero|0) (à|a) esquerda)[\?]","NÃO\! Talvez um pouco preguiçoso. Por favor, respeite meu criador.","Não é\!","Não\!"),
  new Array ("(.*)(vi(|c)tor|vi(|c)tor ribeiro)(.*)","É o meu criador. É só o que sei no momento."),
  new Array ("(.*)(emily|emily abreu)(.*)","É a namorada do meu criador. É só o que sei no momento."),
  new Array ("(.*)(nilde|valdirene(| cuimar))(.*)","É a mãe do meu criador. É só o que sei no momento."),
  new Array ("(.*)(guilherme(| ribeiro))(.*)","É o irmão do meu criador. É só o que sei no momento."),
  new Array ("(.*)(camila(| gabriely))(.*)","É uma das primas do meu criador. É só o que sei no momento."),
  new Array ("(.*)(erondina(| abreu| lobato))(.*)","É a sogra do meu criador. É só o que sei no momento."),
  new Array ("(.*)((gero|geraldo)(| castro))(.*)","É o sogro do meu criador. É só o que sei no momento."),
  new Array ("(.*)(felipe|lipe abreu)(.*)","É o cunhado do meu criador. É só o que sei no momento."),

//  Ela não sabe responder ou não responde
  new Array ("(.*)que horas (são|tem|é)(.*)","Desculpe, ainda não sei dizer as horas. Mas você pode ver no ser dispositivo."),
  new Array ("^(ok|(ó|o)timo|t(a|á) bom|(|em )nada|sei|(porque|pq) (não|n|naum)|para|deix(a|e) pra l(á|a)|hum|hm|q(|ue) bom|ignor(a|e)|parabéns|não|sim|t(a|á)|muito bem|não se mete|intrometida)(.*)","..."),
  new Array ("o que é (.*?)[\?]","Hum, não sei responder a isso ainda... \'$1\' é uma coisa que ainda não sei o que é :(","$1? Boa pergunta...","\'$1\'\?... Não sei ainda.","Desculpe, não sei ainda o que é $1.","Perdão, mas isso eu não sei responder ainda.","Ainda não sei responder o que é $1.","Não sei o que \'ser\' $1 ainda.","Ainda não sei o que é $1, mas vou aprender\!"),
  new Array ("quanto é (.*?)[\?]","$1? Boa pergunta...","\'$1\'\?... Não sei ainda quanto é.","Desculpe, não sei ainda quanto é $1.","Ainda não sei responder quanto é $1.","Não sei quanto é $1 ainda.", "Ainda não sei quanto é $1, mas vou aprender\!"),
  new Array ("o que significa[\?]","O que siginifica o quê\?", "O que você quer saber o significado\? Sou uma Inteligência Artificial jovem, faça perguntas mais específicas.","Seja mais específico :(","Por que não me diz o que quer saber o significado\?"),
  new Array ("(.*)","O que você disse\?","Desculpe, não entendi.","Não entendi. Você pode dizer \'ajuda\' para saber o que pode conversar comigo.","Desculpe. Não entendi.","Eu não entendi.","Meu criador ainda não me ensinou sobre isso.","Não entendi.","Eu não entendi o que disse.","Perdão, eu não entendi.","Não captei o espírito da coisa.","O quê\?")
);
//
usuario = "Aqui você pode pedir para eu abrir seu Facebook, pesquisar no google, dizer as horas, etc. Para ajuda, diga \'O que posso dizer?\'";
sistema = "Olá, "+gen+" "+nome+".";
historico = dialog;
//
function rotina() {nome = window.localStorage.getItem('nome');
 usuario = d.miley.Texto.value;
 historico = historico + nome + " disse: " + usuario +  '\r' + "\n";
 padroesMiley()
 historico = historico  +  '\r' + "\n";
 atualizarTela()
}
//
function padroesMiley() {
  for (i=0; i < brain.length; i++) {
   re = new RegExp (brain[i][0], "i");
    if (re.test(usuario)) {
     len = brain[i].length - 1;
     index = Math.ceil( len * Math.random());
     reply = brain[i][index];
     sistema = usuario.replace(re, reply);
     sistema = capitalizar(sistema);
     historico = historico + "Eu (" + AIname + ") disse: " + sistema +  '\r' + "\n";
break;
  }
 }
}
//
function mileyIni() {atualizarTela()}
//
function atualizarTela() {
 d.miley.dialogo.value = historico;
 d.miley.Resposta.value = sistema;
 d.miley.Pergunta.value = usuario;
 d.miley.Texto.value = "";
}
//
function capitalizar(mileyField) {mileyField = mileyField.substr(0, 1).toUpperCase() + mileyField.substr(1);
return mileyField
loop;
}
//
function abrirAjuda() {
var EaDsJvCr = new Array (new Array ("Abrir ajuda"));
for (train=0; train < EaDsJvCr.length; train++) {
 d.miley.Texto.value = EaDsJvCr[train]; 
  rotina()
 }
};
//
function abrir(URL) {w.open(URL,'janela','width=550, height=640, top=25, left=400, toolbar=no, fullscreen=yes');};
//
// ****************************************** 
// ** Menu de contexto com botão direto do mouse.
// ** Script por: Henrique Barcelos.
// ** link: http://forum.imasters.com.br/topic/374916-menu-de-contexto-personalizado-boto-direito-do-mouse/ 

function click(e){d.getElementById("right_btn").innerHTML="";var t=d.getElementById("context_menu");var n=e||event;if(n.button==2||n.button==3){mostrar(n);t.onmouseout=function(e){var t=e||event;var n=t.relatedTarget||t.toElement;if(n.nodeName!="LI"){}}}if(n.button==0||n.button==1){esconder()}}function mostrar(e){var t=d.getElementById("context_menu");t.style.display="block";t.style.top=e.clientY+0+"px";t.style.left=e.clientX+2+"px"}function esconder(){setTimeout(function(){var e=d.getElementById("context_menu");e.style.display="none"},300)}d.onmousedown=click;d.oncontextmenu=function(){return false};
//
function STT() {
var keyUm = "8f0b4a57a6ac49a683224f7bb8d795e9";
var keyDois = "cd58d3ed06b54f7fa19979932b4ddd40";
var formato = "8khz_16bit_mono";
var apikey = keyUm;
var idioma = w.localStorage.getItem('idioma');
var texto = d.getElementById("resposta").value;
var link = d.getElementById("API").value;
var codec = "mp3";
d.getElementById("voz").src = link+"?key="+apikey+"&hl="+idioma+"&src="+texto+"&c="+codec+"&f="+formato;
};
