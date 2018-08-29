var
// DOM
  input = document.querySelector( '#input' ),
  output = document.querySelector( '#output' ),

  ai =
  {
    reply: function (r)
    {
      var rand = Math.ceil( Math.random() * r.length - 1 );

      freply = r[rand]; // final_reply = reply[random]

      // Se o valor atribuido à variavel ´freply´ for igual ao valor do campo ´output´
      // é criado um falso loop que é interrompido quando ´freply != r[rand]´
      if ( freply === output.innerHTML )
      {
        var int = window.setInterval( function ()
        {
          if ( freply === r[ rand ] ) ai.reply( r );
          else window.clearInterval( int );
        }, 1);
      }
      else output.innerHTML = freply;
    }
  };




  input.addEventListener( 'keypress', function ( e )
  {
    if ( e.which === 13 )
    {
      analyse();
    }
  });



  // Possíveis: oi, olá.
  var cumprimentos = /(^| )(oi|olá)/gi;
  // Possíveis: porque, por que, qual, o que, ?
  var perguntas = /(|^| )(por(| )que|qual|o que\?)/gi;
  // Possíveis: o/a/os/as [sujeito] é/era/foi/fez/[verbo no passado]
  var sujeito = /((^|.* )(o|a|os|as) (.*)(| )(|é|era|foi|fez|((.*)(ou|eu|iu)(|.*)))|)/gi;
  var acao = /((^|.* )(o|a|os|as) (.*)(| )((| )é|(| )era|(| )foi|(| )fez|((.*)(ou|eu|iu)(|.*)))|)/gi;

  var contexto = /((meu)|(seu))/gi;
  var ansCumprimentos = ['Olá', 'Oi', 'Hey'];


function analyse ()
{
  var inputType = [];
  var subject = sujeito.exec(input.value);




  if ( input.value.match( cumprimentos ) )
  {
    inputType.push( 'cumprimento' );
  }

  if ( input.value.match( perguntas ) )
  {
    inputType.push( 'pergunta' );
  }



  window.inputType = inputType;
  window.subject = subject;

  console.log('inputType: ' + inputType);
  console.log('subject: ' + subject[4]);
}
