<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Anotações - Rosarium</title>
  <style>
    body { font-family: Arial, sans-serif; margin:0; padding:0; background:#f4f4f4; }
    .hidden { display: none; }
    .header { background: #800000; color: #fff; padding: 1rem; display:flex; align-items:center; }
    .header-title { display:flex; align-items:center; gap:0.5rem; font-weight:bold; font-size:1.2rem; }
    .btn { padding:0.5rem 1rem; cursor:pointer; border:none; background:#800000; color:#fff; border-radius:4px; }
    .btn-outline { border:1px solid #800000; background:#fff; color:#800000; }
    .btn-secondary { background:#555; color:#fff; }
    .container-md { max-width:600px; margin:2rem auto; }
    .card { background:#fff; padding:1rem 2rem; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); }
    .pin-input input { width:2rem; text-align:center; font-size:1.5rem; margin:0.25rem; }
    .items-list .item { background:#fff; margin-bottom:0.5rem; padding:0.5rem; border-radius:4px; display:flex; justify-content:space-between; align-items:center; }
    .item-actions button { margin-left:0.5rem; }
    .input, textarea { width:100%; padding:0.5rem; margin-top:0.25rem; margin-bottom:0.5rem; border:1px solid #ccc; border-radius:4px; }
    .form-group { margin-bottom:1rem; }
  </style>
</head>
<body>

  <!-- Header -->
  <header class="header">
    <button class="btn" onclick="goBack()">← Voltar</button>
    <div class="header-title">Anotações</div>
  </header>

  <div class="container-md">

    <!-- PIN SCREEN -->
    <div id="pin-screen">
      <div class="card">
        <h2>Anotações Privadas</h2>
        <p>Digite seu PIN de 4 dígitos</p>
        <div class="pin-input">
          <input type="text" maxlength="1" onkeyup="handlePinInput(event,0)">
          <input type="text" maxlength="1" onkeyup="handlePinInput(event,1)">
          <input type="text" maxlength="1" onkeyup="handlePinInput(event,2)">
          <input type="text" maxlength="1" onkeyup="handlePinInput(event,3)">
        </div>
        <button class="btn" onclick="verifyPin()">Entrar</button>
        <p>PIN padrão: 1234</p>
      </div>
    </div>

    <!-- ANOTAÇÕES SCREEN -->
    <div id="anotacoes-screen" class="hidden">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;">
        <h2>Minhas Anotações</h2>
        <button class="btn btn-secondary" onclick="showNewAnotacao()">+ Nova</button>
      </div>
      <div id="anotacoes-list" class="items-list"></div>
      <button class="btn btn-outline" style="margin-top:1rem;" onclick="logout()">Sair</button>
    </div>

    <!-- FORM SCREEN -->
    <div id="form-screen" class="hidden">
      <div class="card">
        <h2 id="form-title">Nova Anotação</h2>
        <div class="form-group">
          <label>Título:</label>
          <input type="text" id="anotacao-titulo" placeholder="Título da anotação">
        </div>
        <div class="form-group">
          <label>Conteúdo:</label>
          <textarea id="anotacao-conteudo" placeholder="Escreva sua anotação..."></textarea>
        </div>
        <div style="display:flex; gap:1rem;">
          <button class="btn" onclick="saveAnotacao()" style="flex:1;">Salvar</button>
          <button class="btn btn-outline" onclick="cancelForm()" style="flex:1;">Cancelar</button>
        </div>
      </div>
    </div>

  </div>

<script>
/* ---------------------------
   STORAGE
--------------------------- */
const Storage = {
  set: (key, val) => { try{localStorage.setItem(key,JSON.stringify(val))}catch(e){console.error(e);} },
  get: (key, def=null) => { try{const v=localStorage.getItem(key); return v?JSON.parse(v):def}catch(e){console.error(e); return def;} },
  remove: (key) => { try{localStorage.removeItem(key);}catch(e){console.error(e);} }
};

/* ---------------------------
   PIN
--------------------------- */
const PIN = {
  key: 'app_pin',
  defaultPin: '1234',
  getPin() { return Storage.get(this.key,this.defaultPin) || this.defaultPin; },
  setPin(pin) { Storage.set(this.key,String(pin).slice(0,4)); },
  verify(pin) { return String(pin) === this.getPin(); }
};

/* ---------------------------
   ANOTAÇÕES
--------------------------- */
const Anotacoes = {
  getAnotacoes() { return Storage.get('anotacoes_data', []); },
  add(titulo, conteudo) {
    const arr = this.getAnotacoes();
    const item = { id: Date.now(), titulo: titulo||'Sem título', conteudo:conteudo||'', date: new Date().toISOString() };
    arr.push(item); Storage.set('anotacoes_data',arr); return item;
  },
  update(id,titulo,conteudo){
    const arr=this.getAnotacoes(); const item=arr.find(x=>x.id===id);
    if(!item) return false; item.titulo=titulo||item.titulo; item.conteudo=conteudo||item.conteudo;
    Storage.set('anotacoes_data',arr); return true;
  },
  delete(id){
    const arr=this.getAnotacoes().filter(a=>a.id!==id);
    Storage.set('anotacoes_data',arr);
  }
};

/* ---------------------------
   UTILITÁRIOS
--------------------------- */
function goBack(){ window.history.back(); }

let editingId = null;

function init(){ showPinScreen(); }

function showPinScreen(){
  document.getElementById('pin-screen').classList.remove('hidden');
  document.getElementById('anotacoes-screen').classList.add('hidden');
  document.getElementById('form-screen').classList.add('hidden');
}

function handlePinInput(e,index){
  const inputs=document.querySelectorAll('.pin-input input');
  const val=e.target.value;
  if(val.length>1) e.target.value=val.slice(-1);
  if(val && index<3) inputs[index+1].focus();
  if(e.key==='Backspace' && !val && index>0) inputs[index-1].focus();
  if(e.key==='Enter') verifyPin();
}

function verifyPin(){
  const inputs=document.querySelectorAll('.pin-input input');
  const pin=Array.from(inputs).map(i=>i.value).join('');
  if(pin.length!==4){ alert('Digite um PIN de 4 dígitos'); return; }
  if(PIN.verify(pin)){ showAnotacoesScreen(); } else {
    alert('PIN incorreto'); inputs.forEach(i=>i.value=''); inputs[0].focus();
  }
}

function showAnotacoesScreen(){
  document.getElementById('pin-screen').classList.add('hidden');
  document.getElementById('anotacoes-screen').classList.remove('hidden');
  document.getElementById('form-screen').classList.add('hidden');
  loadAnotacoes();
}

function loadAnotacoes(){
  const list=document.getElementById('anotacoes-list');
  const notas=Anotacoes.getAnotacoes();
  list.innerHTML='';
  if(notas.length===0){ list.innerHTML='<p style="text-align:center;color:#555;">Nenhuma anotação ainda</p>'; return; }
  notas.forEach(n=>{
    const div=document.createElement('div'); div.className='item';
    div.innerHTML=`
      <div>
        <strong>${n.titulo}</strong><br>
        <small>${new Date(n.date).toLocaleDateString('pt-BR')}</small>
      </div>
      <div>
        <button onclick="editAnotacao(${n.id})">Editar</button>
        <button onclick="deleteAnotacao(${n.id})">Excluir</button>
      </div>
    `;
    list.appendChild(div);
  });
}

function showNewAnotacao(){
  editingId=null;
  document.getElementById('form-title').textContent='Nova Anotação';
  document.getElementById('anotacao-titulo').value='';
  document.getElementById('anotacao-conteudo').value='';
  document.getElementById('anotacoes-screen').classList.add('hidden');
  document.getElementById('form-screen').classList.remove('hidden');
  document.getElementById('anotacao-titulo').focus();
}

function editAnotacao(id){
  const nota=Anotacoes.getAnotacoes().find(a=>a.id===id); if(!nota) return;
  editingId=id;
  document.getElementById('form-title').textContent='Editar Anotação';
  document.getElementById('anotacao-titulo').value=nota.titulo;
  document.getElementById('anotacao-conteudo').value=nota.conteudo;
  document.getElementById('anotacoes-screen').classList.add('hidden');
  document.getElementById('form-screen').classList.remove('hidden');
}

function saveAnotacao(){
  const titulo=document.getElementById('anotacao-titulo').value.trim();
  const conteudo=document.getElementById('anotacao-conteudo').value.trim();
  if(!titulo || !conteudo){ alert('Preencha todos os campos'); return; }
  if(editingId){ Anotacoes.update(editingId,titulo,conteudo); } else { Anotacoes.add(titulo,conteudo); }
  cancelForm();
}

function deleteAnotacao(id){
  if(confirm('Deseja excluir esta anotação?')){ Anotacoes.delete(id); loadAnotacoes(); }
}

function cancelForm(){
  editingId=null;
  document.getElementById('form-screen').classList.add('hidden');
  document.getElementById('anotacoes-screen').classList.remove('hidden');
  loadAnotacoes();
}

function logout(){ showPinScreen(); document.querySelectorAll('.pin-input input').forEach(i=>i.value=''); }

document.addEventListener('DOMContentLoaded', init);
</script>

</body>
</html>