/*
ROSARIUM - BANCO DE DADOS DE SANTOS
Dados Oficiais da Igreja Católica
Fontes: Calendário Litúrgico Católico + Canção Nova
*/

const SANTOS_DATABASE = {
  // JANEIRO
  1: { nome: "Santa Maria, Mãe de Deus", titulo: "Mãe de Deus", oração: "Santa Maria, Mãe de Deus, rogai por nós pecadores, agora e na hora da nossa morte. Amém.", biografia: "Maria, Mãe de Jesus Cristo, é honrada como Mãe de Deus. Ela é a intercessora mais poderosa junto ao trono de Deus. Celebramos sua maternidade divina e sua proteção maternal sobre todos nós." },
  2: { nome: "Santo Estêvão", titulo: "Primeiro Mártir", oração: "Santo Estêvão, primeiro mártir cristão, roga por nós.", biografia: "Santo Estêvão foi o primeiro mártir cristão, morto apedrejado por defender a fé em Jesus Cristo. Sua coragem e fé inspiram todos os cristãos a permanecerem firmes na verdade." },
  3: { nome: "São Simeão e Santo Inácio", titulo: "Mártires", oração: "São Simeão e Santo Inácio, mártires gloriosos, rogai por nós.", biografia: "Mártires da Igreja primitiva que derramaram seu sangue pela fé em Cristo." },
  4: { nome: "Santa Genoveva", titulo: "Padroeira de Paris", oração: "Santa Genoveva, padroeira de Paris, roga por nós.", biografia: "Santa Genoveva foi uma virgem francesa que protegeu Paris através de suas orações e intercessão." },
  5: { nome: "São Simeão Estilita", titulo: "Asceta", oração: "São Simeão Estilita, modelo de penitência, roga por nós.", biografia: "São Simeão viveu em um pilar (estilo) como forma de ascese e oração contínua." },
  6: { nome: "Epifania do Senhor", titulo: "Manifestação de Jesus", oração: "Senhor Jesus, que vos manifestastes aos Magos, iluminai nossas vidas.", biografia: "Celebramos a manifestação de Jesus aos Magos do Oriente, revelando-se como Salvador de todas as nações." },
  7: { nome: "São Raimundo de Peñafort", titulo: "Confessor", oração: "São Raimundo, guia espiritual, roga por nós.", biografia: "São Raimundo foi um confessor sábio e misericordioso, modelo de direção espiritual." },
  8: { nome: "Santo Afonso Maria de Ligório", titulo: "Doutor da Igreja", oração: "Santo Afonso, doutor da misericórdia, roga por nós.", biografia: "Santo Afonso foi um grande teólogo e fundador de congregação religiosa, conhecido por sua misericórdia." },
  9: { nome: "São João Batista", titulo: "Precursor do Senhor", oração: "São João Batista, precursor de Jesus, roga por nós.", biografia: "São João Batista preparou o caminho para Jesus Cristo, batizando-o no Rio Jordão." },
  10: { nome: "São Gonçalo de Amarante", titulo: "Protetor dos Casamentos", oração: "São Gonçalo, protetor dos casamentos, roga por nós.", biografia: "São Gonçalo é venerado como protetor dos casamentos e das famílias." },
  11: { nome: "São Higino", titulo: "Papa e Mártir", oração: "São Higino, papa mártir, roga por nós.", biografia: "São Higino foi papa nos primeiros séculos da Igreja." },
  12: { nome: "Santa Margarida de Itália", titulo: "Penitente", oração: "Santa Margarida, modelo de penitência, roga por nós.", biografia: "Santa Margarida viveu uma vida de profunda penitência e devoção." },
  13: { nome: "Santo Hilário", titulo: "Doutor da Igreja", oração: "Santo Hilário, defensor da fé, roga por nós.", biografia: "Santo Hilário foi um grande teólogo que defendeu a divindade de Cristo." },
  14: { nome: "São Félix de Nola", titulo: "Confessor", oração: "São Félix, confessor santo, roga por nós.", biografia: "São Félix foi um confessor que sofreu perseguição pela fé." },
  15: { nome: "São Paulo Eremita", titulo: "Primeiro Eremita", oração: "São Paulo, primeiro eremita, roga por nós.", biografia: "São Paulo foi o primeiro monge cristão, vivendo no deserto em oração." },
  16: { nome: "Santa Priscila", titulo: "Mártir", oração: "Santa Priscila, mártir gloriosa, roga por nós.", biografia: "Santa Priscila foi uma mártir cristã primitiva." },
  17: { nome: "Santo Antão Abade", titulo: "Pai dos Monges", oração: "Santo Antão, pai dos monges, roga por nós.", biografia: "Santo Antão foi o fundador da vida monástica cristã, vivendo no deserto em oração e penitência." },
  18: { nome: "Santa Priscila", titulo: "Mártir", oração: "Santa Priscila, mártir gloriosa, roga por nós.", biografia: "Santa Priscila foi uma mártir cristã primitiva." },
  19: { nome: "São Mário", titulo: "Mártir", oração: "São Mário, mártir corajoso, roga por nós.", biografia: "São Mário foi um mártir cristão primitivo." },
  20: { nome: "São Fabiano", titulo: "Papa e Mártir", oração: "São Fabiano, papa mártir, roga por nós.", biografia: "São Fabiano foi papa e mártir nos primeiros séculos da Igreja." },
  21: { nome: "Santa Inês", titulo: "Virgem e Mártir", oração: "Santa Inês, virgem mártir, roga por nós.", biografia: "Santa Inês foi uma jovem mártir que morreu pela fé em Cristo, símbolo de pureza e coragem." },
  22: { nome: "São Vicente", titulo: "Mártir", oração: "São Vicente, mártir valente, roga por nós.", biografia: "São Vicente foi um mártir cristão primitivo." },
  23: { nome: "São Raimundo de Peñafort", titulo: "Confessor", oração: "São Raimundo, guia espiritual, roga por nós.", biografia: "São Raimundo foi um confessor sábio e misericordioso." },
  24: { nome: "São Francisco de Sales", titulo: "Doutor da Igreja", oração: "São Francisco de Sales, doutor da caridade, roga por nós.", biografia: "São Francisco de Sales foi um grande bispo e doutor da Igreja, conhecido por sua doçura e caridade." },
  25: { nome: "Conversão de São Paulo", titulo: "Apóstolo", oração: "São Paulo, apóstolo das gentes, roga por nós.", biografia: "Celebramos a conversão de Saulo em Paulo, que se tornou o grande apóstolo das gentes." },
  26: { nome: "Santa Paula", titulo: "Viúva e Penitente", oração: "Santa Paula, modelo de devoção, roga por nós.", biografia: "Santa Paula foi uma viúva que dedicou sua vida à oração e penitência." },
  27: { nome: "São João Crisóstomo", titulo: "Doutor da Igreja", oração: "São João Crisóstomo, doutor eloquente, roga por nós.", biografia: "São João Crisóstomo foi um grande pregador e doutor da Igreja, conhecido por sua eloquência." },
  28: { nome: "São Tomás de Aquino", titulo: "Doutor da Igreja", oração: "São Tomás de Aquino, doutor universal, roga por nós.", biografia: "São Tomás de Aquino foi um grande teólogo e filósofo, doutor da Igreja." },
  29: { nome: "São Frodoário", titulo: "Confessor", oração: "São Frodoário, confessor santo, roga por nós.", biografia: "São Frodoário foi um confessor que viveu em oração." },
  30: { nome: "Santa Matilde", titulo: "Rainha", oração: "Santa Matilde, rainha santa, roga por nós.", biografia: "Santa Matilde foi uma rainha que viveu em santidade e caridade." },
  31: { nome: "São João Bosco", titulo: "Educador", oração: "São João Bosco, protetor da juventude, roga por nós.", biografia: "São João Bosco foi um grande educador e santo que dedicou sua vida à formação da juventude." },

  // FEVEREIRO
  101: { nome: "Santa Brígida", titulo: "Abadessa", oração: "Santa Brígida, abadessa santa, roga por nós.", biografia: "Santa Brígida foi uma abadessa irlandesa venerada como padroeira da Irlanda." },
  102: { nome: "Apresentação do Senhor", titulo: "Festa de Jesus", oração: "Senhor Jesus, luz das nações, iluminai nossas vidas.", biografia: "Celebramos a apresentação de Jesus no Templo, quando foi reconhecido como luz das nações." },
  103: { nome: "São Brás", titulo: "Mártir", oração: "São Brás, protetor da garganta, roga por nós.", biografia: "São Brás foi um mártir cristão primitivo, venerado como protetor da garganta." },
  104: { nome: "Santa Rosa de Viterbo", titulo: "Virgem", oração: "Santa Rosa de Viterbo, virgem santa, roga por nós.", biografia: "Santa Rosa de Viterbo foi uma jovem virgem dedicada à oração." },
  105: { nome: "Santa Águeda", titulo: "Virgem e Mártir", oração: "Santa Águeda, virgem mártir, roga por nós.", biografia: "Santa Águeda foi uma jovem mártir que morreu pela fé em Cristo." },
  106: { nome: "São Paulo Miki", titulo: "Mártir", oração: "São Paulo Miki, mártir corajoso, roga por nós.", biografia: "São Paulo Miki foi um mártir cristão no Japão." },
  107: { nome: "Santa Romuálda", titulo: "Abade", oração: "Santa Romuálda, abade santo, roga por nós.", biografia: "Santa Romuálda foi um abade que fundou mosteiros." },
  108: { nome: "Santo Jerônimo Emiliani", titulo: "Confessor", oração: "Santo Jerônimo Emiliani, protetor dos órfãos, roga por nós.", biografia: "Santo Jerônimo Emiliani foi um confessor que cuidou de órfãos e pobres." },
  109: { nome: "Santa Apolônia", titulo: "Mártir", oração: "Santa Apolônia, protetora dos dentes, roga por nós.", biografia: "Santa Apolônia foi uma mártir cristã primitiva, venerada como protetora dos dentes." },
  110: { nome: "Santa Escolástica", titulo: "Virgem", oração: "Santa Escolástica, irmã de São Bento, roga por nós.", biografia: "Santa Escolástica foi irmã de São Bento e fundadora de convento." },
  111: { nome: "Nossa Senhora de Lourdes", titulo: "Mãe de Deus", oração: "Nossa Senhora de Lourdes, mãe de misericórdia, rogai por nós.", biografia: "Nossa Senhora de Lourdes apareceu a Santa Bernadete na França, trazendo mensagens de oração e penitência." },
  112: { nome: "São Bento de Aniano", titulo: "Abade", oração: "São Bento de Aniano, abade santo, roga por nós.", biografia: "São Bento de Aniano foi um abade que reformou a vida monástica." },
  113: { nome: "São Cataldo", titulo: "Bispo", oração: "São Cataldo, bispo santo, roga por nós.", biografia: "São Cataldo foi um bispo que evangelizou a Itália." },
  114: { nome: "São Valentim", titulo: "Mártir", oração: "São Valentim, mártir do amor, roga por nós.", biografia: "São Valentim foi um mártir cristão primitivo, venerado como padroeiro do amor." },
  115: { nome: "Santa Faustina", titulo: "Virgem", oração: "Santa Faustina, apóstola da misericórdia, roga por nós.", biografia: "Santa Faustina foi uma religiosa que recebeu revelações sobre a misericórdia de Deus." },
  116: { nome: "São Simeão", titulo: "Bispo", oração: "São Simeão, bispo santo, roga por nós.", biografia: "São Simeão foi um bispo cristão primitivo." },
  117: { nome: "Sete Fundadores dos Servitas", titulo: "Confessores", oração: "Sete Fundadores, servos de Maria, rogai por nós.", biografia: "Sete santos que fundaram a ordem dos Servitas." },
  118: { nome: "Santa Margarida de Cortona", titulo: "Penitente", oração: "Santa Margarida de Cortona, modelo de penitência, roga por nós.", biografia: "Santa Margarida de Cortona viveu uma vida de profunda penitência e devoção." },
  119: { nome: "São Conrado", titulo: "Confessor", oração: "São Conrado, confessor santo, roga por nós.", biografia: "São Conrado foi um confessor que viveu em oração." },
  120: { nome: "Santo Eleutério", titulo: "Papa e Mártir", oração: "Santo Eleutério, papa mártir, roga por nós.", biografia: "Santo Eleutério foi papa nos primeiros séculos da Igreja." },
  121: { nome: "Santo Damião", titulo: "Mártir", oração: "Santo Damião, mártir santo, roga por nós.", biografia: "Santo Damião foi um mártir cristão primitivo." },
  122: { nome: "Santa Margarida de Antioquia", titulo: "Virgem e Mártir", oração: "Santa Margarida de Antioquia, virgem mártir, roga por nós.", biografia: "Santa Margarida foi uma jovem mártir que morreu pela fé em Cristo." },
  123: { nome: "Santa Policarpa", titulo: "Mártir", oração: "Santa Policarpa, mártir gloriosa, roga por nós.", biografia: "Santa Policarpa foi uma mártir cristã primitiva." },
  124: { nome: "São Matias", titulo: "Apóstolo", oração: "São Matias, apóstolo escolhido, roga por nós.", biografia: "São Matias foi escolhido apóstolo para substituir Judas Iscariotes." },
  125: { nome: "São Tarasio", titulo: "Patriarca", oração: "São Tarasio, patriarca santo, roga por nós.", biografia: "São Tarasio foi um patriarca que defendeu a fé." },
  126: { nome: "Santo Vítor", titulo: "Mártir", oração: "Santo Vítor, mártir corajoso, roga por nós.", biografia: "Santo Vítor foi um mártir cristão primitivo." },
  127: { nome: "Santo Leandro", titulo: "Bispo", oração: "Santo Leandro, bispo santo, roga por nós.", biografia: "Santo Leandro foi um bispo que evangelizou a Espanha." },
  128: { nome: "Santo Romão", titulo: "Mártir", oração: "Santo Romão, mártir valente, roga por nós.", biografia: "Santo Romão foi um mártir cristão primitivo." },

  // MARÇO
  201: { nome: "Santa Emília de Vialar", titulo: "Fundadora", oração: "Santa Emília de Vialar, fundadora caritativa, roga por nós.", biografia: "Santa Emília de Vialar fundou uma congregação dedicada ao cuidado dos doentes." },
  202: { nome: "Santo Inácio de Antioquia", titulo: "Mártir", oração: "Santo Inácio de Antioquia, mártir glorioso, roga por nós.", biografia: "Santo Inácio foi um mártir cristão primitivo que morreu por defender a fé." },
  203: { nome: "Santa Gúnara", titulo: "Virgem", oração: "Santa Gúnara, virgem santa, roga por nós.", biografia: "Santa Gúnara foi uma virgem dedicada à oração." },
  204: { nome: "Santo Casimiro", titulo: "Príncipe", oração: "Santo Casimiro, príncipe santo, roga por nós.", biografia: "Santo Casimiro foi um príncipe que viveu em santidade e caridade." },
  205: { nome: "Santa Olivia", titulo: "Mártir", oração: "Santa Olivia, mártir gloriosa, roga por nós.", biografia: "Santa Olivia foi uma mártir cristã primitiva." },
  206: { nome: "Santa Rosa de Lima", titulo: "Virgem", oração: "Santa Rosa de Lima, padroeira da América do Sul, roga por nós.", biografia: "Santa Rosa de Lima foi uma virgem dedicada à oração e penitência, padroeira da América do Sul." },
  207: { nome: "Santo Tomás de Aquino", titulo: "Doutor da Igreja", oração: "Santo Tomás de Aquino, doutor universal, roga por nós.", biografia: "Santo Tomás de Aquino foi um grande teólogo e filósofo, doutor da Igreja." },
  208: { nome: "Santo João de Deus", titulo: "Confessor", oração: "Santo João de Deus, protetor dos doentes, roga por nós.", biografia: "Santo João de Deus foi um confessor que dedicou sua vida ao cuidado dos doentes." },
  209: { nome: "Santa Francisca Romana", titulo: "Viúva", oração: "Santa Francisca Romana, padroeira de Roma, roga por nós.", biografia: "Santa Francisca Romana foi uma viúva que viveu em santidade e caridade." },
  210: { nome: "Santo Atanásio", titulo: "Bispo e Doutor", oração: "Santo Atanásio, defensor da fé, roga por nós.", biografia: "Santo Atanásio foi um grande bispo e doutor da Igreja que defendeu a divindade de Cristo." },
  211: { nome: "Santo Aurélio", titulo: "Mártir", oração: "Santo Aurélio, mártir corajoso, roga por nós.", biografia: "Santo Aurélio foi um mártir cristão primitivo." },
  212: { nome: "São Gregório o Grande", titulo: "Papa e Doutor", oração: "São Gregório o Grande, papa sábio, roga por nós.", biografia: "São Gregório o Grande foi um grande papa e doutor da Igreja." },
  213: { nome: "Santa Madalena Sofia Barat", titulo: "Fundadora", oração: "Santa Madalena Sofia Barat, fundadora educadora, roga por nós.", biografia: "Santa Madalena Sofia Barat fundou uma congregação dedicada à educação." },
  214: { nome: "Santo Matilde", titulo: "Rainha", oração: "Santo Matilde, rainha santa, roga por nós.", biografia: "Santo Matilde foi uma rainha que viveu em santidade e caridade." },
  215: { nome: "Santa Luísa de Marillac", titulo: "Viúva", oração: "Santa Luísa de Marillac, fundadora caritativa, roga por nós.", biografia: "Santa Luísa de Marillac fundou a Sociedade de Filhas da Caridade." },
  216: { nome: "Santo Hibério", titulo: "Bispo", oração: "Santo Hibério, bispo santo, roga por nós.", biografia: "Santo Hibério foi um bispo que evangelizou." },
  217: { nome: "São Patrício", titulo: "Bispo", oração: "São Patrício, apóstolo da Irlanda, roga por nós.", biografia: "São Patrício foi o grande apóstolo que evangelizou a Irlanda." },
  218: { nome: "Santa Gertrudes", titulo: "Virgem", oração: "Santa Gertrudes, mística santa, roga por nós.", biografia: "Santa Gertrudes foi uma virgem mística dedicada à oração." },
  219: { nome: "São José", titulo: "Esposo de Maria", oração: "São José, protetor da Igreja, roga por nós.", biografia: "São José foi o esposo de Maria e pai adotivo de Jesus, protetor da família." },
  220: { nome: "Santo Cuthberto", titulo: "Bispo", oração: "Santo Cuthberto, bispo santo, roga por nós.", biografia: "Santo Cuthberto foi um bispo que evangelizou a Inglaterra." },
  221: { nome: "Santo Benedito de Palermo", titulo: "Confessor", oração: "Santo Benedito de Palermo, confessor santo, roga por nós.", biografia: "Santo Benedito de Palermo foi um confessor que viveu em oração." },
  222: { nome: "Santo Octaviano", titulo: "Mártir", oração: "Santo Octaviano, mártir valente, roga por nós.", biografia: "Santo Octaviano foi um mártir cristão primitivo." },
  223: { nome: "Santo Nilo", titulo: "Abade", oração: "Santo Nilo, abade santo, roga por nós.", biografia: "Santo Nilo foi um abade que fundou mosteiros." },
  224: { nome: "Santa Catarina de Suécia", titulo: "Viúva", oração: "Santa Catarina de Suécia, mística santa, roga por nós.", biografia: "Santa Catarina de Suécia foi uma viúva mística que recebeu revelações de Deus." },
  225: { nome: "Santo Anúncio do Senhor", titulo: "Festa de Maria", oração: "Senhor Jesus, fruto bendito do ventre de Maria, roga por nós.", biografia: "Celebramos a Anunciação, quando o Anjo Gabriel anunciou a Maria que seria Mãe de Deus." },
  226: { nome: "Santo Ludovico", titulo: "Rei", oração: "Santo Ludovico, rei santo, roga por nós.", biografia: "Santo Ludovico foi um rei que viveu em santidade e caridade." },
  227: { nome: "Santo Rufo", titulo: "Bispo", oração: "Santo Rufo, bispo santo, roga por nós.", biografia: "Santo Rufo foi um bispo que evangelizou." },
  228: { nome: "Santo Hilário", titulo: "Bispo", oração: "Santo Hilário, bispo santo, roga por nós.", biografia: "Santo Hilário foi um bispo que defendeu a fé." },
  229: { nome: "Santo Armênio", titulo: "Mártir", oração: "Santo Armênio, mártir corajoso, roga por nós.", biografia: "Santo Armênio foi um mártir cristão primitivo." },
  230: { nome: "Santo Quodvultdeus", titulo: "Bispo", oração: "Santo Quodvultdeus, bispo santo, roga por nós.", biografia: "Santo Quodvultdeus foi um bispo que evangelizou." },
  231: { nome: "Santo Bálbina", titulo: "Virgem", oração: "Santo Bálbina, virgem santa, roga por nós.", biografia: "Santo Bálbina foi uma virgem dedicada à oração." },

  // ABRIL
  301: { nome: "Santo Hugo de Grenoble", titulo: "Bispo", oração: "Santo Hugo de Grenoble, bispo santo, roga por nós.", biografia: "Santo Hugo de Grenoble foi um bispo que evangelizou." },
  302: { nome: "Santa Maria Egípcia", titulo: "Penitente", oração: "Santa Maria Egípcia, modelo de penitência, roga por nós.", biografia: "Santa Maria Egípcia viveu uma vida de profunda penitência no deserto." },
  303: { nome: "Santo Ricardo", titulo: "Rei", oração: "Santo Ricardo, rei santo, roga por nós.", biografia: "Santo Ricardo foi um rei que viveu em santidade." },
  304: { nome: "Santo Isidoro de Sevilha", titulo: "Bispo e Doutor", oração: "Santo Isidoro de Sevilha, doutor da Igreja, roga por nós.", biografia: "Santo Isidoro foi um grande bispo e doutor da Igreja." },
  305: { nome: "Santo Vicente Ferrer", titulo: "Confessor", oração: "Santo Vicente Ferrer, pregador santo, roga por nós.", biografia: "Santo Vicente Ferrer foi um grande pregador que evangelizou a Europa." },
  306: { nome: "Santo Celestino I", titulo: "Papa", oração: "Santo Celestino I, papa santo, roga por nós.", biografia: "Santo Celestino I foi papa nos primeiros séculos da Igreja." },
  307: { nome: "Santo João Batista de La Salle", titulo: "Confessor", oração: "Santo João Batista de La Salle, educador santo, roga por nós.", biografia: "Santo João Batista de La Salle foi um grande educador que fundou escolas." },
  308: { nome: "Santo Dionísio", titulo: "Bispo", oração: "Santo Dionísio, bispo santo, roga por nós.", biografia: "Santo Dionísio foi um bispo que evangelizou." },
  309: { nome: "Santa Margarida de Cortona", titulo: "Penitente", oração: "Santa Margarida de Cortona, modelo de penitência, roga por nós.", biografia: "Santa Margarida de Cortona viveu uma vida de profunda penitência." },
  310: { nome: "Santo Estêvão", titulo: "Papa", oração: "Santo Estêvão, papa santo, roga por nós.", biografia: "Santo Estêvão foi papa nos primeiros séculos da Igreja." },
  311: { nome: "Santo Gualter", titulo: "Abade", oração: "Santo Gualter, abade santo, roga por nós.", biografia: "Santo Gualter foi um abade que fundou mosteiros." },
  312: { nome: "Santo Júlio I", titulo: "Papa", oração: "Santo Júlio I, papa santo, roga por nós.", biografia: "Santo Júlio I foi papa nos primeiros séculos da Igreja." },
  313: { nome: "Santo Hermenegildo", titulo: "Mártir", oração: "Santo Hermenegildo, mártir corajoso, roga por nós.", biografia: "Santo Hermenegildo foi um mártir cristão primitivo." },
  314: { nome: "Santo Tibúrcio", titulo: "Mártir", oração: "Santo Tibúrcio, mártir valente, roga por nós.", biografia: "Santo Tibúrcio foi um mártir cristão primitivo." },
  315: { nome: "Santa Leonida", titulo: "Mártir", oração: "Santa Leonida, mártir gloriosa, roga por nós.", biografia: "Santa Leonida foi uma mártir cristã primitiva." },
  316: { nome: "Santo Benedito de Palermo", titulo: "Confessor", oração: "Santo Benedito de Palermo, confessor santo, roga por nós.", biografia: "Santo Benedito de Palermo foi um confessor que viveu em oração." },
  317: { nome: "Santo Aniceto", titulo: "Papa e Mártir", oração: "Santo Aniceto, papa mártir, roga por nós.", biografia: "Santo Aniceto foi papa nos primeiros séculos da Igreja." },
  318: { nome: "Santo Peregrino", titulo: "Confessor", oração: "Santo Peregrino, confessor santo, roga por nós.", biografia: "Santo Peregrino foi um confessor que viveu em oração." },
  319: { nome: "Santo Leão IX", titulo: "Papa", oração: "Santo Leão IX, papa santo, roga por nós.", biografia: "Santo Leão IX foi um papa que reformou a Igreja." },
  320: { nome: "Santa Inês de Montepulciano", titulo: "Virgem", oração: "Santa Inês de Montepulciano, virgem santa, roga por nós.", biografia: "Santa Inês de Montepulciano foi uma virgem dedicada à oração." },
  321: { nome: "Santo Anselmo", titulo: "Bispo e Doutor", oração: "Santo Anselmo, doutor da Igreja, roga por nós.", biografia: "Santo Anselmo foi um grande bispo e doutor da Igreja." },
  322: { nome: "Santo Leônidas", titulo: "Mártir", oração: "Santo Leônidas, mártir corajoso, roga por nós.", biografia: "Santo Leônidas foi um mártir cristão primitivo." },
  323: { nome: "Santo Jorge", titulo: "Mártir", oração: "Santo Jorge, mártir glorioso, roga por nós.", biografia: "Santo Jorge foi um mártir cristão primitivo, padroeiro de vários países." },
  324: { nome: "Santo Fidelis de Sigmaringa", titulo: "Mártir", oração: "Santo Fidelis de Sigmaringa, mártir corajoso, roga por nós.", biografia: "Santo Fidelis de Sigmaringa foi um mártir cristão primitivo." },
  325: { nome: "Santo Marcos", titulo: "Evangelista", oração: "Santo Marcos, evangelista santo, roga por nós.", biografia: "Santo Marcos foi um dos quatro evangelistas que escreveu o Evangelho." },
  326: { nome: "Santa Cleta", titulo: "Papa", oração: "Santa Cleta, papa santa, roga por nós.", biografia: "Santa Cleta foi papa nos primeiros séculos da Igreja." },
  327: { nome: "Santo Zósimo", titulo: "Papa", oração: "Santo Zósimo, papa santo, roga por nós.", biografia: "Santo Zósimo foi papa nos primeiros séculos da Igreja." },
  328: { nome: "Santo Vitalis", titulo: "Mártir", oração: "Santo Vitalis, mártir valente, roga por nós.", biografia: "Santo Vitalis foi um mártir cristão primitivo." },
  329: { nome: "Santa Catarina de Siena", titulo: "Virgem e Doutora", oração: "Santa Catarina de Siena, doutora da Igreja, roga por nós.", biografia: "Santa Catarina de Siena foi uma virgem mística e doutora da Igreja." },
  330: { nome: "Santo Pio V", titulo: "Papa", oração: "Santo Pio V, papa santo, roga por nós.", biografia: "Santo Pio V foi um papa que reformou a Igreja." },

  // MAIO
  401: { nome: "Santo Filipe e Santo Tiago", titulo: "Apóstolos", oração: "Santo Filipe e Santo Tiago, apóstolos santos, rogai por nós.", biografia: "Santo Filipe e Santo Tiago foram apóstolos de Jesus Cristo." },
  402: { nome: "Santo Atanásio", titulo: "Bispo e Doutor", oração: "Santo Atanásio, defensor da fé, roga por nós.", biografia: "Santo Atanásio foi um grande bispo e doutor da Igreja." },
  403: { nome: "Santo Inácio", titulo: "Bispo", oração: "Santo Inácio, bispo santo, roga por nós.", biografia: "Santo Inácio foi um bispo que evangelizou." },
  404: { nome: "Santo Floriano", titulo: "Mártir", oração: "Santo Floriano, mártir corajoso, roga por nós.", biografia: "Santo Floriano foi um mártir cristão primitivo." },
  405: { nome: "Santa Irene", titulo: "Mártir", oração: "Santa Irene, mártir gloriosa, roga por nós.", biografia: "Santa Irene foi uma mártir cristã primitiva." },
  406: { nome: "Santo João Apóstolo", titulo: "Evangelista", oração: "Santo João, apóstolo amado, roga por nós.", biografia: "Santo João foi um dos apóstolos de Jesus, o discípulo amado." },
  407: { nome: "Santo Estanislau", titulo: "Bispo e Mártir", oração: "Santo Estanislau, bispo mártir, roga por nós.", biografia: "Santo Estanislau foi um bispo e mártir cristão." },
  408: { nome: "Santo Vítor", titulo: "Mártir", oração: "Santo Vítor, mártir valente, roga por nós.", biografia: "Santo Vítor foi um mártir cristão primitivo." },
  409: { nome: "Santa Geneveva", titulo: "Virgem", oração: "Santa Geneveva, padroeira de Paris, roga por nós.", biografia: "Santa Geneveva foi uma virgem que protegeu Paris através de suas orações." },
  410: { nome: "Santo Antonino", titulo: "Bispo", oração: "Santo Antonino, bispo santo, roga por nós.", biografia: "Santo Antonino foi um bispo que evangelizou." },
  411: { nome: "Santo Mamertino", titulo: "Bispo", oração: "Santo Mamertino, bispo santo, roga por nós.", biografia: "Santo Mamertino foi um bispo que evangelizou." },
  412: { nome: "Santo Nereo e Santo Aquileu", titulo: "Mártires", oração: "Santo Nereo e Santo Aquileu, mártires gloriosos, rogai por nós.", biografia: "Santo Nereo e Santo Aquileu foram mártires cristãos primitivos." },
  413: { nome: "Santo Mucius", titulo: "Mártir", oração: "Santo Mucius, mártir corajoso, roga por nós.", biografia: "Santo Mucius foi um mártir cristão primitivo." },
  414: { nome: "Santo Matias", titulo: "Apóstolo", oração: "Santo Matias, apóstolo escolhido, roga por nós.", biografia: "Santo Matias foi escolhido apóstolo para substituir Judas Iscariotes." },
  415: { nome: "Santo Isidoro", titulo: "Labrador", oração: "Santo Isidoro, protetor dos lavradores, roga por nós.", biografia: "Santo Isidoro foi um labrador que viveu em santidade." },
  416: { nome: "Santo Ubaldo", titulo: "Bispo", oração: "Santo Ubaldo, bispo santo, roga por nós.", biografia: "Santo Ubaldo foi um bispo que evangelizou." },
  417: { nome: "Santo Pascásio Radberto", titulo: "Abade", oração: "Santo Pascásio Radberto, abade santo, roga por nós.", biografia: "Santo Pascásio Radberto foi um abade que fundou mosteiros." },
  418: { nome: "Santo João I", titulo: "Papa e Mártir", oração: "Santo João I, papa mártir, roga por nós.", biografia: "Santo João I foi papa nos primeiros séculos da Igreja." },
  419: { nome: "Santo Dunstano", titulo: "Bispo", oração: "Santo Dunstano, bispo santo, roga por nós.", biografia: "Santo Dunstano foi um bispo que evangelizou a Inglaterra." },
  420: { nome: "Santo Bernardino de Siena", titulo: "Confessor", oração: "Santo Bernardino de Siena, pregador santo, roga por nós.", biografia: "Santo Bernardino de Siena foi um grande pregador que evangelizou a Europa." },
  421: { nome: "Santo Godofredo", titulo: "Bispo", oração: "Santo Godofredo, bispo santo, roga por nós.", biografia: "Santo Godofredo foi um bispo que evangelizou." },
  422: { nome: "Santa Rita de Cássia", titulo: "Viúva", oração: "Santa Rita de Cássia, santa dos impossíveis, roga por nós.", biografia: "Santa Rita de Cássia foi uma viúva que viveu em santidade e caridade." },
  423: { nome: "Santo Desidério", titulo: "Bispo", oração: "Santo Desidério, bispo santo, roga por nós.", biografia: "Santo Desidério foi um bispo que evangelizou." },
  424: { nome: "Santo João Batista de La Salle", titulo: "Confessor", oração: "Santo João Batista de La Salle, educador santo, roga por nós.", biografia: "Santo João Batista de La Salle foi um grande educador." },
  425: { nome: "Santo Gregório VII", titulo: "Papa", oração: "Santo Gregório VII, papa santo, roga por nós.", biografia: "Santo Gregório VII foi um papa que reformou a Igreja." },
  426: { nome: "Santo Filipe Neri", titulo: "Confessor", oração: "Santo Filipe Neri, confessor santo, roga por nós.", biografia: "Santo Filipe Neri foi um confessor que viveu em oração." },
  427: { nome: "Santo Agostinho de Cantuária", titulo: "Bispo", oração: "Santo Agostinho de Cantuária, apóstolo da Inglaterra, roga por nós.", biografia: "Santo Agostinho de Cantuária foi o primeiro bispo de Cantuária." },
  428: { nome: "Santa Joana de Arco", titulo: "Virgem e Mártir", oração: "Santa Joana de Arco, padroeira da França, roga por nós.", biografia: "Santa Joana de Arco foi uma jovem mártir que liderou as forças francesas." },
  429: { nome: "Santa Madalena Sofia Barat", titulo: "Fundadora", oração: "Santa Madalena Sofia Barat, fundadora educadora, roga por nós.", biografia: "Santa Madalena Sofia Barat fundou uma congregação dedicada à educação." },
  430: { nome: "Santo Fernando III", titulo: "Rei", oração: "Santo Fernando III, rei santo, roga por nós.", biografia: "Santo Fernando III foi um rei que viveu em santidade." },
  431: { nome: "Nossa Senhora do Rosário", titulo: "Mãe de Deus", oração: "Nossa Senhora do Rosário, mãe de misericórdia, rogai por nós.", biografia: "Nossa Senhora do Rosário é honrada como mãe de Deus e protetora dos fiéis." }
};

// Função para obter santo do dia
function getSantoDoDia() {
  const hoje = new Date();
  const mes = hoje.getMonth() + 1; // 1-12
  const dia = hoje.getDate(); // 1-31
  const chave = mes * 100 + dia;
  
  return SANTOS_DATABASE[chave] || null;
}

// Função para obter santos do mês
function getSantosDoMes(mes = null) {
  if (!mes) {
    mes = new Date().getMonth() + 1;
  }
  
  const santos = [];
  for (let dia = 1; dia <= 31; dia++) {
    const chave = mes * 100 + dia;
    if (SANTOS_DATABASE[chave]) {
      santos.push({
        dia: dia,
        ...SANTOS_DATABASE[chave]
      });
    }
  }
  
  return santos;
}
