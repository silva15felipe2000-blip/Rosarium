/* ============================================
   APP.JS - ROSARIUM (VERSÃO DE DEPURAÇÃO)
   - Tentativas em cascata: Railway -> Acolitos -> fallback local
   - Timeouts, logs e mensagens na UI
   ============================================ */

/* =========================
   UTILITÁRIOS
   ========================= */
const TIMEOUT_MS = 8000; // timeout para fetch

function timeoutFetch(url, opts = {}, ms = TIMEOUT_MS) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  return fetch(url, { ...opts, signal: controller.signal })
    .finally(() => clearTimeout(id));
}

function safeJson(res) {
  return res.text().then(text => {
    try { return JSON.parse(text); }
    catch { return text; }
  });
}

function el(id) { return document.getElementById(id); }

function showLiturgiaMessage(html) {
  const container = el('liturgia-container');
  if (!container) { console.warn('liturgia-container não encontrado'); return; }
  container.innerHTML = html;
}

/* =========================
   ORAÇÕES / MISTÉRIOS (resumo)
   ========================= */
const ORACOES = {
  sinal_da_cruz: "Em nome do Pai, do Filho e do Espírito Santo. Amém.",
  creio: "Creio em Deus Pai todo-poderoso, criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor...",
  pai_nosso: "Pai nosso, que estais nos céus, santificado seja o vosso nome...",
  ave_maria: "Ave Maria, cheia de graça...",
  gloria_ao_pai: "Glória seja ao Pai, e ao Filho, e ao Espírito Santo. Amém."
};

/* =========================
   Fallback local (se todas as APIs falharem)
   ========================= */
function liturgiaFallback(day, month, year) {
  return {
    titulo: `Liturgia - ${day}/${month}/${year}`,
    leituras: `
      <strong>Primeira Leitura:</strong><br> (offline) Leia um trecho bíblico que você tenha salvo.<br><br>
      <strong>Salmo:</strong><br> (offline) Salmo indisponível.<br><br>
    `,
    evangelho: "(offline) Evangelho não disponível sem conexão"
  };
}

/* =========================
   PROVEDORES (tentativa em cascata)
   ========================= */

async function tryRailway(day, month, year) {
  const url = `https://liturgia.up.railway.app/liturgia/${year}/${month}/${day}`;
  console.log('[Liturgia] tentando Railway:', url);
  const res = await timeoutFetch(url);
  if (!res.ok) throw new Error(`Railway retornou ${res.status}`);
  const data = await safeJson(res);
  console.log('[Liturgia][Railway] recebido', data);
  return {
    titulo: data.titulo || 'Liturgia do Dia',
    leituras: buildLeiturasHtmlFromApi(data),
    evangelho: data.evangelho || ''
  };
}

async function tryAcolitos(day, month, year) {
  // endpoint antigo - pode ter CORS — tentamos mesmo assim
  const url = `https://liturgia.acolitos.com.br/api/liturgia?dia=${day}&mes=${month}&ano=${year}`;
  console.log('[Liturgia] tentando Acolitos:', url);
  const res = await timeoutFetch(url);
  if (!res.ok) throw new Error(`Acolitos retornou ${res.status}`);
  const data = await safeJson(res);
  console.log('[Liturgia][Acolitos] recebido', data);
  // dependendo do formato, adaptamos
  return {
    titulo: data.titulo || 'Liturgia do Dia',
    leituras: buildLeiturasHtmlFromApi(data),
    evangelho: data.evangelho || data.evangelhoCurto || ''
  };
}

function buildLeiturasHtmlFromApi(data) {
  // função robusta que tenta extrair campos comuns
  const parts = [];
  if (data.primeiraLeitura || data.leitura1 || data.leituras?.primeira) {
    const txt = data.primeiraLeitura || data.leitura1 || (data.leituras && data.leituras.primeira) || '';
    parts.push(`<strong>Primeira Leitura:</strong><br>${txt}<br><br>`);
  }
  if (data.segundaLeitura || data.leitura2 || data.leituras?.segunda) {
    const txt = data.segundaLeitura || data.leitura2 || (data.leituras && data.leituras.segunda) || '';
    parts.push(`<strong>Segunda Leitura:</strong><br>${txt}<br><br>`);
  }
  if (data.salmo || data.psalm || data.leituras?.salmo) {
    const txt = data.salmo || data.psalm || (data.leituras && data.leituras.salmo) || '';
    parts.push(`<strong>Salmo:</strong><br>${txt}<br><br>`);
  }
  // se nada foi encontrado, tente usar data.leituras texto plano
  if (parts.length === 0 && (typeof data.leituras === 'string' && data.leituras.trim())) {
    parts.push(`<strong>Leituras:</strong><br>${data.leituras}<br><br>`);
  }
  if (parts.length === 0) parts.push('Leituras não disponíveis.');
  return parts.join('');
}

/* =========================
   FUNÇÃO PRINCIPAL - tenta em cascata
   ========================= */

async function getLiturgia(day, month, year) {
  // normalizar: sem zeros à esquerda
  day = String(Number(day));
  month = String(Number(month));
  year = String(Number(year));

  const attempts = [
    { name: 'Railway', fn: tryRailway },
    { name: 'Acolitos', fn: tryAcolitos }
  ];

  let lastError = null;

  for (const provider of attempts) {
    try {
      const result = await provider.fn(day, month, year);
      console.log(`[Liturgia] provider ${provider.name} sucesso`);
      return result;
    } catch (err) {
      console.warn(`[Liturgia] provider ${provider.name} falhou:`, err.message || err);
      lastError = err;
      // continua para o próximo
    }
  }

  console.warn('[Liturgia] todos os provedores falharam. Usando fallback local.', lastError);
  return liturgiaFallback(day, month, year);
}

/* =========================
   UI / Liturgia page helpers
   ========================= */

let liturgiaDataCache = null;

async function loadLiturgiaFromInput() {
  const dateInput = el('date-input');
  if (!dateInput) { console.warn('date-input não encontrado'); return; }
  const dateVal = dateInput.value;
  if (!dateVal) { showLiturgiaMessage('<p style="text-align:center">Escolha uma data.</p>'); return; }

  const [year, month, day] = dateVal.split('-');
  showLiturgiaMessage('<p style="text-align:center">Carregando liturgia...</p>');
  try {
    const data = await getLiturgia(day, month, year);
    liturgiaDataCache = data;
    const html = `
      <div class="card">
        <h3 class="card-title">${escapeHtml(data.titulo || 'Liturgia do Dia')}</h3>
        <div class="card-content">
          ${data.leituras ? `<h4 style="margin-top:1rem;font-weight:600">Leituras:</h4><p>${data.leituras}</p>` : ''}
          ${data.evangelho ? `<h4 style="margin-top:1rem;font-weight:600">Evangelho:</h4><p>${escapeHtml(data.evangelho)}</p>` : ''}
        </div>
      </div>
    `;
    showLiturgiaMessage(html);
    // mostrar botão lectio
    const lectioBtnContainer = el('lectio-button-container');
    if (lectioBtnContainer) lectioBtnContainer.style.display = 'block';
  } catch (e) {
    console.error('Erro ao carregar liturgia (catch final):', e);
    showLiturgiaMessage(`<div class="card"><div class="card-content"><p style="color:var(--destructive)">Erro ao carregar liturgia. ${escapeHtml(String(e.message || e))}</p></div></div>`);
  }
}

function escapeHtml(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* =========================
   LECTIO helpers (simples)
   ========================= */

let currentLectioStep = 1;
function startLectio() {
  const liturgiaContainer = el('liturgia-container');
  const lectioContainer = el('lectio-container');
  const lectioBtnContainer = el('lectio-button-container');
  if (liturgiaContainer) liturgiaContainer.style.display = 'none';
  if (lectioBtnContainer) lectioBtnContainer.style.display = 'none';
  if (lectioContainer) {
    lectioContainer.classList.remove('hidden');
    selectLectioStep(1);
  }
}

function selectLectioStep(step) {
  currentLectioStep = step;
  const titles = ['1. Leitura', '2. Meditação', '3. Oração', '4. Contemplação'];
  const contents = [
    'Leia atentamente a passagem bíblica da Liturgia Diária. Deixe a Palavra de Deus falar ao seu coração.',
    'Medite sobre o que você leu. O que Deus quer dizer para você através dessa passagem?',
    'Ore respondendo ao que Deus lhe disse. Converse com Deus sobre seus sentimentos e compreensão.',
    'Contemple a presença de Deus. Descanse em silêncio na presença do Senhor.'
  ];
  const stepTitle = el('step-title');
  const stepContent = el('step-content');
  if (stepTitle) stepTitle.textContent = titles[step-1] || 'Etapa';
  if (stepContent) stepContent.innerHTML = `<p>${contents[step-1] || ''}</p>`;
  const saved = Storage.get(`lectio_step_${step}`, '');
  const notes = el('step-notes');
  if (notes) notes.value = saved || '';
  // atualizar botões visuais
  for (let i=1;i<=4;i++){
    const btn = el(`step-${i}-btn`);
    if (!btn) continue;
    if (i===step) btn.classList.remove('btn-outline'); else btn.classList.add('btn-outline');
  }
}

function saveLectioStep() {
  const notes = el('step-notes');
  if (!notes) return alert('Campo de notas não encontrado');
  Storage.set(`lectio_step_${currentLectioStep}`, notes.value || '');
  alert('Anotações salvas com sucesso!');
}

function closeLectio() {
  const lectioContainer = el('lectio-container');
  const liturgiaContainer = el('liturgia-container');
  const lectioBtnContainer = el('lectio-button-container');
  if (lectioContainer) lectioContainer.classList.add('hidden');
  if (liturgiaContainer) liturgiaContainer.style.display = 'block';
  if (lectioBtnContainer) lectioBtnContainer.style.display = 'block';
}

/* =========================
   Inicialização global
   ========================= */

document.addEventListener('DOMContentLoaded', () => {
  console.log('[APP] DOMContentLoaded - iniciando');

  // se houver um campo date-input, preenche com hoje
  const dateInput = el('date-input');
  if (dateInput) {
    const today = new Date();
    const iso = today.toISOString().split('T')[0];
    if (!dateInput.value) dateInput.value = iso;
  }

  // botões (se existirem no HTML)
  const btnLoad = document.querySelector('[onclick="loadLiturgia()"], button.btn[onclick*="loadLiturgia"]');
  // não dependemos do botão; chamamos função abaixo para inicializar
  // Expõe função global para ser chamada do HTML
  window.getLiturgia = getLiturgia;
  window.loadLiturgia = loadLiturgiaFromInput;
  window.startLectio = startLectio;
  window.selectLectioStep = selectLectioStep;
  window.saveLectioStep = saveLectioStep;
  window.closeLectio = closeLectio;

  // se tiver container de liturgia, carrega a data atual automaticamente
  if (el('liturgia-container') && el('date-input')) {
    // tenta carregar automaticamente
    setTimeout(() => {
      try { loadLiturgiaFromInput(); }
      catch (e) { console.error('Erro auto-loading liturgia', e); }
    }, 250);
  }
});
