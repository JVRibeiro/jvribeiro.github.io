// Variáveis globais
  var customTreatment = false,
      actualScreen,
      intro = 1,

      minLoadTime = 0,

  // Informações (objeto) do usuário
      user = {},

  // Animações do avatar
      avatar = {
        _animation: function ( param )
        {
          switch( param )
          {
            case 'default':
              $( $avatar )
                .animate({
                    'top' : '50px'
                  })
                .removeClass( 'animated rubberBand av-loading avatar-speaking' )
                .addClass( 'av-animation' );
            break;
            case 'speaking':
              $( $avatar )
                .removeClass( 'animated rubberBand av-loading av-animation' )
                .addClass( 'avatar-speaking' );
            break;
            case 'jello':
              $( $avatar )
                .removeClass( 'av-loading' )
                .addClass( 'av-animation animated jello' )
                .one( 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                function ()
                {
                  $( this )
                    .removeClass( 'animated jello' );
                });
            break;
            case 'done':
              $( $avatar )
                .removeClass()
                .addClass( 'animated rubberBand av-centered av-loading' );

              window.setTimeout( function ()
              {
                $( $avatar )
                  .removeClass()
                  .addClass( 'av-centered av-loading' );
              }, 2000);
            break;
          }
        }
      },

  // DOM
      content = document.querySelector( '#content' ),
      $avatar = document.querySelector( '#avatar' ),
      userName = document.querySelector( '#user-name' ),
      loadScreen = document.querySelector( '#load-screen' ),
      intScr = document.querySelector( '#introducing-screen' ),
      intScr_title = document.querySelector( '#introducing-screen-title' ),
      intScr_nameDiv = document.querySelector( '#introducing-screen-name-div' ),
      intScr_nameInput = document.querySelector( '#introducing-screen-name-input' ),
      intScr_genderDiv = document.querySelector( '#introducing-screen-gender-div' ),
      intScr_genderInput = document.querySelector( '#introducing-screen-gender-input' ),
      intScr_treatmentDiv = document.querySelector( '#introducing-screen-treatment-div' ),
      intScr_treatmentInput = document.querySelector( '#introducing-screen-treatment-input' ),
      intScr_treatmentDiv_custom = document.querySelector( '#introducing-screen-treatment-div-custom' ),
      intScr_treatmentInput_custom = document.querySelector( '#introducing-screen-treatment-input-custom' ),
      $maleOpts = $( 'option[value="senhor"], option[value="patrão"]' ),
      $femaleOpts = $( 'option[value="senhorita"], option[value="senhora"], option[value="patroa"]' ),
      intScr_confirmButtonDiv = document.querySelector( '#introducing-screen-conf-button' ),
      intScr_confirmButton = document.querySelector( '.introducing-screen-conf-button' ),

  // localStorage
      _isFirstBoot = localStorage.introduction,
      _micPermission = localStorage[ 'mic-permission' ],

  // Array de títulos da apresentação
      intScr_titleMsg = [
        '<span class="title_Big">Olá! <span class="icon ion-happy-outline"></span></span>',
        '<div class="title_Small"><span class="gloss">S</span>istema <br><span class="gloss">O</span>peracional <br><span class="gloss">P</span>ortátil em <br><span class="gloss">H</span>TML5 com <br><span class="gloss">I</span>nteligência <br><span class="gloss">A</span>rtificial</div>',
        '<span class="title_Med">Me diga seu<br><span class="glossing-letter">primeiro nome</span></span>',
        '<span class="title_Med">Tudo pronto! <span class="icon ion-happy-outline"></span></span>',
        '<span class="title_Bigger">SOPH<span class="glossing-letter">i</span>A</span>'
      ];
// Fim das variáveis globais


// Carrega os scripts restantes
  var scripts = [
    'brain-script', 'js/sophia.brain.js',
    'config-script', 'js/sophia.config.js',
    'brain-arr-script', 'js/sophia.js'
  ],

  s_1 = document.createElement( 'script' ),
  s_2 = document.createElement( 'script' ),
  s_3 = document.createElement( 'script' );

  s_1.id = scripts[0]; s_1.src = scripts[1];

  setTimeout(function() {
    s_2.id = scripts[2]; s_2.src = scripts[3];
    s_3.id = scripts[4]; s_3.src = scripts[5];
  }, 1000);


  document.body.appendChild( s_1 );
  document.body.appendChild( s_2 );
  document.body.appendChild( s_3 );

// Event Listeners
  // Instruções executadas quando o documento estiver carregado.
    function appLoad ()
    {
      $( '#screen' )
        .removeClass( 'animated fadeIn' );

      // Se for a primeira inicialização
      if ( !_isFirstBoot )
      {
        localStorage.introduction = 'yes';
        document.location.reload();
      }

      // Se for a primeira inicialização, mostrar a tela de introdução.
      if ( _isFirstBoot === 'yes' )
      {
        introductionScreen();
      }
      // Senão, carregar normalmente.
      else
      {
        window.setTimeout( function ()
        {
          // Retorna o avatar à sua animação padrão
          avatar._animation( 'default' );

          // Começa a ouvir
          changeActualInput( '#user-input' );
          annyangStart();

          // Mostra o conteúdo
          content.style.display = 'block';

          $( '#system-status' )
            .show({
              'effect':'drop',
              'direction':'down'
            });

          // Esconde a tela de carregamento
          $( loadScreen )
            .fadeOut();
        }, 2000);
      }

      if ( micPermission === undefined && _micPermission === 'true' )
      {
        micPermission = true;
      }
      else
      {
        micPermission = false;
      }
    }


  // Validação de nome (não permite números, espaços, pontuação [exceto - e ']) e símbolos.
    intScr_nameInput.addEventListener( 'input', function ()
    {
      if ( intScr_nameInput.value.length <= 0 || intScr_nameInput.value.match( /([,.;/<>:?"!@#$%¨&*()_+=¹²³£¢¬§~^´`\[\]{}]|[\d]|[\s])/gi ) )
      {
        intScr_confirmButton.disabled = true;
        notification.create(
          'error',
          'Caracteres não permitidos!',
          'img/icons/ionicons/alert-circled.png',
          3000
        );
      }
      else
      {
        intScr_confirmButton.disabled = false;
      }
    });

  // Validação de tratamento personalizado (não permite pontuação [exceto - e ']) e símbolos.
    intScr_treatmentInput_custom.addEventListener( 'input', function ()
    {
      if ( intScr_treatmentInput_custom.value.length <= 0 || intScr_treatmentInput_custom.value.match( /([,.;/<>:?"!@#$%¨&*()_+=¹²³£¢¬§~^´`\[\]{}])/gi ) )
      {
        intScr_confirmButton.disabled = true;
        notification.create(
          'error',
          'Caracteres não permitidos!',
          'img/icons/ionicons/alert-circled.png',
          3000
        );
      }
      else intScr_confirmButton.disabled = false;
    });

  // Avança para o próximo passo se as teclas Espaço e Enter forem apertadas.
    intScr_nameInput.addEventListener( 'keydown', function ( event )
    {
      // * console.log(event.keyCode);
      switch ( event.keyCode )
      {
        // Tecla Barra de espaço
        case 32: intScr_confirmButton.click();
        break;

        // Tecla Enter
        case 13: intScr_confirmButton.click();
        break;
      }
    });

  // Avança para o próximo passo se a tecla Enter for apertada.
    intScr_treatmentInput_custom.addEventListener( 'keydown', function ( event )
    {
      // * console.log(event.keyCode);
      switch ( event.keyCode )
      {
        // Tecla Enter
        case 13: intScr_confirmButton.click();
        break;
      }
    });
// Fim dos Event Listeners






// Funções
  // Animações e textos da tela de boas-vindas
    var bootstrap =
    {
      title:
      {
        text: function ( titleText )
        {
          intScr_title.innerHTML = titleText;
          return titleText;
        },

        animation: function ( animationIn, animationOut, timer )
        {
          if ( timer === undefined )
          {
            $( intScr_title )
              .removeClass()
              .hide()
              .show()
              .removeClass( 'animated ' + animationOut )
              .addClass( 'animated ' + animationIn );
          }
          else
          {
            $( intScr_title )
              .removeClass()
              .addClass( 'animated ' + animationIn );

            window.setTimeout( function ()
            {
              $( intScr_title )
                .removeClass( animationIn )
                .addClass( animationOut );
            }, timer);
          }
        }
      }
    };


  // Tela de introdução
    function introductionScreen ()
    {
      if ( intro )
      {
        ai.say( 'Olá. Bem-vindao Sistema Operacional Portátil em HTML5 com Inteligência Artificial. Mas esse é um nome longo, então me chame apenas de Sophia.' );

        $( loadScreen )
          .fadeOut();

        intScr.style.display = 'block';

        window.setTimeout( function ()
        {
          avatar._animation( 'jello' );

          bootstrap.title.animation( 'fadeInUp', 'fadeOut', 1500 );
          bootstrap.title.text( intScr_titleMsg[0] );

          window.setTimeout( function ()
          {
            bootstrap.title.animation( 'fadeIn', 'fadeOut', 7000 );
            bootstrap.title.text( intScr_titleMsg[1] );

            $( '.title_Small' )
              .addClass( 'title_SmallLeft' );

            window.setTimeout( function ()
            {
              $( '.gloss' )
                .addClass( 'glossing-letter spacing-letter' );
            }, 6000);

            window.setTimeout( function ()
            {

              bootstrap.title.text( intScr_titleMsg[4] );
            }, 8000);

            window.setTimeout( function ()
            {
              permissSettings();
            }, 11000);
          }, 2000);
        }, minLoadTime);
      }
      else
      {
        $( loadScreen )
          .fadeOut();

        intScr.style.display = 'block';

        nameFirstSetting();

        window.setTimeout( function ()
        {
          avatar._animation( 'jello' );


          bootstrap.title.text( intScr_titleMsg[2] );

          annyangStart();
        }, 2000);
      }
    }

  function permissSettings ()
  {
    console.log( 'permissSettings' );

    ai.say( 'Antes de começarmos, gostaria de pedir algumas permissões para acessar alguns recursos necessários para meu funcionamento correto. Isso inclui o acesso ao seu microfone e só pode ser feito manualmente, por questões de segurança. Espere enquanto verifico as permissões.' );

    if ( !annyang.isListening() )
    {
      actualScreen = 'permissions';

      changeCommands( defaultCommands );

      window.setTimeout(function ()
      {
        annyangStart();

        window.setTimeout(function ()
        {
          $( intScr_confirmButtonDiv )
            .show({
              'effect'    : 'drop',
              'direction' : 'down'
            });

          $( intScr_confirmButton )
            .attr( 'onclick','nameFirstSetting()' );

          if ( !micPermission && listening )
          {
            ai.say( 'Clique no botão permitir e logo após, diga ok para continuarmos.' );
            $( '#drawn-arrow-permissions' )
              .fadeIn();
          }
          else if ( !listening )
          {
            ai.say( 'Parece que há um problema com a conexão. Tente novamente quando a internet estiver funcionando normalmente ou continue, sendo que, se continuar, o reconhecimento de voz não irá funcionar.' );
              $( '#drawn-arrow-permissions' )
                .hide();

              intScr_confirmButton.innerHTML = '<span style="font-size: 18pt">Continuar</span>';
              intScr_confirmButton.setAttribute( 'onclick','nameFirstSetting()' );
          }
          else if ( micPermission && listening )
          {
            ai.say( 'Parece que você já me concedeu permissão. Vamos continuar.' );
            window.setTimeout(function ()
            {
              $( intScr_confirmButton )
              .click();
            }, 5000);
          }
        }, 1500);
      }, 18000);
    }
    else
    {
      nameFirstSetting();
    }
  }

  function nameFirstSetting ()
  {
    actualScreen = 'name';


    bootstrap.title.text( intScr_titleMsg[2] );

    intScr_genderDiv.style.display = 'none';

    $( intScr_nameDiv )
      .delay( 3000 )
      .show( 'slide' );

    window.setTimeout( function ()
    {
      intScr_nameInput.focus();

      changeActualInput( '#introducing-screen-name-input' );
    }, 4000);



    $( intScr_confirmButtonDiv )
      .show({
        'effect'    : 'drop',
        'direction' : 'down'
      });

    $( intScr_confirmButton )
      .attr( 'onclick','genderFirstSetting()' );

    intScr_confirmButton.innerHTML = '<span class="icon ion-ios-arrow-right"></span>';
    intScr_confirmButton.setAttribute( 'onclick','genderFirstSetting()' );

    intScr_confirmButton.disabled = true;

    ai.say( 'Agora preciso que me informe seu primeiro nome apenas.', nameInputCommands );



    if ( !listening )
    {
      notification.create(
        'error',
        'O reconhecimento de voz não está funcionando!',
        '',
        5000
      );
    }
  }


  function genderFirstSetting ()
  {
    actualScreen = 'gender';

    intScr_nameInput.value = capitalize( intScr_nameInput.value );
    user.name = intScr_nameInput.value;

    notification.create(
      'success',
      'Olá, ' + user.name + '! :D',
      'img/icons/ionicons/outline/ios7-checkmark-outline.png',
      4000
    );

    createCustomSelect( '#introducing-screen-gender-input' );

    $( intScr_nameDiv )
      .hide( 'fold' );

    $( intScr_genderDiv )
      .show( 'fold' );

    $( '#drawn-arrow-permissions' )
      .fadeOut();

    $( intScr_confirmButton )
      .attr( 'onclick','treatmentFirstSetting()' )
      .blur();

    intScr_confirmButton.disabled = true;

    bootstrap.title.text( '<span class="title_Small">Você é do sexo masculino ou feminino, ' + user.name + '?</span>' );

    window.setTimeout( function ()
    {
      $( '#introducing-screen-gender-div .cs-placeholder' )
        .click();

      $( 'div.cs-skin-slide' )
        .focus();

      intScr_confirmButton.disabled = false;
    }, 1000);


    ai.say( 'Ok, ' + user.name + '. Agora me diga se você é do sexo masculino ou feminino.', genderInputCommands );
  }


  function treatmentFirstSetting ()
  {
    actualScreen = 'treatment';

    user.gender = intScr_genderInput.value;

    switch ( user.gender )
    {
      case 'feminino':
        $maleOpts.remove();
        user.article = 'a';

        notification.create(
          'success',
          'Lembrarei disso.',
          'img/icons/ionicons/woman.png',
          4000
        );
      break;
      case 'masculino':
        $femaleOpts.remove();
        user.article = 'o';
        user._treatment = 'o senhor';

        notification.create(
          'success',
          'Lembrarei disso.',
          'img/icons/ionicons/man.png',
          4000
        );
      break;
    }

    createCustomSelect( '#introducing-screen-treatment-input' );

    $( intScr_genderDiv )
      .hide( 'fold' );

    $( intScr_treatmentDiv )
      .show( 'fold' );

    $( intScr_confirmButton )
      .attr( 'onclick','introDoneScreen()' )
      .blur();

    intScr_confirmButton.disabled = true;


    bootstrap.title.text( '<span class="title_Small">E como você prefere que eu ' + user.article + ' chame?</span>' );

    window.setTimeout( function ()
    {
      $( '#introducing-screen-treatment-div .cs-placeholder' )
        .click();

      $( 'div.cs-skin-slide' )
        .focus();

      intScr_confirmButton.disabled = false;

      annyangStart();
    }, 1000);

    changeCommands( treatmentInputCommands );

    ai.say( 'Como você prefere que eu ' + user.article + ' chame, ' + user.name + '? Você pode escolher uma das opções sugeridas ou pode dizer uma forma de tratamento de sua preferência.' );
  }


  // Verifica se o usuário escolheu a opção de tratamento personalizado.
  function customTreatmentFn ()
  {
    if ( actualScreen === 'treatment' && !$( 'li[data-value*="outro"]' ).hasClass( 'cs-selected' ) )
    {
      intScr_treatmentDiv_custom.style.display = 'none';

      intScr_treatmentInput_custom.value = '';

      customTreatment = false;

      intScr_confirmButton.disabled = false;
    }
    if ( actualScreen === 'treatment' && $( 'li[data-value*="outro"]' ).hasClass( 'cs-selected' ) )
    {
      intScr_treatmentDiv_custom.style.display = 'block';

      intScr_treatmentInput_custom.focus();

      customTreatment = true;

      intScr_treatmentInput_custom.value = '';

      intScr_confirmButton.disabled = true;
    }
  }


  function introDoneScreen ()
  {
    if ( customTreatment && intScr_treatmentInput_custom.value !== '' || !customTreatment )
    {
      actualScreen = null;

      user.treatment = intScr_treatmentInput.value;

      switch (user.treatment)
      {
        case 'senhor':
          user.voc = ', '; // Vírgula do vocativo = true
        break;
        case 'senhora':
          user._treatment = 'a senhora';
          user.voc = ', '; // Vírgula do vocativo = true
        break;
        case 'senhorita':
          user._treatment = 'a senhorita';
          user.voc = ', '; // Vírgula do vocativo = true
        break;
        case 'outro':
          user.treatment = intScr_treatmentInput_custom.value;
          user.voc = ', '; // Vírgula do vocativo = true
        break;
        case 'nenhum':
          user.voc = ', '; // Vírgula do vocativo = false
          user.treatment = '';
        break;
      }

      if ( user.gender === 'feminino' && user.treatment === 'outro' )
      {
        user._treatment = 'você';
      }

      salvarDados();

      localStorage.introduction = 'no';

      annyang.abort();

      $( intScr_treatmentDiv )
        .hide( 'fold' );

      $( '#introducing-screen-done-div' )
        .fadeIn();

      $( intScr_confirmButton )
        .addClass( 'animated zoomOutDown' )
        .blur();

      intScr_confirmButton.disabled = true;

      bootstrap.title.animation( 'fadeInUp','fadeOut' );
      bootstrap.title.text( intScr_titleMsg[3] );

      avatar._animation( 'done' );

      ai.say( 'Carregando interface.' );

      window.setTimeout( function ()
      {
        avatar._animation( 'default' );

        $( intScr_title )
          .removeClass()
          .addClass( 'animated fadeOutUp' );

        content.style.display = 'block';

        $( intScr )
          .fadeOut();

        changeCommands( defaultCommands );
        changeActualInput( '#user-input' );
        annyangStart();

        ai.say( 'Bem-vind' + user.article + ' e ' + greeting + user.voc + user.treatment + ' ' + user.name + '.' );

        // * console.log(user);
      }, 6000);
    }
  }
// Fim das funções


// Força o objeto 'user' a ser usado no escopo global
window.user = user;
