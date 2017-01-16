//<![CDATA[
document.querySelector( '.overlay-130-60' ).addEventListener( 'mouseover', function ()
{
  document.querySelector( '.lf-banner-130-60-logo-hover' ).style.marginTop = '0px';
  document.querySelector( '.lf-banner-130-60' ).style.backgroundPositionY = '-60px';
});

document.querySelector( '.overlay-130-60' ).addEventListener( 'mouseout', function ()
{
  document.querySelector( '.lf-banner-130-60-logo-hover' ).style.marginTop = '60px';
  document.querySelector( '.lf-banner-130-60' ).style.backgroundPositionY = '0';

  document.querySelector( '#lf-banner-130-60-a' ).setAttribute( 'href','http://www.livrofilia.com' );
});

document.querySelector( '#lf-banner-130-60-a' ).addEventListener( 'mousedown', function ()
{
  document.querySelector( '#lf-banner-130-60-a' ).setAttribute( 'href','http://bit.ly/Livrofilia' );
});

var i = 0;
var sI = window.setInterval(function ()
{
document.querySelector( '.lf-banner-130-60' ).style.backgroundPositionX = i + 'px';

if ( i < -390 )
{
  i = 0;
  document.querySelector( '.lf-banner-130-60' ).style.backgroundPositionX = i + 'px';
}
else
{
  i = i - 130;
}

window.sI = sI;
}, 2500);
//]]>
