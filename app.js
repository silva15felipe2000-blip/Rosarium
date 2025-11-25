/* app.js
   Centraliza PIN, Anotações, Terço e Confissão usados pelas páginas.
   PIN padrão: "1234"
*/

(function () {
  /* ---------------------------
     STORAGE
  --------------------------- */
  const Storage = {
    set: (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { console.error(e); } },
    get: (key, def = null) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch (e) { console.error(e); return def; } },
    remove: (key) => { try { localStorage.removeItem(key); } catch (e) { console.error(e); } }
  };

  /* ---------------------------
     PIN
  --------------------------- */
  const PIN = {
    key: 'app_pin',
    defaultPin: '1234',
    getPin() {
      // garante string de 4
      const p = Storage.get(this.key, this.defaultPin) || this.defaultPin;
      return String(p).slice(0, 4);
    },
    setPin(pin) {
      const s = String(pin).replace(/\D/g, '').slice(0, 4);
      Storage.set(this.key, s);
    },
    verify(pin) {
      return String(pin) === this.getPin();
    }
  };

  // expõe globalmente (páginas usam PIN.verify/setPin)
  window.PIN = PIN;

  /* ---------------------------
     ANOTAÇÕES
  --------------------------- */
  const Anotacoes = {
    storageKey: 'anotacoes_data',
    getAnotacoes() {
      return Storage.get(this.storageKey, []);
    },
    add(titulo, conteudo) {
      const arr = this.getAnotacoes();
      const item = { id: Date.now(), titulo: titulo || 'Sem título', conteudo: conteudo || '', date: new Date().toISOString() };
      arr.push(item);
      Storage.set(this.storageKey, arr);
      return item;
    },
    update(id, titulo, conteudo) {
      const arr = this.getAnotacoes();
      const idx = arr.findIndex(x => x.id === id);
      if (idx === -1) return false;
      arr[idx].titulo = titulo || arr[idx].titulo;
      arr[idx].conteudo = conteudo || arr[idx].conteudo;
      arr[idx].date = new Date().toISOString();
      Storage.set(this.storageKey, arr);
      return true;
    },
    delete(id) {
      const arr = this.getAnotacoes().filter(a => a.id !== id);
      Storage.set(this.storageKey, arr);
    }
  };

  window.Anotacoes = Anotacoes;

  /* ---------------------------
     TERÇO  (stub / simples)
     - fornece um getTercoCalendar() para export
     - se você já tem outro Terco, mescle as funções conforme necessário
  --------------------------- */
  const Terco = {
    key: 'terco_calendar',
    getTercoCalendar() {
      // retorna algo previamente salvo ou array vazio
      return Storage.get(this.key, []);
    },
    // util para salvar (não usado pelas páginas automaticamente)
    setTercoCalendar(data) {
      Storage.set(this.key, data);
    }
  };

  window.Terco = Terco;

  /* ---------------------------
     CONFISSÃO (stub / simples)
  --------------------------- */
  const Confissao = {
    key: 'confissoes_data',
    getConfissoes() {
      return Storage.get(this.key, []);
    },
    setConfissoes(data) {
      Storage.set(this.key, data);
    }
  };

  window.Confissao = Confissao;

  /* ---------------------------
     UTILITÁRIOS & UI
  --------------------------- */
  function goBack() {
    if (document.referrer && history.length > 1) {
      history.back();
    } else {
      window.location.href = "home.html";
    }
  }
  window.goBack = goBack;

  // pequeno helper para escapar HTML ao inserir títulos
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* ---------------------------
     PIN UI handlers (compatíveis com seus inputs inline)
  --------------------------- */
  function handlePinInput(e, index) {
    const inputs = document.querySelectorAll('.pin-input input');
    if (!inputs || inputs.length === 0) return;

    const val = e.target.value || '';
    // aceita apenas último dígito numérico
    const allowed = val.replace(/\D/g, '');
    if (allowed.length > 1) {
      e.target.value = allowed.slice(-1);
    } else {
      e.target.value = allowed;
    }

    if (e.target.value && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }

    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputs[index - 1].focus();
    }

    // Enter: tenta logar
    if (e.key === 'Enter') {
      verifyPin();
    }
  }
  window.handlePinInput = handlePinInput;

  // permite colar 4 dígitos
  function enablePinPaste() {
    const container = document.querySelector('.pin-input');
    if (!container) return;
    const inputs = container.querySelectorAll('input');
    inputs.forEach((input, idx) => {
      input.addEventListener('paste', (ev) => {
        ev.preventDefault();
        const paste = (ev.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
        if (!paste) return;
        for (let i = 0; i < paste.length && (idx + i) < inputs.length; i++) {
          inputs[idx + i].value = paste[i];
        }
        const next = Math.min(inputs.length - 1, idx + paste.length);
        inputs[next].focus();
      });
    });
  }

  function verifyPin() {
    const inputs = document.querySelectorAll('.pin-input input');
    if (!inputs || inputs.length === 0) {
      // no pin inputs on this page
      return;
    }
    const pin = Array.from(inputs).map(i => i.value).join('');
    if (pin.length !== 4) {
      alert('Digite um PIN de 4 dígitos');
      return;
    }
    if (PIN.verify(pin)) {
      showAnotacoesScreen();
    } else {
      alert('PIN incorreto');
      inputs.forEach(i => i.value = '');
      inputs[0].focus();
    }
  }
  window.verifyPin = verifyPin;

  /* ---------------------------
     ANOTAÇÕES UI (usadas por anotacoes.html)
  --------------------------- */
  let editingId = null;

  function initAnotacoes() {
    enablePinPaste();
    showPinScreen();
  }

  function showPinScreen() {
    const pin = document.getElementById('pin-screen');
    const anot = document.getElementById('anotacoes-screen');
    const form = document.getElementById('form-screen');
    if (pin) pin.classList.remove('hidden');
    if (anot) anot.classList.add('hidden');
    if (form) form.classList.add('hidden');

    // limpa campos PIN
    const inputs = document.querySelectorAll('.pin-input input');
    if (inputs && inputs.length) {
      inputs.forEach(i => i.value = '');
      // foco
      setTimeout(() => { if (inputs[0]) inputs[0].focus(); }, 20);
    }
  }

  function showAnotacoesScreen() {
    const pin = document.getElementById('pin-screen');
    const anot = document.getElementById('anotacoes-screen');
    const form = document.getElementById('form-screen');
    if (pin) pin.classList.add('hidden');
    if (anot) anot.classList.remove('hidden');
    if (form) form.classList.add('hidden');
    loadAnotacoes();
  }

  function loadAnotacoes() {
    const list = document.getElementById('anotacoes-list');
    if (!list) return;
    const notas = Anotacoes.getAnotacoes();
    list.innerHTML = '';
    if (!notas || notas.length === 0) {
      list.innerHTML = '<p style="text-align:center;color:#555;">Nenhuma anotação ainda</p>';
      return;
    }
    notas.forEach(n => {
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `
        <div>
          <strong>${escapeHtml(n.titulo)}</strong><br>
          <small>${new Date(n.date).toLocaleDateString('pt-BR')}</small>
        </div>
        <div>
          <button data-id="${n.id}" data-action="edit">Editar</button>
          <button data-id="${n.id}" data-action="delete">Excluir</button>
        </div>
      `;
      list.appendChild(div);
    });

    // delegação simples
    list.onclick = function (ev) {
      const btn = ev.target.closest('button[data-action]');
      if (!btn) return;
      const id = Number(btn.getAttribute('data-id'));
      const action = btn.getAttribute('data-action');
      if (action === 'edit') editAnotacao(id);
      if (action === 'delete') deleteAnotacao(id);
    };
  }

  function showNewAnotacao() {
    editingId = null;
    const titleEl = document.getElementById('form-title');
    if (titleEl) titleEl.textContent = 'Nova Anotação';
    const t = document.getElementById('anotacao-titulo');
    const c = document.getElementById('anotacao-conteudo');
    if (t) t.value = '';
    if (c) c.value = '';
    document.getElementById('anotacoes-screen').classList.add('hidden');
    document.getElementById('form-screen').classList.remove('hidden');
    if (t) t.focus();
  }
  window.showNewAnotacao = showNewAnotacao;

  function editAnotacao(id) {
    const nota = Anotacoes.getAnotacoes().find(a => a.id === id);
    if (!nota) return;
    editingId = id;
    const titleEl = document.getElementById('form-title');
    if (titleEl) titleEl.textContent = 'Editar Anotação';
    document.getElementById('anotacao-titulo').value = nota.titulo;
    document.getElementById('anotacao-conteudo').value = nota.conteudo;
    document.getElementById('anotacoes-screen').classList.add('hidden');
    document.getElementById('form-screen').classList.remove('hidden');
  }
  window.editAnotacao = editAnotacao;

  function saveAnotacao() {
    const titulo = document.getElementById('anotacao-titulo').value.trim();
    const conteudo = document.getElementById('anotacao-conteudo').value.trim();
    if (!titulo || !conteudo) {
      alert('Preencha todos os campos');
      return;
    }
    if (editingId) {
      Anotacoes.update(editingId, titulo, conteudo);
    } else {
      Anotacoes.add(titulo, conteudo);
    }
    cancelForm();
  }
  window.saveAnotacao = saveAnotacao;

  function deleteAnotacao(id) {
    if (confirm('Deseja excluir esta anotação?')) {
      Anotacoes.delete(id);
      loadAnotacoes();
    }
  }
  window.deleteAnotacao = deleteAnotacao;

  function cancelForm() {
    editingId = null;
    const form = document.getElementById('form-screen');
    const anot = document.getElementById('anotacoes-screen');
    if (form) form.classList.add('hidden');
    if (anot) anot.classList.remove('hidden');
    loadAnotacoes();
  }
  window.cancelForm = cancelForm;

  function logout() {
    showPinScreen();
    document.querySelectorAll('.pin-input input').forEach(i => i.value = '');
  }
  window.logout = logout;

  /* ---------------------------
     CONFIGURAÇÕES handlers (configuracoes.html)
  --------------------------- */
  function changePin() {
    const currentPin = (document.getElementById('current-pin') || {}).value || '';
    const newPin = (document.getElementById('new-pin') || {}).value || '';
    const confirmPin = (document.getElementById('confirm-pin') || {}).value || '';

    if (!currentPin || !newPin || !confirmPin) {
      alert("Preencha todos os campos.");
      return;
    }

    if (!PIN.verify(currentPin)) {
      alert("PIN atual incorreto.");
      return;
    }

    if (newPin.length !== 4 || confirmPin.length !== 4 || isNaN(newPin) || isNaN(confirmPin)) {
      alert("O PIN deve ter 4 números.");
      return;
    }

    if (newPin !== confirmPin) {
      alert("Os PINs não coincidem.");
      return;
    }

    PIN.setPin(String(newPin));
    alert("PIN alterado com sucesso!");

    // limpa campos
    document.getElementById('current-pin').value = "";
    document.getElementById('new-pin').value = "";
    document.getElementById('confirm-pin').value = "";
  }
  window.changePin = changePin;

  function exportData() {
    const data = {
      terco: Terco.getTercoCalendar(),
      anotacoes: Anotacoes.getAnotacoes(),
      confissoes: Confissao.getConfissoes ? Confissao.getConfissoes() : Confissao.getConfissoes && Confissao.getConfissoes(),
      exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "rosarium-dados.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  window.exportData = exportData;

  function clearAllData() {
    if (!confirm("Deseja realmente apagar todos os dados?")) return;
    localStorage.clear();
    alert("Dados apagados.");
    window.location.href = "home.html";
  }
  window.clearAllData = clearAllData;

  /* ---------------------------
     Inicialização
  --------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    // garante PIN default se não existir
    if (!localStorage.getItem(PIN.key)) {
      PIN.setPin(PIN.defaultPin);
    }

    // se estiver na página de anotações, inicializa a UI
    if (document.getElementById('pin-screen')) {
      initAnotacoes();
    }

    // se estivermos na tela de configurações, não precisa inicializar anotações - as funções globais são suficientes
    // adiciona listeners extras (ex: enable paste) caso a página tenha .pin-input
    enablePinPaste();
  });

})();