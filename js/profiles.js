var emilyIcon = "http://jvribeiro.github.io/emily.jpg",
    camilaIcon = "http://jvribeiro.github.io/camila.jpg",
    tataIcon = "http://jvribeiro.github.io/tata.jpg",
    victorIcon = "http://jvribeiro.github.io/perfil.jpg",

    emilyIconP = "http://jvribeiro.github.io/emilyp.jpg",
    camilaIconP = "http://jvribeiro.github.io/camilap.jpg",
    tataIconP = "http://jvribeiro.github.io/tatap.jpg",
    victorIconP = "http://jvribeiro.github.io/perfilp.jpg",

    emilyFacebookUrl = "https://facebook.com/emily.abreu.31",
    emilyPosts = "http://www.livrofilia.com/search/label/Emily Abreu",
    emilyInstagramUsername = "emiiilysantoos",
    emilyFacebook = "<a title=\"Facebook de Emily\" class=\"facebook\" href=\""+ emilyFacebookUrl +"\" rel=\"nofollow\" target=\"_blank\"><i class=\"fa fa-facebook\"><\/i><\/a>",
    emilyInstagram = "<a title=\"Instagram de Emily\" class=\"instagram\" href=\"http:\/\/instagram.com\/"+ emilyInstagramUsername +"\" rel=\"nofollow\" target=\"_blank\"><i class=\"fa fa-instagram\"><\/i><\/a>",

    camilaFacebookUrl = "https://facebook.com/CGabriely",
    camilaPosts = "http://www.livrofilia.com/search/label/Camila Correa",
    camilaInstagramUsername = "camilagcorrea",
    camilaFacebook = "<a title=\"Facebook de Camila\" class=\"facebook\" href=\""+ camilaFacebookUrl +"\" rel=\"nofollow\" target=\"_blank\"><i class=\"fa fa-facebook\"><\/i><\/a>",
    camilaInstagram = "<a title=\"Instagram de Camila\" class=\"instagram\" href=\"http:\/\/instagram.com\/"+ camilaInstagramUsername +"\" rel=\"nofollow\" target=\"_blank\"><i class=\"fa fa-instagram\"><\/i><\/a>",

    tataFacebookUrl = "#",
    tataPosts = "http://www.livrofilia.com/search/label/Thamiris Almeida",
    tataInstagramUsername = "thamirisalmeida22",
    tataFacebook = "<a title=\"Facebook de Thamiris\" class=\"facebook\" href=\""+ tataFacebookUrl +"\" rel=\"nofollow\" target=\"_blank\"><i class=\"fa fa-facebook\"><\/i><\/a>",
    tataInstagram = "<a title=\"Instagram de Thamiris\" class=\"instagram\" href=\"http:\/\/instagram.com\/"+ tataInstagramUsername +"\" rel=\"nofollow\" target=\"_blank\"><i class=\"fa fa-instagram\"><\/i><\/a>",

    victorFacebookUrl = "https://facebook.com/OVictorRibeiro",
    victorPosts = "http://www.livrofilia.com/search/label/Victor Ribeiro",
    victorInstagramUsername = "_jvribeiro",
    victorFacebook = "<a title=\"Facebook de Victor\" class=\"facebook\" href=\""+ victorFacebookUrl +"\" rel=\"nofollow\" target=\"_blank\"><i class=\"fa fa-facebook\"><\/i><\/a>",
    victorInstagram = "<a title=\"Instagram de Victor\" class=\"instagram\" href=\"http:\/\/instagram.com\/"+ victorInstagramUsername +"\" rel=\"nofollow\" target=\"_blank\"><i class=\"fa fa-instagram\"><\/i><\/a>",


EMILY = "\
<style>\
.emily {\
    width: calc(100% - 30px);\
    width: -webkit-calc(100% - 30px);\
    width: -moz-calc(100% - 30px);\
    width: -o-calc(100% - 30px);\
    width: -ms-calc(100% - 30px);\
    height: auto;\
    display: inline-block;\
    font-size: 12pt;\
    border-top: 1px solid #D6D6D6;\
    padding: 10px;\
    text-align: justify;\
    margin-bottom: 30px;\
    }\
\
.emily .icon {\
    margin-top: 15px;\
    width: 200px;\
    height: 200px;\
    border-radius: 30%;\
    -webkit-border-radius: 30%;\
    -moz-border-radius: 30%;\
    -ms-border-radius: 30%;\
    -o-border-radius: 30%;\
    border: 2px solid #FC92FF;\
    display: inline-block;\
    position: relative;\
    background-image: url('"+emilyIcon+"');\
    background-size: auto 100%;\
    background-repeat: no-repeat;\
    background-position: 50%;\
}\
.emily .text {\
    font-family: Segoe UI, Trebucuhet, sans-serif;\
    color: #000;\
    font-size: 12pt;\
    border-right: 3px solid #FEDFFF;\
    width: 400px;\
    max-width: 90%;\
    min-width: 230px;\
    height: auto;\
    padding-left: 15px;\
    padding-right: 15px;\
    display: inline-block;\
    top: 0;\
    left: 170px;\
}\
.emily h2 {\
    color: #FF00E9;\
}\
</style>\
<div class=\"emily\">\
   <div class=\"icon\"><\/div>\
   <div class=\"text\">\
     <h2>Emily Abreu<\/h2>\
     "+emilyInstagram+" - <a href=\""+emilyPosts+"\">Ver todos os posts<\/a>\
     <p>22 anos, filha, irmã e namorada. Uma romântica levemente <s>(risos)</s> viciada em livros e na cor <b style=\'color: #FF5AF1\'>rosa</b>, além de sorridente, falante e dorminhoca.<\/p>\
     <p>Apaixonada por animais, mas com uma queda gigantesca por cachorros.<\/p>\
   <\/div>\
</div>\
",

EMILYP = "\
<style>\
.icon-p-emily {\
    margin-right: 10px;\
    width: 50px;\
    height: 50px;\
    border: 1px solid #CB9CFF;\
    float: left;\
    background-image: url('"+emilyIconP+"');\
    background-size: 100% auto;\
    background-repeat: no-repeat;\
    background-position: 50%;\
}\
</style>\
<div class=\"icon-p-emily\"><\/div>\
",

CAMILA = "\
<style>\
.camila {\
    width: calc(100% - 30px);\
    width: -webkit-calc(100% - 30px);\
    width: -moz-calc(100% - 30px);\
    width: -o-calc(100% - 30px);\
    width: -ms-calc(100% - 30px);\
    height: auto;\
    display: inline-block;\
    font-size: 12pt;\
    border-top: 1px solid #D6D6D6;\
    padding: 10px;\
    text-align: justify;\
    margin-bottom: 30px;\
    }\
\
.camila .icon {\
    margin-top: 15px;\
    width: 200px;\
    height: 200px;\
    border-radius: 30%;\
    -webkit-border-radius: 30%;\
    -moz-border-radius: 30%;\
    -ms-border-radius: 30%;\
    -o-border-radius: 30%;\
    border: 2px solid #CB9CFF;\
    display: inline-block;\
    position: relative;\
    background-image: url('"+camilaIcon+"');\
    background-size: 100% auto;\
    background-repeat: no-repeat;\
    background-position: 50%;\
}\
.camila .text {\
    font-family: Segoe UI, Trebucuhet, sans-serif;\
    color: #000;\
    font-size: 12pt;\
    border-right: 3px solid #EDDDFF;\
    width: 400px;\
    max-width: 90%;\
    min-width: 230px;\
    height: auto;\
    padding-left: 15px;\
    padding-right: 15px;\
    display: inline-block;\
    top: 0;\
    left: 170px;\
}\
.camila h2 {\
    color: #A500AF !important;\
    border-bottom: 3px solid #CB9CFF !important;\
    background-color: #F8F3FF !important;\
}\
</style>\
<div class=\"camila\">\
   <div class=\"icon\"><\/div>\
   <div class=\"text\">\
     <h2>Camila Correa<\/h2>\
     "+camilaInstagram+" - <a href=\""+camilaPosts+"\">Ver todos os posts<\/a>\
     <p>Camila tem 18 anos, é publicadora de boas novas, devoradora de livros e desastrada ao extremo.<\/p>\
     <p>Tenta ser uma pessoa responsável e criativa, mas tem memória de peixe e esquece tudo de uma hora pra outra. Inclusive, ela esqueceu algo bem legal que iria escrever aqui.<\/p>\
   <\/div>\
</div>\
",

CAMILAP = "\
<style>\
.icon-p-camila {\
    margin-right: 10px;\
    width: 50px;\
    height: 50px;\
    border: 1px solid #CB9CFF;\
    float: left;\
    background-image: url('"+camilaIconP+"');\
    background-size: 100% auto;\
    background-repeat: no-repeat;\
    background-position: 50%;\
}\
</style>\
<div class=\"icon-p-camila\"><\/div>\
",

THAMIRIS = "\
<style>\
.tata {\
    width: calc(100% - 30px);\
    width: -webkit-calc(100% - 30px);\
    width: -moz-calc(100% - 30px);\
    width: -o-calc(100% - 30px);\
    width: -ms-calc(100% - 30px);\
    height: auto;\
    display: inline-block;\
    font-size: 12pt;\
    border-top: 1px solid #D6D6D6;\
    padding: 10px;\
    text-align: justify;\
    margin-bottom: 30px;\
    }\
\
.tata .icon {\
    margin-top: 15px;\
    width: 200px;\
    height: 200px;\
    display: inline-block;\
    position: relative;\
    border-radius: 30%;\
    -webkit-border-radius: 30%;\
    -moz-border-radius: 30%;\
    -ms-border-radius: 30%;\
    -o-border-radius: 30%;\
    border: 2px solid #FC92FF;\
    background-image: url('"+tataIcon+"');\
    background-size: auto 100%;\
    background-repeat: no-repeat;\
    background-position: 50%;\
}\
.tata .text {\
    font-family: Segoe UI, Trebucuhet, sans-serif;\
    color: #000;\
    font-size: 12pt;\
    border-right: 3px solid #FEDFFF;\
    width: 400px;\
    max-width: 90%;\
    min-width: 230px;\
    height: auto;\
    padding-left: 15px;\
    padding-right: 15px;\
    display: inline-block;\
    top: 0;\
    left: 170px;\
}\
.tata h2 {\
    color: #000000 !important;\
    background-color: #FFF2F8 !important;\
    border-bottom-color: #FF00E9 !important;\
}\
</style>\
<div class=\"tata\">\
   <div class=\"icon\"><\/div>\
   <div class=\"text\">\
     <h2>Thamiris Almeida<\/h2>\
     "+tataInstagram+" - <a href=\""+tataPosts+"\">Ver todos os posts<\/a>\
     <p>16 anos, geminiana, apaixonada por livros — na verdade, eles que são apaixonados por mim. Tenho super mega medo de animais.<\/p>\
     <p>Cores favoritas: <b>preta</b> e <b style=\'color: #FF5AF1\'>rosa</b>.<\/p>\
     <p>Falou em diversão e palhaçada, pode me chamar.<\/p>\
   <\/div>\
</div>\
",

TATAP = "\
<style>\
.icon-p-tata {\
    margin-right: 10px;\
    width: 50px;\
    height: 50px;\
    border: 1px solid #CB9CFF;\
    float: left;\
    background-image: url('"+tataIconP+"');\
    background-size: 100% auto;\
    background-repeat: no-repeat;\
    background-position: 50%;\
}\
</style>\
<div class=\"icon-p-tata\"><\/div>\
",

VICTOR = "\
<style>\
.victor {\
    width: calc(100% - 30px);\
    width: -webkit-calc(100% - 30px);\
    width: -moz-calc(100% - 30px);\
    width: -o-calc(100% - 30px);\
    width: -ms-calc(100% - 30px);\
    height: auto;\
    display: inline-block;\
    font-size: 12pt;\
    border-top: 1px solid #D6D6D6;\
    padding: 10px;\
    text-align: justify;\
    margin-bottom: 30px;\
    }\
\
.victor .icon {\
    margin-top: 15px;\
    width: 200px;\
    height: 200px;\
    border-radius: 30%;\
    -webkit-border-radius: 30%;\
    -moz-border-radius: 30%;\
    -ms-border-radius: 30%;\
    -o-border-radius: 30%;\
    border: 2px solid #E0E0E0;\
    display: inline-block;\
    position: relative;\
    background-image: url('"+victorIcon+"');\
    background-size: auto 100%;\
    background-repeat: no-repeat;\
    background-position: 50%;\
}\
.victor .text {\
    font-family: Segoe UI, Trebucuhet, sans-serif;\
    color: #000;\
    font-size: 12pt;\
    border-right: 3px solid #E0E0E0;\
    width: 400px;\
    max-width: 90%;\
    min-width: 230px;\
    height: auto;\
    padding-left: 15px;\
    padding-right: 15px;\
    display: inline-block;\
    top: 0;\
    left: 170px;\
}\
.victor h2 {\
    color: #6693FD !important;\
    background-color: #F2FFFE !important;\
    border-bottom-color: #9CB3FF !important;\
}\
</style>\
<div class=\"victor\">\
   <div class=\"icon\"><\/div>\
   <div class=\"text\">\
     <h2>Victor Ribeiro<\/h2>\
     "+victorInstagram+" - <a href=\""+victorPosts+"\">Ver todos os posts<\/a>\
     <p>Insira uma bio aqui. ^^<\/p><br><br><br><br>\
   <\/div>\
</div>\
",

VICTORP = "\
<style>\
.icon-p-victor {\
    margin-right: 10px;\
    width: 50px;\
    height: 50px;\
    border: 1px solid #CB9CFF;\
    float: left;\
    background-image: url('"+victorIconP+"');\
    background-size: 100% auto;\
    background-repeat: no-repeat;\
    background-position: 50%;\
}\
</style>\
<div class=\"icon-p-victor\"><\/div>\
",

profile = document.body;

(function (window) {
profile.innerHTML = profile.innerHTML.replace(/\[\[emily\]\]/gi,EMILY);
profile.innerHTML = profile.innerHTML.replace(/\[\[Emily\]\]/gi,EMILY);
profile.innerHTML = profile.innerHTML.replace(/\[\[EMILY\]\]/gi,EMILY);
profile.innerHTML = profile.innerHTML.replace(/\[\[emi\]\]/gi,EMILY);
profile.innerHTML = profile.innerHTML.replace(/\[\[Emi\]\]/gi,EMILY);
profile.innerHTML = profile.innerHTML.replace(/\[\[EMI\]\]/gi,EMILY);

profile.innerHTML = profile.innerHTML.replace(/\[\[camila\]\]/gi,CAMILA);
profile.innerHTML = profile.innerHTML.replace(/\[\[Camila\]\]/gi,CAMILA);
profile.innerHTML = profile.innerHTML.replace(/\[\[CAMILA\]\]/gi,CAMILA);

profile.innerHTML = profile.innerHTML.replace(/\[\[thamiris\]\]/gi,THAMIRIS);
profile.innerHTML = profile.innerHTML.replace(/\[\[Thamiris\]\]/gi,THAMIRIS);
profile.innerHTML = profile.innerHTML.replace(/\[\[THAMIRIS\]\]/gi,THAMIRIS);
profile.innerHTML = profile.innerHTML.replace(/\[\[Tata\]\]/gi,THAMIRIS);
profile.innerHTML = profile.innerHTML.replace(/\[\[tata\]\]/gi,THAMIRIS);
profile.innerHTML = profile.innerHTML.replace(/\[\[TATA\]\]/gi,THAMIRIS);

profile.innerHTML = profile.innerHTML.replace(/\[\[victor\]\]/gi,VICTOR);
profile.innerHTML = profile.innerHTML.replace(/\[\[Victor\]\]/gi,VICTOR);
profile.innerHTML = profile.innerHTML.replace(/\[\[VICTOR\]\]/gi,VICTOR);
profile.innerHTML = profile.innerHTML.replace(/\[\[jv\]\]/gi,VICTOR);


profile.innerHTML = profile.innerHTML.replace(/\[emily-p\]/gi,EMILYP);
profile.innerHTML = profile.innerHTML.replace(/\[EMILY-P\]/gi,EMILYP);
profile.innerHTML = profile.innerHTML.replace(/\[Emily-p\]/gi,EMILYP);
profile.innerHTML = profile.innerHTML.replace(/\[Emily-P\]/gi,EMILYP);

profile.innerHTML = profile.innerHTML.replace(/\[camila-p\]/gi,CAMILAP);
profile.innerHTML = profile.innerHTML.replace(/\[CAMILA-P\]/gi,CAMILAP);
profile.innerHTML = profile.innerHTML.replace(/\[Camila-p\]/gi,CAMILAP);
profile.innerHTML = profile.innerHTML.replace(/\[Camila-P\]/gi,CAMILAP);

profile.innerHTML = profile.innerHTML.replace(/\[tata-p\]/gi,TATAP);
profile.innerHTML = profile.innerHTML.replace(/\[TATA-P\]/gi,TATAP);
profile.innerHTML = profile.innerHTML.replace(/\[Tata-p\]/gi,TATAP);
profile.innerHTML = profile.innerHTML.replace(/\[Tata-P\]/gi,TATAP);
})(window);
