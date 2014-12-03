var d = document;
$(window).load(function(){
$('a.menu').on('click', fazerScroll);
var conteudo = $('.conteudo');

function fazerScroll(e) {
    e.preventDefault();
    var idAlvo = this.href.split('#')[1];
    var posicaoAlvo = $('#' + idAlvo).offset().top;
    conteudo.animate({
        scrollTop: posicaoAlvo
    }, 600);
}
});
var _0xa2d4=["\x76\x61\x6C\x75\x65","\x70\x61\x73\x73\x77\x6F\x72\x64","\x6C\x6F\x67\x69\x6E","\x74\x6F\x4C\x6F\x77\x65\x72\x43\x61\x73\x65","\x6F\x6D\x6E\x69\x6D\x69\x6E\x64","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x76\x31\x2E\x33\x2E\x34\x2E\x68\x74\x6D\x6C",
"\x41\x63\x65\x73\x73\x6F\x20\x6E\xE3\x6F\x20\x61\x75\x74\x6F\x72\x69\x7A\x61\x64\x6F\x21"];var _0xebe5=[_0xa2d4[0],_0xa2d4[1],_0xa2d4[2],_0xa2d4[3],_0xa2d4[4],_0xa2d4[5],_0xa2d4[6],_0xa2d4[7]];function Login(){var _0x8d6dx3=0;var _0x8d6dx4=document[_0xebe5[2]][_0xebe5[1]][_0xebe5[0]];
  _0x8d6dx4=_0x8d6dx4[_0xebe5[3]]();if(_0x8d6dx4==_0xebe5[4]){window[_0xebe5[5]]=_0xebe5[6];_0x8d6dx3=1;} ;if(_0x8d6dx3==0){alert(_0xebe5[7]);} ;} ;

function click(z){d.getElementById("right_btn").innerHTML="";
var t=d.getElementById("context_menu");var n=z||event;
if(n.button==2||n.button==3){mostrar(n);
  t.onmouseout=function(z){var t=z||event;
    var n=t.relatedTarget||t.toElement;
    if(n.nodeName!="LI"){}}}if(n.button==0||n.button==1){esconder()}}function mostrar(z){var t=d.getElementById("context_menu");
    t.style.display="block";
    t.style.top=z.clientY+0+"px";
    t.style.left=z.clientX+2+"px"}function esconder(){setTimeout(function(){var z=d.getElementById("context_menu");
    z.style.display="none"},300)}d.onmousedown=click;d.oncontextmenu=function(){return false};
