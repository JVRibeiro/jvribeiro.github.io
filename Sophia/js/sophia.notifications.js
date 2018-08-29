/*
  *   Sophia's notifications

  *   Inspirado no exemplo "Thumb Slider" do post "Notification Styles Inspiration" do
      site Codrops. Post por Mary Lou.
      link: http://tympanus.net/Development/NotificationStyles/other-thumbslider.html

  *   author: Victor Ribeiro
  *   license: MIT
  *   dependencies: jQuery
                    Animate.css
  *   usage:
  *           notification.create(
  *             'tipo de notificação',  // string (photo|success|warning|error|default)
  *             'texto da notificação', // string
  *             'url do icone',         // string
  *             timer                   // inteiro (milissegundos)
  *           );
*/


var notifHolder = document.createElement( 'div' );

    notifHolder.id = 'notif-holder';

    document.querySelector( '#screen' )
      .appendChild( notifHolder );

var notification =
    {
      /*
        * Cria a notificação
        *
        * @param [type] - 'default','','photo','success','warning','error' (string)
        * @param [text] - 'O texto da notificação' (string)
        * @param [icon] - 'path/to/image.png' (string)
        * @param [timer] - [inteiro de 5000 a 20000] (default: 10000)
      */
      create: function ( type, text, icon, timer )
      {
        var d = document, w = window, // Apenas estética :)

            // Cria uma id única para cada notificação
            randomId = Math.floor( Math.random() * 9999 ), // Um número bem alto é bem improvável se repetir, não é?

            // Cria os elementos HTML necessários
            _notif = d.createElement( 'div' ),
            _icon = d.createElement( 'div' ),
            _text = d.createElement( 'div' );

        // Atrubui as id's e classes
        _notif.className = 'notification';
        _notif.id = 'notification-' + randomId;
        _icon.className = 'notification-icon';
        _icon.id = 'notification-' + randomId + '-icon';
        _text.className = 'notification-text';
        _text.id = 'notification-' + randomId + '-text';

        // Insere a nova notificação acima das outras (se existirem)
        notifHolder.insertBefore( _notif, notifHolder.firstChild );

        // E insere os elementos de icone e texto nessa notificação
        _notif.appendChild( _icon );
        _notif.appendChild( _text );

        // Define as propriedades padrões (cor, icone, timer) da notificação
        defineDefaultProperties();

        // Escreve o texto
        d.querySelector( '#notification-' + randomId + '-text' )
          .innerHTML = text;

        // Empurra as outras notificações (se existirem) para baixo antes de mostrar a nova
        $( _notif )
        .animate({
          'height' : '70px',
          'margin-bottom' : '5px'
        });

        // Mostra a nova notificação depois de 0.6 segundos
        w.setTimeout( function ()
        {
          notificationShow();
        }, 600);


        /* Verifica se já há uma notificação igual sendo mostrada.
           Se sim, a nova notificação (repetida) será excluída.

           http://stackoverflow.com/a/2822974/5125223
        */
        var _g = {};
        $( '#notif-holder > .notification' )
          .each( function ()
        {
          var _t = $( this ).text();
          if ( _g[_t] ) $( _notif ).remove();
          else _g[_t] = true;
        });



        /*
          * Funções
        */
        // Mostra a nova notificação
        function notificationShow ()
        {
          $( _notif )
            .animate({ // Muda a opacidade para 1
              'opacity' : '1'
            })
            .addClass( 'animated bounceIn' ) // Aplica o efeito bounceIn do Animate.css
            .one( 'webkitAnimationEnd \
                   mozAnimationEnd \
                   MSAnimationEnd \
                   oanimationend \
                   animationend',
              function ()
              {
                // Mantém a notificação aberta ao final da animação bounceIn
                $( this )
                  .removeClass( 'animated bounceIn' )
                  .addClass( 'notif-open' );

                // Inicia o timer
                notificationTimeoutFn();
              }
            );
        }

        // Timer
        function notificationTimeoutFn ()
        {
          // Se o timer não for definido, a notificação se fecha em 10s.
          if ( timer === undefined )
          {
            // Cria o timeout
            var notifTimeout = w.setTimeout( function ()
            {
              // Fecha a notificação ao fim do timer
              $( _notif )
                .removeClass( 'notif-open' ) // Remove a classe de notificação aberta
                .addClass( 'notif-close' ) // Adiciona a animação de fechamento de notificação
                .one( 'webkitAnimationEnd \
                       mozAnimationEnd \
                       MSAnimationEnd \
                       oanimationend \
                       animationend',
                  function ()
                  {
                    // Ao fim da animação de fechamento, adiciona a animação bounceOut do Animate.css
                    $( this )
                      .removeClass( 'notif-close' )
                      .addClass( 'animated bounceOut' );
                  }
                );

              // Junta as outras notificações (se existirem)
              w.setTimeout( function ()
              {
                $( _notif ).animate({
                  'height' : '0px',
                  'margin-bottom' : '0px'
                });

                // Remove a notificação do DOM depois disso
                w.setTimeout( function ()
                {
                  $( _notif ).remove();
                }, 600);
              }, 2000);
            }, 10000);
          }

          // Se o timer for definido...
          else
          {
            var notifTimeout = w.setTimeout( function ()
            {
              $( _notif )
                .removeClass( 'notif-open' )
                .addClass( 'notif-close' )
                .one( 'webkitAnimationEnd \
                       mozAnimationEnd \
                       MSAnimationEnd \
                       oanimationend \
                       animationend',
                  function ()
                  {
                    $( this )
                      .removeClass( 'notif-close' )
                      .addClass( 'animated bounceOut' );
                  }
                );

              w.setTimeout( function ()
              {
                $( _notif ).animate({
                  'height' : '0px',
                  'margin-bottom' : '0px'
                });

                w.setTimeout( function ()
                {
                  $( _notif ).remove();
                }, 600);
              }, 2000);
            }, timer); // Essa é a única diferença ;)
          }
        }

        // Define as propriedades padrões da notificação
        function defineDefaultProperties ()
        {
          // Esse switch atribui as cores corretas para cada tipo de notificação
          switch ( type )
          {
            case 'photo': // Lilás
              _icon.style.backgroundColor = '#825fc7';
              _notif.style.borderColor = '#825fc7';
              break;
            case 'success': // Verde
              _icon.style.backgroundColor = '#44ea49';
              _notif.style.borderColor = '#44ea49';
              break;
            case 'warning': // Amarelo
              _icon.style.backgroundColor = '#fff25b';
              _notif.style.borderColor = '#fff25b';
              break;
            case 'error': // Vermelho
              _icon.style.backgroundColor = '#ff5b5b';
              _notif.style.borderColor = '#ff5b5b';
              break;
            default: // Azul (padrão)
              _icon.style.backgroundColor = '#4facc3';
              _notif.style.borderColor = '#4facc3';
          };

          // Agora, atribuimos os icones corretos
          // Se o tipo for 'photo' mas o icone for uma string vazia
          if ( type === 'photo' && icon === '' ) _icon.style.backgroundImage = 'url(img/icons/ionicons/image.png)';
          // Icone definido pelo usuário
          else if ( type === 'photo' && icon !== '' ) _icon.style.backgroundImage = 'url(' + icon + ')';
          // Icone padrão
          else if ( type === 'success' && icon === '' ) _icon.style.backgroundImage = 'url(img/icons/ionicons/outline/ios7-checkmark-outline.png)';
          // Icone definido pelo usuário
          else if ( type === 'success' && icon !== '' ) _icon.style.backgroundImage = 'url(' + icon + ')';
          // Icone padrão
          else if ( type === 'warning' && icon === '' ) _icon.style.backgroundImage = 'url(img/icons/ionicons/alert-circled.png)';
          // Icone definido pelo usuário
          else if ( type === 'warning' && icon !== '' ) _icon.style.backgroundImage = 'url(' + icon + ')';
          // Icone padrão
          else if ( type === 'error' && icon === '' ) _icon.style.backgroundImage = 'url(img/icons/ionicons/outline/ios7-close-outline.png)';
          // Icone definido pelo usuário
          else if ( type === 'error' && icon !== '' ) _icon.style.backgroundImage = 'url(' + icon + ')';
          // Icone padrão
          else if ( type === 'default' && icon !== '' || type === '' && icon !== '' ) _icon.style.backgroundImage = 'url(' + icon + ')';
          // Icone padrão
          else _icon.style.backgroundImage = 'url(img/icons/ionicons/outline/ios7-filing-outline.png)';

          // Checa se icone é do tipo Ionicons. Se sim, reduz o tamanho para 60% (os icones Ionicons não possuem margem).
          if ( _icon.style.backgroundImage.match( '/ionicons/' ) ) _icon.style.backgroundSize = '60%';
        }
      }
    };


/*
  * Bom saber:
  * Se o parâmetro reservado ao tipo e/ou ao icone for uma string vazia, o valor "default" será empregado;
  * Se o parâmetro reservado ao timer for uma string vazia ou não for definida, o valor 10000 será empregado;
  * Se o parâmetro reservado ao tipo for 'photo', 'success', 'warning' ou 'error' e o icone for uma string
    vazia, serão empregados os icones padrões;


  * Para testar, rode este código no console:

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  var icon, a = setInterval( function () {
    var types = [ 'photo', 'error', 'success', 'warning', 'default' ],
        type = types[ Math.floor( Math.random() * types.length - 1 ) ],
        id = Math.floor( Math.random() * 9999 ),
        times = [ 5000, 10000, 15000, 7000, 13000 ],
        time = times[ Math.floor( Math.random() * times.length - 1 ) ];
    if ( type === 'photo' ) icon = 'img/examples/user1.png';
    else icon = '';
    notification.create( type, 'Notificação #' + id + '.', icon, time );
  }, 2000);
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

E este para parar a repetição:
  clearInterval(a);
*/
