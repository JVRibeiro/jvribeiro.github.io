/*
.........................................................................................|
...Sistema Operacional Portátil em HTML5 com Inteliência Artificial....................|
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

// Variáveis globais
var aiCorrectAgeYear,
  aiCorrectAgeMonth,
  aiFinalAge,
  aiAgeYears_str,
  aiAgeMonths_str,
  previousCommandObj,
  actualCommandObj,

  greeting,
  micPermission,

  listening,
  attention = true,

  // localStorage
  _userData = localStorage['user-data'],
  _brain = localStorage.brain,

  // DOM
  actualInput = document.querySelector('#user-input'),
  userSubmitedText = document.querySelector('#user-submited-text'),
  sophiaReply = document.querySelector('#sophia-reply'),
  speakingLog = document.querySelector('#speaking-log'),

  // Informações (objeto) da assistente
  ai = {
    name: 'Sophia',
    age: undefined,
    gender: 'feminino',
    article: 'a',
    version: 'v4.0',
    author: 'Victor Ribeiro',
    mood: 10, // | 0--[mal-humorada]--3--[indiferente]--7--[bem-humorada]--10 |
    happiness: 10, // | 0--[triste]--3--[ficando triste]--7--[feliz]--10 |
    angry: 0, // | 0--[normal]--3--[se irritando]--7--[brava]--10 |

    say: function (words, fallback) {
            document.querySelector('#sophia-reply')
              .innerHTML = words;

            bootstrap.title.animation('fadeInUp', 'fadeOut');



            var _spRec_ = new SpeechSynthesisUtterance(),
                voicePlaying,
                voiceText;

            //Speech Synthesis
              if ( voicePlaying ) {
                speechSynthesis.cancel( _spRec_ );
                voicePlaying = false;
                changeCommands(previousCommandObj);
              }

            var voices = window.speechSynthesis.getVoices();

            _spRec_.voice = voices[0];
            _spRec_.rate = 1.6;
            _spRec_.pitch = 1.2;
            //_spRec_.voiceURI = 'native';
            _spRec_.lang = 'pt-BR';

            voiceText = document.querySelector( '#sophia-reply' );
            _spRec_.text = JSON.stringify( voiceText.innerHTML );

            speechSynthesis.speak( _spRec_ );
            avatar._animation( 'speaking' );
            voicePlaying = true;

            console.log( 'Sophia começou a falar.' );

            changeCommands(speakingCommands);

            _spRec_.onend = function ( event ) {
              voicePlaying = false;

              avatar._animation( 'default' );

              if ( !listening ) {

                ai.listening( true );
                console.log( 'Ouvindo: sim' );
              }

              if (fallback !== null) {
                changeCommands(fallback);
                console.log('changed: fallback');
              }
              else {
                changeCommands(defaultCommands);
                console.log('changed: defaultCommands');
              }
              console.log( 'Sophia parou de falar.' );
            };
          },

          listening: function(param) {
              switch (param) {
                case true:
                  listening = true;

                  $('#voice-recognition')
                    .attr('title', 'Estou ouvindo')
                    .css({
                      'background-image': 'url(img/icons/ionicons/ios7-mic.png)',
                      'background-color': '#3de5f3'
                    })
                    .removeClass()
                    .addClass('voice-recognition-listening');

                  intScr_nameInput.setAttribute('placeholder', 'Fale ou digite-o aqui');
                  break;

                case false:
                  listening = false;

                  $('#voice-recognition')
                    .attr('title', 'Não consigo ouvir')
                    .css({
                      'background-image': 'url(img/icons/ionicons/ios7-mic-off.png)',
                      'background-color': '#ff5b5b'
                    })
                    .removeClass()
                    .addClass('voice-recognition-notlistening');

                  intScr_nameInput.setAttribute('placeholder', 'Digite-o aqui');
                  break;

                default:
                  listening = true;

                  $('#voice-recognition')
                    .attr('title', 'Estou ouvindo mas não tem minha atenção')
                    .css({
                      'background-image': 'url(img/icons/ionicons/ios7-mic.png)',
                      'background-color': '#fff25b'
                    })
                    .removeClass()
                    .addClass('voice-recognition-halflistening');

                  intScr_nameInput.setAttribute('placeholder', 'Fale ou digite-o aqui');
              }
            },

            attention: {
              off: function() {
                if (voicePlaying === undefined || !voicePlaying) {
                  attention = false;

                  changeCommands(noAttentionCommands);

                  console.log('prestando atenção: não');

                  ai.listening(false);

                  notification.create(
                    '',
                    'Modo de escuta passiva.',
                    'img/icons/ionicons/ios7-mic.png',
                    5000
                  );
                } else {
                  attention = false;

                  changeCommands(noAttentionCommands);

                  console.log('nenhuma fala detectada');
                  console.log('prestando atenção: não');

                  console.log('ouvindo: não');
                  ai.listening(false);
                }
              },

              on: function() {
                attention = true;

                changeCommands(defaultCommands);

                console.log('ouvindo: sim');

                notification.create(
                  'success',
                  'Minha atenção é sua.',
                  'img/icons/ionicons/ios7-mic.png',
                  5000
                );
              }
            },

            animation: function(titleText, animationIn, animationOut) {
              $(sophiaReply)
                .removeClass()
                .hide()
                .show()
                .removeClass('animated ' + animationOut)
                .addClass('animated ' + animationIn)
                .html(titleText);
            },

            network: function(param) {
              switch (param) {
                case true:
                  $('#network-connection')
                    .attr('title', 'Conexão normal')
                    .css({
                      'background-image': 'url(img/icons/windows/appbar.network.png)',
                      'background-color': '#3de5f3'
                    })
                    .removeClass('network-connection-working network-connection-notworking')
                    .addClass('network-connection-working');
                  break;

                case false:
                  ai.listening(false);

                  $('#network-connection')
                    .attr('title', 'Conexão com problemas')
                    .css({
                      'background-image': 'url(img/icons/windows/appbar.network.disconnect.png)',
                      'background-color': '#ff5b5b'
                    })
                    .removeClass('network-connection-working network-connection-notworking')
                    .addClass('network-connection-notworking');
                  break;
              }
            },

            learning: {
              'sinonimo': [],
              'abra': {
                'twitter': function() {
                  window.open('https://www.google.com/search?q=twitter&btnI=');
                }
              },
              'aprenda': {
                'isso': function() {
                  changeCommands(learnCommands);

                  notification.create('', 'Modo aprendizado', '', 5000);
                },
                '': function() {
                  changeCommands(learnCommands);

                  notification.create('', 'Modo aprendizado', '', 5000);
                  console.log('modo aprendizado');
                }
              }
            },

            action: function(command) {
              var orders = /(fale|diga|pesquise|pesquisa|pesquisar|faça|abra|abrir|abre|lembra|lembrar|me lembra|lembre-me|posta|postar|poste|aprende|aprenda|aprender)(| )(.*)/gi;
              var match = orders.exec(command);

              if (command.match(orders)) {
                // console.log( '(' + match[1] + ')[1], (' + match[2] + ')[2], (' + match[3] + ')[3]' );
                console.log('Ordem: "' + match[1] + '"\nObjeto: "' + match[3] + '"');
                actualOrder = match[1];
                actualObject = match[3].match(/^\s.*/gi) ? match[3] = match[3].replace(/^\s(.*)/gi, '$1') : match[3] = '';

                if (ai.learning.hasOwnProperty(actualOrder) && ai.learning[actualOrder].hasOwnProperty(actualObject)) {
                  ai.learning[actualOrder][actualObject]();
                } else
                if (ai.learning.hasOwnProperty(actualOrder) && ai.learning[actualOrder].hasOwnProperty('')) {
                  ai.learning[actualOrder]['']();
                } else notification.create('error', 'Ainda não sei fazer isso.', '', 5000);
              } else console.log('falhou miseravelmente');
            }
        },

        // Dados na localStorage
        dialog = window.localStorage.getItem('historico'),

          // Identificador de browser
          browserName = navigator.userAgent,

          // Identificadores de Data e Hora atuais
          now = new Date(),
          sec = now.getSeconds(),
          min = now.getMinutes(),
          hour = now.getHours(),

          // Dia atual
          d = now.getDate(),

          // Dia da semana atual
          w = now.getDay(),
          weekName = [
            'Domingo', 'Segunda', 'Terça',
            'Quarta', 'Quinta', 'Sexta', 'Sábado'
          ],
          week = weekName[w],

          // Mês atual
          m = now.getMonth(),
          monthNumbers = [
            '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'
          ],
          monthNames = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
          ],
          monthNumber = monthNumbers[m],
          monthName = monthNames[m],

          // Ano atual
          y = now.getFullYear(),

          aiBirth = new Date(2015, 8, 24, 21, 01, 46), // Data de criação: ano, mês (-1), dia, hora, minuto, segundo (24/09/2015 21:01:46)
          aiBirthYear = aiBirth.getFullYear(), // Ano de criação
          aiBirthMonth = aiBirth.getMonth(), // Mês de criação
          aiBirthDay = aiBirth.getDate(), // Dia de criação

          aiAgeYears = fixYear(), // Idade em anos
          aiAgeMonths = fixMonth(), // Idade em meses

          aiYearsStr = ['ano', 'anos'],
          aiMonthsStr = ['mês', 'meses'];
        // Fim das variáveis globais


        // Adiciona um zero ao início dos minutos e segundos menores que 10
        tmp_secStr = (sec).toString();
        tmp_minStr = (min).toString();
        tmp_hourStr = (hour).toString();
        tmp_dayStr = (d).toString();

        if (tmp_secStr.length === 1) sec = '0' + sec;
        if (tmp_minStr.length === 1) min = '0' + min;
        if (tmp_hourStr.length === 1) hour = '0' + hour;
        if (tmp_dayStr.length === 1) d = '0' + d;


        // Decide se usa o plural ou não em "dia" e "mês".
        aiAgeYears_str = aiAgeYears === 1 ? aiYearsStr[0] : aiYearsStr[1];
        aiAgeMonths_str = aiAgeMonths === 1 ? aiMonthsStr[0] : aiMonthsStr[1];

        // Atribui a idade à Sophia
        ai.age = sophiaAge();

        // Atrubui ao objeto 'user' o valor armazenado na localStorage se houver algum
        if (_userData) user = JSON.parse(_userData);

        // Funções
        // Cálculo de idade
        function fixYear() {
          aiCorrectAgeYear = y - aiBirthYear;

          if (d < aiBirthDay && m === aiBirthMonth) {
            aiCorrectAgeYear--;
            return aiCorrectAgeYear;
          } else return aiCorrectAgeYear;
        }


        function fixMonth() {
          if (m === aiBirthMonth && d >= aiBirthDay) {
            aiCorrectAgeMonth = 0;
            return aiCorrectAgeMonth;
          } else
          if (m > aiBirthMonth && d < aiBirthDay) {
            aiCorrectAgeMonth = (m - aiBirthMonth) - 1;
            return aiCorrectAgeMonth;
          } else
          if (m === aiBirthMonth && d < aiBirthDay) {
            aiCorrectAgeMonth = 11;
            return aiCorrectAgeMonth;
          } else
          if (m > aiBirthMonth && d >= aiBirthDay) {
            aiCorrectAgeMonth = m - aiBirthMonth;
            return aiCorrectAgeMonth;
          }
        }


        // Idade final
        function sophiaAge() {
          if (aiAgeYears >= 1 && aiAgeMonths > 0) { // Se ela tiver 1 ano de idade e mais de um mês, a idade é contada em anos e meses
            aiFinalAge = aiAgeYears + ' ' + aiAgeYears_str + ' e ' + aiAgeMonths + ' ' + aiAgeMonths_str;

            return aiFinalAge;
          } else
          if (aiAgeYears >= 1 && aiAgeMonths === 0) { // Se a idade dela for inteira, a idade é contada em anos apenas.
            aiFinalAge = aiAgeYears + ' ' + aiAgeYears_str;

            return aiFinalAge;
          } else { // Senão, é contada apenas em meses.
            aiFinalAge = aiAgeMonths + ' ' + aiAgeMonths_str;

            return aiFinalAge;
          }
        }


        function capitalize(cap) {
          cap = cap.substr(0, 1).toUpperCase() + cap.substr(1).toLowerCase();
          return cap;
        }

        function capitalize_s(cap) {
          cap = cap.substr(0, 1).toUpperCase() + cap.substr(1);
          return cap;
        }


        // Conversação
        // Submete o texto digitado pelo usuário
        actualInput.addEventListener('keydown', function() {
          if (actualInput.value !== '' && event.keyCode === 13) {
            rotina();
            return false;
          }
        });

        function changeCommands(commands) {
          switch (commands) {
            case defaultCommands:
              annyang.removeCommands();
              annyang.addCommands(defaultCommands);
              previousCommandObj = actualCommandObj;
              actualCommandObj = defaultCommands;
              isLearning = false;
              break;
            case noAttentionCommands:
              annyang.removeCommands();
              annyang.addCommands(noAttentionCommands);
              previousCommandObj = actualCommandObj;
              actualCommandObj = noAttentionCommands;
              isLearning = false;
              break;
            case learnCommands:
              annyang.removeCommands();
              annyang.addCommands(learnCommands);
              isLearning = true;

              previousCommandObj = actualCommandObj;
              actualCommandObj = learnCommands;
              break;
            case nameInputCommands:
              annyang.removeCommands();
              annyang.addCommands(nameInputCommands);
              previousCommandObj = actualCommandObj;
              actualCommandObj = nameInputCommands;
              isLearning = false;
              break;
            case genderInputCommands:
              annyang.removeCommands();
              annyang.addCommands(genderInputCommands);
              previousCommandObj = actualCommandObj;
              actualCommandObj = genderInputCommands;
              isLearning = false;
              break;
            case treatmentInputCommands:
              annyang.removeCommands();
              annyang.addCommands(treatmentInputCommands);
              previousCommandObj = actualCommandObj;
              actualCommandObj = treatmentInputCommands;
              isLearning = false;
              break;
            case speakingCommands:
              annyang.removeCommands();
              annyang.addCommands(speakingCommands);
              previousCommandObj = actualCommandObj;
              actualCommandObj = speakingCommands;
              isLearning = false;
              break;
          }
        }

        function changeActualInput(param) {
          actualInput = document.querySelector(param);
        }
        // Fim das funções.




        if (browserName.match('Chrome')) browserName = 'Google Chrome';
        if (browserName.match('MSIE')) browserName = 'Internet Explorer';
        if (browserName.match('IEMobile')) browserName = 'Internet Explorer no Windows Phone';
        if (browserName.match('Firefox')) browserName = 'Mozilla Firefox';







        var balloon = {
          i: 5,
          int: false,

          animation: function(titleText, animationIn, animationOut) {
            $(userSubmitedText)
              .removeClass()
              .hide()
              .show()
              .removeClass('animated ' + animationOut)
              .addClass('animated ' + animationIn)
              .html(titleText);

            balloon.i = 5;

            var balloonInterval = window.setInterval(function() {
              if (balloon.i > 0) balloon.i = balloon.i - 1; // console.log(balloon.i);

              if (balloon.i === 0 && $(userSubmitedText).is(':visible')) {
                window.clearInterval(balloonInterval);
                // console.log( 'stop balloonInterval' );

                $(userSubmitedText)
                  .removeClass(animationIn)
                  .addClass(animationOut);

                balloon.i = 5;
              }
            }, 1000);
            window.balloonInterval = balloonInterval;
          }
        };










        function rotina() {
          patterns();

          updt();
          Reload();
          balloon.i = 5;
        }


        function patterns() {
          uInput = actualInput.value;

          for (var i in brain) { // Inicia um loop que executa apenas uma vez cada elemento da array brain.
            regex = new RegExp(brain[i][0], 'i'); // Usando o contador [i] do loop, coloca um padrão da array no mecanismo de expressão regular na variável "regex".

            if (regex.test(uInput)) { // testa a entrada do usuário contra o "regex" e, se corresponder, executa o próximo bloco de instruções - se não houver correspondência o loop vai continuar a carregar o próximo valor.
              leng = brain[i].length - 1; // cria uma variável "leng" e a deixa igual ao número de respostas possíveis
              index = Math.ceil(leng * Math.random()); // gera um número aleatório baseado no número de respostas possíveis
              reply = brain[i][index]; // cria uma variável temporária "reply" para manter a resposta escolhida aleatoriamente
              sOutput = uInput.replace(regex, reply); // usa o método de expressão regular replace para transformar o padrão de resposta e colocar o resultado variável na "soutput"
              sOutput = capitalize_s(sOutput); // faz da primeira letra da variavel "sOutput" maiúscula se ela ainda não for

              ai.say(sOutput);

              break;
            }
          }
        }

        function sophiaIni() {
          updt();
        }

        function updt() {
          ai.animation(sOutput, 'fadeInUp', 'fadeOut');
          balloon.animation(uInput, 'fadeInUp', 'fadeOutDown');
          actualInput.value = '';
        }



        document.body.onunload = function() {
          speechSynthesis.cancel(_spRec_);
        };



        // Reload script 'sophia.js'
        function Reload() {
          $('#brain-arr-script')
            .remove();

          var
            _s = document.createElement('script');
          _s.id = 'brain-arr-script';
          _s.src = 'js/sophia.js';

          document.body.appendChild(_s);
          console.log('arrays atualizadas');
        }
