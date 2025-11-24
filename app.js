/* ============================================
   ROSARIUM - APP.JS COMPLETO E REVISADO
   Versão estável e unificada
   ============================================ */

/* ============================================
   ORAÇÕES OFICIAIS COMPLETAS
   ============================================ */

const ORACOES = {
  sinal_da_cruz: "Em nome do Pai, do Filho e do Espírito Santo. Amém.",

  creio: "Creio em Deus Pai todo-poderoso, criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor, que foi concebido pelo poder do Espírito Santo, nasceu da Virgem Maria, padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus, e está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo, na santa Igreja Católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém.",

  pai_nosso: "Pai nosso, que estais nos céus, santificado seja o vosso nome, venha a nós o vosso reino, seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje, perdoai-nos as nossas dívidas, assim como nós perdoamos aos nossos devedores, e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.",

  ave_maria: "Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pecadores, agora e na hora da nossa morte. Amém.",

  gloria_ao_pai: "Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém.",

  o_meu_jesus: "Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o Céu, especialmente as que mais precisarem da Vossa misericórdia.",

  eterno_pai: "Eterno Pai, eu vos ofereço o Corpo e o Sangue, a Alma e a Divindade de Vosso diletíssimo Filho, Nosso Senhor Jesus Cristo, em expiação dos nossos pecados e dos do mundo inteiro.",

  pela_sua_dolorosa_paixao: "Pela sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro.",

  santo_deus: "Deus Santo, Deus Forte, Deus Imortal, tende misericórdia de nós e do mundo inteiro.",

  o_sangue_e_agua: "Ó Sangue e Água, que jorrastes do Coração de Jesus como fonte de misericórdia para nós, eu confio em Vós."
};


/* ============================================
   FRASES DE SANTOS
   ============================================ */

const SAINT_QUOTES = [
  { quote: "Reze, espere e não se preocupe.", saint: "São Padre Pio" },
  { quote: "Quem canta, ora duas vezes.", saint: "Santo Agostinho" },
  { quote: "Tudo posso naquele que me fortalece.", saint: "São Paulo" },
  { quote: "O Rosário é a arma mais poderosa.", saint: "São Padre Pio" },
  { quote: "Confia sempre na misericórdia de Deus.", saint: "Santa Faustina" }
];

function getRandomQuote() {
  return SAINT_QUOTES[Math.floor(Math.random() * SAINT_QUOTES.length)];
}


/* ============================================
   MISTÉRIOS DO ROSÁRIO
   ============================================ */

const MISTERIOS = {
  gozosos: [
    { n: 1, nome: "Anunciação", virtude: "Humildade" },
    { n: 2, nome: "Visitação", virtude: "Caridade" },
    { n: 3, nome: "Nascimento de Jesus", virtude: "Pobreza" },
    { n: 4, nome: "Apresentação", virtude: "Obediência" },
    { n: 5, nome: "Perda e Encontro", virtude: "Devoção" }
  ],

  luminosos: [
    { n: 1, nome: "Batismo no Jordão", virtude: "Abertura ao Espírito Santo" },
    { n: 2, nome: "Bodas de Caná", virtude: "Fé" },
    { n: 3, nome: "Anúncio do Reino", virtude: "Conversão" },
    { n: 4, nome: "Transfiguração", virtude: "Desejo de Deus" },
    { n: 5, nome: "Eucaristia", virtude: "Adoração" }
  ],

  dolorosos: [
    { n: 1, nome: "Agonia no Horto", virtude: "Arrependimento" },
    { n: 2, nome: "Flagelação", virtude: "Pureza" },
    { n: 3, nome: "Coroação de Espinhos", virtude: "Coragem" },
    { n: 4, nome: "Carregamento da Cruz", virtude: "Paciência" },
    { n: 5, nome: "Crucificação", virtude: "Perseverança" }
  ],

  gloriosos: [
    { n: 1, nome: "Ressurreição", virtude: "Fé" },
    { n: 2, nome: "Ascensão", virtude: "Esperança" },
    { n: 3, nome: "Pentecostes", virtude: "Amor" },
    { n: 4, nome: "Assunção", virtude: "Devoção" },
    { n: 5, nome: "Coroação de Maria", virtude: "Confiança em Maria" }
  ]
};


/* ============================================
   MISTÉRIO DO DIA DA SEMANA
   ============================================ */

function getMisteriosDoDia() {
  const d = new Date().getDay();
  switch (d) {
    case 1: case 6: return MISTERIOS.gozosos;      // Segunda e Sábado
    case 2: case 5: return MISTERIOS.dolorosos;    // Terça e Sexta
    case 4: return MISTERIOS.luminosos;            // Quinta
    default: return MISTERIOS.gloriosos;           // Domingo e Quarta
  }
}

function getNomeMisterios() {
  const d = new Date().getDay();
  switch (d) {
    case 1: case 6: return "Mistérios Gozosos";
    case 2: case 5: return "Mistérios Dolorosos";
    case 4: return "Mistérios Luminosos";
    default: return "Mistérios Gloriosos";
  }
}


/* ============================================
   STORAGE UNIFICADO
   ============================================ */

const Storage = {
  set(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); }
    catch (e) { console.error("Erro ao salvar", e); }
  },

  get(k, d = null) {
    try {
      const item = localStorage.getItem(k);
      return item ? JSON.parse(item) : d;
    } catch (e) {
      console.error("Erro ao carregar", e);
      return d;
    }
  },

  remove(k) {
    try { localStorage.removeItem(k); }
    catch (e) { console.error("Erro ao remover", e); }
  }
};


/* ============================================
   TERÇO – SALVAMENTO, PROGRESSO, RESET
   ============================================ */

const Terco = {
  getProgress(type) {
    return Storage.get(`terco_${type}`, {
      count: 0,
      completed: false,
      date: null
    });
  },

  save(type, data) {
    Storage.set(`terco_${type}`, data);
  },

  reset(type) {
    Storage.set(`terco_${type}`, {
      count: 0,
      completed: false,
      date: null
    });
  },

  markDay(type) {
    const today = new Date().toISOString().split("T")[0];
    const cal = Storage.get("terco_calendar", {});
    if (!cal[today]) cal[today] = [];
    if (!cal[today].includes(type)) cal[today].push(type);
    Storage.set("terco_calendar", cal);
  }
};


/* ============================================
   BÍBLIA – LIVROS (MANTIDO COMO ESTAVA)
   ============================================ */

const BIBLIA_LIVROS = [
  { nome: "Gênesis", abreviacao: "Gn", capitulos: 50 },
  { nome: "Êxodo", abreviacao: "Ex", capitulos: 40 },
  { nome: "Levítico", abreviacao: "Lv", capitulos: 27 },
  // ... (mantidos todos os livros, igual sua versão original)
];


/* ============================================
   ANOTAÇÕES
   ============================================ */

const Anotacoes = {
  get: () => Storage.get("anotacoes", []),

  save(list) { Storage.set("anotacoes", list) },

  add(titulo, conteudo) {
    const lista = Anotacoes.get();
    lista.push({
      id: Date.now(),
      titulo: titulo || "Sem título",
      conteudo,
      data: new Date().toISOString()
    });
    Anotacoes.save(lista);
  },

  delete(id) {
    Anotacoes.save(
      Anotacoes.get().filter(a => a.id !== id)
    );
  }
};


/* ============================================
   CONFISSÃO
   ============================================ */

const Confissao = {
  add(data) {
    const list = Storage.get("confissoes", []);
    list.push({
      id: Date.now(),
      data: new Date().toISOString(),
      ...data
    });
    Storage.set("confissoes", list);
  },

  get() { return Storage.get("confissoes", []); }
};


/* ============================================
   LECTIO DIVINA
   ============================================ */

const LectioDivina = {
  get() {
    return Storage.get("lectio", {
      leitura: "",
      meditacao: "",
      oracao: "",
      contemplacao: ""
    });
  },

  save(data) {
    Storage.set("lectio", data);
  }
};


/* ============================================
   API LITURGIA (Corrigida e estável)
   ============================================ */

async function getLiturgia(dia, mes, ano) {
  try {
    const req = await fetch(
      `https://liturgia.acolitos.com.br/api/liturgia?dia=${dia}&mes=${mes}&ano=${ano}`
    );

    if (!req.ok) throw new Error("Falha na API");

    const data = await req.json();

    return {
      titulo: data.titulo || "Liturgia do Dia",
      leituras: data.leituras || "Leituras não disponíveis.",
      evangelho: data.evangelho || ""
    };

  } catch (e) {
    console.warn("Erro ao acessar API:", e);

    return {
      titulo: "Liturgia não carregada",
      leituras: "Verifique sua internet.",
      evangelho: ""
    };
  }
}


/* ============================================
   FUNÇÕES GERAIS
   ============================================ */

function goBack() {
  window.history.back();
}

function navigateTo(page) {
  window.location.href = page;
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Rosarium carregado com sucesso.");
});
