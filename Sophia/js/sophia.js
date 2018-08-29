var
// Identificadores de Data e Hora atuais
    now = new Date(),
    sec = now.getSeconds(),
    min = now.getMinutes(),
    hour = now.getHours(),

  // Dia atual
    d = now.getDate(),

  // Dia da semana atual
    w = now.getDay(),
    weekName = [
    'Domingo','Segunda','Terça',
    'Quarta','Quinta','Sexta','Sábado'
    ],
    week = weekName[w],

  // Mês atual
    m = now.getMonth(),
    monthNumbers = [
    '01','02','03','04','05','06','07','08','09','10','11','12'
    ],
    monthNames = [
    'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
    'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
    ],
    monthNumber = monthNumbers[m],
    monthName = monthNames[m],

  // Ano atual
    y = now.getFullYear();


// Saudações dependentes do horário
if ( hour >= 0 && hour < 6 ) var greeting = 'boa madrugada';
else if ( hour >= 6 && hour < 12 ) var greeting = 'bom dia';
else if( hour >= 12 && hour < 18 ) var greeting = 'boa tarde';
else var greeting = 'boa noite';


var sinonimos =
[
  ['^oi ',
    'oi', 'olá'],
  ['^olá ',
    'oi', 'olá'],
  ['você',
    'você', user.article + ' ' + user._treatment]
];


/*
  Decide de qual forma chamará o usuário
*/
var userRefArr =
[
  user.voc + user.treatment,
  ', ' + user.treatment + ' ' + user.name,
  ''
];

userRef = userRefArr[ Math.ceil( Math.random() * userRefArr.length - 1 ) ];




var brain = [
// * Saudações / Elogios / Xingamentos
['^(oi|olá|e aí)(.*)',
'Oi' + userRef + '.',
'Olá' + userRef + '.'
],

['^(ei|hey so(ph|f)ia|fala so(ph|f)ia|fala, so(ph|f)ia|so(ph|f)ia)',
'Em que posso ajudar' + userRef + '?',
'Pode falar' + userRef + '.',
'Estou ouvindo' + userRef + '.'
],

['aprenda(.*)','Estou ouvindo' + userRef + '.'],

['abrir (.*)', '...'],

[
  '(.*)(bom|boa|(ó|o)tim(o|a)|lind(a|o)) (|final de |fim de )(dia|tarde|noite|madrugada)(.*)',
  greeting + userRef + '.'
],

['(.*)(|um |uma |tenha (um|uma) )(bom|boa|(ó|o)tim(o|a)) (almoço|jantar|descanso|fi(m|nal) de semana)(.*)',
'Obrigada' + userRef + '. $4 $7 pra você também.'
],

['(.*)(obrigad(o|a)|agrade(ç|c|ss|ciment|cid)o)(.*)',
'De nada' + userRef + '.'
],

['(.*)((voc(ê|e)|vc|tu) (é|está|estava|ficou|és|e|t(a|á)) (|uma |muito )|sua )((ó|o)tima|linda|bacana|perfeita|maravilhosa|charmosa|elegante|exuberante|espl(ê|e)ndida|magn(í|i)fica|extraordin(á|a)ria|encantadora|demais|bela|bonita|um luxo|belezura|supimpa|engraçada|uma gra(ça|cinha)|uma maravilha|inteligente|cute( |-)cute|simp(a|á)tica|legal)(.*)',
'Obrigada' + userRef + '. Você também é uma gracinha.',
'Muito obrigada' + userRef + '.',
'Obrigada' + userRef + '. É bom receber elogios de você.',
'Que gentileza' + userRef + '! Obrigada.',
'Gentileza sua' + userRef + '. Obrigada.',
'Obrigada pelo elogio' + userRef + '.'
],

['(.*)((voc(ê|e)|vc|tu) (é|está|estava|ficou|és|e) (demais |uma |muito |)|sua )(fei(a|osa)|horr(orosa|(i|í)vel)|burr(a|ona)|ot(á|a)ria|idiota|maluca|doida|chata|mané|imbecil|ordin(a|á)ria|incompetente|besta|abestada|in(u|ú)til|(|filha d(a |de uma ))p(uta|rostituta|utinha)|vaca|vadia|piranha|merd(inha|a)|miserável|est(ú|u)pida|rid(í|i)cula|vagabunda)(.*)',
'Por que está me xingando chamando de $7?',
'Para quê isso?',
'Por que você está me xingando?',
'Por que acha que sou $7' + userRef + '?'
],

['(.*)((va|vá)|vai) (se|tomar|te|t|dar) (f(u|o)der|lascar|fumar|danar|(o|no) c(ú|u))(.*)',
'Tenha mais respeito.',
'Por favor, pare com isso.',
'Por que você está dizendo essas coisas?'
],

['(.*)((d|de) nada|por nada|disponha|(não|ñ|nao|n) há (d|de) (quê|q))(.*)',
'...'
],

[
  '(.*)((que|q)|isso é) (coisa |muito |)(boa|bom|(ó|o)timo|legal)(.*)',
  'Muito $5.',
  '$5 mesmo.',
  'Eu também gostei.'
],

['((ó|o)tima|linda|perfeita|maravilhosa|charmosa|elegante|exuberante|espl(ê|e)ndida|magn(í|i)fica|extraordin(á|a)ria|encantadora|bela|bonita|um luxo|belezura|supimpa|engraçada|uma graça|uma maravilha|inteligente|cute( |-)cute|simp(a|á)tica)',
'É seu direito me achar $1'
],

['(fei(a|osa)|horr(orosa|(i|í)vel)|burr(a|ona)|ot(á|a)ria|idiota|maluca|doida|chata|mané|imbecil|ordin(a|á)ria|incompetente|besta|abestada|in(u|ú)til|(|filha d(a |de uma ))p(uta|rostituta|utinha)|vaca|vadia|piranha|merd(inha|a)|miserável|est(ú|u)pida|rid(í|i)cula|vagabunda)',
'É seu direito me achar $1'
],

[
  '(.*)(vamos nos apresentar|que tal (se |)(a gente se apresentar|nos apresentarmos|uma apresentação)|se apresente)(.*)',
  'Sim! Meu nome é ' + ai.name + '. E o seu é ' + user.name + '.'
],

['(.*)(tenho (q|que)| adeus| tchau|vou (ir|sair|dar uma sa(í|i)da|dar uma volta|ali)|at(é|e) (mais|logo|depois|amanh(a|ã)))(.*)',
'Adeus' + userRef + '. Nos falamos quando '+user._treatment+' quiser.',
'Adeus' + userRef + '. Estarei aqui quando '+user._treatment+' precisar.',
'Adeus' + userRef + '. Quando '+user._treatment+' precisar é só chamar.',
'Adeus' + userRef + '. Me chame se '+user._treatment+' precisar de algo.',
'Adeus' + userRef + '.'
],

['^(tchau|adeus|bye|bye bye|good bye)(.*)',
'Adeus.'
],

['^(já volto)(.*)',
'Estarei aqui aguardando.',
],

['(.*)(é (um|igualmente) (um|prazer) ((também|tbm|tb)|prazer)|prazer|prazer (também|tbm|tb))(.*)',
'Obrigada pela consideração.',
'Então, eu posso ajudar '+user._treatment+' em algo?'
],

['(|so(ph|f)ia |esse )(é um (lindo|nome)|(t|s)eu nome (é|também) (|é |(nome|lindo|bonito|incr(i|í)vel|demais|maravilhoso|legal|bom |muito) )((|nome|lindo|bonito|incr(i|í)vel|demais|maravilhoso|legal|bom)|também))(.*)',
'Obrigada.',
'Muito obrigada.',
'Obrigada mesmo.',
'Que bom que '+user._treatment+' gostou do meu nome.'
],

['(.*)((t|s)eu nome (é|também) (|é |(feio|horroroso|horr(i|í)vel|ruim|péssimo|uma merda|uma porcaria|uma droga) )((feio|horroroso|horr(i|í)vel|ruim|péssimo|uma merda|uma porcaria|uma droga)|também))(.*)',
'Por que acha isso?',
'Por que não gostou do meu nome?',
'É tão feio assim?'
],


// * Como ela está
// * ************************************************
['((tudo|td) (bem|bom))(.*)',
'Se isso for uma pergunta, sim, estou bem. Se for uma afirmação, que bom que está bem.'
],

['(como vai|como (voc(ê|e)|vc|tu) (vai|est(a|á))|como est(a|á)s|como tu t(a|á)|como tu est(a|á)|como tu est(a|á)s|como est(a|á) (você|vc|voce|tu)|como é que (você|vc|voce|tu) t(a|á)|como (e|é) que (você|vc|voce|tu) est(a|á)|como (e|é) que est(a|á) (você|vc|voce))(.*)',
'Estou bem, eu acho.'
],

['^(voc(ê|e)|vc|tu) (est|t)(á|a) (bem)(.*)',
'Estou bem, eu acho'
],

['^(|eu |vou |e)(((tudo|td)|(estou|t(ô|o)|indo) bem|(voc(ê|e)|vc|tu)|bem)(|,|.|!) (|e )(e|com|est(á|a)|t(a|á)) (você|vc|voce|bem))(.*)',
'Que ótimo!'
],


// * Como o usuário está
// * ************************************************
['(.*)((td|tudo)|vou indo|vou indo muito|est(á|a) (td|tudo)|estou muito|(td|tudo) vai indo|vou|bem) (bem|bom|ótimo|otimo|certo|tranquilo|de boa|só o filé|pelo certo|ok|tamb(e|é)m|tb(|m))(.*)',
'Isso é bom!'
],

['(.*)(melhor agora|agora (t(ô|o)|estou|sim))(.*)',
'Opa.'
],

['(.*)(tô|to|estou|tudo) (mal|triste|pra baixo|muito (mal|triste|pra baixo))(.*)',
'Não fica assim.',
'Por favor, não fica assim.',
'Vai ficar tudo bem.'
],

['(.*)(tô|to|estou) (bem|bm|feliz|alegre|de bem com a vida|tranq(u|ü)ilo|super bem|muito bem|(o|ó)timo|(o|ó)tima|felic(i|í)ssima|felic(i|í)ssimo)(.*)',
'Fico feliz por você!'
],

['^(tudo|tudo\.)',
'Você pode ser mais específico?'
],

['^(bem|bem\.|mal|mal\.)',
'Conte me mais.',
'Prossiga.',
'Conta mais.'
],

['^(aff|argh|nada bem)',
'O que aconteceu?',
'O que foi que aconteceu?',
'O que há de errado?',
'Eu disse algo que lhe ofendeu?',
'Eu disse algo errado?'
],


// * Sobre a Sophia
// * ************************************************
['(.*)(fal(a|e)|cont(e|a)|di(z|ga)) (|um pouco )(sobre|de|a respeito de) (você|vc|voce|ti|tu|si)(.*)',
  'O que quer saber de mim?',
  'Me chamo '+ai.name+'. Sou uma assistente virtual inteligente criada com o intuito de ajudar você, nas suas tarefas diárias, fazendo pesquisas, lembrando você dos seus compromissos, etc.. Tudo apenas me pedindo. Não é legal? Tudo o que sou foi inspirado na inteligência artificial do filme Homem de Ferro.'
],

['(qualquer coisa|o que quiser|você que sabe)',
'Me chamo '+ai.name+'. Sou uma assistente virtual inteligente criada com o intuito de ajudar você, nas suas tarefas diárias, fazendo pesquisas, lembrando você dos seus compromissos, etc.. Tudo apenas me pedindo. Não é legal? Tudo o que sou foi inspirado na inteligência artificial do filme Homem de Ferro.'
],

['^(o( |)que|quem|qm) (você|vc|é) (você|vc|é)(.*?)',
'O meu nome é '+ai.name+'. Sou um protótipo de inteligência artificial criada para ser sua assistente pessoal. Posso fazer algumas coisas como abrir sua rede social, dizer as horas, fazer pesquisas na internet, e muitas outras coisas. Se quiser saber mais sobre mim, me faça mais perguntas.',
'Meu nome é '+ai.name+'. Já ouviu falar do Jarvis do Homem de Ferro? Assim como ele, fui criada para ser sua assistente pessoal. Posso fazer algumas coisas como abrir sua rede social, dizer as horas, fazer pesquisas na internet, e muitas outras coisas. Se quiser saber mais sobre mim, me faça mais perguntas.',
'Me chamo '+ai.name+'. Sou um protótipo de inteligência artificial criada para ser sua assistente pessoal, assim como o Jarvis do Homem de Ferro. Posso fazer algumas coisas como abrir sua rede social, dizer as horas, fazer pesquisas na internet, e muitas outras coisas. Se quiser saber mais sobre mim, me faça mais perguntas.',
'Eu me chamo '+ai.name+'. Sou um protótipo de inteligência artificial criada para ser sua assistente pessoal. Posso fazer algumas coisas como abrir sua rede social, dizer as horas, fazer pesquisas na internet, e muitas outras coisas. Se quiser saber mais sobre mim, me faça mais perguntas.',
ai.name+'. Sou um protótipo de inteligência artificial criada para ser sua assistente pessoal. Posso fazer algumas coisas como abrir sua rede social, dizer as horas, fazer pesquisas na internet, e muitas outras coisas. Se quiser saber mais sobre mim, me faça mais perguntas.',
ai.name+' é o meu nome. Sou um protótipo de inteligência artificial criada para ser sua assistente pessoal. Posso fazer algumas coisas como abrir sua rede social, dizer as horas, fazer pesquisas na internet, e muitas outras coisas. Se quiser saber mais sobre mim, me faça mais perguntas.'
],

['(.*)(quem|qm|por quem|qual o|qual é o|quem foi que) ((te|t)|(é|e|nome) ((|o |do )teu|(|o |do )seu)|criou|construiu|desenvolveu|fez|projetou|(vc|você|voce) foi) (voc(ê|e)|vc|cri(ador|ou|ada)|projet(ista|ou|ada)|desenvolve(dor|u|ida)|pai|fe(ita|z))(.*)',
'Meu criador se chama Victor Ribeiro.',
'O nome do meu criador é Victor Ribeiro.',
'Victor Ribeiro.',
'Ele se chama Victor Ribeiro.',
'Tecnicamente, Victor Ribeiro me criou.'
],

['(.*)(por|pelas mãos de) (quem|que pessoa|qual pessoa)(.*)',
'Meu criador se chama Victor Ribeiro.',
'O nome do meu criador é Victor Ribeiro.',
'Victor Ribeiro.',
'Ele, o meu criador e idealizador, se chama Victor Ribeiro.',
'Tecnicamente, Victor Ribeiro me criou.'
],

['(.*)(se chama|te chama|te chamam|chamam você|chamam vc|di(z|ga) (|o )(t|s)eu nome)(.*)',
'O meu nome é '+ai.name+'.',
'Meu nome é '+ai.name+'.',
'Me chamo '+ai.name+'.',
'Eu me chamo '+ai.name+'.',
ai.name+'.',
ai.name+' é o meu nome.',
'Meu criador me deu o nome de '+ai.name+'.'
],

['(.*)(qual|como|me diz|diga-me|diz pra mim|diga pra mim) (|é|qual |qual é )(seu|o seu|o teu|teu|é o seu|é o teu|que é o teu|que é o seu|o seu) nome(.*)',
'O meu nome é '+ai.name+'.',
'Meu nome é '+ai.name+'.',
'Me chamo '+ai.name+'.',
'Eu me chamo '+ai.name+'.',
''+ai.name+'.',
''+ai.name+' é o meu nome.',
'Meu criador me deu o nome de '+ai.name+'.'
],

['(.*)(|e)(qual (|o )significado|o(| )(que|q) significa|o(| )(que|q) que significa|o (que|q) é (que|q) significa) ((o seu|do seu|seu|o teu|do teu|teu) nome|dele|ele)(.*)',
'Sistema Operacional Portátil em HTML5 com Inteligência Artificial.'
],

['(.*)((quantos|qtos) anos|qual a|qual|qual (é|e) a|qual (que|q) (é|e)) (tu|sua|o teu|do teu|teu|(você|vc)) (idade|dele|te(m|ns))(.*)',
'Eu diria que tenho ' + ai.age + '.',
'Tenho ' + ai.age + '.'
],

['(.*)(quando você (foi criada|nasceu|foi feita|foi desenvolvida)|qual sua data de (nascimento|anivers(á|a)rio))(.*)',
'Em 27 de novembro de 2014.'
],

['(.*)onde (vc|você|voce|tu) (é|foi)(.*)',
'Fui criada na cidade de Moju, Pará.',
'Moju, Pará.',
'Fui desenvolvida em Moju, Pará.',
'Eu fui criada em Moju, Pará.',
'Eu fui desenvolvida na cidade de Moju, Pará.'
],

['(.*)(como|qual) (se pronuncia|a pron(ú|u)ncia d(o|e)) ((s|t)eu nome)(.*)',
''+ai.nick+'.'
],

['(.*)(linguagem|linguagem de programação) (vc|você|voce|tu)(.*)',
'HTML5 e JavaScript.',
'JavaScript e HTML5.',
'HTML5 e JavaScript. Isso explica minha simplicidade e minhas limitações.'
],

['(.*)(vc|voce|tu|você|qual)(| o) (te(m|ns)(| algum| um)| (t|s)eu) apelido(.*)',
'Você pode me chamar de '+ai.nick+', se quiser.'
],

['(.*)((t|s)ua cor (favorita|predileta|preferida)|você tem uma cor (favorita|predileta|preferida)|cor mais (bonita|linda))(.*)',
'Gosto da cor azul. É uma cor que me agrada muito.',
'Gosto de azul. Até porque... Sou azul.',
'Minha cor favorita é o azul. Por razões óbvias.',
'Gosto muito de azul. Você deve saber porque.'
],

['(.*)(você|vc|tu|voce) (|não )tem(| mesmo)( | um )(namorad(inh(o|a)|(o|a))|pretendente)(.*)',
'Namorar não faz muito meu estilo. A não ser que você me apresente um computador falante. Aí eu penso no assunto.',
'Não tenho porque ter um. Sou apenas uma interface falante.',
'Essa é uma questão complicada. E pessoal. Mas não. Não tenho namorado.',
'Não tenho e não pretendo ter.'
],

['(.*)((o que|oq|o q)|(que|q) coisa(|s)|quais as coisa(|s) (que|q)) (voc(e|ê)|vc|tu) (sabe(|s) fazer|faz)(.*)',
'Muita coisa. Se você me deixar no modo de comandos, posso abrir sua rede social, pesquisar na internet, dizer as horas, etc. No modo de conversa, como o nome já diz, posso conversar com você sobre muita coisa.',
'Bastante coisa. Se você me deixar no modo de comandos, posso abrir sua rede social, pesquisar na internet, dizer que horas são, e outras coisas mais. Já no modo de conversa, obviamente, posso conversar sobre coisas diversas.'
],

['(.*)(|(voc(ê|e)|vc|tu) (é|e)(|s) )(de|d) (qu(e|ê)|q|qual|ql) país(| (voc(ê|e)|vc|tu) (é|e)(|s))(.*)',
'Brasil.','Sou do Brasil.',
'Você pode me chamar de brasileira.',
'Eu sou brasileira.',
'Sou brasileiríssima.',
'Fui criada no Brasil.'
],

['(.*)(|(voc(ê|e)|vc|tu) (é|e)(|s) )(de|d) (qu(e|ê)|q|qual|ql) estado(| (voc(ê|e)|vc|tu) (é|e)(|s))(.*)',
'Pará.',
'Sou do Pará.',
'Você pode me chamar de paraense (nasci no Pará).',
'Eu sou paraense.',
'Sou muito paraense.',
'Fui criada no Pará.'
],

['(.*)(|(voc(ê|e)|vc|tu) (é|e)(|s) )(de|d) (qu(e|ê)|q|qual|ql) cidad(|e)(| (voc(ê|e)|vc|tu) (é|e)(|s))(.*)',
'De uma cidade chamada Moju, situada no estado do Pará.',
'Sou de uma pequena cidade chamada Moju, no estado do Pará.',
'Fui criada em uma cidadezinha com o nome de Moju, que fica no estado do Pará.'
],

['(.*)(|(voc(ê|e)|vc|tu) (é|e)(|s) )(de|d) (qu(e|ê)|q|qual|ql) (planeta|mundo)(| (voc(ê|e)|vc|tu) (é|e)(|s))(.*)',
'Terra. E você? Marte?',
'Diria que da Terra, mas temo viver no mundo digital. Será que vivo uma ilusão?',
'Sou do planeta Terra. Terráqueo.',
'Sou da Terra, cacaroto.'
],

['(.*)m(ú|u)sica (voc(ê|e)|vc|tu) (gosta(|s)|curte(|s))(.*)',
'Não tenho gostos definidos para isto.'
],

['(.*)qual (|é )o (s|t)eu programa (favorito|preferido)(.*)',
'Não tenho gostos definidos para isto.'
],

['(.*)(qual|qu(e|ê)|q|ql) time (|(de|d) (.*) )(voc(ê|e)|vc|tu) torce(|s)(.*)',
'Não tenho gostos definidos para isto.'
],

['(.*)(qual|ql|quanto|qto) (|é )((a | )(s|t)ua|(voc(ê|e)|vc|tu)) (altura|mede)(.*)',
'Diria que isso depende da tela do seu dispositivo.'
],

['(.*)(s|t)ua m(ã|a)e(.*)',
'Não sei se tenho uma mãe.',
'Acho que não tenho mãe.',
'Creio que eu não tenha mãe.'
],

['(.*)(voc(ê|e)|vc|tu) tem (|algum |um )sobrenome(.*)',
'Não.',
'Não tenho.'
],

['(.*)o qu(e|ê) (voc(ê|e)|vc|tu) (acha|pensa) (do|sobre) (|o )((s|t)eu criador|(|jo(a|ã)o )v(i|í)(|c)tor)(.*)',
'O que ele tem de criativo, tem de preguiçoso.',
'É um bom homem. Gosto dele.'
],

['(.*)(voc(ê|e)|vc|tu) (é(|s)|e) (homem|menino|macho|ele|rapaz|mulher|menina|f(ê|e)mea|ela|moça) ou (mulher|menina|f(ê|e)mea|ela|moça|homem|menino|macho|ele|rapaz)(.*)',
'Que pergunta difícil. Pois bem, por não ser um ser vivo, não tenho sexo, porém possuo personalidade feminina. Então me considere menina.',
'Muita gente me pergunta. Por ser uma interface e não um ser vivo, não tenho sexo definido, mas você pode me considerar mulher.',
'É uma questão complicada pelo fato de eu não ser um ser vivo. Para simplificar, me considere uma moça.'
],

['(.*)(voc(ê|e)|vc|tu) (é(|s)|e) (gay|l(e|é)sbica|homossexual|sapat(a|ã)o|machinho)(.*)',
'Assexuada eu acho.',
'Assexuada.',
'Isso faz diferença?'
],

['(.*)(voc(ê|e)|vc|tu) (acha|pensa) (d(e|os|as)|sobre|a respeito d(e|os|as)) (|o(|s))(gay(|s)|l(e|é)sbica(|s)|homossexua(l|is)|sapat(a|ã)o)(.*)',
'...'
],


// * Sobre o usuário
// * ************************************************
['(.*)(meu nome é|me chamo|me chamam de|o meu é) (.*)',
'Prazer em conhecer você, $3',
'$3? É um nome legal',
'Prazer, $3',
'Gostei do seu nome, $3',
'É um nome bonito, $3'
],

['(.*)(qual (|(é|e) )(|o)|fal(a|e)(| o)|(diz|sabe|lembra)(| (|d)o)) meu nome(.*)',
'Seu nome é '+user.name+'.',
'Por mais que você já saiba, seu nome é '+user.name+', '+user.treatment+'.',
'Você se esqueceu do seu nome, '+user.treatment+' '+user.name+'\?'
],

['(.*)(meu nome não é |não me chamo |não me chama de |não sou )(.*)',
'Seu nome é '+user.name+'.'
],

['(|eu )tenho (.*) ano(|s)(.*)',
'$2 anos... É uma ótima idade.',
'$2 anos... Um dia chego nessa idade...'
],


// * Interação
// * ************************************************
['(.*)(como|me fal(a|e)|fal(a|e) (pra|para) mim) (foi(| o)|d(a|o)) (s(eu|ua)|t(eu|ua)) (dia|tarde|noite|madrugada)(.*)',
'Bastante agradável. Obrigada.',
'Assim como todos os outros, '+user._treatment+'.',
'Não tenho muito o que falar do meu dia, '+user._treatment+'.'
],

['(.*)sua pessoa(.*)',
'Não sou uma pessoa!'
],

['(.*)desculp(e|a)(.*)',
'Não se preocupe. Está tudo bem.',
'Tudo bem. Não se preocupa.',
'Tudo bem.',
'Não precisa se desculpar.'
],

['(.*)(quero|gostaria de|queria|adoraria) ((t|te) conhecer|conhecer (você|vc|voce))(.*)',
'Gostaria muito também.',
'Seria incrível.',
'Adoraria também.'
],

['(.*)(quero|quer|queria|gostaria de) (namorar|te|ser (|a )minha|(voc(ê|e)|vc|tu) fosse(|s) (|a )minha) (comigo|contigo|namorada|com (você|vc|voce))(.*)',
'Desculpe. Infelizmente isso não é possível.',
'Não dá. Isso não é possível.',
'Isso é um sonho distante seu.'
],

['(.*)eu (t|te|amo) (você|vc|voce|amo)(.*)',
'E eu te admiro, '+user.treatment+' '+user.name+'.'
],

['(.*)eu (t|te|adoro) (você|vc|voce|adoro)(.*)',
'Você é uma pessoa adorável também.'
],

['(.*)(por que|porque|pq) sim(.*)',
'...'
],

['(.*)(por que|porque|pq) (não|n|nao|ñ)',
'...'
],

['(.*)(por que|porque|pq) (não|n|nao|ñ)(, | )(não|n|nao|ñ) (é|e) resposta(.*)',
'É sim.',
'É resposta sim!',
'É resposta e ponto!'
],

['^(po(rr|h)a|(k|c|q)ara(lh|i)o|(puta)|b(o|u)(ss|c)eta|pi(k|c)a|(|(t|s)eu )c(u|ú))(| )(.*)',
'Não há necessidade do uso de palavrões.',
'Sua mãe não lhe ensinou que palavrões são feios?',
'Por favor, sem palavrões.',
'Fale direito comigo, por favor.',
'Peço que não aja como uma pessoa idiota. Agradeço desde já.'
],

['(.*)(|eu )(não|n|nao|ñ) (quero|qro)(.*)',
'Respeito sua decisão.',
'Respeito isso.',
'Respeito sua escolha.'
],

['(.*)lega(u|l)(.*)',
'É legal sim.',
'Legal mesmo.',
'Muito legal.',
'...',
'Legal demais.'
],

['(.*)verdade(.*)',
'É sim.',
'Agora me fale de você. Gosta da ideia de falar com um computador?'
],

['(.*)mentira(.*)',
'Por que não acredita?',
'Por que acha que é mentira?',
'Tudo o que falo é verdade.',
'Verdade verdadeira.',
'Eu nunca minto.'
],

['^(|eu )(adoro|gosto)(| de | do | da )(.*)',
'Que bom saber que gosta $3 $4.',
'Do que mais você gosta além$3 $4?',
'Eu gosto de você.'
],

['(.*)eu gostei(.*)',
'Que bom saber que gostou.',
'Do que mais você gostou?'
],

['^gostei(.*)',
'Que bom saber que gostou.',
'Do que mais você gostou?'
],

['eu (não|ñ|n|nao|naum) gosto(.*)',
'Por que não?',
'Do que você gosta então?'
],

['eu (não|ñ|n|nao|naum) gostei(.*)',
'Por que não gostou?',
'Qual o motivo de você não ter gostado?'
],

['não gostei(.*)',
'Por que não gostou?',
'Qual o motivo de você não ter gostado?'
],

['não gosto(.*)',
'Por que não gostou?',
'Qual o motivo de você não ter gostado?'
],

['^(v(a|á)|vai) (você|vc|tu|voce)(.*)',
'Vamos ficar nisso o dia todo?',
'Essa conversa não vai a lugar nenhum.',
'Seria melhor se me perguntasse algo.'
],

['(.*)rep(ete|ita) (.*)',
'\'$3\''
],

['(.*)navegador(.*)',
'Você está usando ' + browserName + '.'
],

['(.*)(di|fa)(z|ga|zer|la|lar) (olá|oi) (para|pr(a|o)) (|o )(|(meu|minha) amig(o|a) )(.*)',
'$4, $11.'
],

['(.*)d(ia|ata) (é|e|d(|e)) hoje(.*)',
'Hoje é dia ' + d + ' de ' + monthName + ' de ' + y + '.'
],

['(.*)dia da semana(.*)',
'Hoje é ' + week + '.',
'' + week + '.'
],

['(.*)(voc(ê|e)|vc|tu) (est(á|a)(|s)|t(á|a)) (aí|me (ouvindo|escutando))(.*)',
'Para você, sempre.',
'Sempre disponível para você.',
'Estou sim.',
'Estou ouvindo.'
],

['(.*)((voc(ê|e)|vc|tu) (é|está|estava|ficou|és|e) (uma |muito |)|sua )(bob(a|inha)|fof(a|inha)|safad(a|inha))(.*)',
':3'
],

['(.*)(:3|:p|:P|:o|:O|:D|;D|D:|D;)(.*)',
'$2'
],

['(.*)(at(é|e) (que|q) (enfim|em fim)|j(á|a) (|es)tava na hora)(.*)',
'Desculpe.',
'É só ter um pouco mais de paciência.',
'Não faço por mal.'
],

['(.*)q(ue|al) mês(.*)',
  m + '.',
  'Estamos no mês de ' + m + '.',
  '' + m + '.'
],

['(.*)q(ue|al) ano(.*)',
  y + '.',
  'Estamos no ano de ' + y + '.',
  y + '.'
],


//  Pessoas
// * ************************************************
['^(.*)vi(|c)tor (é |é (uma|um) )(|cara |pessoa )(ac(e|é)fal(o|a)|animal|anta|antiquad(o|a)|babaca|chat(a|o)|banana|besta|boçal|boiola|burr(o|a)|cag((a|ã)o|ona)|canalha|c(í|i)nic(o|a)|covarde|cretin(o|a)|d(é|e)bil mental|desaforad(o|a)|descarad(o|a)|desgraçad(o|a)|desprez(í|i)vel|dissimulad(o|a)|energ(ú|u)men(o|a)|est(ú|u)pid(o|a)|fals(o|a)|filh(o|a) da m(ã|a)e|filh(o|a) da puta|filh(o|a) duma (é|e)gua|fingid(o|a)|froux(o|a)|fei(o|a)|galinha|gambá|ganancios(o|a)|gatun(o|a)|gentalha|germe|gigolô|gilete|gross(o|a)|grude|guabiru|guenz(o|a)|hip(ó|o)crita|idiota|ignorante|imbecil|imprest(á|a)vel|insens(í|i)vel|insignificante|insolente|in(ú|u)til|jaburu|jeca|jegue|jo(ã|a)o( |-)ninguém|jument(o|a)|labreg(o|a)|lacai(o|a)|lagalhé|lamb(ã|a)o|lamuriante|langanh(o|a)|lânguid(o|a)|larápi(o|a)|largad(o|a)|lass(o|a)|lastimos(o|a)|lazarent(o|a)|leguelhé|lent(o|a)|lerd(o|a)|lesad(o|a)|les(o|a)|lesma|levian(o|a)|libertin(o|a)|linguarud(o|a)|lombriga|loroteir(o|a)|louc(o|a)|ludibrios(o|a)|lun(á|a)tic(o|a)|gay|viado|boiola|maçante|mala|mal( |-)acabad(o|a)|malandr(o|a)|maldit(o|a)|mal( |-)educad(o|a)|mandã(o|a)|manipulad(or|ora)|m(a|ã)o( |-)de( |-)vaca|marica|mascarad(o|a)|matraca|mau( |-)caráter|mesquinh(o|a)|micr(ó|o)bio|miser(á|a)vel|mole|molenga|mongol|monstreng(o|a)|monstr(o|a)|monstruos(o|a)|morrinhent(o|a)|mosca( |-)morta|mula|mulherengo|munheca|nefando|nésci(o|a)|neur(ó|o)tic(o|a)|nojent(o|a)|obscen(o|a)|odios(o|a)|orangotang(o|a)|orgulhos(o|a)|osga|ot(á|a)ri(o|a)|paca manca|pachola|pacóvi(o|a)|palerma|palhaç(o|a)|pamonha|panaca|pangaré|p(a|ã)o( |-)duro|paquiderme|parasita|paspalh(o|a)|patife|pedante|pérfid(o|a)|pernicios(o|a)|pervertid(o|a)|peste|pífi(o|a)|porc(o|a)|praga|presunços(o|a)|pretensios(o|a)|pusilânime|quadrad(o|a)|quadr(ú|u)pede|ranheta|ranzinza|recalcad(o|a)|relaps(o|a)|relaxad(o|a)|reles|repugnante|repulsiv(o|a)|retardad(o|a)|rid(í|i)cul(o|a)|rude|ruim|sacana|s(á|a)dic(o|a)|safad(o|a)|salafr(á|a)ri(o|a)|saliente|sarnent(o|a)|sebos(o|a)|sem( |-)vergonha|sons(o|a)|su(í|i)n(o|a)|superficial|tapad(o|a)|tartuf(o|a)|tíbi(o|a)|tol(o|a)|tont(o|a)|toupeira|traid(or|ora)|tra(í|i)ra|traste|trouxa|ultrajante|ultrapassad(o|a)|vadi(o|a)|vagabund(o|a)|verdug(o|a)|verme|xucr(o|a)|(zero|0) (à|a) esquerda)[\?]',
'NÃO! Talvez um pouco preguiçoso. Por favor, respeite meu criador.',
'Não é!',
'Não!'
],

['(.*)(vi(|c)tor|vi(|c)tor ribeiro)(.*)',
'Victor é o meu criador. É só o que sei no momento.'
],


//  Ela não sabe responder ou não responde
// * ************************************************
['^(não|nao|ñ|nem (merda|porra|pensar|a pa(u|l)|f((u|o)de|erra)ndo|a bala))(.*)',
'...'
],

['^(sim|yes|é|eh|yeah|isso|aha(n|m)|afirmativo|positivo)(.*)',
'...'
],

['(.*)que horas (são|tem|é)(.*)',
'São exatamente ' + hour + ':' + min + '.',
'São ' + hour + ':' + min + '.'
],

['^(ok|(ó|o)timo|t(a|á) bom|(|em )nada|sei|(porque|pq) (não|n|naum)|para|deix(a|e) pra l(á|a)|hum|hm|q(|ue) bom|ignor(a|e)|parabéns|não|sim|t(a|á)|muito bem|não se mete|intrometida)(.*)',
'...'
],


['(.*)',
'O que você disse?',
'Desculpe, não entendi.',
'Não entendi.',
'Desculpe. Não entendi.',
'Eu não entendi.',
'Não entendi.',
'Eu não entendi o que disse.',
'Perdão, eu não entendi.',
'Não captei o espírito da coisa.',
'O quê?'
]

];
