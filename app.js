/* ============================================
   ROSARIUM - APP.JS VERSÃO COMPLETA ATUALIZADA
   Inclui API corrigida (Railway)
   ============================================ */

// ============================================
// ORAÇÕES OFICIAIS COMPLETAS
// ============================================

const ORACOES = {
  sinal_da_cruz: "Em nome do Pai, do Filho e do Espírito Santo. Amém.",

  creio: "Creio em Deus Pai todo-poderoso, criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor, que foi concebido pelo poder do Espírito Santo, nasceu da Virgem Maria, padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus, e está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo, na santa Igreja Católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém.",

  pai_nosso: "Pai nosso, que estais nos céus, santificado seja o vosso nome, venha a nós o vosso reino, seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje, perdoai-nos as nossas dívidas, assim como nós perdoamos aos nossos devedores, e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.",

  ave_maria: "Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pecadores, agora e na hora da nossa morte. Amém.",

  gloria_ao_pai: "Glória seja ao Pai, e ao Filho, e ao Espírito Santo. Como era no princípio, agora e sempre, por todos os séculos dos séculos. Amém.",

  o_meu_jesus: "Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas ao céu, especialmente as que mais precisarem da vossa misericórdia. Amém.",

  eterno_pai: "Eterno Pai, ofereço-vos o Corpo e o Sangue, a Alma e a Divindade de Nosso Senhor Jesus Cristo, em reparação dos nossos pecados e pelos do mundo inteiro.",

  pela_sua_dolorosa_paixao: "Pela sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro.",

  santo_deus: "Santo Deus, Santo Forte, Santo Imortal, tende misericórdia de nós e do mundo inteiro.",

  o_sangue_e_agua: "Ó Sangue e Água, que brotastes do Coração de Jesus como fonte de misericórdia para nós, confio em Vós. Amém."
};

// ============================================
// FRASES DE SANTOS
// ============================================

const SAINT_QUOTES = [
  { quote: "Não tenhas medo. A partir de agora serás pescador de homens.", saint: "Jesus Cristo (Lucas 5:10)" },
  { quote: "Tudo posso naquele que me fortalece.", saint: "São Paulo (Filipenses 4:13)" },
  { quote: "Reze, espere e não se preocupe.", saint: "São Padre Pio" },
  { quote: "A oração é a chave da manhã e o ferrolho da noite.", saint: "Santo Agostinho" },
  { quote: "Quem canta, ora duas vezes.", saint: "Santo Agostinho" },
  { quote: "O Rosário é a arma mais poderosa.", saint: "São Padre Pio" }
];

// ============================================
// MISTÉRIOS DO ROSÁRIO
// ============================================

const MISTERIOS = {
  gozosos: [
    { numero: 1, nome: "Anunciação", descricao: "O Anjo Gabriel anuncia a Maria.", virtude: "Humildade" },
    { numero: 2, nome: "Visitação", descricao: "Maria visita Isabel.", virtude: "Caridade" },
    { numero: 3, nome: "Nascimento de Jesus", descricao: "Jesus nasce em Belém.", virtude: "Pobreza" },
    { numero: 4, nome: "Apresentação", descricao: "Jesus é apresentado no Templo.", virtude: "Obediência" },
    { numero: 5, nome: "Perda e Encontro", descricao: "Jesus é encontrado no Templo.", virtude: "Busca por Deus" }
  ],

  dolorosos: [
    { numero: 1, nome: "Agonia no Horto", descricao: "Jesus sofre no Horto.", virtude: "Contrição" },
    { numero: 2, nome: "Flagelação", descricao: "Jesus é flagelado.", virtude: "Pureza" },
    { numero: 3, nome: "Coroação", descricao: "Jesus é coroado de espinhos.", virtude: "Paciência" },
    { numero: 4, nome: "Caminho do Calvário", descricao: "Jesus carrega a cruz.", virtude: "Perseverança" },
    { numero: 5, nome: "Crucifixão", descricao: "Jesus morre na cruz.", virtude: "Sacrifício" }
  ],

  gloriosos: [
    { numero: 1, nome: "Ressurreição", descricao: "Jesus ressuscita.", virtude: "Fé" },
    { numero: 2, nome: "Ascensão", descricao: "Jesus sobe aos céus.", virtude: "Esperança" },
    { numero: 3, nome: "Pentecostes", descricao: "O Espírito Santo desce.", virtude: "Caridade" },
    { numero: 4, nome: "Assunção", descricao: "Maria é levada ao Céu.", virtude: "Devoção" },
    { numero: 5, nome: "Coroação de Maria", descricao: "Maria é coroada.", virtude: "Confiança" }
  ],

  luminosos: [
    { numero: 1, nome: "Batismo", descricao: "Jesus é batizado.", virtude: "Abertura ao Espírito Santo" },
    { numero: 2, nome: "Bodas de Caná", descricao: "Jesus transforma água em vinho.", virtude: "Fé" },
    { numero: 3, nome: "Proclamação do Reino", descricao: "Jesus prega o Reino.", virtude: "Conversão" },
    { numero: 4, nome: "Transfiguração", descricao: "Jesus é transfigurado.", virtude: "Desejo de Deus" },
    { numero: 5, nome: "Eucaristia", descricao: "Jesus institui a Eucaristia.", virtude: "Adoração" }
  ]
};

// ============================================
// LOCALSTORAGE
// ============================================

const Storage = {
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  get: (key, def = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : def;
    } catch {
      return def;
    }
  },
  remove: (key) => localStorage.removeItem(key)
};

// ============================================
// LITURGIA (API CORRIGIDA - RAILWAY)
// ============================================

async function getLiturgia(day, month, year) {
  try {
    const url = `https://liturgia.up.railway.app/liturgia/${year}/${month}/${day}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error("Erro na API");

    const data = await response.json();

    return {
      titulo: data.titulo || "Liturgia do Dia",
      leituras: `
        <strong>Primeira Leitura:</strong><br>${data.primeiraLeitura || "Não disponível"}<br><br>
        ${data.segundaLeitura ? `<strong>Segunda Leitura:</strong><br>${data.segundaLeitura}<br><br>` : ""}
        <strong>Salmo:</strong><br>${data.salmo || "Não disponível"}<br><br>
      `,
      evangelho: data.evangelho || ""
    };

  } catch (error) {
    return {
      titulo: "Liturgia do Dia",
      leituras: "Conexão indisponível. Verifique sua internet.",
      evangelho: ""
    };
  }
}

// ============================================
// FUNÇÕES DE NAVEGAÇÃO
// ============================================

function goBack() {
  window.history.back();
}

function navigateTo(page) {
  window.location.href = page;
}

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("Rosarium carregado com sucesso");
});
