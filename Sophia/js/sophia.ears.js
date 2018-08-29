


window.setInterval( function ()
{
  if ( !listening && !annyang.isListening() )
  {
    ai.listening( false );
    ai.network( false );
  }
  else if ( listening && annyang.isListening() )
  {
    ai.network( true );
    ai.listening( true );

    $( '#drawn-arrow-permissions' )
      .hide();

    micPermission = true;
    localStorage[ 'mic-permission' ] = true;
  }
  else if ( annyang.isListening() && !listening )
  {
    $( '#drawn-arrow-permissions' )
      .hide();

    micPermission = true;
    localStorage[ 'mic-permission' ] = true;
  }
  else if ( !attention ) {
    ai.listening( '' );
  }
  else if ( attention ) {
    ai.listening( true );
  }
}, 1000);
