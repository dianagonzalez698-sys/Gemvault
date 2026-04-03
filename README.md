# Gemvault
<!DOCTYPE html>

<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Gem Vault</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Josefin+Sans:wght@200;300;400&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #0e0c10; --surface: #17141c; --surface2: #1f1b27;
    --border: rgba(255,255,255,0.07);
    --gold: #c9a84c; --gold-light: #e8c97a;
    --text: #e8e2d9; --muted: #7a7180;
    --gem-glow: rgba(201,168,76,0.15);
  }
  body { background:var(--bg); color:var(--text); font-family:'Josefin Sans',sans-serif; font-weight:300; min-height:100vh; overflow-x:hidden; }
  body::before { content:''; position:fixed; top:-40%; left:-20%; width:80%; height:80%; background:radial-gradient(ellipse,rgba(139,92,246,0.04) 0%,transparent 70%); pointer-events:none; z-index:0; }
  body::after  { content:''; position:fixed; bottom:-30%; right:-10%; width:60%; height:60%; background:radial-gradient(ellipse,rgba(201,168,76,0.05) 0%,transparent 70%); pointer-events:none; z-index:0; }

header { position:relative; z-index:10; display:flex; align-items:center; justify-content:space-between; padding:1.75rem 3rem; border-bottom:1px solid var(–border); }
.logo { display:flex; align-items:baseline; gap:0.75rem; }
.logo-icon { font-size:1.4rem; filter:drop-shadow(0 0 8px var(–gold)); }
h1 { font-family:‘Cormorant Garamond’,serif; font-size:1.8rem; font-weight:300; letter-spacing:0.12em; color:var(–gold-light); }
.subtitle { font-size:0.62rem; letter-spacing:0.3em; color:var(–muted); text-transform:uppercase; }
.header-right { display:flex; align-items:center; gap:1.25rem; }
.count-badge { font-size:0.68rem; letter-spacing:0.2em; color:var(–muted); text-transform:uppercase; }
.count-badge span { color:var(–gold); font-size:1rem; font-family:‘Cormorant Garamond’,serif; }
.btn-add { display:flex; align-items:center; gap:0.4rem; padding:0.6rem 1.4rem; background:transparent; border:1px solid var(–gold); color:var(–gold); font-family:‘Josefin Sans’,sans-serif; font-size:0.68rem; letter-spacing:0.2em; text-transform:uppercase; cursor:pointer; transition:all 0.3s; position:relative; overflow:hidden; }
.btn-add::before { content:’’; position:absolute; inset:0; background:var(–gold); transform:translateX(-100%); transition:transform 0.3s; z-index:-1; }
.btn-add:hover { color:var(–bg); }
.btn-add:hover::before { transform:translateX(0); }

.tab-nav { position:relative; z-index:10; display:flex; padding:0 3rem; border-bottom:1px solid var(–border); }
.tab-btn { padding:0.9rem 1.6rem; background:transparent; border:none; border-bottom:2px solid transparent; color:var(–muted); font-family:‘Josefin Sans’,sans-serif; font-size:0.68rem; letter-spacing:0.22em; text-transform:uppercase; cursor:pointer; transition:all 0.2s; margin-bottom:-1px; }
.tab-btn:hover { color:var(–text); }
.tab-btn.active { color:var(–gold); border-bottom-color:var(–gold); }

.toolbar { position:relative; z-index:10; display:flex; gap:1rem; padding:1.4rem 3rem; align-items:center; }
.search-wrap { position:relative; flex:1; max-width:340px; }
.search-wrap svg { position:absolute; left:0.9rem; top:50%; transform:translateY(-50%); color:var(–muted); width:13px; height:13px; }
.search-input { width:100%; padding:0.62rem 1rem 0.62rem 2.4rem; background:var(–surface); border:1px solid var(–border); color:var(–text); font-family:‘Josefin Sans’,sans-serif; font-size:0.74rem; letter-spacing:0.08em; outline:none; transition:border-color 0.2s; }
.search-input:focus { border-color:rgba(201,168,76,0.4); }
.search-input::placeholder { color:var(–muted); }
.view-toggle { display:flex; gap:0.25rem; margin-left:auto; }
.view-btn { padding:0.58rem 0.72rem; background:transparent; border:1px solid var(–border); color:var(–muted); cursor:pointer; transition:all 0.2s; display:flex; align-items:center; }
.view-btn.active, .view-btn:hover { border-color:var(–gold); color:var(–gold); }

.panel { display:none; }
.panel.active { display:block; }

.collection-panel { padding:0 3rem 4rem; position:relative; z-index:10; }
.gem-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(210px,1fr)); gap:1.4rem; }
.gem-grid.list-view { grid-template-columns:1fr; gap:0.7rem; }

.gem-card { background:var(–surface); border:1px solid var(–border); cursor:pointer; transition:all 0.3s; position:relative; overflow:hidden; animation:fadeUp 0.4s ease forwards; opacity:0; }
@keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
.gem-card:hover { border-color:rgba(201,168,76,0.35); transform:translateY(-3px); box-shadow:0 12px 40px rgba(0,0,0,0.4),0 0 20px var(–gem-glow); }
.gem-card::after { content:’’; position:absolute; top:0;left:0;right:0; height:1px; background:linear-gradient(90deg,transparent,var(–gold),transparent); opacity:0; transition:opacity 0.3s; }
.gem-card:hover::after { opacity:1; }

.gem-image { width:100%; aspect-ratio:1; object-fit:cover; display:block; }
.gem-image-placeholder { width:100%; aspect-ratio:1; background:var(–surface2); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:0.5rem; color:var(–muted); font-size:0.62rem; letter-spacing:0.18em; text-transform:uppercase; }
.gem-image-placeholder .gem-icon { font-size:2.4rem; filter:drop-shadow(0 0 8px rgba(139,92,246,0.4)); }
.gem-info { padding:0.9rem 1rem 1rem; }
.gem-name { font-family:‘Cormorant Garamond’,serif; font-size:1.12rem; font-weight:400; color:var(–text); margin-bottom:0.25rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.gem-meta { font-size:0.65rem; letter-spacing:0.16em; color:var(–muted); text-transform:uppercase; }
.gem-meta .gold { color:var(–gold); }
.slot-pill { display:inline-block; margin-top:0.4rem; font-size:0.58rem; letter-spacing:0.2em; padding:0.18rem 0.5rem; border:1px solid rgba(201,168,76,0.28); color:var(–gold); background:rgba(201,168,76,0.06); }

.list-view .gem-card { display:flex; align-items:center; }
.list-view .gem-image-placeholder, .list-view img.gem-image { width:78px; min-width:78px; aspect-ratio:1; }
.list-view .gem-info { display:flex; align-items:center; gap:2rem; flex:1; padding:0.7rem 1.2rem; }
.list-view .gem-name { margin-bottom:0; min-width:140px; }

.empty-state { text-align:center; padding:5rem 2rem; color:var(–muted); }
.empty-icon { font-size:3.5rem; display:block; margin-bottom:1.25rem; filter:drop-shadow(0 0 20px rgba(201,168,76,0.2)); }
.empty-state h2 { font-family:‘Cormorant Garamond’,serif; font-size:1.7rem; font-weight:300; color:var(–text); margin-bottom:0.4rem; }
.empty-state p { font-size:0.72rem; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:1.75rem; }

/* ── CASE MAP ── */
.case-panel { padding:2rem 3rem 4rem; position:relative; z-index:10; }

.case-stats { display:flex; gap:1rem; margin-bottom:2rem; flex-wrap:wrap; }
.case-stat { padding:1rem 1.5rem; background:var(–surface); border:1px solid var(–border); min-width:110px; }
.case-stat-label { font-size:0.58rem; letter-spacing:0.25em; text-transform:uppercase; color:var(–muted); margin-bottom:0.35rem; }
.case-stat-value { font-family:‘Cormorant Garamond’,serif; font-size:1.6rem; font-weight:300; color:var(–gold-light); }
.case-stat-value.dim { color:var(–muted); }

.case-legend { display:flex; gap:1.5rem; margin-bottom:1.5rem; flex-wrap:wrap; }
.legend-item { display:flex; align-items:center; gap:0.5rem; font-size:0.62rem; letter-spacing:0.18em; text-transform:uppercase; color:var(–muted); }
.legend-swatch { width:14px; height:14px; }
.sw-filled { background:rgba(201,168,76,0.2); border:1px solid rgba(201,168,76,0.5); }
.sw-empty  { background:var(–surface2); border:1px solid var(–border); }
.sw-sel    { background:rgba(139,92,246,0.2); border:1px solid rgba(139,92,246,0.6); }

.case-container { overflow-x:auto; padding-bottom:1rem; }
.case-grid-wrap { display:inline-block; background:var(–surface); border:1px solid var(–border); padding:1.25rem 1.5rem; min-width:max-content; }

.case-col-headers { display:flex; margin-left:2.2rem; margin-bottom:0.35rem; }
.col-header { width:60px; text-align:center; font-size:0.56rem; letter-spacing:0.18em; color:var(–muted); text-transform:uppercase; }

.case-row { display:flex; align-items:center; margin-bottom:3px; }
.row-label { width:2.2rem; font-size:0.6rem; letter-spacing:0.15em; color:var(–muted); text-align:center; }

.case-slot { width:60px; height:60px; margin:2px; background:var(–surface2); border:1px solid var(–border); cursor:pointer; transition:all 0.15s; position:relative; display:flex; flex-direction:column; align-items:center; justify-content:center; overflow:hidden; }
.case-slot:hover { border-color:rgba(139,92,246,0.55); background:rgba(139,92,246,0.08); }
.case-slot.filled { background:rgba(201,168,76,0.09); border-color:rgba(201,168,76,0.38); }
.case-slot.filled:hover { background:rgba(201,168,76,0.18); border-color:rgba(201,168,76,0.65); }
.case-slot.selected { border-color:rgba(139,92,246,0.8) !important; background:rgba(139,92,246,0.15) !important; box-shadow:0 0 0 1px rgba(139,92,246,0.4); }

.slot-emoji { font-size:1.35rem; line-height:1; filter:drop-shadow(0 0 4px rgba(201,168,76,0.4)); }
.slot-img   { width:100%; height:100%; object-fit:cover; display:block; }
.slot-name  { font-size:0.44rem; letter-spacing:0.1em; color:var(–muted); text-transform:uppercase; margin-top:2px; max-width:54px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; text-align:center; padding:0 2px; }
.slot-id    { position:absolute; top:2px; right:3px; font-size:0.42rem; color:rgba(255,255,255,0.16); letter-spacing:0.06em; }

/* Tooltip */
.slot-tooltip { display:none; position:fixed; z-index:300; background:var(–surface2); border:1px solid rgba(201,168,76,0.3); padding:0.6rem 0.85rem; min-width:120px; max-width:180px; box-shadow:0 8px 24px rgba(0,0,0,0.5); pointer-events:none; }
.slot-tooltip.show { display:block; }
.tt-name { font-family:‘Cormorant Garamond’,serif; font-size:0.95rem; color:var(–gold-light); margin-bottom:0.15rem; }
.tt-dim  { font-size:0.6rem; letter-spacing:0.1em; color:var(–muted); }
.tt-empty { font-size:0.62rem; letter-spacing:0.15em; color:var(–muted); }

/* Map action bar */
.map-action { margin-top:1.5rem; padding:1rem 1.25rem; background:var(–surface); border:1px solid var(–border); display:flex; align-items:center; gap:1rem; flex-wrap:wrap; }
.map-action-info { flex:1; }
.map-action-slot { font-size:0.6rem; letter-spacing:0.22em; text-transform:uppercase; color:var(–muted); margin-bottom:0.25rem; }
.map-action-name { font-family:‘Cormorant Garamond’,serif; font-size:1.2rem; color:var(–gold-light); }
.map-action-btns { display:flex; gap:0.5rem; flex-wrap:wrap; }
.btn-sm { padding:0.45rem 1rem; background:transparent; border:1px solid var(–border); color:var(–muted); font-family:‘Josefin Sans’,sans-serif; font-size:0.62rem; letter-spacing:0.16em; text-transform:uppercase; cursor:pointer; transition:all 0.2s; }
.btn-sm:hover { border-color:var(–gold); color:var(–gold); }
.btn-sm.primary { border-color:var(–gold); color:var(–gold); }
.btn-sm.primary:hover { background:var(–gold); color:var(–bg); }
.btn-sm.danger:hover { border-color:rgba(239,68,68,0.6); color:rgba(239,68,68,0.8); }

/* Modals */
.modal-backdrop { display:none; position:fixed; inset:0; background:rgba(5,4,8,0.85); backdrop-filter:blur(6px); z-index:200; align-items:center; justify-content:center; padding:1.5rem; }
.modal-backdrop.open { display:flex; }
.modal { background:var(–surface); border:1px solid rgba(201,168,76,0.2); width:100%; max-width:540px; max-height:90vh; overflow-y:auto; animation:modalIn 0.22s ease; box-shadow:0 30px 80px rgba(0,0,0,0.6); }
.modal.wide { max-width:600px; }
@keyframes modalIn { from{opacity:0;transform:scale(0.96) translateY(10px)} to{opacity:1;transform:scale(1) translateY(0)} }
.modal-header { display:flex; align-items:center; justify-content:space-between; padding:1.4rem 2rem; border-bottom:1px solid var(–border); }
.modal-title { font-family:‘Cormorant Garamond’,serif; font-size:1.35rem; font-weight:300; color:var(–gold-light); letter-spacing:0.05em; }
.modal-close { background:none; border:none; color:var(–muted); cursor:pointer; font-size:1.3rem; line-height:1; transition:color 0.2s; padding:0.25rem; }
.modal-close:hover { color:var(–text); }
.modal-body { padding:1.75rem 2rem; }
.modal-footer { display:flex; gap:0.7rem; justify-content:flex-end; padding:1.1rem 2rem; border-top:1px solid var(–border); }

.upload-zone { border:1px dashed rgba(201,168,76,0.3); background:var(–surface2); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:0.7rem; padding:1.75rem; cursor:pointer; transition:all 0.2s; margin-bottom:1.4rem; position:relative; min-height:150px; }
.upload-zone:hover { border-color:rgba(201,168,76,0.6); }
.upload-zone.has-image { padding:0; border-style:solid; border-color:rgba(201,168,76,0.25); min-height:unset; }
.upload-zone img { width:100%; max-height:190px; object-fit:cover; display:block; }
.upload-zone input[type=file] { position:absolute; inset:0; opacity:0; cursor:pointer; width:100%; height:100%; }
.upload-icon { font-size:1.8rem; }
.upload-hint { font-size:0.62rem; letter-spacing:0.18em; text-transform:uppercase; color:var(–muted); }

.field { display:flex; flex-direction:column; gap:0.35rem; margin-bottom:0.9rem; }
.field.no-mb { margin-bottom:0; }
.field-group { display:grid; grid-template-columns:1fr 1fr 1fr; gap:0.85rem; margin-bottom:0.9rem; }
label { font-size:0.6rem; letter-spacing:0.25em; text-transform:uppercase; color:var(–muted); }
input[type=text], input[type=number], textarea, select { background:var(–surface2); border:1px solid var(–border); color:var(–text); font-family:‘Josefin Sans’,sans-serif; font-size:0.78rem; letter-spacing:0.08em; padding:0.62rem 0.8rem; outline:none; transition:border-color 0.2s; width:100%; -webkit-appearance:none; }
input:focus, textarea:focus, select:focus { border-color:rgba(201,168,76,0.5); }
textarea { resize:vertical; min-height:70px; }
select option { background:var(–surface2); }

.btn-cancel { padding:0.6rem 1.4rem; background:transparent; border:1px solid var(–border); color:var(–muted); font-family:‘Josefin Sans’,sans-serif; font-size:0.67rem; letter-spacing:0.15em; text-transform:uppercase; cursor:pointer; transition:all 0.2s; }
.btn-cancel:hover { border-color:var(–muted); color:var(–text); }
.btn-save { padding:0.6rem 1.75rem; background:var(–gold); border:1px solid var(–gold); color:var(–bg); font-family:‘Josefin Sans’,sans-serif; font-size:0.67rem; letter-spacing:0.15em; text-transform:uppercase; cursor:pointer; transition:all 0.2s; }
.btn-save:hover { background:var(–gold-light); }

.detail-image { width:100%; max-height:260px; object-fit:cover; display:block; }
.detail-image-placeholder { width:100%; height:180px; background:var(–surface2); display:flex; align-items:center; justify-content:center; font-size:3.5rem; }
.detail-body { padding:1.75rem 2rem; }
.detail-name { font-family:‘Cormorant Garamond’,serif; font-size:1.9rem; font-weight:300; color:var(–gold-light); margin-bottom:0.2rem; }
.detail-slot { font-size:0.65rem; letter-spacing:0.2em; color:var(–gold); border:1px solid rgba(201,168,76,0.3); padding:0.2rem 0.6rem; display:inline-block; margin-bottom:0.75rem; }
.divider { width:36px; height:1px; background:linear-gradient(90deg,transparent,var(–gold),transparent); margin:0.6rem 0; }
.detail-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:0.8rem; margin:1.2rem 0; padding:1.2rem; background:var(–surface2); border:1px solid var(–border); }
.ds-label { font-size:0.58rem; letter-spacing:0.22em; text-transform:uppercase; color:var(–muted); margin-bottom:0.3rem; }
.ds-value { font-family:‘Cormorant Garamond’,serif; font-size:1.1rem; color:var(–text); }
.detail-notes { font-size:0.76rem; line-height:1.7; color:var(–muted); }
.detail-actions { display:flex; gap:0.7rem; padding:1.1rem 2rem; border-top:1px solid var(–border); }
.btn-edit { padding:0.6rem 1.4rem; background:transparent; border:1px solid var(–gold); color:var(–gold); font-family:‘Josefin Sans’,sans-serif; font-size:0.67rem; letter-spacing:0.15em; text-transform:uppercase; cursor:pointer; transition:all 0.2s; }
.btn-edit:hover { background:var(–gold); color:var(–bg); }
.btn-delete { padding:0.6rem 1.4rem; background:transparent; border:1px solid rgba(239,68,68,0.3); color:rgba(239,68,68,0.7); font-family:‘Josefin Sans’,sans-serif; font-size:0.67rem; letter-spacing:0.15em; text-transform:uppercase; cursor:pointer; transition:all 0.2s; margin-left:auto; }
.btn-delete:hover { border-color:rgb(239,68,68); color:rgb(239,68,68); }

/* Source section */
.source-section { border:1px solid var(–border); background:var(–surface2); margin-bottom:0.9rem; }
.source-tabs { display:flex; border-bottom:1px solid var(–border); }
.src-tab { flex:1; padding:0.55rem; background:transparent; border:none; color:var(–muted); font-family:‘Josefin Sans’,sans-serif; font-size:0.6rem; letter-spacing:0.18em; text-transform:uppercase; cursor:pointer; transition:all 0.2s; border-bottom:2px solid transparent; margin-bottom:-1px; }
.src-tab.active { color:var(–gold); border-bottom-color:var(–gold); }
.src-pane { display:none; padding:0.85rem; }
.src-pane.active { display:block; }
.src-preview { width:100%; max-height:160px; object-fit:cover; display:block; margin-top:0.6rem; border:1px solid var(–border); }
.src-preview-err { font-size:0.62rem; color:rgba(239,68,68,0.7); letter-spacing:0.1em; margin-top:0.4rem; }
.src-url-row { display:flex; gap:0.5rem; align-items:flex-start; }
.src-url-row input { flex:1; }
.btn-load { padding:0.62rem 0.9rem; background:transparent; border:1px solid var(–border); color:var(–muted); font-family:‘Josefin Sans’,sans-serif; font-size:0.6rem; letter-spacing:0.12em; text-transform:uppercase; cursor:pointer; transition:all 0.2s; white-space:nowrap; flex-shrink:0; }
.btn-load:hover { border-color:var(–gold); color:var(–gold); }

/* Detail source block */
.detail-source { margin-top:1rem; padding:1rem; background:var(–surface2); border:1px solid var(–border); }
.detail-source-label { font-size:0.58rem; letter-spacing:0.25em; text-transform:uppercase; color:var(–muted); margin-bottom:0.6rem; }
.detail-source-img { width:100%; max-height:200px; object-fit:cover; display:block; margin-bottom:0.75rem; border:1px solid var(–border); }
.detail-source-link { display:inline-flex; align-items:center; gap:0.5rem; font-size:0.68rem; letter-spacing:0.14em; color:var(–gold); text-decoration:none; border:1px solid rgba(201,168,76,0.3); padding:0.45rem 0.9rem; transition:all 0.2s; }
.detail-source-link:hover { background:rgba(201,168,76,0.08); border-color:var(–gold); }

::-webkit-scrollbar { width:4px; }
::-webkit-scrollbar-track { background:var(–bg); }
::-webkit-scrollbar-thumb { background:var(–surface2); }

@media(max-width:640px) {
header,.tab-nav,.toolbar,.collection-panel,.case-panel { padding-left:1.25rem; padding-right:1.25rem; }
.gem-grid { grid-template-columns:repeat(auto-fill,minmax(150px,1fr)); }
.field-group { grid-template-columns:1fr 1fr; }
}
</style>

</head>
<body>

<header>
  <div class="logo">
    <span class="logo-icon">💎</span>
    <div>
      <h1>GEM VAULT</h1>
      <div class="subtitle">Collection Catalog</div>
    </div>
  </div>
  <div class="header-right">
    <div class="count-badge"><span id="gemCount">0</span> stones</div>
    <button class="btn-add" onclick="openAddModal()">+ Add Stone</button>
  </div>
</header>

<div class="tab-nav">
  <button class="tab-btn active" onclick="switchTab('collection',this)">Collection</button>
  <button class="tab-btn" onclick="switchTab('case',this)">Case Map</button>
</div>

<!-- COLLECTION -->

<div class="panel active" id="panel-collection">
  <div class="toolbar">
    <div class="search-wrap">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <input class="search-input" type="text" placeholder="Search by name…" oninput="filterGems(this.value)">
    </div>
    <div class="view-toggle">
      <button class="view-btn active" id="gridBtn" onclick="setView('grid')">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="9" height="9"/><rect x="13" y="2" width="9" height="9"/><rect x="2" y="13" width="9" height="9"/><rect x="13" y="13" width="9" height="9"/></svg>
      </button>
      <button class="view-btn" id="listBtn" onclick="setView('list')">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="3" width="20" height="4"/><rect x="2" y="10" width="20" height="4"/><rect x="2" y="17" width="20" height="4"/></svg>
      </button>
    </div>
  </div>
  <div class="collection-panel">
    <div class="gem-grid" id="gemGrid"></div>
  </div>
</div>

<!-- CASE MAP -->

<div class="panel" id="panel-case">
  <div class="case-panel">
    <div class="case-stats">
      <div class="case-stat"><div class="case-stat-label">Total Slots</div><div class="case-stat-value" id="statTotal">50</div></div>
      <div class="case-stat"><div class="case-stat-label">Filled</div><div class="case-stat-value" id="statFilled">0</div></div>
      <div class="case-stat"><div class="case-stat-label">Empty</div><div class="case-stat-value dim" id="statEmpty">50</div></div>
      <div class="case-stat"><div class="case-stat-label">Occupancy</div><div class="case-stat-value" id="statPct">0%</div></div>
    </div>
    <div class="case-legend">
      <div class="legend-item"><span class="legend-swatch sw-filled"></span>Filled</div>
      <div class="legend-item"><span class="legend-swatch sw-empty"></span>Empty</div>
      <div class="legend-item"><span class="legend-swatch sw-sel"></span>Selected</div>
    </div>
    <div class="case-container">
      <div class="case-grid-wrap">
        <div class="case-col-headers" id="colHeaders"></div>
        <div id="caseGrid"></div>
      </div>
    </div>
    <div class="map-action" id="mapAction" style="display:none">
      <div class="map-action-info">
        <div class="map-action-slot">Slot <span id="selSlotId"></span></div>
        <div class="map-action-name" id="selSlotName">Empty</div>
      </div>
      <div class="map-action-btns" id="mapActionBtns"></div>
    </div>
  </div>
</div>

<!-- Add/Edit Modal -->

<div class="modal-backdrop" id="addModal">
  <div class="modal">
    <div class="modal-header">
      <div class="modal-title" id="modalTitle">Add New Stone</div>
      <button class="modal-close" onclick="closeAddModal()">✕</button>
    </div>
    <div class="modal-body">
      <div class="upload-zone" id="uploadZone">
        <input type="file" accept="image/*" id="imageInput" onchange="handleImageUpload(this)">
        <div id="uploadContent">
          <div class="upload-icon">📷</div>
          <div class="upload-hint">Click to upload photo</div>
        </div>
      </div>
      <div class="field">
        <label>Stone Name *</label>
        <input type="text" id="stoneName" placeholder="e.g. Blue Sapphire, Alexandrite…">
      </div>
      <div class="field-group">
        <div class="field no-mb"><label>Length (mm)</label><input type="number" id="dimL" placeholder="0.0" step="0.1" min="0"></div>
        <div class="field no-mb"><label>Width (mm)</label><input type="number" id="dimW" placeholder="0.0" step="0.1" min="0"></div>
        <div class="field no-mb"><label>Depth (mm)</label><input type="number" id="dimD" placeholder="0.0" step="0.1" min="0"></div>
      </div>
      <div class="field" style="margin-top:0.9rem">
        <label>Case Slot</label>
        <select id="slotSelect"></select>
      </div>
      <div class="field">
        <label>Notes (optional)</label>
        <textarea id="stoneNotes" placeholder="Color, clarity, cut, source…"></textarea>
      </div>

```
  <label style="display:block;margin-bottom:0.5rem">Source / Listing</label>
  <div class="source-section">
    <div class="source-tabs">
      <button class="src-tab active" onclick="srcTab('link',this)">🔗 Listing URL</button>
      <button class="src-tab" onclick="srcTab('img',this)">🖼 Reference Photo URL</button>
    </div>
    <div class="src-pane active" id="srcPaneLink">
      <div class="field no-mb">
        <input type="text" id="sourceUrl" placeholder="https://gemselect.com/…" style="font-size:0.72rem">
      </div>
    </div>
    <div class="src-pane" id="srcPaneImg">
      <div class="src-url-row">
        <input type="text" id="sourceImgUrl" placeholder="Paste image URL from seller's site…" style="font-size:0.72rem">
        <button class="btn-load" onclick="previewSrcImg()">Preview</button>
      </div>
      <div id="srcImgFeedback"></div>
    </div>
  </div>
</div>
<div class="modal-footer">
  <button class="btn-cancel" onclick="closeAddModal()">Cancel</button>
  <button class="btn-save" onclick="saveGem()">Save Stone</button>
</div>
```

  </div>
</div>

<!-- Detail Modal -->

<div class="modal-backdrop" id="detailModal">
  <div class="modal wide">
    <div class="modal-header">
      <div class="modal-title">Stone Details</div>
      <button class="modal-close" onclick="closeDetailModal()">✕</button>
    </div>
    <div id="detailContent"></div>
    <div class="detail-actions">
      <button class="btn-edit" onclick="editCurrent()">Edit</button>
      <button class="btn-delete" onclick="deleteCurrent()">Delete</button>
    </div>
  </div>
</div>

<div class="slot-tooltip" id="slotTooltip"></div>

<script>
  const ROWS = 5, COLS = 10;
  const ROW_LABELS = ['A','B','C','D','E'];

  let gems = JSON.parse(localStorage.getItem('gemVault') || '[]');
  let currentView = 'grid', editingId = null, currentDetailId = null;
  let pendingImage = null, searchQuery = '', selectedSlot = null, prefillSlot = null;

  const EMOJIS = ['💎','🔮','💠','🌟','✨','🔷','🟣'];

  function save() { localStorage.setItem('gemVault', JSON.stringify(gems)); }
  function sid(r,c) { return ROW_LABELS[r]+(c+1); }
  function gemAt(s) { return gems.find(g=>g.slot===s)||null; }

  function getEmoji(name) {
    if (!name) return '💎';
    const n = name.toLowerCase();
    if (n.includes('ruby')||n.includes('garnet')) return '🔴';
    if (n.includes('emerald')||n.includes('jade')||n.includes('peridot')) return '💚';
    if (n.includes('sapphire')||n.includes('aquamarine')) return '💙';
    if (n.includes('amethyst')||n.includes('tanzanite')) return '💜';
    if (n.includes('diamond')) return '💎';
    if (n.includes('opal')) return '🌈';
    if (n.includes('amber')) return '🟠';
    return EMOJIS[name.charCodeAt(0)%EMOJIS.length];
  }

  function switchTab(id, btn) {
    document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    document.getElementById('panel-'+id).classList.add('active');
    btn.classList.add('active');
    if (id==='case') renderCase();
  }

  /* ── COLLECTION ── */
  function render() {
    const grid = document.getElementById('gemGrid');
    const q = searchQuery.toLowerCase();
    const list = gems.filter(g=>!q||g.name.toLowerCase().includes(q));
    document.getElementById('gemCount').textContent = gems.length;

    if (!list.length) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
        <span class="empty-icon">${gems.length?'🔍':'💎'}</span>
        <h2>${gems.length?'No stones found':'Your vault awaits'}</h2>
        <p>${gems.length?'Try a different search':'Begin cataloging your collection'}</p>
        ${!gems.length?`<button class="btn-add" onclick="openAddModal()">+ Add First Stone</button>`:''}
      </div>`;
      return;
    }
    grid.innerHTML = list.map((g,i)=>{
      const dims=[g.length,g.width,g.depth].filter(Boolean);
      const d=(i%12)*0.04;
      const img=g.image
        ?`<img class="gem-image" src="${g.image}" alt="${g.name}" loading="lazy">`
        :`<div class="gem-image-placeholder"><span class="gem-icon">${getEmoji(g.name)}</span><span>No Photo</span></div>`;
      return `<div class="gem-card" style="animation-delay:${d}s" onclick="openDetail('${g.id}')">
        ${img}
        <div class="gem-info">
          <div class="gem-name">${g.name||'Unnamed'}</div>
          <div class="gem-meta"><span class="gold">◈</span> ${dims.length?dims.join(' × ')+' mm':'—'}</div>
          ${g.slot?`<div class="slot-pill">📍 ${g.slot}</div>`:''}
        </div>
      </div>`;
    }).join('');
  }

  function setView(v) {
    currentView=v;
    document.getElementById('gemGrid').classList.toggle('list-view',v==='list');
    document.getElementById('gridBtn').classList.toggle('active',v==='grid');
    document.getElementById('listBtn').classList.toggle('active',v==='list');
    render();
  }
  function filterGems(q) { searchQuery=q; render(); }

  /* ── CASE MAP ── */
  function renderCase() {
    const filled=gems.filter(g=>g.slot).length;
    const total=ROWS*COLS;
    document.getElementById('statTotal').textContent=total;
    document.getElementById('statFilled').textContent=filled;
    document.getElementById('statEmpty').textContent=total-filled;
    document.getElementById('statPct').textContent=Math.round(filled/total*100)+'%';

    document.getElementById('colHeaders').innerHTML=
      Array.from({length:COLS},(_,c)=>`<div class="col-header">${c+1}</div>`).join('');

    const grid=document.getElementById('caseGrid');
    grid.innerHTML='';
    for(let r=0;r<ROWS;r++){
      const row=document.createElement('div');
      row.className='case-row';
      row.innerHTML=`<div class="row-label">${ROW_LABELS[r]}</div>`;
      for(let c=0;c<COLS;c++){
        const s=sid(r,c), gem=gemAt(s);
        const el=document.createElement('div');
        el.className='case-slot'+(gem?' filled':'')+(selectedSlot===s?' selected':'');
        el.dataset.slot=s;
        if(gem){
          el.innerHTML=gem.image
            ?`<img class="slot-img" src="${gem.image}" alt="${gem.name}"><div class="slot-id">${s}</div>`
            :`<span class="slot-emoji">${getEmoji(gem.name)}</span><div class="slot-name">${gem.name}</div><div class="slot-id">${s}</div>`;
        } else {
          el.innerHTML=`<div class="slot-id">${s}</div>`;
        }
        el.addEventListener('click',()=>selectSlot(s));
        el.addEventListener('mouseenter',e=>showTip(e,s,gem));
        el.addEventListener('mouseleave',hideTip);
        row.appendChild(el);
      }
      grid.appendChild(row);
    }
  }

  function selectSlot(s) {
    selectedSlot=selectedSlot===s?null:s;
    renderCase(); updateActionBar();
  }

  function updateActionBar() {
    const bar=document.getElementById('mapAction');
    if(!selectedSlot){bar.style.display='none';return;}
    bar.style.display='flex';
    const gem=gemAt(selectedSlot);
    document.getElementById('selSlotId').textContent=selectedSlot;
    document.getElementById('selSlotName').textContent=gem?gem.name:'Empty slot';
    const btns=document.getElementById('mapActionBtns');
    if(gem){
      btns.innerHTML=`
        <button class="btn-sm primary" onclick="openDetail('${gem.id}')">View Stone</button>
        <button class="btn-sm" onclick="openAddModal('${gem.id}')">Edit</button>
        <button class="btn-sm danger" onclick="clearSlot('${gem.id}')">Clear Slot</button>`;
    } else {
      btns.innerHTML=`<button class="btn-sm primary" onclick="assignToSlot('${selectedSlot}')">+ Assign Stone</button>`;
    }
  }

  function clearSlot(id) {
    const g=gems.find(g=>g.id===id);
    if(g){g.slot='';save();render();renderCase();updateActionBar();}
  }

  function assignToSlot(s) { prefillSlot=s; openAddModal(); }

  function showTip(e,s,gem) {
    const tt=document.getElementById('slotTooltip');
    if(gem){
      const dims=[gem.length,gem.width,gem.depth].filter(Boolean);
      tt.innerHTML=`<div class="tt-name">${gem.name}</div>${dims.length?`<div class="tt-dim">${dims.join(' × ')} mm</div>`:''}`;
    } else {
      tt.innerHTML=`<div class="tt-empty">${s} — Empty</div>`;
    }
    tt.classList.add('show');
    moveTip(e);
  }
  function moveTip(e) {
    const tt=document.getElementById('slotTooltip');
    tt.style.left=Math.min(e.clientX+14,window.innerWidth-190)+'px';
    tt.style.top=Math.min(e.clientY-8,window.innerHeight-70)+'px';
  }
  function hideTip() { document.getElementById('slotTooltip').classList.remove('show'); }

  /* ── SLOT SELECT ── */
  function populateSlots(current) {
    const used=new Set(gems.filter(g=>g.id!==editingId&&g.slot).map(g=>g.slot));
    const sel=document.getElementById('slotSelect');
    sel.innerHTML='<option value="">— Unassigned —</option>';
    for(let r=0;r<ROWS;r++) for(let c=0;c<COLS;c++){
      const s=sid(r,c);
      if(!used.has(s)||s===current){
        const o=document.createElement('option');
        o.value=s; o.textContent=s;
        if(s===current) o.selected=true;
        sel.appendChild(o);
      }
    }
  }

  /* ── ADD / EDIT ── */
  function openAddModal(id=null) {
    editingId=id; pendingImage=null;
    document.getElementById('modalTitle').textContent=id?'Edit Stone':'Add New Stone';
    if(id){
      const g=gems.find(g=>g.id===id);
      document.getElementById('stoneName').value=g.name||'';
      document.getElementById('dimL').value=g.length||'';
      document.getElementById('dimW').value=g.width||'';
      document.getElementById('dimD').value=g.depth||'';
      document.getElementById('stoneNotes').value=g.notes||'';
      document.getElementById('sourceUrl').value=g.sourceUrl||'';
      document.getElementById('sourceImgUrl').value=g.sourceImgUrl||'';
      if(g.sourceImgUrl) showSrcImgPreview(g.sourceImgUrl); else document.getElementById('srcImgFeedback').innerHTML='';
      pendingImage=g.image||null;
      if(g.image) showPreview(g.image); else resetUpload();
      populateSlots(g.slot||'');
    } else {
      document.getElementById('stoneName').value='';
      document.getElementById('dimL').value='';
      document.getElementById('dimW').value='';
      document.getElementById('dimD').value='';
      document.getElementById('stoneNotes').value='';
      document.getElementById('sourceUrl').value='';
      document.getElementById('sourceImgUrl').value='';
      document.getElementById('srcImgFeedback').innerHTML='';
      resetUpload();
      populateSlots(prefillSlot||'');
      if(prefillSlot){document.getElementById('slotSelect').value=prefillSlot;prefillSlot=null;}
    }
    document.getElementById('addModal').classList.add('open');
  }
  function closeAddModal(){document.getElementById('addModal').classList.remove('open');editingId=null;pendingImage=null;prefillSlot=null;}

  function resetUpload(){
    document.getElementById('uploadZone').classList.remove('has-image');
    document.getElementById('uploadContent').innerHTML=`<div class="upload-icon">📷</div><div class="upload-hint">Click to upload photo</div>`;
    document.getElementById('imageInput').value='';
  }
  function showPreview(src){
    document.getElementById('uploadZone').classList.add('has-image');
    document.getElementById('uploadContent').innerHTML=`<img src="${src}" style="width:100%;max-height:190px;object-fit:cover;display:block;pointer-events:none">`;
  }
  function handleImageUpload(input){
    const file=input.files[0];if(!file)return;
    const r=new FileReader();
    r.onload=e=>{pendingImage=e.target.result;showPreview(pendingImage);};
    r.readAsDataURL(file);
  }

  function saveGem(){
    const name=document.getElementById('stoneName').value.trim();
    if(!name){
      const el=document.getElementById('stoneName');
      el.style.borderColor='rgba(239,68,68,0.6)';el.focus();
      setTimeout(()=>el.style.borderColor='',1500);return;
    }
    const gem={
      id:editingId||Date.now().toString(),
      name,
      length:document.getElementById('dimL').value||'',
      width:document.getElementById('dimW').value||'',
      depth:document.getElementById('dimD').value||'',
      notes:document.getElementById('stoneNotes').value.trim(),
      slot:document.getElementById('slotSelect').value||'',
      sourceUrl:document.getElementById('sourceUrl').value.trim(),
      sourceImgUrl:document.getElementById('sourceImgUrl').value.trim(),
      image:pendingImage||null,
      created:editingId?(gems.find(g=>g.id===editingId)?.created||Date.now()):Date.now()
    };
    if(editingId){gems[gems.findIndex(g=>g.id===editingId)]=gem;}
    else{gems.push(gem);}
    save();closeAddModal();closeDetailModal();render();renderCase();updateActionBar();
  }

  /* ── DETAIL ── */
  function openDetail(id){
    currentDetailId=id;
    const g=gems.find(g=>g.id===id);if(!g)return;
    const dims=[g.length,g.width,g.depth].filter(Boolean);
    const date=new Date(g.created).toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'});
    const img=g.image
      ?`<img class="detail-image" src="${g.image}" alt="${g.name}">`
      :`<div class="detail-image-placeholder">${getEmoji(g.name)}</div>`;
    document.getElementById('detailContent').innerHTML=`
      ${img}
      <div class="detail-body">
        <div class="detail-name">${g.name}</div>
        ${g.slot?`<div class="detail-slot">📍 Slot ${g.slot}</div>`:''}
        <div class="divider"></div>
        <div class="detail-grid">
          <div><div class="ds-label">Dimensions</div><div class="ds-value">${dims.length?dims.join(' × ')+' mm':'—'}</div></div>
          <div><div class="ds-label">Added</div><div class="ds-value" style="font-size:0.9rem">${date}</div></div>
          <div><div class="ds-label">ID</div><div class="ds-value" style="font-size:0.85rem;color:var(--muted)">#${g.id.slice(-4)}</div></div>
        </div>
        ${g.notes?`<div class="detail-notes">${g.notes}</div>`:''}
        ${(g.sourceUrl||g.sourceImgUrl)?`
        <div class="detail-source">
          <div class="detail-source-label">Source / Listing</div>
          ${g.sourceImgUrl?`<img class="detail-source-img" src="${g.sourceImgUrl}" alt="Reference photo" onerror="this.style.display='none'">`:''}
          ${g.sourceUrl?`<a class="detail-source-link" href="${g.sourceUrl}" target="_blank" rel="noopener">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            View Original Listing
          </a>`:''}
        </div>`:''}
      </div>`;
    document.getElementById('detailModal').classList.add('open');
  }
  function closeDetailModal(){document.getElementById('detailModal').classList.remove('open');currentDetailId=null;}
  function editCurrent(){const id=currentDetailId;closeDetailModal();openAddModal(id);}
  function deleteCurrent(){
    if(!confirm('Remove this stone from the vault?'))return;
    gems=gems.filter(g=>g.id!==currentDetailId);
    save();closeDetailModal();render();renderCase();updateActionBar();
  }

  /* ── SOURCE TAB UI ── */
  function srcTab(id, btn) {
    document.querySelectorAll('.src-tab').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.src-pane').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('srcPane'+id.charAt(0).toUpperCase()+id.slice(1)).classList.add('active');
  }

  function previewSrcImg() {
    const url = document.getElementById('sourceImgUrl').value.trim();
    if (!url) return;
    showSrcImgPreview(url);
  }

  function showSrcImgPreview(url) {
    const fb = document.getElementById('srcImgFeedback');
    fb.innerHTML = `<img class="src-preview" src="${url}" alt="Source preview"
      onerror="document.getElementById('srcImgFeedback').innerHTML='<div class=\\'src-preview-err\\'>Could not load image — check the URL</div>'"
      onload="this.style.display='block'">`;
  }

  document.getElementById('addModal').addEventListener('click',function(e){if(e.target===this)closeAddModal();});
  document.getElementById('detailModal').addEventListener('click',function(e){if(e.target===this)closeDetailModal();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeAddModal();closeDetailModal();}});

  render();
</script>

</body>
</html>
