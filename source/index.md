---
title: Empalar's DB Loader
---

{% raw %}
<div id="db-loader-root">
  <h1>Empalar's DB Loader</h1>
  <p class="subtitle">Database loader by Empalar (on Discord)</p>
  <p class="version-tag">v0.5 — Enhanced Design</p>

  <div class="top-bar">
    <input type="text" id="searchBar" placeholder="Search by name..." />
    <div class="top-bar-buttons" style="display:flex; gap: 12px;">
      <button id="toggleDark">Toggle Dark Mode</button>
      <button id="openSettings">⚙️</button>
    </div>
  </div>

  <div class="tabs" id="tabsContainer">
    <button onclick="switchTab(event, 'avatars')" class="active" data-tab-id="avatars">Avatars</button>
    <button onclick="switchTab(event, 'clothes')" data-tab-id="clothes">Clothes</button>
    <button id="addTabButton">+</button>
    <button onclick="switchTab(event, 'customAvatars')" data-tab-id="customAvatars">Avatar ID Loader</button>
    <button onclick="switchTab(event, 'cacheyLoader')" data-tab-id="cacheyLoader">Cachey Loader</button>
  </div>

  <div class="drop-zone" id="dropZone"></div>
  <div class="grid active" id="avatars"></div>
  <div class="grid" id="clothes"></div>
  <div class="grid" id="customAvatars"></div>
  <div class="grid" id="cacheyLoader"></div>
</div>

<link rel="stylesheet" href="/css/db-loader.css" />
<script type="module" src="/js/main.js"></script>
{% endraw %}
