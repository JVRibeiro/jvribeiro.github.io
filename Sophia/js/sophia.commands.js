/*
 * As a secondary speech recognition system, I used Annyang (https://talater.com/annyang).
 * It makes the work of setting commands pretty much easier.
 *
 * author: Victor Ribeiro
 * github: @JVRibeiro
 */

 /* jshint esversion: 6 */


console.log('2');
// Verifies if annyang is avaliable
if (annyang) {

  var

    definir = function(algo) {
      startFetch(algo, 12, 1000);
    };
    var textbox = document.getElementById("sophia-reply");
    var tempscript = null,
      minchars, maxchars, attempts;

    startFetch = (algo, minimumCharacters, maximumCharacters, isRetry) => {
      if (tempscript) return;
      if (!isRetry) {
        attempts = 0;
        minchars = minimumCharacters;
        maxchars = maximumCharacters;
      }
      tempscript = document.createElement("script");
      tempscript.type = "text/javascript";
      tempscript.id = "tempscript";
      tempscript.src = "https://pt.wikipedia.org/w/api.php" +
        "?action=query" +
        "&titles=" +
        algo + // Palavra ou sentença a ser definida
        "&redirects=1" +
        "&prop=extracts" +
        "&exchars=" +
        maxchars + // Máximo de caracteres a ser "puxado"
        "&exintro" +
        "&format=json" +
        "&callback=onFetchComplete" +
        "&requestid=" +
        Math.floor(Math.random() * 999999).toString();
      $("body").append(tempscript);
    };

    onFetchComplete = (data) => {
      var algo = algo;
      $('#tempscript').remove();

      tempscript = null;
      var s = getFirstProp(data.query.pages).extract;
      s = htmlDecode(stripTags(s));
      s = s.replace(/(\n\n|^\n([A-Z]))/gi, ' $2');
      s = s.replace(/\n/gi, ', ');

      s = /[^.]*/.exec(s)[0] + '.';

      console.log(s);

      if (s.length > minchars || attempts++ > 2) {
        ai.say(s);

        bootstrap.title.animation('fadeInUp', 'fadeOut');
        bootstrap.title.text('<span class="title_Med">' + s + '</span>');


      } else {
        $('#sophia-reply').html("Não encontrei nada sobre \"" + algo + "\"");
        voz();
      }

    };

    getFirstProp = (obj) => {
      for (var i in obj) return obj[i];
    };

    stripTags = (s) => {
      return s.replace(/(\[.*?\])|(>)|\"|(\s\(.*?\))|<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
    };

    htmlDecode = (input) => {
      var e = document.createElement("div");
      e.innerHTML = input;
      return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    },


  reiniciar = function() {
      document.location.reload();
    },
    // Função chamada ao dizer 'sim' na tela de configuração de nome
    nameCommand_yes = function() {
      if (intScr_nameInput.value !== '') {
        intScr_confirmButton.focus();

        window.setTimeout(function() {
          intScr_nameInput.value = user.name;
        }, 100);

        window.setTimeout(function() {
          $(intScr_confirmButton)
            .click();
        }, 500);
      }
    },

    // Função chamada ao dizer 'não' na tela de configuração de nome
    nameCommand_no = function() {
      bootstrap.title.animation('fadeInUp', 'fadeOut');
      bootstrap.title.text('<span class="title_Med">Repita seu<br><span class="glossing-letter">primeiro nome</span></span>');

      notification.create(
        'default',
        'Por favor, repita seu nome.',
        'img/icons/ionicons/outline/ios7-information-outline.png',
        5000
      );

      ai.say('Então por favor, repita seu nome. Se eu continuar não entendendo, aconselho você a digitar o seu nome na caixa abaixo.');
    },


    // Função chamada ao dizer 'sim' na tela de configuração de gênero
    genderCommand_yes = function() {
      $(intScr_confirmButton)
        .click();
    },

    // Função chamada ao dizer 'não' na tela de configuração de gênero
    genderCommand_no = function() {
      $('.cs-placeholder')
        .click();
    },

    // Função chamada ao dizer 'sim' na tela de configuração de gênero
    treatmentCommand_yes = function() {
      $(intScr_confirmButton)
        .click();
    },

    // Função chamada ao dizer 'não' na tela de configuração de gênero
    treatmentCommand_no = function() {
      $('.cs-placeholder')
        .click();
    },


    // Função chamada no momento em que o usuário diz seu nome
    nameFirstName = function(name) {
      intScr_confirmButton.disabled = false;

      user.name = name;

      window.setTimeout(function() {
        intScr_nameInput.value = name;
        ai.say('Escrevi seu nome na tela. Está correto?');

        bootstrap.title.animation('fadeInUp', 'fadeOut');
        bootstrap.title.text('<span class="title_Med">Seu nome é <span class="glossing-letter">' + user.name + '</span>?</span>');
      }, 100);

      window.setTimeout(function() {
        user.name = name;
      }, 500);
    },

    // Se o usuário dizer mais do que apenas seu primeiro nome, apenas o primeiro nome será exibido
    nameSurname = function(name) {
      intScr_confirmButton.disabled = false;
      user.name = name;

      window.setTimeout(function() {
        intScr_nameInput.value = name;
        ai.say('Preciso apenas do seu primeiro nome por enquanto. Está correto?');

        bootstrap.title.animation('fadeInUp', 'fadeOut');
        bootstrap.title.text('<span class="title_Med">Seu primeiro nome é <span class="glossing-letter">' + user.name + '</span>?</span>');
      }, 100);

      window.setTimeout(function() {
        user.name = name;
      }, 500);
    },


    // Função chamada ao usuário escolher a opção 'masculino'
    genderSelect_male = function() {
      if (!$('.cs-select').hasClass('cs-active')) // Se não estiver aberto
      {
        $('.cs-placeholder').click();
        console.log('Evento 1: Click no selectFx');

        window.setTimeout(function() {
          $('.cs-options ul li[data-value="masculino"]').click();
          console.log('Evento 2: Click na opção masculino');
        }, 700);

        bootstrap.title.animation('fadeInUp', 'fadeOut');
        bootstrap.title.text('<span class="title_Med">Continuando...</span>');

        ai.say('Certo. Avançando.');

        window.setTimeout(function() {
          $(intScr_confirmButton).click();
          console.log('Evento 3: Click no confirmButton');
        }, 3000);
      } else // Se estiver aberto
      {
        window.setTimeout(function() {
          $('.cs-options ul li[data-value="masculino"]').click();
          console.log('Evento 1: Click na opção masculino');

          bootstrap.title.animation('fadeInUp', 'fadeOut');
          bootstrap.title.text('<span class="title_Med">Continuando...</span>');
        }, 400);

        ai.say('Certo.');

        window.setTimeout(function() {
          $(intScr_confirmButton).click();
          console.log('Evento 3: Click no confirmButton');
        }, 1500);
      }
    },

    // Função chamada ao usuário escolher a opção 'feminino'
    genderSelect_female = () => {
      if (!$('.cs-select').hasClass('cs-active')) {
        $('.cs-placeholder').click();

        window.setTimeout(function() {
          $('.cs-options ul li[data-value="feminino"]')
            .click();
        }, 700);

        bootstrap.title.animation('fadeInUp', 'fadeOut');
        bootstrap.title.text('<span class="title_Med">Continuando...</span>');

        ai.say('Certo.');

        window.setTimeout(function() {
          $(intScr_confirmButton).click();
        }, 1500);
      } else {
        $('.cs-options ul li[data-value="feminino"]').click();

        bootstrap.title.animation('fadeInUp', 'fadeOut');
        bootstrap.title.text('<span class="title_Med">Continuando...</span>');

        ai.say('Certo.');

        window.setTimeout(function() {
          $(intScr_confirmButton).click();
        }, 1500);
      }
    },





  // A partir daqui declaramos nossos objetos 'commands'

  // Comandos comuns
  defaultCommands = {
      'ok': () => {
        if (actualScreen === 'permissions') {
          $(intScr_confirmButton)
            .click();

          notification.create(
            'success',
            'O microfone está funcionando corretamente!',
            '',
            5000
          );
        }
        else {
          ai.say('...');
        }
      },

      '(pode)( )me cham(a)(e)(r) de *nome': function(nome) {
        user.name = nome;
        Reload();
        salvarDados();

        ai.say('Olá, ' + nome + '!');
      },

      'me chamo *nome': function(nome) {
        user.name = nome;
        Reload();
        salvarDados();

        ai.say('Olá, ' + nome + '!');
      },

      'meu nome é *nome': function(nome) {
        user.name = nome;
        Reload();
        salvarDados();

        ai.say('Olá, ' + nome + '!');
      },

      '(Sophia)(Sofia) defin(e)(a) :algo': definir,
      '(Sophia)(Sofia) defin(e)(a) (a) *algo': definir,
      '(Sophia)(Sofia) defin(e)(a) o *algo': definir,
      '(Sophia)(Sofia) defin(e)(a) as *algo': definir,
      '(Sophia)(Sofia) defin(e)(a) os *algo': definir,
      '(Sophia)(Sofia) quem é *algo (Sophia)(Sofia)': definir,
    	'(Sophia)(Sofia) quem foi *algo (Sophia)(Sofia)': definir,
    	'(Sophia)(Sofia) quem era *algo (Sophia)(Sofia)': definir,
      '(Sophia)(Sofia) o que é (o) *algo (Sophia)(Sofia)': definir,
    	'(Sophia)(Sofia) o que é (a) *algo (Sophia)(Sofia)': definir,
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
    	'(Sophia)(Sofia)( )(me) fala sobre (o)(a) *algo (Sophia)(Sofia)': definir,
      '(Sophia)(Sofia)( )(me) fala (um pouco) sobre (o)(a) *algo (Sophia)(Sofia)': definir,

      'atualiz(a)(e)(o)(r)': reiniciar,
      'reinici(a)(e)(o)(r)': reiniciar,

      '(*a) não falei co(ntigo)(m você)': () => {
        ai.attention.off();
        changeCommands(noAttentionCommands);
        ai.say('Se precisar de algo é só chamar.');
      },
      '(*a) não tô falando co(ntigo)(m você)': () => {
        ai.attention.off();
        changeCommands(noAttentionCommands);
        ai.say('Se precisar de algo é só chamar.');
      },
      'não é co(ntigo)(m você)': () => {
        ai.attention.off();
        changeCommands(noAttentionCommands);
        ai.say('Se precisar de algo é só chamar.');
      },

      '*sentence': function(sentence) {
        actualInput.value = sentence;

        if (actualInput === document.querySelector('#user-input')) rotina();

        sentence = sentence.toLowerCase();

        ai.action(sentence);
      }
    },

    // Comandos dados quando a atenção da IA está desligada
    noAttentionCommands = {
      'so(ph)(f)ia': () => {
        ai.attention.on();

        actualInput.value = 'Sophia';
        rotina();
      },

      'so(ph)(f)ia *sentence': function(sentence) {
        ai.attention.on();

        actualInput.value = 'Sophia ' + sentence;
        rotina();
      },

      '*sentence so(ph)(f)ia': function(sentence) {
        ai.attention.on();

        actualInput.value = sentence + ' Sophia';
        rotina();
      },

      'ei (*sentence)': function(sentence) {
        if (sentence === undefined) sentence = '';

        ai.attention.on();

        actualInput.value = 'Ei ' + sentence;
        rotina();
      }
    },

    // Comandos de aprendizado
    learnCommands = {
      'abrir *sentence': function(sentence) {
        sentence = sentence.toLowerCase();

        if (!ai.learning.hasOwnProperty('abrir')) {
          ai.learning.abrir = {};
          ai.learning.abrir[sentence] = function() {
            window.open('https://www.google.com/search?q=' + sentence + '&btnI=');
          };
        } else {
          ai.learning.abrir[sentence] = function() {
            window.open('https://www.google.com/search?q=' + sentence + '&btnI=');
          };
        }

        changeCommands(defaultCommands);

        notification.create('success', 'Aprendi a abrir ' + sentence, '', 5000);
      }
    },

    // Comandos de configuração de nome de usuário chefe
    nameInputCommands = {
      'atualiz(a)(e)(o)(r)': reiniciar,
      'reinici(a)(e)(o)(r)': reiniciar,

      ':sim': {
        'regexp': /((sim|sing|c|si|se|sem|100)|(aham)|(|es)tá(| )(|certo|correto)(| )(|sim|sing|c|si|se)|(avanç(a|o)(|r))|(próxim(a|o)))$/,
        'callback': nameCommand_yes
      },

      ':não': {
        'regexp': /((não|no|nan|nao|nã)|não (|es)tá|(|es)tá(| )(errado|incorreto))$/,
        'callback': nameCommand_no
      },

      '(o) (meu nome é) :name': nameFirstName,
      '(eu) (me chamo) :name *surname': nameSurname
    },


    // Comandos de escolha de gênero do usuário chefe
    genderInputCommands = {
      'atualiz(a)(e)(o)(r)': reiniciar,
      'reinici(a)(e)(o)(r)': reiniciar,

      ':sim': {
        'regexp': /((|pode(|mos))(| )(sim|sing|c|si|se)|(|es)tá(| )(|certo|correto)(| )(|sim|sing|c|si|se)|(avanç(a|o)(|r))|(próxim(a|o)))$/,
        'callback': genderCommand_yes
      },

      ':não': {
        'regexp': /((não|no|nan|nao|nã)|não (|es)tá|(|es)tá(| )(errado|incorreto))$/,
        'callback': genderCommand_no
      },

      'as*x': genderSelect_male,

      'fe*minino': genderSelect_female
    },

    // Comandos de escolha de tratamento personalizado do usuário chefe
    // Comandos de escolha de gênero do usuário chefe
    treatmentInputCommands = {
      'atualiz(a)(e)(o)(r)': reiniciar,
      'reinici(a)(e)(o)(r)': reiniciar,

      'ok': () => {
        if (actualScreen === 'treatment') {
          $(intScr_confirmButton)
            .click();

          notification.create(
            'success',
            'Seja bem-vind' + user.article + user.voc + user.treatment + ' ' + user.name,
            '',
            5000
          );
        }
      },

      'senhor': () => {
        if (!$('.cs-select').hasClass('cs-active')) {
          $('.cs-placeholder')
            .click();

          window.setTimeout(function() {
            $('.cs-options ul li[data-value="senhor"]')
              .click();
          }, 700);

          ai.say('Certo.');

          window.setTimeout(function() {
            $(intScr_confirmButton)
              .click();
          }, 1500);
        } else {
          $('.cs-options ul li[data-value="senhor"]')
            .click();

          ai.say('Certo.');

          window.setTimeout(function() {
            $(intScr_confirmButton)
              .click();
          }, 1500);
        }
      },

      'patrão': () => {
        if (!$('.cs-select').hasClass('cs-active')) {
          $('.cs-placeholder')
            .click();

          window.setTimeout(function() {
            $('.cs-options ul li[data-value="patrão"]')
              .click();
          }, 700);

          ai.say('Certo.');

          window.setTimeout(function() {
            $(intScr_confirmButton)
              .click();
          }, 1500);
        } else {
          $('.cs-options ul li[data-value="patrão"]')
            .click();

          ai.say('Certo.');

          window.setTimeout(function() {
            $(intScr_confirmButton)
              .click();
          }, 1500);
        }
      },

      'outr*o': () => {
        if (!$('.cs-select').hasClass('cs-active')) {
          $('.cs-placeholder')
            .click();

          window.setTimeout(function() {
            $('.cs-options ul li[data-value="outro"]')
              .click();
          }, 700);

          ai.say('Pode dizer.');

          changeActualInput('#introducing-screen-treatment-input-custom');
        } else {
          $('.cs-options ul li[data-value="outro"]')
            .click();

          ai.say('Pode dizer.');

          changeActualInput('#introducing-screen-treatment-input-custom');
        }
      },

      '(apenas)(somente)(só) (pel)(o)(a) nome': () => {
        if (!$('.cs-select').hasClass('cs-active')) {
          $('.cs-placeholder')
            .click();

          window.setTimeout(function() {
            $('.cs-options ul li[data-value="nenhum"]')
              .click();
          }, 700);

          ai.say('Certo.');

          window.setTimeout(function() {
            $(intScr_confirmButton)
              .click();
          }, 1500);
        } else {
          $('.cs-options ul li[data-value="nenhum"]')
            .click();

          ai.say('Certo.');

          window.setTimeout(function() {
            $(intScr_confirmButton)
              .click();
          }, 1500);
        }
      },

      'novamente': () => {
        if (!$('.cs-select').hasClass('cs-active')) {
          $('.cs-placeholder')
            .click();

          ai.say('Não era a resposta que eu esperava, mas entendi. Escolha uma das opções.');
        } else {
          ai.say('Não era a resposta que eu esperava, mas entendi. Escolha uma das opções.');
        }
      },

      '*outro': function(outro) {
        if (!$('.cs-select').hasClass('cs-active')) {
          $('.cs-placeholder')
            .click();

          window.setTimeout(function() {
            intScr_confirmButton.disabled = false;

            user.treatment = outro;

            window.setTimeout(function() {
              $('.cs-options ul li[data-value="outro"]')
                .click();

              intScr_treatmentInput_custom.value = user.treatment;
            }, 500);

            window.setTimeout(function() {
              intScr_treatmentInput_custom.value = outro;
              ai.say('Diga okey se estiver correto ou diga novamente se não.');

              bootstrap.title.animation('fadeInUp', 'fadeOut');
              bootstrap.title.text('<span class="title_Med">Diga <span class="glossing-letter">Ok</span> se estiver correto ou repita.</span>');
            }, 1000);
          }, 700);

          ai.say('Okey. Trocando... Posso avançar?');
        }
        else {
          intScr_confirmButton.disabled = false;

          user.treatment = outro;

          window.setTimeout(function() {
            $('.cs-options ul li[data-value="outro"]')
              .click();

            intScr_treatmentInput_custom.value = user.treatment;
          }, 500);

          window.setTimeout(function() {
            intScr_treatmentInput_custom.value = outro;
            ai.say('Diga okey se estiver correto ou diga novamente se não.');

            bootstrap.title.animation('fadeInUp', 'fadeOut');
            bootstrap.title.text('<span class="title_Med">Diga <span class="glossing-letter">Ok</span> se estiver correto ou repita.</span>');
          }, 1000);
        }
      }
    };

  annyang.setLanguage('pt-BR');

  annyang.addCallback('errorPermissionDenied', function() {
    notification.create(
      'warning',
      'Permissão do uso do microfone negada.',
      'img/icons/ionicons/ios7-mic-off.png',
      5000
    );

    micPermission = false;
    localStorage['mic-permission'] = false;

    ai.say('Permissão do uso do microfone negada. Por favor, reconsidere, e permita o meu acesso ao microfone para uma melhor experiência.');
  });

  annyang.addCallback('errorPermissionBlocked', function() {
    micPermission = false;
    localStorage['mic-permission'] = false;

    window.setTimeout(function() {
      notification.create(
        'warning',
        'Permissão do uso do microfone bloqueada.',
        'img/icons/ionicons/ios7-mic-off.png',
        5000
      );

      bootstrap.title.animation('fadeInUp', 'fadeOut');
      bootstrap.title.text('<span style="font-size: 18pt"><span class="glossing-letter">Problema com o microfone</span><br><br>Verifique se o microfone está conectado e funcionando e me reinicie apertando F5.</span>');

      intScr_confirmButton.innerHTML = '<span class="title_Small">Reiniciar</span>';
      intScr_confirmButton.setAttribute('onclick', 'document.location.reload()');


      $('#drawn-arrow-permissions')
        .hide();

      ai.say('Permissão do uso do microfone bloqueada. Verifique se há algum microfone conectado e se ele está em pleno funcionamento. Após isso pressione F5 para me reiniciar.');
    }, 2500);
  });

  annyang.addCallback('errorNetwork', function() {
    ai.network(false);

    notification.create(
      'error',
      'Problema na conexão.',
      'img/icons/windows/appbar.network.disconnect.png',
      5000
    );

    // console.log( 'Problema na conexão.' );
  });

  annyang.addCallback('error', function() {
    notification.create(
      'warning',
      'Problema temporário no reconhecimento de voz.',
      'img/icons/ionicons/ios7-mic-off.png',
      5000
    );

    console.log('Problema temporário no reconhecimento de voz.');
  });

  annyang.addCallback('soundstart', function() {
    console.log('Ruído detectado');
    micPermission = true;
    localStorage['mic-permission'] = true;
  });

  annyang.addCallback('end', function() {
    //actualInput.value = '';
  });

  annyang.addCallback('resultNoMatch', function() {
    console.log('considerar: não');
  });

  annyang.addCallback('resultMatch', function() {
    console.log('considerar: sim');
  });
}




function annyangStart() {
  var recognition = annyang.getSpeechRecognizer();
  var final_transcript = '';
  recognition.interimResults = true;
  annyang.start();

  recognition.onresult = function(event) {
    var interim_transcript = '';
    final_transcript = '';

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
        console.log('Reconhecido: ' + final_transcript);
        annyang.trigger(final_transcript); //If the sentence is "final" for the Web Speech API, we can try to trigger the sentence
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }

    final_transcript = final_transcript;
    actualInput.value = final_transcript;
    actualInput.value = interim_transcript;

    speakingLog.innerHTML = final_transcript;
    speakingLog.innerHTML = interim_transcript;
  };
}


// annyangStart();
