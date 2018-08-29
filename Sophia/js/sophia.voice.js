var _spRec_ = new SpeechSynthesisUtterance(),
    voicePlaying,
    voiceText;

    var voices = window.speechSynthesis.getVoices();
    _spRec_.voice = voices[0];
    _spRec_.rate = 1.2;
    _spRec_.pitch = 1.4;
    _spRec_.volume = 1;
    //_spRec_.voiceURI = 'native';
    _spRec_.lang = 'pt-BR';

//Speech Synthesis
function voice ()
{

  window.setTimeout( function ()
  {
    var voices = window.speechSynthesis.getVoices();

    _spRec_.voice = voices[0];
    _spRec_.rate = 1.2;
    _spRec_.pitch = 1.4;
    //_spRec_.voiceURI = 'native';
    _spRec_.lang = 'pt-BR';

    voiceText = document.querySelector( '#sophia-reply' );
    _spRec_.text = JSON.stringify( voiceText.innerHTML );

    if ( voicePlaying ) speechSynthesis.cancel( _spRec_ );

    voicePlaying = false;

    _spRec_.onend = function ( event )
    {
      voicePlaying = false;

      avatar._animation( 'default' );

      if ( !listening )
      {
        changeCommands( actualCommandObj );
        ai.listening( true );
      }
      else
      {
        window.setTimeout(function ()
        {
          changeCommands( actualCommandObj );
          console.log( 'Ouvindo: sim' );
        }, 500);
      }

      console.log( 'Sophia parou de falar.' );
    };

    speechSynthesis.speak( _spRec_ );
    avatar._animation( 'speaking' );
    voicePlaying = true;

    console.log( 'Sophia começou a falar.' );
  }, 500);
}
