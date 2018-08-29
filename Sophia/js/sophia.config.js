var Unome = document.getElementById('user-name');
var Ugenero = document.getElementById('user-gender');
var Ulocal = document.getElementById('user-city');
var Uidioma = document.getElementById('sophia_idioma');
var Usrate = document.getElementById('sophia_s_rate');
var Ucodec = document.getElementById('sophia_s_codec');
var Uformato = document.getElementById('sophia_s_format');
var Usapikey = document.getElementById('sophia_s_key');

var gUnome = window.localStorage.getItem('user-name');
var gUgenero = window.localStorage.getItem('user-gender');
var gUlocal = window.localStorage.getItem('user_city');
var gUidioma = window.localStorage.getItem('idioma');
var gUsrate = window.localStorage.getItem('srate');
var gUcodec = window.localStorage.getItem('codec');
var gUformato = window.localStorage.getItem('formato');
var gUsapikey = window.localStorage.getItem('sapikey');

/*
function autocom() { // Autocompletar opções configuradas
  document.getElementById("user-name").value = gUnome;
  document.getElementById("user-gender").innerHTML = gUgenero;
  document.getElementById("user-city").value = gUlocal;
  document.getElementById("Usrate").innerHTML = gUsrate;
  document.getElementById("Ucodec").innerHTML = gUcodec;
  document.getElementById("Uformato").innerHTML = gUformato;
  document.getElementById("Usapikey").innerHTML = gUsapikey;

  if(gUgenero === "Senhor") {
    document.getElementById("user-gender").value = "senhor"
    }
  if(gUgenero === "Senhorita") {
    document.getElementById("user-gender").value = "senhorita"
    }
  if(gUgenero === "Nenhum") {
    document.getElementById("user-gender").value = "nenhum"
    }

  if(gUidioma === "pt-br") {
    document.getElementById("pt-br").selected = "true"
    }
  if(gUidioma === "pt-pt") {
    document.getElementById("pt-pt").selected = "true"
    }

  if(gUsrate === "0") {
    document.getElementById("0").selected = "true"
    }
  if(gUsrate === "-2") {
    document.getElementById("-2").selected = "true"
    }
  if(gUsrate === "3") {
    document.getElementById("3").selected = "true"
    }

  if(gUcodec === "mp3") {
    document.getElementById("mp3").selected = "true"
    }
  if(gUcodec === "wav") {
    document.getElementById("wav").selected = "true"
    }
  if(gUcodec === "aac") {
    document.getElementById("aac").selected = "true"
    }
  if(gUcodec === "ogg") {
    document.getElementById("ogg").selected = "true"
    }
  if(gUcodec === "caf") {
    document.getElementById("caf").selected = "true"
    }

  if(gUformato === "8khz_8bit_mono") {
    document.getElementById("8khz_8bit_mono").selected = "true"
    }
  if(gUformato === "8khz_8bit_stereo") {
    document.getElementById("8khz_8bit_stereo").selected = "true"
    }
  if(gUformato === "16khz_16bit_mono") {
    document.getElementById("16khz_16bit_mono").selected = "true"
    }
  if(gUformato === "16khz_16bit_stereo") {
    document.getElementById("16khz_16bit_stereo").selected = "true"
    }
  if(gUformato === "48khz_16bit_mono") {
    document.getElementById("48khz_16bit_mono").selected = "true"
    }
  if(gUformato === "48khz_16bit_stereo") {
    document.getElementById("48khz_16bit_stereo").selected = "true"
    }

  if(gUsapikey === "8f0b4a57a6ac49a683224f7bb8d795e9") {document.getElementById("8f0b4a57a6ac49a683224f7bb8d795e9").selected = "true";}
  if(gUsapikey === "cd58d3ed06b54f7fa19979932b4ddd40") {document.getElementById("cd58d3ed06b54f7fa19979932b4ddd40").selected = "true";}

  if (document.getElementById('user-name').value === ""
  ||  document.getElementById('user-name').value === null
  ||  document.getElementById('user-name').value === undefined) {
    $('#sophia-first-overlay').fadeIn('fast');
  } else {
  $('#sophia-first-overlay').fadeOut('fast');
  };
  };

  autocom();*/

//
/*
if(gUlocal == null || gUlocal == undefined || gUlocal == "") {document.getElementById("user-city").value = "Brasil"; document.getElementById("user-name").value = gUnome; salvarDados(); document.location.reload();}
*/
function salvarDados() {
  window.localStorage.setItem( 'user-data', JSON.stringify(user) );
  Reload();
  /*window.localStorage.setItem('user-gender',Ugenero.value);
  window.localStorage.setItem('user-city',Ulocal.value);
  window.localStorage.setItem('idioma',Uidioma.value);
  window.localStorage.setItem('srate',Usrate.value);
  window.localStorage.setItem('codec',Ucodec.value);
  window.localStorage.setItem('formato',Uformato.value);
  window.localStorage.setItem('sapikey',Usapikey.value);
  closeConfig();
  $('#fb-info-top-nome').html("Salvando...");
  reloadModulesBrain();
  */
}

function apagarDados() {
confirmar = confirm("Seus dados não poderão ser recuperados.\n\n Você tem certeza que deseja apagar seus dados?");
  if (confirmar == true) {
    window.localStorage.clear();
    alert("Seus dados foram apagados. Aperte Ok para atualizar.");
    document.location.reload();
} else {return false;}
};

/*
function getHist() {
  var dialog = document.getElementById('dialogo');
  window.localStorage.getItem('dialog');
}

function saveHist() {
  var dialog = document.getElementById('dialogo');
  window.localStorage.setItem('histórico',dialog.innerHTML);
}

function clearHist() {
  confirmar = confirm("Você tem certeza que deseja apagar o histórico de conversa?");
    if (confirmar == true) {
  window.localStorage.removeItem('histórico');
  document.getElementById('dialogo').innerHTML = "";
} else {return false;}
}
*/

function clearNome() {
  confirmar = confirm("Você tem certeza que deseja apagar seu nome?");
    if (confirmar == true) {
  window.localStorage.removeItem('user-name');
} else {return false;}
};



/*
// Papel de parede
$(document).ready(function(){
  var img = new Image();
  img.src = localStorage.theImage;
  img.id = "bgImage";
  var imgThumb = window.localStorage.getItem('theImage');

function loadBgImage() {
  if(localStorage.getItem("theImage") !== null) {
    $('.content').html(img);
    $("#bgImageThumb").html("<img src=\'"+imgThumb+"\' \/>");
}
  else {
  $('.content').html('');
  $("#bgImageThumb").html('');
  };
}; loadBgImage();

  $("body").on("change",".bgImageInput",function(){
    var imgThumb = window.localStorage.getItem('theImage');

      var fileInput = $(this)[0];//returns a HTML DOM object by putting the [0] since it's really an associative array.
      var file = fileInput.files[0]; //there is only '1' file since they are not multiple type.

      var reader = new FileReader();
      reader.onload = function(e) {
           // Create a new image.
           var img = new Image();

           img.src = reader.result;
           localStorage.theImage = reader.result; //stores the image to localStorage
           $(".content").html(img);
           $("#bgImageThumb").html("<img src=\'"+img.src+"\' \/>");
       }

       reader.readAsDataURL(file);//attempts to read the file in question.
    });
});

function removeImg() {
  $(".content").html("");
  $("#bgImageThumb").html("");
  window.localStorage.removeItem('theImage')
}
*/



if (window.location.protocol == "http:") {
window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
}

if (window.location.protocol == "http:" || window.location.protocol == "https:") {
$('#on-off').remove();
}


/*
// IP remoto
function loadIp() {
  if (!localStorage['ip_remoto']) {
$.ajax({
        url: 'https://freegeoip.net/json/',
        type: 'POST',
        dataType: 'jsonp',
        success: function(location) {

        window.localStorage.setItem('ip_remoto',location.ip);
        window.localStorage.setItem('user_country',location.country_name);
        window.localStorage.setItem('user_lat',location.latitude);
        window.localStorage.setItem('user_lon',location.longitude);

        console.log(location.ip);
      }
    });
  } else {return false}
};
loadIp();
*/


var initAudio;
function initAudioPlay() {
  initAudioPlay = document.createElement('audio');
  initAudioPlay.id = "initAudio";
  initAudioPlay.src = "sound/26955.aac";
  initAudioPlay.controls = false;
  initAudioPlay.autoplay = false;
  initAudioPlay.preload = true;
  document.getElementById('scripts').appendChild(initAudioPlay);

var inicialAudio = document.getElementById('initAudio');
  inicialAudio.play();
}



/*
// Reload Brain

// Recarregar módulos Brain
function reloadModulesBrain() {
  _load_script();
  load_script()
};

function _load_script() {
  $('#sophiaScript').remove();

  var s = document.createElement("script");
  s.type = "text/javascript";
  s.id = "sophiaScript";
  s.src = "js/sophia/sophia.js";
  document.getElementById('scripts').appendChild(s);
}

  function load_script() {
        $('#sophiaBrainScript').remove();

          var _s = document.createElement("script");
          _s.type = "text/javascript";
          _s.id = "sophiaBrainScript";
          _s.src = "js/sophia/sophia.brain.js";
          document.getElementById('scripts').appendChild(_s);
        }
          setInterval(function() {
            load_script();

          }, 3 * 11000);

          setInterval(function() {
            _load_script();
          }, 5000);
*/

/*
var firstInput = document.getElementById("sFi");
var secondInput = document.getElementById("sSi");
var thrirdInput = document.getElementById("sTi");

function apresInputName(c) {
    if (firstInput.value !== "" && c.charCode === 13) {
      $('#user-name').val(firstInput.value);
      salvarDados();
      firstInput.value = "";
      $('#sFi').fadeOut();
      $('#sSi').fadeIn();
      }
    };

function apresInputTreatment() {
  if (secondInput.value === "Senhor") {
    $('#gen').val(secondInput.value);
    salvarDados();
    $('#sSi').fadeOut();
    $('#sTi').fadeIn();
  } else if (secondInput.value === "Senhorita") {
    $('#gen').val(secondInput.value);
    salvarDados();
    $('#sSi').fadeOut();
    $('#sTi').fadeIn();
  } else if (secondInput.value === "Senhora") {
    $('#gen').val(secondInput.value);
    salvarDados();
    $('#sSi').fadeOut();
    $('#sTi').fadeIn();
  } else {
    $('#gen').val(secondInput.value);
    salvarDados();
    $('#sSi').fadeOut();
    $('#sTi').fadeIn();
  }
};

function apresInputLocal(c) {
    if (thrirdInput.value !== "" && c.charCode === 13) {
      $('#user-city').val(thrirdInput.value);
      salvarDados();
      thrirdInput.value = "";
      $('#sTi').fadeOut();
      $('.first-input--holder').fadeOut();
      $('#sophia-first-overlay').fadeOut();
      }
    };

    */
