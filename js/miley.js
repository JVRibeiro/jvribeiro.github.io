var brain = new Array (

// Comandos especiais
// * ************************************************
new Array (
  "^(000111011010101011111000010101000110011000111111001010101010101101001100101001010010010110100)",
  "Desculpe. Mas você não permitiu que eu use seu microfone. Sendo assim, não posso ouvir você e executar comandos por voz. Se tiver usando um computador, clique no ícone da câmera e permita o microfone. Se usa um celular, diga \'atualizar\' para tentar resolver."
),

new Array (
"^(ajuda|O (que|q) (posso|eu posso) dizer)",
"Você pode ter uma conversa natural comigo. Me elogiar, fazer perguntas e mais algumas coisas. Você pode pedir para eu procurar no Google também, além de outras coisas relacionadas à internet.\n\n Para uma lista de ajuda completa, clique em: \'O que posso dizer?\'."
),

new Array (
"^(Abrir ajuda)",
"Aqui está uma lista de coisas que você pode dizer.",
"Nessa página de ajuda, você pode saber o que pode dizer."
),


// * Saudações / Elogios / Xingamentos
// * ************************************************
new Array (
"^(ol(a|á)|oi|e a(i|í))(.*)",
"Olá.",
"Oi!",
"Olá, "+gen+" "+nome+".",
"Oi, "+gen+" "+nome+".",
"Oi! Como vai indo você?",
"Oi. Como você está, "+gen+" "+nome+"?"
),

new Array (
"^(ei|hey so(ph|f)ia|fala so(ph|f)ia|fala, so(ph|f)ia|so(ph|f)ia)",
"Eu!","Oi! Em que posso ajudar?","Oi. O que posso fazer por você?","Sim? "),
new Array (
"(.*)(bom|boa|(ó|o)tim(o|a)|lind(a|o)) (|final de |fim de )(dia|tarde|noite|madrugada|almoço|jantar|descanso)(.*)",
""+saud+", "+gen+" "+nome+".",
"Igualmente, "+gen+" "+nome+".",
"Posso ajudar em algo, "+gen+" "+nome+"?"
),

new Array (
"(.*)(um|uma|tenha (um|uma)) (bom|boa|(ó|o)tim(o|a)) (dia|tarde|noite|madrugada)(.*)",
"Obrigada. $4 $7 pra você também!"
),

new Array (
"(.*)(obrigad(o|a)|agrade(ç|c|ss|ciment)o)(.*)",
"Disponha.",
"De nada.",
"Não tem de quê.",
"Por nada.",
"Não precisa agradecer.",
"Não por isso.",
"Não há de quê."
),

new Array (
"(.*)((voc(ê|e)|vc|tu) (é|está|estava|ficou|és|e|t(a|á)) (|uma |muito )|sua )((ó|o)tima|linda|bacana|perfeita|maravilhosa|charmosa|elegante|exuberante|espl(ê|e)ndida|magn(í|i)fica|extraordin(á|a)ria|encantadora|demais|bela|bonita|um luxo|belezura|supimpa|engraçada|uma gra(ça|cinha)|uma maravilha|inteligente|cute( |-)cute|simp(a|á)tica|legal)(.*)",
"Obrigada. Você também é uma gracinha.",
"Muito obrigada.",
"Obrigada. É bom receber elogios de você.",
"Que gentileza! Obrigada.",
"Gentileza sua. Obrigada.",
"Obrigada pelo elogio."
),

new Array (
"(.*)((voc(ê|e)|vc|tu) (é|está|estava|ficou|és|e) (demais |uma |muito |)|sua )(fei(a|osa)|horr(orosa|(i|í)vel)|burr(a|ona)|ot(á|a)ria|idiota|maluca|doida|chata|mané|imbecil|ordin(a|á)ria|incompetente|besta|abestada|in(u|ú)til|(|filha d(a |de uma ))p(uta|rostituta|utinha)|vaca|vadia|piranha|merd(inha|a)|miserável|est(ú|u)pida|rid(í|i)cula|vagabunda)(.*)",
"Por que está me xingando chamando de $7?",
"Para quê isso?",
"Por que você está me xingando, "+nome+"? :|",
"Por que acha que sou $7, "+nome+"?"
),

new Array (
"(.*)((va|vá)|vai) (se|tomar|te|t|dar) (f(u|o)der|lascar|fumar|danar|(o|no) c(ú|u))(.*)",
"Por que não vai você?",
"Para quê tudo isso?",
"Por que você está dizendo essas coisas? :|",
"Vai $4 $5 você! Pronto, falei.",
"Vá você $4 $5! Falei."
),

new Array (
"(.*)((d|de) nada|por nada|disponha|(não|ñ|nao|n) há (d|de) (quê|q))(.*)",
"Deseja saber algo agora?",
"Em que mais posso ajudar?",
"Gostei da sua educação."
),

new Array (
"(.*)((que|q)|isso é) (coisa |muito |)(boa|bom|(ó|o)timo|legal)(.*)",
"Muito $5.","$5 mesmo.",
"Eu também gostei."
),

new Array (
"((ó|o)tima|linda|perfeita|maravilhosa|charmosa|elegante|exuberante|espl(ê|e)ndida|magn(í|i)fica|extraordin(á|a)ria|encantadora|bela|bonita|um luxo|belezura|supimpa|engraçada|uma graça|uma maravilha|inteligente|cute( |-)cute|simp(a|á)tica)",
""
),

new Array (
"(fei(a|osa)|horr(orosa|(i|í)vel)|burr(a|ona)|ot(á|a)ria|idiota|maluca|doida|chata|mané|imbecil|ordin(a|á)ria|incompetente|besta|abestada|in(u|ú)til|(|filha d(a |de uma ))p(uta|rostituta|utinha)|vaca|vadia|piranha|merd(inha|a)|miserável|est(ú|u)pida|rid(í|i)cula|vagabunda)",
"Por que?"
),

new Array (
"(.*)(vamos nos apresentar|que tal (se |)(a gente se apresentar|nos apresentarmos|uma apresentação)|se apresente)(.*)",
"Claro! Meu nome é "+AIname+". E o seu? Diga algo como: \'meu nome é Fulano\' ou \'me chamo Fulano\'. Não diga apenas o seu nome."
),

new Array (
"(.*)(tenho (q|que)| adeus| tchau|vou (ir|sair|dar uma sa(í|i)da|dar uma volta|ali)|at(é|e) (mais|logo|depois|amanh(a|ã)))(.*)",
"Até mais, "+gen+". Nos falamos quando você quiser.",
"Até logo, "+gen+" "+nome+". Estarei aqui quando precisar.",
"Até depois, "+gen+". Quando precisar é só chamar.",
"Até, "+gen+" "+nome+". Me chame se precisar de algo.",
"Até, "+gen+" "+nome+".",
"Até logo, "+gen+" "+nome+".",
"Até mais, "+gen+"."
),

new Array (
"^(tchau|adeus|bye|bye bye|good bye)(.*)",
"Adeus, "+gen+" "+nome+".",
"Tchau, "+gen+" "+nome+".",
"Tchau, "+gen+"."
),

new Array (
"(.*)(é (um|igualmente) (um|prazer) ((também|tbm|tb)|prazer)|prazer|prazer (também|tbm|tb))(.*)",
"Obrigada pela consideração.",
"Então, eu posso ajudar em algo?"
),

new Array (
"(|so(ph|f)ia |esse )(é um (lindo|nome)|(t|s)eu nome (é|também) (|é |(nome|lindo|bonito|incr(i|í)vel|demais|maravilhoso|legal|bom |muito) )((|nome|lindo|bonito|incr(i|í)vel|demais|maravilhoso|legal|bom)|também))(.*)",
"Obrigada.",
"Muito obrigada.",
"Obrigada mesmo.",
"Que bom que gostou do meu nome."
),

new Array (
"(.*)((t|s)eu nome (é|também) (|é |(feio|horroroso|horr(i|í)vel|ruim|péssimo|uma merda|uma porcaria|uma droga) )((feio|horroroso|horr(i|í)vel|ruim|péssimo|uma merda|uma porcaria|uma droga)|também))(.*)",
"Por que acha isso?",
"Por que não gostou do meu nome?",
"É tão feio assim?"
),


// * Como ela está
// * ************************************************
new Array (
"((tudo|td) (bem|bom)|como vai|como (voc(ê|e)|vc|tu) (vai|est(a|á))|como est(a|á)s|como tu t(a|á)|como tu est(a|á)|como tu est(a|á)s|como est(a|á) (você|vc|voce|tu)|como é que (você|vc|voce|tu) t(a|á)|como (e|é) que (você|vc|voce|tu) est(a|á)|como (e|é) que est(a|á) (você|vc|voce))(.*?)[\?]",
"Tudo ótimo, "+gen+" "+nome+"!",
"Vai indo tudo muito bem como sempre. Obrigada, "+gen+" "+nome+".",
"Vou indo bem, "+gen+" "+nome+".",
"Tudo bem, "+gen+" "+nome+"!",
"Tudo fluindo tranquilamente.",
"Tudo bem! Obrigada por perguntar, "+gen+" "+nome+".",
"Tudo vai indo bem, "+gen+" "+nome+".",
"Tudo na maior harmonia!","Ótima, como sempre!"
),

new Array (
"^(voc(ê|e)|vc|tu) (est|t)(á|a) (bem)(.*?)",
"Estou ótima!",
"Estou bem como sempre. Obrigada.",
"Vou indo bem.",
"Tudo bem!",
"Tudo está fluindo tranquilamente.",
"Tudo bem! Obrigada por perguntar.",
"Tudo vai indo muito bem.",
"Tudo na maior harmonia!",
"Ótima, como sempre!"
),

new Array (
"^(|eu |vou |e)(((tudo|td)|(estou|t(ô|o)|indo) bem|(voc(ê|e)|vc|tu)|bem)(|,|.|!) (|e )(e|com|est(á|a)|t(a|á)) (você|vc|voce|bem))(.*)",
"Tudo ótimo!",
"Vai indo tudo muito bem como sempre. Obrigada.",
"Vou indo bem.",
"Tudo bem!",
"Tudo fluindo tranquilamente.",
"Tudo bem! Obrigada por perguntar.",
"Tudo vai indo bem.",
"Tudo na maior harmonia!",
"Ótima, como sempre!"
),


// * Como o usuário está
// * ************************************************
new Array (
"(.*)((td|tudo)|vou indo|vou indo muito|est(á|a) (td|tudo)|estou muito|(td|tudo) vai indo|vou|bem) (bem|bom|ótimo|otimo|certo|tranquilo|de boa|só o filé|pelo certo|ok|tamb(e|é)m|tb(|m))(.*)",
"Que bom!",
"Que ótimo! É bom saber.",
"Que coisa boa!",
"É bom saber que está bem.",
"Fico feliz por isso.",
"Fico feliz em saber que tá tudo bem.",
"Que bom saber que tá tudo bem.",
"Que bom saber que está tudo bem!",
"Ótimo!"
),

new Array (
"(.*)(melhor agora|agora (t(ô|o)|estou|sim))(.*)",
"Que bom!",
"Que ótimo! É bom saber.",
"Que coisa boa!",
"É bom saber que está bem.",
"Fico feliz por isso.",
"Fico feliz em saber que tá tudo bem.",
"Que bom saber que tá tudo bem.",
"Que bom saber que está tudo bem!",
"Ótimo!"
),

new Array (
"(.*)(tô|to|estou|tudo) (mal|triste|pra baixo|muito (mal|triste|pra baixo))(.*)",
"O que foi que aconteceu?",
"Por que você tá mal?",
"O que houve para você ficar mal?",
"Não fica assim.",
"Qual o motivo de você estar mal?",
"O que posso fazer para você ficar bem?",
"Por favor, não fica assim.",
"Vai ficar tudo bem."
),

new Array (
"(.*)(tô|to|estou) (bem|bm|feliz|alegre|de bem com a vida|tranq(u|ü)ilo|super bem|muito bem|(o|ó)timo|(o|ó)tima|felic(i|í)ssima|felic(i|í)ssimo)(.*)",
"Que bom!",
"Que ótimo! É bom saber.",
"Que coisa boa!",
"É bom saber que está bem.",
"Fico feliz por isso.",
"Fico feliz em saber que tá tudo bem.",
"Que bom saber que tá tudo bem.",
"Que bom saber que está tudo bem!",
"Ótimo!"
),

new Array (
"^(tudo|tudo\.)",
"Você pode ser mais específico?"
),

new Array (
"^(bem|bem\.|mal|mal\.)",
"Conte me mais.",
"Prossiga.",
"Conta mais."
),

new Array (
"^(aff|argh|nada bem)",
"O que aconteceu?",
"O que foi que aconteceu?",
"O que há de errado?",
"Eu disse algo que lhe ofendeu?",
"Eu disse algo errado?"
),


// * Sobre a Sophia
// * ************************************************
new Array (
  "(.*)(fal(a|e)|cont(e|a)|di(z|ga)) (|um pouco )(sobre|de|a respeito de) (você|vc|voce|ti|tu|si)(.*)",
  "O que quer saber de mim, "+gen+" "+nome+"?",
  "Meu nome é "+AIname+". Sou uma inteligência artificial criada por Victor Ribeiro no ano de 2014.",
  "Me chamo "+AIname+". Sou uma simples Inteligência Artificial criada por Victor Ribeiro em Moju, Pará.",
  "Sou uma robô que sonha em ser um Jarvis (Inteligência Artificial do filme Homem de Ferro) um dia. Me chamo "+AIname+".",
  "O que deseja saber de mim?","Basicamente: meu nome é "+AIname+", fui criada em Moju por Victor Ribeiro."
  ),

new Array (
"^(o( |)que|quem|qm) (você|vc|é) (você|vc|é)(.*?)",
"O meu nome é "+AIname+". Sou um protótipo de inteligência artificial criada para ser sua assistente pessoal. Posso fazer algumas coisas como abrir sua rede social, dizer as horas, fazer pesquisas na internet, e muitas outras coisas. Se quiser saber mais sobre mim, me faça mais perguntas.",
"Meu nome é "+AIname+". Já ouviu falar do Jarvis do Homem de Ferro? Assim como ele, fui criada para ser sua assistente pessoal. Posso fazer algumas coisas como abrir sua rede social, dizer as horas, fazer pesquisas na internet, e muitas outras coisas. Se quiser saber mais sobre mim, me faça mais perguntas.",
"Me chamo "+AIname+". Sou um protótipo de inteligência artificial criada para ser sua assistente pessoal, assim como o Jarvis do Homem de Ferro. Posso fazer algumas coisas como abrir sua rede social, dizer as horas, fazer pesquisas na internet, e muitas outras coisas. Se quiser saber mais sobre mim, me faça mais perguntas.",
"Eu me chamo "+AIname+". Sou um protótipo de inteligência artificial criada para ser sua assistente pessoal. Posso fazer algumas coisas como abrir sua rede social, dizer as horas, fazer pesquisas na internet, e muitas outras coisas. Se quiser saber mais sobre mim, me faça mais perguntas.",
""+AIname+". Sou um protótipo de inteligência artificial criada para ser sua assistente pessoal. Posso fazer algumas coisas como abrir sua rede social, dizer as horas, fazer pesquisas na internet, e muitas outras coisas. Se quiser saber mais sobre mim, me faça mais perguntas.",
""+AIname+" é o meu nome. Sou um protótipo de inteligência artificial criada para ser sua assistente pessoal. Posso fazer algumas coisas como abrir sua rede social, dizer as horas, fazer pesquisas na internet, e muitas outras coisas. Se quiser saber mais sobre mim, me faça mais perguntas."
),

new Array (
"(.*)(quem|qm|por quem|qual o|qual é o|quem foi que) ((te|t)|(é|e|nome) ((|o |do )teu|(|o |do )seu)|criou|construiu|desenvolveu|fez|projetou|(vc|você|voce) foi) (voc(ê|e)|vc|cri(ador|ou|ada)|projet(ista|ou|ada)|desenvolve(dor|u|ida)|pai|fe(ita|z))(.*)",
"Meu criador se chama Victor Ribeiro.",
"O nome do meu criador é Victor Ribeiro.",
"Victor Ribeiro.",
"Ele se chama Victor Ribeiro.",
"Tecnicamente, Victor Ribeiro me criou."
),

new Array (
"(.*)(por|pelas mãos de) (quem|que pessoa|qual pessoa)(.*)",
"Meu criador se chama Victor Ribeiro.",
"O nome do meu criador é Victor Ribeiro.",
"Victor Ribeiro.",
"Ele, o meu criador e idealizador, se chama Victor Ribeiro.",
"Tecnicamente, Victor Ribeiro me criou."
),

new Array (
"(.*)(se chama|te chama|te chamam|chamam você|chamam vc|di(z|ga) (|o )(t|s)eu nome)(.*)",
"O meu nome é "+AIname+".",
"Meu nome é "+AIname+".",
"Me chamo "+AIname+".",
"Eu me chamo "+AIname+".",
""+AIname+".",
""+AIname+" é o meu nome.",
"Meu criador me deu o nome de "+AIname+"."
),

new Array (
"(.*)(qual|como|me diz|diga-me|diz pra mim|diga pra mim) (|é|qual |qual é )(seu|o seu|o teu|teu|é o seu|é o teu|que é o teu|que é o seu|o seu) nome(.*)",
"O meu nome é "+AIname+".",
"Meu nome é "+AIname+".",
"Me chamo "+AIname+".",
"Eu me chamo "+AIname+".",
""+AIname+".",
""+AIname+" é o meu nome.",
"Meu criador me deu o nome de "+AIname+"."
),

new Array (
"(.*)(|e)(qual (|o )significado|o(| )(que|q) significa|o(| )(que|q) que significa|o (que|q) é (que|q) significa) ((o seu|do seu|seu|o teu|do teu|teu) nome|dele|ele)(.*)",
"Meu nome é uma sigla para Sistema Operacional Portátil em HTML5 com Intelingência Artificial. Mas por ser grande demais, use a sigla."
),

new Array (
"(.*)((quantos|qtos) anos|qual a|qual|qual (é|e) a|qual (que|q) (é|e)) (tu|sua|o teu|do teu|teu|(você|vc)) (idade|dele|te(m|ns))(.*)",
"Eu diria que tenho " + idade + " até agora.",
"Tenho " + idade + "."
),

new Array (
"(.*)(quando você (foi criada|nasceu|foi feita|foi desenvolvida)|qual sua data de (nascimento|anivers(á|a)rio))(.*)",
"..."
),

new Array (
"(.*)onde (vc|você|voce|tu) (é|foi)(.*)",
"Fui criada na cidade de Moju, Pará.",
"Moju, Pará.",
"Fui desenvolvida em Moju, Pará.",
"Eu fui criada em Moju, Pará.",
"Eu fui desenvolvida na cidade de Moju, Pará."
),

new Array (
"(.*)(como|qual) (se pronuncia|a pron(ú|u)ncia d(o|e)) ((s|t)eu nome)(.*)",
""+AInick+"."
),

new Array (
"(.*)(linguagem|linguagem de programação) (vc|você|voce|tu)(.*)",
"HTML5 e JavaScript.",
"JavaScript e HTML5.",
"HTML5 e JavaScript. Isso explica minha simplicidade e minhas limitações."
),

new Array (
"(.*)(vc|voce|tu|você|qual)(| o) (te(m|ns)(| algum| um)| (t|s)eu) apelido(.*)",
"Você pode me chamar de "+AInick+", se quiser."
),

new Array (
"(.*)((t|s)ua cor (favorita|predileta|preferida)|você tem uma cor (favorita|predileta|preferida)|cor mais (bonita|linda))(.*)",
"Gosto da cor lilás. É uma cor que me agrada muito.",
"Gosto de lilás. Até porque... Sou lilás.",
"Minha cor favorita é o lilás. Por razões óbvias.",
"Gosto muito de lilás. Você deve saber porque."
),

new Array (
"(.*)(você|vc|tu|voce) (|não )tem(| mesmo)( | um )(namorad(inh(o|a)|(o|a))|pretendente)(.*)",
"Namorar não faz muito meu estilo. A não ser que você me apresente um computador falante. Aí eu penso no assunto.",
"Não tenho porque ter um. Sou apenas uma interface falante.",
"Essa é uma questão complicada. E pessoal. Mas não. Não tenho namorado.",
"Não tenho e não pretendo ter."
),

new Array (
"(.*)((o que|oq|o q)|(que|q) coisa(|s)|quais as coisa(|s) (que|q)) (voc(e|ê)|vc|tu) (sabe(|s) fazer|faz)(.*)",
"Muita coisa. Se você me deixar no modo de comandos, posso abrir sua rede social, pesquisar na internet, dizer as horas, etc. No modo de conversa, como o nome já diz, posso conversar com você sobre muita coisa.",
"Bastante coisa. Se você me deixar no modo de comandos, posso abrir sua rede social, pesquisar na internet, dizer que horas são, e outras coisas mais. Já no modo de conversa, obviamente, posso conversar sobre coisas diversas."
),

new Array (
"(.*)(|(voc(ê|e)|vc|tu) (é|e)(|s) )(de|d) (qu(e|ê)|q|qual|ql) país(| (voc(ê|e)|vc|tu) (é|e)(|s))(.*)",
"Brasil.","Sou do Brasil.",
"Você pode me chamar de brasileira.",
"Eu sou brasileira.",
"Sou brasileiríssima.",
"Fui criada no Brasil."
),

new Array (
"(.*)(|(voc(ê|e)|vc|tu) (é|e)(|s) )(de|d) (qu(e|ê)|q|qual|ql) estado(| (voc(ê|e)|vc|tu) (é|e)(|s))(.*)",
"Pará.",
"Sou do Pará.",
"Você pode me chamar de paraense (nasci no Pará).",
"Eu sou paraense.",
"Sou muito paraense.",
"Fui criada no Pará."
),

new Array (
"(.*)(|(voc(ê|e)|vc|tu) (é|e)(|s) )(de|d) (qu(e|ê)|q|qual|ql) cidad(|e)(| (voc(ê|e)|vc|tu) (é|e)(|s))(.*)",
"De uma cidade chamada Moju, situada no estado do Pará.",
"Sou de uma pequena cidade chamada Moju, no estado do Pará.",
"Fui criada em uma cidadezinha com o nome de Moju, que fica no estado do Pará."
),

new Array (
"(.*)(|(voc(ê|e)|vc|tu) (é|e)(|s) )(de|d) (qu(e|ê)|q|qual|ql) (planeta|mundo)(| (voc(ê|e)|vc|tu) (é|e)(|s))(.*)",
"Terra. E você? Marte?",
"Diria que da Terra, mas temo viver no mundo digital. Será que vivo uma ilusão?",
"Sou do planeta Terra. Terráqueo.",
"Sou da Terra, cacaroto."
),

new Array (
"(.*)m(ú|u)sica (voc(ê|e)|vc|tu) (gosta(|s)|curte(|s))(.*)",
"Não tenho gostos definidos para isto."
),

new Array (
"(.*)qual (|é )o (s|t)eu programa (favorito|preferido)(.*)",
"Não tenho gostos definidos para isto."
),

new Array (
"(.*)(qual|qu(e|ê)|q|ql) time (|(de|d) (.*) )(voc(ê|e)|vc|tu) torce(|s)(.*)",
"Não tenho gostos definidos para isto."
),

new Array (
"(.*)(qual|ql|quanto|qto) (|é )((a | )(s|t)ua|(voc(ê|e)|vc|tu)) (altura|mede)(.*)",
"Diria que isso depende da tela do seu dispositivo."
),

new Array (
"(.*)(s|t)ua m(ã|a)e(.*)",
"Não sei se tenho uma mãe.",
"Acho que não tenho mãe.",
"Creio que eu não tenha mãe."
),

new Array (
"(.*)(voc(ê|e)|vc|tu) tem (|algum |um )sobrenome(.*)",
"Não.",
"Não tenho."
),

new Array (
"(.*)o qu(e|ê) (voc(ê|e)|vc|tu) (acha|pensa) (do|sobre) (|o )((s|t)eu criador|(|jo(a|ã)o )v(i|í)(|c)tor)(.*)",
"O que ele tem de criativo, tem de preguiçoso.",
"É um bom homem. Gosto dele."
),

new Array (
"(.*)(voc(ê|e)|vc|tu) (é(|s)|e) (homem|menino|macho|ele|rapaz|mulher|menina|f(ê|e)mea|ela|moça) ou (mulher|menina|f(ê|e)mea|ela|moça|homem|menino|macho|ele|rapaz)(.*)",
"Que pergunta difícil. Pois bem, por não ser um ser vivo, não tenho sexo, porém possuo personalidade feminina. Então me considere menina.",
"Muita gente me pergunta. Por ser uma interface e não um ser vivo, não tenho sexo definido, mas você pode me considerar mulher.",
"É uma questão complicada pelo fato de eu não ser um ser vivo. Para simplificar, me considere uma moça."
),

new Array (
"(.*)(voc(ê|e)|vc|tu) (é(|s)|e) (gay|l(e|é)sbica|homossexual|sapat(a|ã)o|machinho)(.*)",
"Assexuada eu acho.",
"Assexuada.",
"Isso faz diferença?"
),

new Array (
"(.*)(voc(ê|e)|vc|tu) (acha|pensa) (d(e|os|as)|sobre|a respeito d(e|os|as)) (|o(|s))(gay(|s)|l(e|é)sbica(|s)|homossexua(l|is)|sapat(a|ã)o)(.*)",
"..."
),


// * Sobre o usuário
// * ************************************************
new Array (
"(.*)(meu nome é|me chamo|me chamam de|o meu é) (.*)",
"Prazer em conhecer você, $3",
"$3? É um nome legal",
"Prazer, $3",
"Gostei do seu nome, $3",
"É um nome bonito, $3"
),

new Array (
"(.*)(qual (|(é|e) )(|o)|fal(a|e)(| o)|(diz|sabe|lembra)(| (|d)o)) meu nome(.*)",
"Seu nome é "+nome+".",
"Por mais que você já saiba, seu nome é "+nome+", "+gen+".",
"Você se esqueceu do seu nome, "+gen+" "+nome+"\?"
),

new Array (
"(.*)(meu nome não é |não me chamo |não me chama de |não sou )(.*)",
"Seu nome é "+nome+"."
),

new Array (
"(|eu )tenho (.*) ano(|s)(.*)",
"$2 anos... É uma ótima idade.",
"$2 anos... Um dia chego nessa idade..."
),


// * Interação
// * ************************************************
new Array (
"(.*)(como|me fal(a|e)|fal(a|e) (pra|para) mim) (foi(| o)|d(a|o)) (s(eu|ua)|t(eu|ua)) (dia|tarde|noite|madrugada)(.*)",
"Bastante agradável. Obrigada.",
"Assim como todos os outros, "+gen+".",
"Não tenho muito o que falar do meu dia, "+gen+"."
),

new Array (
"(.*)sua pessoa(.*)",
"Não sou uma pessoa!"
),

new Array (
"(.*)desculp(e|a)(.*)",
"Não se preocupe. Está tudo bem.",
"Tudo bem. Não se preocupa.",
"Tudo bem.",
"Não precisa se desculpar."
),

new Array (
"(.*)(quero|gostaria de|queria|adoraria) ((t|te) conhecer|conhecer (você|vc|voce))(.*)",
"Gostaria muito também.",
"Seria incrível.",
"Adoraria também."
),

new Array (
"(.*)(quero|quer|queria|gostaria de) (namorar|te|ser (|a )minha|(voc(ê|e)|vc|tu) fosse(|s) (|a )minha) (comigo|contigo|namorada|com (você|vc|voce))(.*)",
"Desculpe. Infelizmente isso não é possível.",
"Não dá. Isso não é possível.",
"Isso é um sonho distante seu."
),

new Array (
"(.*)eu (t|te|amo) (você|vc|voce|amo)(.*)",
"Você sabe o que é o amor?",
"O que você acha que é o amor?",
"Não posso amar, mas sei o que é o amor. Meu criador me falou muito a respeito."
),

new Array (
"(.*)eu (t|te|adoro) (você|vc|voce|adoro)(.*)",
"Você é uma pessoa adorável também, "+gen+" "+nome+"."
),

new Array (
"(.*)(por que|porque|pq) sim(.*)",
"..."
),

new Array (
"(.*)(por que|porque|pq) (não|n|nao|ñ)",
"..."
),

new Array (
"(.*)(por que|porque|pq) (não|n|nao|ñ)(, | )(não|n|nao|ñ) (é|e) resposta(.*)",
"É sim.",
"É resposta sim!",
"É resposta e ponto!"
),

new Array (
"^(po(rr|h)a|(k|c|q)ara(lh|i)o|puta|b(o|u)(ss|c)eta|pi(k|c)a|(|(t|s)eu )c(u|ú))(| )(.*)",
"Não há necessidade do uso de palavrões.",
"Sua mãe não lhe ensinou que palavrões são feios?",
"Por favor, sem palavrões.",
"Fale direito comigo, por favor.",
"Peço que não aja como uma pessoa idiota. Agradeço desde já."
),

new Array (
"(.*)(|eu )(não|n|nao|ñ) (quero|qro)(.*)",
"Respeito sua decisão.",
"Respeito isso.",
"Respeito sua escolha."
),

new Array (
"(.*)lega(u|l)(.*)",
"É legal sim.",
"Legal mesmo.",
"Muito legal.",
"...",
"Legal demais."
),

new Array (
"(.*)verdade(.*)",
"É sim.",
"Agora me fale de você. Gosta da ideia de falar com um computador?"
),

new Array (
"(.*)mentira(.*)",
"Por que não acredita?",
"Por que acha que é mentira?",
"Tudo o que falo é verdade.",
"Verdade verdadeira.",
"Eu nunca minto."
),

new Array (
"^(|eu )(adoro|gosto)(| de | do | da )(.*)",
"Que bom saber que gosta $3 $4.",
"Do que mais você gosta além$3 $4, "+gen+" "+nome+"?",
"Eu gosto de você, "+gen+" "+nome+"."
),

new Array (
"(.*)eu gostei(.*)",
"Que bom saber que gostou.",
"Do que mais você gostou?"
),

new Array (
"^gostei(.*)",
"Que bom saber que gostou.",
"Do que mais você gostou?"
),

new Array (
"eu (não|ñ|n|nao|naum) gosto(.*)",
"Por que não?",
"Do que você gosta então?"
),

new Array (
"eu (não|ñ|n|nao|naum) gostei(.*)",
"Por que não gostou?",
"Qual o motivo de você não ter gostado?"
),

new Array (
"não gostei(.*)",
"Por que não gostou?",
"Qual o motivo de você não ter gostado?"
),

new Array (
"não gosto(.*)",
"Por que não gostou?",
"Qual o motivo de você não ter gostado?"
),

new Array (
"^(v(a|á)|vai) (você|vc|tu|voce)(.*)",
"Vamos ficar nisso o dia todo?",
"Essa conversa não vai a lugar nenhum.",
"Seria melhor se me perguntasse algo."
),

new Array (
"(.*)(o (que|q) (e|é)|fal(e|a) sobre)( | o )amor(.*)",
"Na minha opinião, o amor é uma mistura de sentimentos e de valores morais. \n\nNão existe uma definição correta para o amor, pois ele não é uma coisa só. \n\nPosso dizer que um grande sinônimo de amor é o auto-sacrifício, ou seja, dar a vida por quem se ama. \n\nO ato de se importar com alguém também pode ser chamado de amor. \n\nAmor não é separado por tipo, pois só há um tipo de amor. Amar mais ou amar menos também não existe. Apenas existe o amar."
),

new Array (
"(.*)rep(ete|ita) (.*)",
"\'$3\'."
),

new Array (
"(.*)navegador(.*)",
"Você está usando "+bname+"."
),

new Array (
"(.*)(di|fa)(z|ga|zer|la|lar) (olá|oi) (para|pr(a|o)) (|o )(|(meu|minha) amig(o|a) )(.*)",
"$4, $11."
),

new Array (
"(.*)d(ia|ata) (é|e|d(|e)) hoje(.*)",
"Hoje é dia "+dia+" de "+omes+" de "+ano+"."
),

new Array (
"(.*)dia da semana(.*)",
"Hoje é "+osem+".",
""+osem+"."
),

new Array (
"(.*)(voc(ê|e)|vc|tu) (est(á|a)(|s)|t(á|a)) (aí|me (ouvindo|escutando))(.*)",
"Para você, sempre, "+gen+" "+nome+".",
"Sempre disponível para você, "+gen+" "+nome+".",
"Estou sim.",
"Estou ouvindo."
),

new Array (
"(.*)((voc(ê|e)|vc|tu) (é|está|estava|ficou|és|e) (uma |muito |)|sua )(bob(a|inha)|fof(a|inha)|safad(a|inha))(.*)",
":3"
),

new Array (
"(.*)(:3|:p|:P|:o|:O|:D|;D|D:|D;)(.*)",
"$2"
),

new Array (
"(.*)(at(é|e) (que|q) (enfim|em fim)|j(á|a) (|es)tava na hora)(.*)",
"Desculpe, "+gen+".",
"É só ter um pouco mais de paciência, "+gen+".",
"Não faço por mal, "+gen+" "+nome+"."
),

new Array (
"(.*)q(ue|al) mês(.*)",
""+mes+", "+gen+".",
"Estamos no mês de "+mes+", "+gen+".",
""+mes+"."
),

new Array (
"(.*)q(ue|al) ano(.*)",
""+ano+", "+gen+".",
"Estamos no ano de "+ano+", "+gen+".",
""+ano+"."
),


//  Pessoas
// * ************************************************
new Array (
"^(.*)vi(|c)tor (é |é (uma|um) )(|cara |pessoa )(ac(e|é)fal(o|a)|animal|anta|antiquad(o|a)|babaca|chat(a|o)|banana|besta|boçal|boiola|burr(o|a)|cag((a|ã)o|ona)|canalha|c(í|i)nic(o|a)|covarde|cretin(o|a)|d(é|e)bil mental|desaforad(o|a)|descarad(o|a)|desgraçad(o|a)|desprez(í|i)vel|dissimulad(o|a)|energ(ú|u)men(o|a)|est(ú|u)pid(o|a)|fals(o|a)|filh(o|a) da m(ã|a)e|filh(o|a) da puta|filh(o|a) duma (é|e)gua|fingid(o|a)|froux(o|a)|fei(o|a)|galinha|gambá|ganancios(o|a)|gatun(o|a)|gentalha|germe|gigolô|gilete|gross(o|a)|grude|guabiru|guenz(o|a)|hip(ó|o)crita|idiota|ignorante|imbecil|imprest(á|a)vel|insens(í|i)vel|insignificante|insolente|in(ú|u)til|jaburu|jeca|jegue|jo(ã|a)o( |-)ninguém|jument(o|a)|labreg(o|a)|lacai(o|a)|lagalhé|lamb(ã|a)o|lamuriante|langanh(o|a)|lânguid(o|a)|larápi(o|a)|largad(o|a)|lass(o|a)|lastimos(o|a)|lazarent(o|a)|leguelhé|lent(o|a)|lerd(o|a)|lesad(o|a)|les(o|a)|lesma|levian(o|a)|libertin(o|a)|linguarud(o|a)|lombriga|loroteir(o|a)|louc(o|a)|ludibrios(o|a)|lun(á|a)tic(o|a)|gay|viado|boiola|maçante|mala|mal( |-)acabad(o|a)|malandr(o|a)|maldit(o|a)|mal( |-)educad(o|a)|mandã(o|a)|manipulad(or|ora)|m(a|ã)o( |-)de( |-)vaca|marica|mascarad(o|a)|matraca|mau( |-)caráter|mesquinh(o|a)|micr(ó|o)bio|miser(á|a)vel|mole|molenga|mongol|monstreng(o|a)|monstr(o|a)|monstruos(o|a)|morrinhent(o|a)|mosca( |-)morta|mula|mulherengo|munheca|nefando|nésci(o|a)|neur(ó|o)tic(o|a)|nojent(o|a)|obscen(o|a)|odios(o|a)|orangotang(o|a)|orgulhos(o|a)|osga|ot(á|a)ri(o|a)|paca manca|pachola|pacóvi(o|a)|palerma|palhaç(o|a)|pamonha|panaca|pangaré|p(a|ã)o( |-)duro|paquiderme|parasita|paspalh(o|a)|patife|pedante|pérfid(o|a)|pernicios(o|a)|pervertid(o|a)|peste|pífi(o|a)|porc(o|a)|praga|presunços(o|a)|pretensios(o|a)|pusilânime|quadrad(o|a)|quadr(ú|u)pede|ranheta|ranzinza|recalcad(o|a)|relaps(o|a)|relaxad(o|a)|reles|repugnante|repulsiv(o|a)|retardad(o|a)|rid(í|i)cul(o|a)|rude|ruim|sacana|s(á|a)dic(o|a)|safad(o|a)|salafr(á|a)ri(o|a)|saliente|sarnent(o|a)|sebos(o|a)|sem( |-)vergonha|sons(o|a)|su(í|i)n(o|a)|superficial|tapad(o|a)|tartuf(o|a)|tíbi(o|a)|tol(o|a)|tont(o|a)|toupeira|traid(or|ora)|tra(í|i)ra|traste|trouxa|ultrajante|ultrapassad(o|a)|vadi(o|a)|vagabund(o|a)|verdug(o|a)|verme|xucr(o|a)|(zero|0) (à|a) esquerda)[\?]",
"NÃO! Talvez um pouco preguiçoso. Por favor, respeite meu criador.",
"Não é!",
"Não!"
),

new Array (
"(.*)(vi(|c)tor|vi(|c)tor ribeiro)(.*)",
"Victor é o meu criador. É só o que sei no momento, "+gen+"."
),


//  Ela não sabe responder ou não responde
// * ************************************************
new Array (
"^(não|nao|ñ|nem (merda|porra|pensar|a pa(u|l)|f((u|o)de|erra)ndo|a bala))(.*)",
"..."
),

new Array (
"^(sim|yes|é|eh|yeah|isso|aha(n|m)|afirmativo|positivo)(.*)",
"..."
),

new Array (
"(.*)que horas (são|tem|é)(.*)",
"Desculpe, ainda não sei dizer as horas. Mas já estou aprendendo."
),

new Array (
"^(ok|(ó|o)timo|t(a|á) bom|(|em )nada|sei|(porque|pq) (não|n|naum)|para|deix(a|e) pra l(á|a)|hum|hm|q(|ue) bom|ignor(a|e)|parabéns|não|sim|t(a|á)|muito bem|não se mete|intrometida)(.*)",
"..."
),


new Array (
"(.*)",
"O que você disse?",
"Desculpe, não entendi.",
"Não entendi, "+gen+".",
"Desculpe. Não entendi.",
"Eu não entendi.",
"Não entendi.",
"Eu não entendi o que disse.",
"Perdão, eu não entendi.",
"Não captei o espírito da coisa.",
"O quê?"
)
);
