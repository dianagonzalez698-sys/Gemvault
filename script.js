let currentView = 'grid';
let gems = [];

function switchTab(panelId, btn) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-' + panelId).classList.add('active');
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function setView(view) {
  currentView = view;
  document.getElementById('gridBtn').classList.toggle('active', view==='grid');
  document.getElementById('listBtn').classList.toggle('active', view==='list');
  renderGems();
}

function addGem(name) {
  gems.push({name: name});
  document.getElementById('gemCount').textContent = gems.length;
  renderGems();
}

function renderGems() {
  const container = document.getElementById('collectionContainer');
  container.innerHTML = '';
  gems.forEach(gem => {
    const card = document.createElement('div');
    card.className = 'gem-card';
    card.textContent = gem.name;
    container.appendChild(card);
  });
}

function filterGems(query) {
  const filtered = gems.filter(g => g.name.toLowerCase().includes(query.toLowerCase()));
  const container = document.getElementById('collectionContainer');
  container.innerHTML = '';
  filtered.forEach(gem => {
    const card = document.createElement('div');
    card.className = 'gem-card';
    card.textContent = gem.name;
    container.appendChild(card);
  });
}

function openAddModal() {
  const name = prompt('Enter gem name:');
  if(name) addGem(name);
}
