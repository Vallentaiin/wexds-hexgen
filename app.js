"use strict";

const TERRAIN = {
  mountain: {
    name: "Горы и предгорья",
    short: "Горы",
    color: "#55504b",
    text: "#ece2cb"
  },
  forest: {
    name: "Лесистые холмы и бурелом",
    short: "Бурелом",
    color: "#2e3f32",
    text: "#dce5c4"
  },
  brush: {
    name: "Перелески и кустистые лощины",
    short: "Лощины",
    color: "#485032",
    text: "#e1e7c4"
  },
  cultivated: {
    name: "Окультуренная местность",
    short: "Окульт.",
    color: "#6c6240",
    text: "#f5ead1"
  },
  plains: {
    name: "Поля и травяные пустоши",
    short: "Пустошь",
    color: "#686a45",
    text: "#f1ebcc"
  }
};

const CULTIVATED = {
  pasture: "Пастбище",
  fields: "Поля / виноградники",
  mines: "Рудники / шахты",
  settlement: "Поселение",
  noMans: "Ничья земля"
};

const FEATURE_TABLE = [
  "Домик отшельника",
  "Брошенный танк",
  "Разбитый самолёт",
  "Развалины церкви",
  "Остатки странных устройств",
  "Заросшие окопы",
  "Могильник",
  "Остатки древнего замка",
  "Дыра в земле",
  "Гигантский дуб",
  "Парящая железная сфера",
  "Камень странной формы",
  "Дерево, расколотое молнией",
  "Сгоревший участок",
  "Небольшое озерцо",
  "Остатки каменного забора",
  "Заброшенный лагерь",
  "Огромное кострище",
  "Повешенный на дереве",
  "Одинокая могила"
];

const GOVERNMENTS = [
  "Совет старейшин",
  "Народное вече",
  "Военная хунта",
  "Какой-то священник",
  "Демократически избранный мэр",
  "Уцелевший аристократ"
];

const WEALTH = [
  "Тотальная бедность и голод, цены x3",
  "Тотальная бедность и голод, цены x3",
  "С трудом хватает на еду, цены x2",
  "С трудом хватает на еду, цены x2",
  "Есть небольшие накопления, обычные цены",
  "Обеспечен и богат, цены /2"
];

const HIDDEN_POWER = [
  "Тот же, кто номинально, без подвоха",
  "Тот же, кто номинально, без подвоха",
  "Продажный сотрудник правопорядка",
  "Ещё какой-то священник",
  "Какой-то преступник",
  "Бунтарь"
];

const VENUES = [
  "Торговая лавка",
  "Увеселительное заведение",
  "Здание городского самоуправления",
  "Церковь",
  "Опорный пункт правопорядка",
  "Заведение культуры"
];

const DIRS = [
  { cube: { x: 0, y: 1, z: -1 }, name: "север" },
  { cube: { x: 1, y: 0, z: -1 }, name: "северо-восток" },
  { cube: { x: 1, y: -1, z: 0 }, name: "юго-восток" },
  { cube: { x: 0, y: -1, z: 1 }, name: "юг" },
  { cube: { x: -1, y: 0, z: 1 }, name: "юго-запад" },
  { cube: { x: -1, y: 1, z: 0 }, name: "северо-запад" }
];

const L10N = {
  ru: {
    htmlLang: "ru",
    documentTitle: "Dead Land, Dead Skies - генератор гексовой карты",
    ui: {
      controlsAria: "Настройки генератора",
      brandEyebrow: "1922 / живые мертвецы / 6 миль",
      regionMap: "Карта региона",
      width: "Ширина",
      height: "Высота",
      generate: "Сгенерировать новую карту",
      view: "Вид",
      viewModeAria: "Режим отображения",
      clean: "Чистая",
      atmospheric: "Атмосферная",
      editor: "Редактор",
      editorToolsAria: "Инструменты карты",
      toolSelect: "Выбор",
      toolRoad: "Дорога",
      toolRail: "Ж/д",
      toolRiver: "Река",
      export: "Экспорт",
      seedButton: "Seed",
      summary: "Сводка",
      mapAria: "Сгенерированная карта",
      hexRegion: "Гексовая область",
      mapNotGenerated: "Карта не создана",
      detailsAria: "Подробности гекса",
      hex: "Гекс",
      hexEditor: "Правка",
      legend: "Легенда",
      languageButton: "EN",
      languageToggleAria: "Switch to English"
    },
    stats: {
      cells: "Гексов",
      settlements: "Поселений",
      abandoned: "Брошенных",
      largeSettlements: "Крупных",
      population: "Жителей",
      features: "Достоприм.",
      rivers: "Рек, сегм.",
      lakes: "Озёр",
      roads: "Дорог, сегм.",
      rails: "Ж/д, сегм.",
      bridges: "Переправ"
    },
    details: {
      chooseHex: "Выберите гекс на карте.",
      coordinates: "Координаты",
      order: "Порядок",
      landscape: "Ландшафт",
      roll: "Бросок",
      secondary: "Вторичный",
      section: "Участок",
      culture: "Культура",
      find: "Находка",
      d20: "на d20",
      blocks: "Блоков",
      inBlock: "В блоке",
      residents: "Жителей",
      potential: "Потенциал",
      authority: "Власть",
      wealth: "Богатство",
      realPower: "На деле",
      venue: "Заведение",
      settlement: "Поселение",
      abandoned: "брошено",
      noRoll: "нет",
      riverSecondary: (base) => `Участок речной сети; вторично: ${base}`,
      riverBase: (base) => `Река через гекс; основа: ${base}`
    },
    tags: {
      river: "река",
      lake: "озеро",
      road: "дорога",
      rail: "ж/д",
      bridge: "переправа",
      feature: "достопримечательность"
    },
    editor: {
      noHex: "Выберите гекс, чтобы править его свойства.",
      selectHint: "Выбор: щёлкните гекс, затем правьте его справа.",
      edgeHint: "Щёлкните первый гекс, затем соседний: сегмент включится или удалится.",
      edgePending: (label) => `Начало: ${label}. Теперь щёлкните соседний гекс.`,
      notNeighbor: "Гексы не соседние.",
      terrain: "Местность",
      cultivated: "Окультуренный участок",
      noCultivated: "Нет",
      riverHex: "Река проходит через гекс",
      lake: "Озеро / болото",
      feature: "Достопримечательность",
      noFeature: "Нет",
      settlement: "Поселение",
      hasSettlement: "Есть поселение",
      abandoned: "Брошено",
      blocks: "Блоков",
      peoplePerBlock: "Жителей в блоке",
      government: "Власть",
      wealth: "Богатство",
      hiddenPower: "На деле",
      venue: "Заведение",
      clearHex: "Очистить особое",
      clearHexTitle: "Удаляет поселение, достопримечательность, озеро, окультуренный тип и одиночную отметку реки в гексе.",
      roadChanged: "дорога изменена",
      railChanged: "ж/д изменена",
      riverChanged: "река изменена",
      hexChanged: "гекс изменён",
      customRoll: "вручную"
    },
    legend: {
      terrain: "Ландшафт",
      signs: "Знаки",
      finds: "Находки d20",
      river: "река / озеро",
      road: "грунтовая дорога",
      rail: "железная дорога",
      bridge: "обустроенная переправа",
      noMans: "ничья земля",
      settlement: "поселение",
      largeSettlement: "крупное поселение",
      abandonedSettlement: "брошенное поселение",
      feature: "достопримечательность"
    },
    statuses: {
      rolling: "бросаем кости",
      ready: "готово",
      pngSaved: "PNG сохранён",
      jsonSaved: "JSON сохранён",
      seedCopied: "seed скопирован",
      seedSelected: "seed выделен"
    },
    terrain: {
      mountain: { name: "Горы и предгорья", short: "Горы" },
      forest: { name: "Лесистые холмы и бурелом", short: "Бурелом" },
      brush: { name: "Перелески и кустистые лощины", short: "Лощины" },
      cultivated: { name: "Окультуренная местность", short: "Окульт." },
      plains: { name: "Поля и травяные пустоши", short: "Пустошь" }
    },
    cultivated: {
      pasture: "Пастбище",
      fields: "Поля / виноградники",
      mines: "Рудники / шахты",
      settlement: "Поселение",
      noMans: "Ничья земля"
    },
    features: [
      "Домик отшельника",
      "Брошенный танк",
      "Разбитый самолёт",
      "Развалины церкви",
      "Остатки странных устройств",
      "Заросшие окопы",
      "Могильник",
      "Остатки древнего замка",
      "Дыра в земле",
      "Гигантский дуб",
      "Парящая железная сфера",
      "Камень странной формы",
      "Дерево, расколотое молнией",
      "Сгоревший участок",
      "Небольшое озерцо",
      "Остатки каменного забора",
      "Заброшенный лагерь",
      "Огромное кострище",
      "Повешенный на дереве",
      "Одинокая могила"
    ],
    governments: [
      "Совет старейшин",
      "Народное вече",
      "Военная хунта",
      "Какой-то священник",
      "Демократически избранный мэр",
      "Уцелевший аристократ"
    ],
    wealth: [
      "Тотальная бедность и голод, цены x3",
      "Тотальная бедность и голод, цены x3",
      "С трудом хватает на еду, цены x2",
      "С трудом хватает на еду, цены x2",
      "Есть небольшие накопления, обычные цены",
      "Обеспечен и богат, цены /2"
    ],
    hiddenPower: [
      "Тот же, кто номинально, без подвоха",
      "Тот же, кто номинально, без подвоха",
      "Продажный сотрудник правопорядка",
      "Ещё какой-то священник",
      "Какой-то преступник",
      "Бунтарь"
    ],
    venues: [
      "Торговая лавка",
      "Увеселительное заведение",
      "Здание городского самоуправления",
      "Церковь",
      "Опорный пункт правопорядка",
      "Заведение культуры"
    ]
  },
  en: {
    htmlLang: "en",
    documentTitle: "Dead Land, Dead Skies - hex map generator",
    ui: {
      controlsAria: "Generator settings",
      brandEyebrow: "1922 / living dead / 6 miles",
      regionMap: "Region Map",
      width: "Width",
      height: "Height",
      generate: "Generate new map",
      view: "View",
      viewModeAria: "Display mode",
      clean: "Clean",
      atmospheric: "Atmospheric",
      editor: "Editor",
      editorToolsAria: "Map tools",
      toolSelect: "Select",
      toolRoad: "Road",
      toolRail: "Rail",
      toolRiver: "River",
      export: "Export",
      seedButton: "Seed",
      summary: "Summary",
      mapAria: "Generated map",
      hexRegion: "Hex Region",
      mapNotGenerated: "Map not generated",
      detailsAria: "Hex details",
      hex: "Hex",
      hexEditor: "Edit",
      legend: "Legend",
      languageButton: "RU",
      languageToggleAria: "Switch to Russian"
    },
    stats: {
      cells: "Hexes",
      settlements: "Settlements",
      abandoned: "Abandoned",
      largeSettlements: "Large",
      population: "Residents",
      features: "Features",
      rivers: "River seg.",
      lakes: "Lakes",
      roads: "Road seg.",
      rails: "Rail seg.",
      bridges: "Crossings"
    },
    details: {
      chooseHex: "Select a hex on the map.",
      coordinates: "Coordinates",
      order: "Order",
      landscape: "Landscape",
      roll: "Roll",
      secondary: "Secondary",
      section: "Section",
      culture: "Culture",
      find: "Find",
      d20: "on d20",
      blocks: "Blocks",
      inBlock: "Per block",
      residents: "Residents",
      potential: "Potential",
      authority: "Authority",
      wealth: "Wealth",
      realPower: "In truth",
      venue: "Venue",
      settlement: "Settlement",
      abandoned: "abandoned",
      noRoll: "none",
      riverSecondary: (base) => `River-network hex; secondary: ${base}`,
      riverBase: (base) => `River through hex; base: ${base}`
    },
    tags: {
      river: "river",
      lake: "lake",
      road: "road",
      rail: "rail",
      bridge: "crossing",
      feature: "feature"
    },
    editor: {
      noHex: "Select a hex to edit its properties.",
      selectHint: "Select: click a hex, then edit it on the right.",
      edgeHint: "Click a first hex, then a neighboring hex: the segment toggles on or off.",
      edgePending: (label) => `Start: ${label}. Now click a neighboring hex.`,
      notNeighbor: "Those hexes are not adjacent.",
      terrain: "Terrain",
      cultivated: "Cultivated section",
      noCultivated: "None",
      riverHex: "River passes through hex",
      lake: "Lake / bog",
      feature: "Feature",
      noFeature: "None",
      settlement: "Settlement",
      hasSettlement: "Has settlement",
      abandoned: "Abandoned",
      blocks: "Blocks",
      peoplePerBlock: "Residents per block",
      government: "Authority",
      wealth: "Wealth",
      hiddenPower: "In truth",
      venue: "Venue",
      clearHex: "Clear special",
      clearHexTitle: "Removes settlement, feature, lake, cultivated subtype, and a lone river mark from the hex.",
      roadChanged: "road changed",
      railChanged: "rail changed",
      riverChanged: "river changed",
      hexChanged: "hex changed",
      customRoll: "manual"
    },
    legend: {
      terrain: "Landscape",
      signs: "Signs",
      finds: "Finds d20",
      river: "river / lake",
      road: "dirt road",
      rail: "railway",
      bridge: "built crossing",
      noMans: "no man's land",
      settlement: "settlement",
      largeSettlement: "large settlement",
      abandonedSettlement: "abandoned settlement",
      feature: "feature"
    },
    statuses: {
      rolling: "rolling dice",
      ready: "ready",
      pngSaved: "PNG saved",
      jsonSaved: "JSON saved",
      seedCopied: "seed copied",
      seedSelected: "seed selected"
    },
    terrain: {
      mountain: { name: "Mountains and foothills", short: "Mountains" },
      forest: { name: "Wooded hills and deadfall", short: "Deadfall" },
      brush: { name: "Groves and brushy hollows", short: "Hollows" },
      cultivated: { name: "Cultivated land", short: "Cultiv." },
      plains: { name: "Fields and grassy wastelands", short: "Wasteland" }
    },
    cultivated: {
      pasture: "Pasture",
      fields: "Fields / vineyards",
      mines: "Mines / shafts",
      settlement: "Settlement",
      noMans: "No man's land"
    },
    features: [
      "Hermit's hut",
      "Abandoned tank",
      "Crashed aircraft",
      "Church ruins",
      "Remains of strange devices",
      "Overgrown trenches",
      "Burial ground",
      "Ancient castle remains",
      "Hole in the ground",
      "Giant oak",
      "Hovering iron sphere",
      "Oddly shaped stone",
      "Lightning-split tree",
      "Burned patch",
      "Small pond",
      "Remains of a stone fence",
      "Abandoned camp",
      "Huge firepit",
      "Hanged man in a tree",
      "Lone grave"
    ],
    governments: [
      "Council of elders",
      "Popular assembly",
      "Military junta",
      "Some priest",
      "Democratically elected mayor",
      "Surviving aristocrat"
    ],
    wealth: [
      "Total poverty and hunger, prices x3",
      "Total poverty and hunger, prices x3",
      "Barely enough food, prices x2",
      "Barely enough food, prices x2",
      "Small savings, normal prices",
      "Comfortable and rich, prices /2"
    ],
    hiddenPower: [
      "Same as the nominal authority, no trick",
      "Same as the nominal authority, no trick",
      "Corrupt law officer",
      "Another priest",
      "Some criminal",
      "Rebel"
    ],
    venues: [
      "Trading shop",
      "Entertainment venue",
      "Municipal building",
      "Church",
      "Law-enforcement post",
      "Cultural venue"
    ]
  }
};

const INITIAL_LANGUAGE = new URLSearchParams(window.location.search).get("lang");

const PROP_ASSET_PATHS = {
  revolver: "assets/props/revolver.png",
  compass: "assets/props/compass.png",
  glass: "assets/props/glass.png",
  lamp: "assets/props/lamp.png",
  cartridges: "assets/props/cartridges.png"
};

const MAP_MIN_SIZE = 6;
const MAP_MAX_SIZE = 60;
const RIVER_NETWORK_SOURCE_LIMIT = 32;
const ROAD_NETWORK_LIMIT = 180;
const ROAD_BRANCH_LIMIT = 420;
const RAIL_NETWORK_LIMIT = 90;

const propAssets = {};

const state = {
  map: null,
  selected: null,
  layout: null,
  dpr: 1,
  editor: {
    tool: "select",
    edgeStart: null,
    notice: ""
  },
  view: {
    scale: 1,
    offsetX: 0,
    offsetY: 0,
    isPanning: false,
    lastX: 0,
    lastY: 0,
    moved: false,
    suppressClick: false
  },
  renderQueued: false,
  layoutCache: null,
  mapMode: "atmospheric",
  lang: INITIAL_LANGUAGE === "en" ? "en" : INITIAL_LANGUAGE === "ru" ? "ru" : localStorage.getItem("deadLandLanguage") === "en" ? "en" : "ru",
  statusKey: "ready"
};

const els = {
  seed: document.getElementById("seedInput"),
  width: document.getElementById("widthInput"),
  height: document.getElementById("heightInput"),
  generate: document.getElementById("generateBtn"),
  exportPng: document.getElementById("exportPngBtn"),
  exportJson: document.getElementById("exportJsonBtn"),
  copySeed: document.getElementById("copySeedBtn"),
  cleanMode: document.getElementById("cleanModeBtn"),
  atmosphericMode: document.getElementById("atmosphericModeBtn"),
  editorTools: document.getElementById("editorTools"),
  editorHint: document.getElementById("editorHint"),
  languageToggle: document.getElementById("languageToggleBtn"),
  stats: document.getElementById("statsList"),
  details: document.getElementById("hexDetails"),
  editor: document.getElementById("hexEditor"),
  legend: document.getElementById("legendList"),
  canvas: document.getElementById("mapCanvas"),
  title: document.getElementById("mapTitle"),
  status: document.getElementById("statusPill")
};

const ctx = els.canvas.getContext("2d");

init();

function init() {
  els.seed.value = freshSeed();
  els.width.value = "16";
  els.height.value = "12";
  loadPropAssets();
  applyLocalization();
  bindEvents();
  resizeCanvas();
  generate();
}

function bindEvents() {
  els.generate.addEventListener("click", () => {
    els.seed.value = freshSeed();
    generate();
  });
  els.exportPng.addEventListener("click", exportPng);
  els.exportJson.addEventListener("click", exportJson);
  els.copySeed.addEventListener("click", copySeed);
  els.cleanMode.addEventListener("click", () => setMapMode("clean"));
  els.atmosphericMode.addEventListener("click", () => setMapMode("atmospheric"));
  els.editorTools.addEventListener("click", onEditorToolClick);
  els.editor.addEventListener("change", onEditorChange);
  els.editor.addEventListener("input", onEditorInput);
  els.editor.addEventListener("click", onEditorClick);
  els.languageToggle.addEventListener("click", () => {
    setLanguage(state.lang === "ru" ? "en" : "ru");
  });
  els.canvas.addEventListener("click", onCanvasClick);
  els.canvas.addEventListener("contextmenu", (event) => event.preventDefault());
  els.canvas.addEventListener("wheel", onCanvasWheel, { passive: false });
  els.canvas.addEventListener("pointerdown", onCanvasPointerDown);
  els.canvas.addEventListener("pointermove", onCanvasPointerMove);
  els.canvas.addEventListener("pointerup", onCanvasPointerUp);
  els.canvas.addEventListener("pointercancel", onCanvasPointerUp);
  window.addEventListener("resize", () => {
    resizeCanvas();
    render();
  });
  updateModeButtons();
  updateEditorTools();
}

function setMapMode(mode) {
  state.mapMode = mode;
  updateModeButtons();
  render();
}

function updateModeButtons() {
  els.cleanMode.classList.toggle("is-active", state.mapMode === "clean");
  els.atmosphericMode.classList.toggle("is-active", state.mapMode === "atmospheric");
}

function isAtmosphericMode() {
  return state.mapMode === "atmospheric";
}

function onEditorToolClick(event) {
  const button = event.target.closest("[data-editor-tool]");
  if (!button) return;
  setEditorTool(button.dataset.editorTool);
}

function setEditorTool(tool) {
  state.editor.tool = ["select", "road", "rail", "river"].includes(tool) ? tool : "select";
  state.editor.edgeStart = null;
  state.editor.notice = "";
  updateEditorTools();
  render();
}

function isEdgeEditorTool(tool = state.editor.tool) {
  return tool === "road" || tool === "rail" || tool === "river";
}

function updateEditorTools() {
  const loc = currentLocale().editor;
  els.editorTools.querySelectorAll("[data-editor-tool]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.editorTool === state.editor.tool);
  });
  els.canvas.classList.toggle("is-drawing-edge", isEdgeEditorTool());

  if (state.editor.notice) {
    els.editorHint.textContent = state.editor.notice;
    state.editor.notice = "";
    return;
  }

  if (isEdgeEditorTool() && state.editor.edgeStart) {
    els.editorHint.textContent = loc.edgePending(state.editor.edgeStart.label);
    return;
  }

  els.editorHint.textContent = isEdgeEditorTool() ? loc.edgeHint : loc.selectHint;
}

function flashStatus(message) {
  els.status.textContent = message;
}

function generate() {
  const settings = readSettings();
  const rng = createRng(settings.seed);
  const map = createMap(settings.width, settings.height, settings.seed);

  setStatus("rolling");
  fillRegion(map, rng);
  buildRivers(map, rng);
  assignFeatures(map, rng);
  buildRoads(map, rng);
  buildRailways(map, rng);
  map.stats = computeStats(map);

  state.map = map;
  state.selected = getCell(map, Math.floor(map.width / 2), Math.floor(map.height / 2));
  state.editor.edgeStart = null;
  state.editor.notice = "";
  resetView();
  updateMapTitle();
  setStatus("ready");
  render();
  updatePanels();
}

function readSettings() {
  const seed = (els.seed.value || freshSeed()).trim();
  const width = clamp(parseInt(els.width.value, 10) || 16, MAP_MIN_SIZE, MAP_MAX_SIZE);
  const height = clamp(parseInt(els.height.value, 10) || 12, MAP_MIN_SIZE, MAP_MAX_SIZE);
  els.seed.value = seed;
  els.width.value = String(width);
  els.height.value = String(height);
  return { seed, width, height };
}

function setStatus(key) {
  state.statusKey = key;
  els.status.textContent = currentLocale().statuses[key] || key;
}

function currentLocale() {
  return L10N[state.lang] || L10N.ru;
}

function setLanguage(lang) {
  state.lang = lang === "en" ? "en" : "ru";
  localStorage.setItem("deadLandLanguage", state.lang);
  applyLocalization();
}

function applyLocalization() {
  const loc = currentLocale();
  document.documentElement.lang = loc.htmlLang;
  document.title = loc.documentTitle;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (loc.ui[key]) node.textContent = loc.ui[key];
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    const key = node.getAttribute("data-i18n-aria-label");
    if (loc.ui[key]) node.setAttribute("aria-label", loc.ui[key]);
  });

  els.languageToggle.textContent = loc.ui.languageButton;
  els.languageToggle.setAttribute("aria-label", loc.ui.languageToggleAria);
  updateMapTitle();
  setStatus(state.statusKey || "ready");
  updateModeButtons();
  updateEditorTools();
  renderLegend();
  if (state.map) updatePanels();
}

function updateMapTitle() {
  if (!state.map) {
    els.title.textContent = currentLocale().ui.mapNotGenerated;
    return;
  }
  els.title.textContent = `${state.map.width} x ${state.map.height}, seed ${state.map.seed}`;
}

function loadPropAssets() {
  for (const [key, src] of Object.entries(PROP_ASSET_PATHS)) {
    const image = new Image();
    propAssets[key] = { image, loaded: false };
    image.onload = () => {
      propAssets[key].loaded = true;
      if (state.map) render();
    };
    image.onerror = () => {
      propAssets[key].loaded = false;
    };
    image.src = src;
  }
}

function terrainLabel(key, field = "name") {
  const locTerrain = currentLocale().terrain[key];
  const fallback = TERRAIN[key] || TERRAIN.plains;
  return (locTerrain && locTerrain[field]) || fallback[field] || key;
}

function cultivatedLabel(key) {
  return currentLocale().cultivated[key] || CULTIVATED[key] || key;
}

function featureLabel(roll) {
  return currentLocale().features[roll - 1] || FEATURE_TABLE[roll - 1] || "";
}

function rolledListLabel(listName, roll, fallback) {
  return currentLocale()[listName][roll - 1] || fallback || "";
}

function formatNumber(value) {
  return value.toLocaleString(state.lang === "ru" ? "ru-RU" : "en-US");
}

function createMap(width, height, seed) {
  const cells = [];
  const byKey = new Map();
  for (let r = 0; r < height; r += 1) {
    for (let q = 0; q < width; q += 1) {
      const raw = offsetToPixel(q, r, 1);
      const cell = {
        q,
        r,
        rawX: raw.x,
        rawY: raw.y,
        key: coordKey(q, r),
        label: cellLabel(q, r),
        generated: false,
        order: 0,
        terrain: "plains",
        primaryTerrain: "plains",
        hasRiver: false,
        manualRiver: false,
        originalRiver: false,
        riverLake: false,
        bridge: false,
        road: false,
        rail: false,
        feature: null,
        settlement: null,
        cultivated: null,
        rolls: {}
      };
      cells.push(cell);
      byKey.set(cell.key, cell);
    }
  }
  return {
    width,
    height,
    seed,
    cells,
    byKey,
    riverEdges: new Set(),
    roadEdges: new Set(),
    railEdges: new Set(),
    stats: null
  };
}

function fillRegion(map, rng) {
  let current = getCell(map, Math.floor(map.width / 2), Math.floor(map.height / 2));
  let generated = 0;
  let order = 1;
  const total = map.width * map.height;
  const frontier = [];
  const frontierKeys = new Set();

  function addFrontier(cell) {
    if (!cell || !cell.generated || frontierKeys.has(cell.key)) return;
    if (!hasUngeneratedNeighbor(map, cell)) return;
    frontier.push(cell);
    frontierKeys.add(cell.key);
  }

  function takeFrontier() {
    while (frontier.length > 0) {
      const index = Math.floor(rng() * frontier.length);
      const candidate = frontier[index];
      if (candidate.generated && hasUngeneratedNeighbor(map, candidate)) {
        return candidate;
      }
      frontierKeys.delete(candidate.key);
      frontier[index] = frontier[frontier.length - 1];
      frontier.pop();
    }
    return null;
  }

  while (generated < total) {
    if (!current.generated) {
      rollCell(current, rng);
      current.generated = true;
      current.order = order;
      order += 1;
      generated += 1;
      addFrontier(current);
      for (const near of neighbors(map, current)) {
        addFrontier(near);
      }
    }

    const next = chooseNextHex(map, current, rng);
    if (next) {
      current = next;
      continue;
    }

    const frontierCell = takeFrontier();
    if (frontierCell) {
      current = frontierCell;
      continue;
    }

    const unfilled = map.cells.find((cell) => !cell.generated);
    if (unfilled) {
      current = unfilled;
    }
  }
}

function hasUngeneratedNeighbor(map, cell) {
  return neighbors(map, cell).some((near) => !near.generated);
}

function chooseNextHex(map, cell, rng) {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const dirIndex = die(rng, 6) - 1;
    const near = neighbor(map, cell, dirIndex);
    if (near && !near.generated) {
      cell.rolls.nextDirection = dirIndex + 1;
      return near;
    }
  }

  const unfilled = neighbors(map, cell).filter((near) => !near.generated);
  if (unfilled.length > 0) {
    return choice(unfilled, rng);
  }
  return null;
}

function rollCell(cell, rng) {
  const terrainRoll = rollTerrain(rng, true);
  cell.rolls.terrain = terrainRoll.roll;
  cell.primaryTerrain = terrainRoll.primary;
  cell.terrain = terrainRoll.terrain;
  cell.hasRiver = terrainRoll.primary === "river";
  cell.originalRiver = cell.hasRiver;

  if (terrainRoll.secondaryRoll) {
    cell.rolls.secondaryTerrain = terrainRoll.secondaryRoll;
  }

  if (cell.terrain === "cultivated") {
    rollCultivated(cell, rng);
  }
}

function rollTerrain(rng, allowRiver) {
  while (true) {
    const roll = roll2d6(rng);
    const mapped = terrainFrom2d6(roll.total);
    if (mapped === "river" && !allowRiver) {
      continue;
    }
    if (mapped === "river") {
      const secondary = rollTerrain(rng, false);
      return {
        primary: "river",
        terrain: secondary.terrain,
        roll,
        secondaryRoll: secondary.roll
      };
    }
    return {
      primary: mapped,
      terrain: mapped,
      roll
    };
  }
}

function terrainFrom2d6(total) {
  if (total === 2 || total === 12) return "mountain";
  if (total === 3 || total === 11) return "forest";
  if (total === 4 || total === 10) return "brush";
  if (total === 5 || total === 9) return "cultivated";
  if (total === 6 || total === 8) return "plains";
  return "river";
}

function rollCultivated(cell, rng) {
  const roll = die(rng, 6);
  let subtype = "noMans";
  if (roll === 1) subtype = "pasture";
  if (roll === 2) subtype = "fields";
  if (roll === 3) subtype = "mines";
  if (roll === 4) subtype = "settlement";
  cell.rolls.cultivated = roll;
  cell.cultivated = subtype;

  const settlementChanceRoll = die(rng, 2);
  if (subtype === "settlement" || settlementChanceRoll === 1) {
    cell.rolls.settlementChance = settlementChanceRoll;
    cell.settlement = rollSettlement(rng);
  }
}

function rollSettlement(rng) {
  const sizeRoll = roll2d6(rng);
  const blocks = settlementBlocks(sizeRoll.total, rng);
  const populationRoll = roll2d6(rng);
  const peoplePerBlock = peopleInBlock(populationRoll.total);
  const abandonedRoll = die(rng, 2);
  const abandoned = abandonedRoll === 1;
  const settlement = {
    blocks,
    peoplePerBlock,
    potentialPopulation: blocks * peoplePerBlock,
    population: abandoned ? 0 : blocks * peoplePerBlock,
    abandoned,
    rolls: {
      size: sizeRoll,
      peoplePerBlock: populationRoll,
      abandoned: abandonedRoll
    },
    government: null,
    wealth: null,
    hiddenPower: null,
    venue: null
  };

  if (!abandoned) {
    const governmentRoll = die(rng, 6);
    const wealthRoll = die(rng, 6);
    const hiddenRoll = die(rng, 6);
    const venueRoll = die(rng, 6);
    settlement.rolls.government = governmentRoll;
    settlement.rolls.wealth = wealthRoll;
    settlement.rolls.hiddenPower = hiddenRoll;
    settlement.rolls.venue = venueRoll;
    settlement.government = GOVERNMENTS[governmentRoll - 1];
    settlement.wealth = WEALTH[wealthRoll - 1];
    settlement.hiddenPower = HIDDEN_POWER[hiddenRoll - 1];
    settlement.venue = VENUES[venueRoll - 1];
  }

  return settlement;
}

function settlementBlocks(total, rng) {
  if (total === 2) return 1;
  if (total === 3 || total === 4) return 2;
  if (total >= 5 && total <= 7) return die(rng, 3) + 1;
  if (total === 8 || total === 9) return die(rng, 3) + die(rng, 3);
  if (total === 10 || total === 11) return die(rng, 6) + 3;
  return die(rng, 6) + die(rng, 6) + 6;
}

function peopleInBlock(total) {
  if (total === 2) return 10;
  if (total === 3 || total === 4) return 20;
  if (total >= 5 && total <= 7) return 50;
  if (total === 8 || total === 9) return 100;
  if (total === 10 || total === 11) return 200;
  return 500;
}

function buildRivers(map, rng) {
  map.riverEdges.clear();
  const rolledSources = map.cells.filter((cell) => cell.originalRiver);
  if (rolledSources.length === 0) {
    return;
  }

  for (const cell of rolledSources) {
    cell.hasRiver = false;
    cell.riverLake = false;
  }

  const { sources, extraLakes } = selectRiverSources(map, rolledSources, rng);
  const sourceKeys = new Set(sources.map((cell) => cell.key));
  const lakeKeys = new Set(extraLakes.map((cell) => cell.key));

  for (const cell of rolledSources) {
    if (sourceKeys.has(cell.key)) {
      cell.originalRiver = true;
      continue;
    }
    if (lakeKeys.has(cell.key)) {
      cell.originalRiver = true;
      cell.hasRiver = true;
      cell.riverLake = true;
      continue;
    }

    cell.originalRiver = false;
    cell.primaryTerrain = cell.terrain;
  }

  if (sources.length === 0) {
    return;
  }

  const groups = clusterRiverSources(sources);
  for (const group of groups) {
    if (group.length === 1) {
      const flowDir = Math.floor(rng() * 6);
      group[0].hasRiver = true;
      extendRiver(map, group[0], flowDir, rng);
      continue;
    }

    connectRiverGroup(map, group);
    const flowDir = Math.floor(rng() * 6);
    const low = group.reduce((best, cell) => {
      return projection(cell, flowDir) < projection(best, flowDir) ? cell : best;
    }, group[0]);
    const high = group.reduce((best, cell) => {
      return projection(cell, flowDir) > projection(best, flowDir) ? cell : best;
    }, group[0]);
    extendRiver(map, low, (flowDir + 3) % 6, rng);
    extendRiver(map, high, flowDir, rng);
  }
}

function selectRiverSources(map, sources, rng) {
  const area = map.width * map.height;
  const limit = area <= 900
    ? sources.length
    : Math.min(RIVER_NETWORK_SOURCE_LIMIT, Math.max(12, Math.round(Math.sqrt(area) * 0.45)));

  if (sources.length <= limit) {
    return { sources, extraLakes: [] };
  }

  const selected = spreadSample(map, sources, limit, rng);
  const selectedKeys = new Set(selected.map((cell) => cell.key));
  const remaining = sources.filter((cell) => !selectedKeys.has(cell.key));
  const extraLakeLimit = Math.min(remaining.length, Math.max(4, Math.round(Math.sqrt(area) * 0.22)));
  return {
    sources: selected,
    extraLakes: spreadSample(map, remaining, extraLakeLimit, rng)
  };
}

function clusterRiverSources(sources) {
  const parent = new Map();
  for (const cell of sources) {
    parent.set(cell.key, cell.key);
  }

  function find(key) {
    const next = parent.get(key);
    if (next === key) return key;
    const root = find(next);
    parent.set(key, root);
    return root;
  }

  function union(a, b) {
    const rootA = find(a.key);
    const rootB = find(b.key);
    if (rootA !== rootB) parent.set(rootB, rootA);
  }

  for (let i = 0; i < sources.length; i += 1) {
    for (let j = i + 1; j < sources.length; j += 1) {
      if (hexDistance(sources[i], sources[j]) <= 2) {
        union(sources[i], sources[j]);
      }
    }
  }

  const grouped = new Map();
  for (const cell of sources) {
    const root = find(cell.key);
    if (!grouped.has(root)) grouped.set(root, []);
    grouped.get(root).push(cell);
  }
  return [...grouped.values()];
}

function connectRiverGroup(map, group) {
  const connected = [group[0]];
  const remaining = group.slice(1);

  while (remaining.length > 0) {
    let best = null;
    for (const a of connected) {
      for (const b of remaining) {
        const distance = hexDistance(a, b);
        if (!best || distance < best.distance) {
          best = { a, b, distance };
        }
      }
    }

    const path = hexLine(map, best.a, best.b);
    markRiverPath(map, path);
    connected.push(best.b);
    remaining.splice(remaining.indexOf(best.b), 1);
  }
}

function extendRiver(map, start, dirIndex, rng) {
  let current = start;
  let dir = dirIndex;
  const visited = new Set([current.key]);
  const maxSteps = map.width + map.height + 10;

  for (let step = 0; step < maxSteps; step += 1) {
    const candidates = [];
    for (const delta of [0, -1, 1]) {
      const nextDir = (dir + delta + 6) % 6;
      const next = neighbor(map, current, nextDir);
      if (next && !visited.has(next.key)) {
        candidates.push({
          cell: next,
          dir: nextDir,
          weight: delta === 0 ? 0.6 : 0.2
        });
      }
    }
    if (candidates.length === 0) break;

    const picked = weightedChoice(candidates, rng);
    markRiverPath(map, [current, picked.cell]);
    current = picked.cell;
    dir = picked.dir;
    visited.add(current.key);
    if (isMapEdge(map, current) && rng() < 0.7) break;
  }
}

function markRiverPath(map, path) {
  for (const cell of path) {
    cell.hasRiver = true;
  }
  for (let i = 0; i < path.length - 1; i += 1) {
    map.riverEdges.add(edgeKey(path[i], path[i + 1]));
  }
}

function assignFeatures(map, rng) {
  for (const cell of map.cells) {
    const isCultivated = cell.terrain === "cultivated";
    if (isCultivated) continue;

    const chanceRoll = die(rng, 6);
    cell.rolls.featureChance = chanceRoll;
    if (chanceRoll <= 2) {
      const featureRoll = die(rng, 20);
      cell.rolls.feature = featureRoll;
      cell.feature = FEATURE_TABLE[featureRoll - 1];
    }
  }
}

function buildRoads(map, rng) {
  map.roadEdges.clear();
  for (const cell of map.cells) {
    cell.road = false;
    cell.bridge = false;
  }

  const cultivated = map.cells.filter((cell) => cell.terrain === "cultivated");
  const networkPoints = selectRoadNetworkPoints(map, cultivated, rng);
  const branchAnchors = spreadSample(map, cultivated, ROAD_BRANCH_LIMIT, rng);
  connectPoints(map, networkPoints, "road", rng);
  addRoadBranches(map, branchAnchors, rng);
  markBridges(map);
}

function addRoadBranches(map, anchors, rng) {
  for (const anchor of anchors) {
    if (rng() > 0.24) continue;
    let current = anchor;
    let dir = Math.floor(rng() * 6);
    const length = die(rng, 3);
    for (let step = 0; step < length; step += 1) {
      if (rng() < 0.35) {
        dir = (dir + choice([-1, 1], rng) + 6) % 6;
      }
      const next = neighbor(map, current, dir);
      if (!next) break;
      markTravelPath(map, [current, next], "road");
      current = next;
    }
  }
}

function buildRailways(map, rng) {
  map.railEdges.clear();
  for (const cell of map.cells) {
    cell.rail = false;
  }

  const largeSettlements = map.cells.filter((cell) => {
    return cell.settlement && cell.settlement.blocks >= 4;
  });
  connectPoints(map, spreadSample(map, largeSettlements, RAIL_NETWORK_LIMIT, rng), "rail", rng);
  markBridges(map);
}

function selectRoadNetworkPoints(map, cultivated, rng) {
  if (cultivated.length <= ROAD_NETWORK_LIMIT) {
    return cultivated;
  }

  const important = cultivated.filter((cell) => {
    return cell.settlement || cell.cultivated === "settlement" || cell.cultivated === "mines";
  });
  const selected = [];
  const selectedKeys = new Set();

  function add(cell) {
    if (!cell || selectedKeys.has(cell.key)) return;
    selected.push(cell);
    selectedKeys.add(cell.key);
  }

  const importantLimit = Math.min(important.length, Math.floor(ROAD_NETWORK_LIMIT * 0.72));
  for (const cell of spreadSample(map, important, importantLimit, rng)) {
    add(cell);
  }

  const remaining = cultivated.filter((cell) => !selectedKeys.has(cell.key));
  for (const cell of spreadSample(map, remaining, ROAD_NETWORK_LIMIT - selected.length, rng)) {
    add(cell);
  }

  return selected;
}

function spreadSample(map, points, limit, rng) {
  if (points.length <= limit) return points.slice();
  if (limit <= 0) return [];

  const bucketSize = Math.max(2, Math.ceil(Math.sqrt((map.width * map.height) / limit)));
  const buckets = new Map();
  for (const cell of points) {
    const key = `${Math.floor(cell.q / bucketSize)},${Math.floor(cell.r / bucketSize)}`;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(cell);
  }

  const bucketList = [...buckets.values()];
  shuffleInPlace(bucketList, rng);
  const picked = [];

  while (picked.length < limit && bucketList.length > 0) {
    let added = false;
    for (const bucket of bucketList) {
      if (bucket.length === 0) continue;
      const index = Math.floor(rng() * bucket.length);
      picked.push(bucket[index]);
      bucket[index] = bucket[bucket.length - 1];
      bucket.pop();
      added = true;
      if (picked.length >= limit) break;
    }
    if (!added) break;
  }

  return picked;
}

function connectPoints(map, points, mode, rng) {
  if (points.length < 2) return;

  const connected = [points[0]];
  const remaining = points.slice(1);
  while (remaining.length > 0) {
    let best = null;
    for (const a of connected) {
      for (const b of remaining) {
        const score = hexDistance(a, b) + rng() * 0.18;
        if (!best || score < best.score) {
          best = { a, b, score };
        }
      }
    }
    const path = findPath(map, best.a, best.b, mode);
    markTravelPath(map, path, mode);
    connected.push(best.b);
    remaining.splice(remaining.indexOf(best.b), 1);
  }
}

function findPath(map, start, goal, mode) {
  const open = new Set([start.key]);
  const cameFrom = new Map();
  const gScore = new Map([[start.key, 0]]);
  const fScore = new Map([[start.key, hexDistance(start, goal)]]);

  while (open.size > 0) {
    let currentKey = null;
    let currentScore = Infinity;
    for (const key of open) {
      const score = fScore.get(key) ?? Infinity;
      if (score < currentScore) {
        currentScore = score;
        currentKey = key;
      }
    }

    const current = map.byKey.get(currentKey);
    if (current === goal) {
      return reconstructPath(map, cameFrom, current.key);
    }

    open.delete(current.key);
    for (const near of neighbors(map, current)) {
      const tentative = (gScore.get(current.key) ?? Infinity) + travelCost(near, mode);
      if (tentative < (gScore.get(near.key) ?? Infinity)) {
        cameFrom.set(near.key, current.key);
        gScore.set(near.key, tentative);
        fScore.set(near.key, tentative + hexDistance(near, goal) * 1.05);
        open.add(near.key);
      }
    }
  }

  return hexLine(map, start, goal);
}

function reconstructPath(map, cameFrom, currentKey) {
  const path = [map.byKey.get(currentKey)];
  while (cameFrom.has(currentKey)) {
    currentKey = cameFrom.get(currentKey);
    path.unshift(map.byKey.get(currentKey));
  }
  return path;
}

function travelCost(cell, mode) {
  const base = mode === "rail" ? 1.2 : 1;
  let cost = base;
  if (cell.terrain === "cultivated") cost -= mode === "rail" ? 0.32 : 0.38;
  if (cell.terrain === "plains") cost -= 0.12;
  if (cell.terrain === "brush") cost += 0.15;
  if (cell.terrain === "forest") cost += mode === "rail" ? 0.35 : 0.25;
  if (cell.terrain === "mountain") cost += mode === "rail" ? 1.05 : 0.72;
  if (cell.cultivated === "noMans") cost += 0.28;
  if (cell.riverLake) cost += 1.6;
  if (cell.hasRiver) cost += mode === "rail" ? 0.38 : 0.2;
  return Math.max(0.3, cost);
}

function markTravelPath(map, path, mode) {
  const set = mode === "rail" ? map.railEdges : map.roadEdges;
  for (const cell of path) {
    if (mode === "rail") cell.rail = true;
    else cell.road = true;
  }
  for (let i = 0; i < path.length - 1; i += 1) {
    set.add(edgeKey(path[i], path[i + 1]));
  }
}

function markBridges(map) {
  for (const cell of map.cells) {
    if ((cell.road || cell.rail) && cell.hasRiver) {
      cell.bridge = true;
    }
  }
  for (const key of map.roadEdges) {
    if (map.riverEdges.has(key)) {
      const [a, b] = edgeCells(map, key);
      a.bridge = true;
      b.bridge = true;
    }
  }
  for (const key of map.railEdges) {
    if (map.riverEdges.has(key)) {
      const [a, b] = edgeCells(map, key);
      a.bridge = true;
      b.bridge = true;
    }
  }
}

function computeStats(map) {
  const settlements = map.cells.filter((cell) => cell.settlement);
  const inhabited = settlements.filter((cell) => !cell.settlement.abandoned);
  return {
    cells: map.cells.length,
    rivers: map.riverEdges.size,
    lakes: map.cells.filter((cell) => cell.riverLake).length,
    roads: map.roadEdges.size,
    rails: map.railEdges.size,
    bridges: map.cells.filter((cell) => cell.bridge).length,
    settlements: settlements.length,
    abandoned: settlements.filter((cell) => cell.settlement.abandoned).length,
    largeSettlements: settlements.filter((cell) => cell.settlement.blocks >= 4).length,
    population: inhabited.reduce((sum, cell) => sum + cell.settlement.population, 0),
    features: map.cells.filter((cell) => cell.feature).length
  };
}

function render() {
  if (!state.map) return;
  resizeCanvas(false);
  const map = state.map;
  state.layout = applyView(baseLayoutFor(map, els.canvas.width, els.canvas.height));
  const visibleCells = visibleMapCells(map);

  ctx.clearRect(0, 0, els.canvas.width, els.canvas.height);
  drawCanvasGround();
  for (const cell of visibleCells) drawHexBase(cell);
  if (isAtmosphericMode() && !isLiteMapRender()) drawBattlefieldGrime();
  drawEdgeSet(map.riverEdges, drawRiverSegment);
  for (const cell of visibleCells) {
    if (cell.riverLake) drawLake(cell);
  }
  drawEdgeSet(map.roadEdges, drawRoadSegment);
  drawEdgeSet(map.railEdges, drawRailSegment);
  for (const cell of visibleCells) drawCellOverlays(cell);
  if (isAtmosphericMode()) drawSmokeLayer();
  if (isAtmosphericMode()) drawAtmosphericFinish();
  if (isAtmosphericMode()) drawTableProps(els.canvas.width, els.canvas.height, "over");
  if (state.selected) drawSelection(state.selected);
  drawEditorPendingSelection();
}

function baseLayoutFor(map, width, height) {
  const mode = state.mapMode;
  const cached = state.layoutCache;
  if (cached && cached.map === map && cached.width === width && cached.height === height && cached.mode === mode) {
    return cached.layout;
  }

  const layout = computeLayout(map, width, height);
  state.layoutCache = { map, width, height, mode, layout };
  return layout;
}

function queueRender() {
  if (state.renderQueued) return;
  state.renderQueued = true;
  const schedule = window.requestAnimationFrame || ((callback) => setTimeout(callback, 16));
  schedule(() => {
    state.renderQueued = false;
    render();
  });
}

function visibleMapCells(map) {
  if (map.cells.length <= 900) return map.cells;
  const margin = state.layout.size * 2;
  const minX = -margin;
  const minY = -margin;
  const maxX = els.canvas.width + margin;
  const maxY = els.canvas.height + margin;
  return map.cells.filter((cell) => {
    const center = centerOf(cell);
    return center.x >= minX && center.x <= maxX && center.y >= minY && center.y <= maxY;
  });
}

function isLargeMap() {
  return Boolean(state.map && state.map.cells.length > 1600);
}

function isLiteMapRender() {
  return isLargeMap() && state.layout && state.layout.size < 13;
}

function resizeCanvas(updateRender = true) {
  const rect = els.canvas.getBoundingClientRect();
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  const width = Math.max(320, Math.floor(rect.width * dpr));
  const height = Math.max(320, Math.floor(rect.height * dpr));
  if (els.canvas.width !== width || els.canvas.height !== height) {
    els.canvas.width = width;
    els.canvas.height = height;
    state.dpr = dpr;
    if (updateRender && state.map) render();
  }
}

function computeLayout(map, width, height) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const cell of map.cells) {
    minX = Math.min(minX, cell.rawX - 1);
    minY = Math.min(minY, cell.rawY - 1);
    maxX = Math.max(maxX, cell.rawX + 1);
    maxY = Math.max(maxY, cell.rawY + 1);
  }

  const padding = Math.min(width, height) * (isAtmosphericMode() ? 0.115 : 0.055);
  const fittedSize = Math.min(
    (width - padding * 2) / Math.max(1, maxX - minX),
    (height - padding * 2) / Math.max(1, maxY - minY)
  );
  const size = Math.max(9, fittedSize);
  return {
    baseSize: size,
    baseOffsetX: (width - (maxX - minX) * size) / 2 - minX * size,
    baseOffsetY: (height - (maxY - minY) * size) / 2 - minY * size,
    size,
    offsetX: (width - (maxX - minX) * size) / 2 - minX * size,
    offsetY: (height - (maxY - minY) * size) / 2 - minY * size
  };
}

function applyView(baseLayout) {
  const view = state.view;
  return {
    baseSize: baseLayout.baseSize,
    baseOffsetX: baseLayout.baseOffsetX,
    baseOffsetY: baseLayout.baseOffsetY,
    size: baseLayout.baseSize * view.scale,
    offsetX: baseLayout.baseOffsetX * view.scale + view.offsetX,
    offsetY: baseLayout.baseOffsetY * view.scale + view.offsetY
  };
}

function resetView() {
  state.view.scale = 1;
  state.view.offsetX = 0;
  state.view.offsetY = 0;
  state.view.isPanning = false;
  state.view.lastX = 0;
  state.view.lastY = 0;
  state.view.moved = false;
  state.view.suppressClick = false;
}

function drawCanvasGround() {
  const { width, height } = els.canvas;
  if (isAtmosphericMode()) {
    drawWoodTable(width, height);
    drawTableProps(width, height, "under");
    drawPaperSheet();
    return;
  }

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#1b1c18");
  gradient.addColorStop(0.52, "#26251d");
  gradient.addColorStop(1, "#10120f");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalAlpha = 0.17;
  ctx.strokeStyle = "#e6d1a5";
  ctx.lineWidth = Math.max(1, state.dpr);
  for (let y = 0; y < height; y += 18 * state.dpr) {
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(width, y + 0.5);
    ctx.stroke();
  }
  ctx.restore();
}

function drawWoodTable(width, height) {
  const rng = createRng(`${state.map.seed}:tabletop`);
  const base = ctx.createLinearGradient(0, 0, width, height);
  base.addColorStop(0, "#19110b");
  base.addColorStop(0.45, "#2a1b10");
  base.addColorStop(1, "#0e0906");
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalAlpha = 0.36;
  for (let y = -20 * state.dpr; y < height + 30 * state.dpr; y += 58 * state.dpr) {
    ctx.fillStyle = rng() > 0.48 ? "rgba(91, 55, 30, 0.22)" : "rgba(8, 5, 3, 0.28)";
    ctx.fillRect(0, y + (rng() - 0.5) * 12 * state.dpr, width, (28 + rng() * 28) * state.dpr);
    ctx.strokeStyle = "rgba(229, 177, 104, 0.11)";
    ctx.lineWidth = Math.max(1, state.dpr);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y + (rng() - 0.5) * 16 * state.dpr);
    ctx.stroke();
  }

  ctx.globalAlpha = 0.3;
  ctx.strokeStyle = "rgba(255, 196, 112, 0.16)";
  ctx.lineWidth = Math.max(1, state.dpr);
  for (let i = 0; i < 95; i += 1) {
    const x = rng() * width;
    const y = rng() * height;
    const length = (18 + rng() * 160) * state.dpr;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(
      x + length * 0.28,
      y + (rng() - 0.5) * 18 * state.dpr,
      x + length * 0.72,
      y + (rng() - 0.5) * 18 * state.dpr,
      x + length,
      y + (rng() - 0.5) * 22 * state.dpr
    );
    ctx.stroke();
  }

  ctx.globalAlpha = 0.24;
  for (let i = 0; i < 9; i += 1) {
    const x = rng() * width;
    const y = rng() * height;
    ctx.strokeStyle = "rgba(4, 2, 1, 0.72)";
    ctx.lineWidth = Math.max(1, (1.2 + rng() * 1.8) * state.dpr);
    ctx.beginPath();
    ctx.ellipse(x, y, (9 + rng() * 32) * state.dpr, (3 + rng() * 9) * state.dpr, rng() * Math.PI, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  const glow = ctx.createRadialGradient(width * 0.08, height * 0.08, 0, width * 0.08, height * 0.08, Math.max(width, height) * 0.72);
  glow.addColorStop(0, "rgba(178, 103, 42, 0.34)");
  glow.addColorStop(0.36, "rgba(93, 53, 24, 0.11)");
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function drawTableProps(width, height, layer) {
  if (!state.map || !state.layout) return;
  const bounds = mapPixelBounds(state.layout.size * 1.25);
  const unit = state.layout.size;

  if (layer === "under") {
    drawLeatherMapCase(bounds.right + unit * 0.9, bounds.top + bounds.height * 0.54, unit * 6.0, unit * 10.2, -0.08);
    drawLooseMapStrip(bounds.left + bounds.width * 0.28, bounds.top - unit * 0.15, unit * 3.45, unit * 0.96, -0.04);
    return;
  }

  if (!drawPropImage("lamp", bounds.left - unit * 2.35, bounds.top + unit * 1.6, unit * 10.3, -0.04, 0.38)) {
    drawBurner(bounds.left - unit * 2.35, bounds.top + unit * 1.6, unit * 2.45);
  }
  if (!drawPropImage("revolver", bounds.left + unit * 1.88, bounds.bottom + unit * 0.28, unit * 7.15, Math.PI / 4, 0.16)) {
    drawNagantRevolver(bounds.left + unit * 1.88, bounds.bottom + unit * 0.28, unit * 1.36, Math.PI / 4);
  }
  if (!drawPropImage("cartridges", bounds.left + unit * 7.55, bounds.bottom + unit * 0.78, unit * 1.72, 0.08, 0.18)) {
    drawCartridges(bounds.left + unit * 7.55, bounds.bottom + unit * 0.78, unit * 0.58, -0.18, 6);
  }
  if (!drawPropImage("compass", bounds.right + unit * 0.78, bounds.bottom + unit * 0.52, unit * 3.65, 0.17, 0.38)) {
    drawCompass(bounds.right + unit * 0.78, bounds.bottom + unit * 0.52, unit * 1.82, 0.17);
  }
  if (!drawPropImage("glass", bounds.right + unit * 0.9, bounds.top + unit * 1.2, unit * 5.35, -0.2, 0.24)) {
    drawGlass(bounds.right + unit * 0.9, bounds.top + unit * 1.2, unit * 2.05, -0.2);
  }
}

function drawPropImage(name, x, y, width, angle, shadowAlpha = 0.44) {
  const asset = propAssets[name];
  if (!asset || !asset.loaded || !asset.image.naturalWidth) return false;
  const image = asset.image;
  const height = width * (image.naturalHeight / image.naturalWidth);

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  if (shadowAlpha > 0) {
    drawPropShadow(0, height * 0.18, width * 0.38, height * 0.16, shadowAlpha);
  }
  ctx.globalAlpha = 0.96;
  ctx.drawImage(image, -width / 2, -height / 2, width, height);
  ctx.restore();
  return true;
}

function drawLooseMapStrip(x, y, width, height, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  drawPropShadow(0, height * 0.18, width * 0.52, height * 0.34, 0.28);
  pathRoundRect(-width / 2, -height / 2, width, height, height * 0.12);
  ctx.fillStyle = "rgba(116, 99, 66, 0.78)";
  ctx.fill();
  ctx.strokeStyle = "rgba(31, 21, 12, 0.55)";
  ctx.lineWidth = Math.max(1, height * 0.04);
  ctx.stroke();
  ctx.globalAlpha = 0.35;
  ctx.strokeStyle = "rgba(30, 23, 16, 0.72)";
  ctx.lineWidth = Math.max(1, height * 0.025);
  for (let i = 0; i < 6; i += 1) {
    const yy = -height * 0.28 + i * height * 0.12;
    ctx.beginPath();
    ctx.moveTo(-width * 0.38, yy);
    ctx.bezierCurveTo(-width * 0.16, yy - height * 0.12, width * 0.06, yy + height * 0.12, width * 0.36, yy);
    ctx.stroke();
  }
  ctx.restore();
}

function drawLeatherMapCase(x, y, width, height, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  drawPropShadow(0, height * 0.08, width * 0.46, height * 0.34, 0.32);

  const leather = ctx.createLinearGradient(-width * 0.5, -height * 0.5, width * 0.45, height * 0.52);
  leather.addColorStop(0, "#2a160d");
  leather.addColorStop(0.45, "#6a3a1c");
  leather.addColorStop(1, "#1a0d08");
  pathRoundRect(-width / 2, -height / 2, width, height, width * 0.14);
  ctx.fillStyle = leather;
  ctx.fill();
  ctx.strokeStyle = "rgba(9, 5, 3, 0.86)";
  ctx.lineWidth = Math.max(1, width * 0.035);
  ctx.stroke();

  ctx.globalAlpha = 0.35;
  ctx.strokeStyle = "rgba(245, 169, 89, 0.42)";
  ctx.lineWidth = Math.max(1, width * 0.018);
  for (let i = 0; i < 12; i += 1) {
    const yy = lerp(-height * 0.4, height * 0.42, i / 11);
    ctx.beginPath();
    ctx.moveTo(-width * 0.38, yy);
    ctx.bezierCurveTo(-width * 0.1, yy - height * 0.025, width * 0.08, yy + height * 0.03, width * 0.38, yy);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  for (const xx of [-width * 0.22, width * 0.22]) {
    const strap = ctx.createLinearGradient(xx - width * 0.055, 0, xx + width * 0.055, 0);
    strap.addColorStop(0, "#140906");
    strap.addColorStop(0.5, "#7d4a25");
    strap.addColorStop(1, "#170a06");
    pathRoundRect(xx - width * 0.055, -height * 0.5, width * 0.11, height, width * 0.04);
    ctx.fillStyle = strap;
    ctx.fill();
    ctx.strokeStyle = "rgba(5, 3, 2, 0.72)";
    ctx.stroke();
    pathRoundRect(xx - width * 0.09, -height * 0.04, width * 0.18, height * 0.12, width * 0.02);
    ctx.strokeStyle = "rgba(189, 142, 68, 0.72)";
    ctx.lineWidth = Math.max(1, width * 0.018);
    ctx.stroke();
  }
  ctx.restore();
}

function drawBurner(x, y, scale) {
  ctx.save();
  ctx.translate(x, y);
  const glow = ctx.createRadialGradient(0, -scale * 0.58, 0, 0, -scale * 0.58, scale * 1.9);
  glow.addColorStop(0, "rgba(245, 151, 51, 0.3)");
  glow.addColorStop(0.42, "rgba(188, 83, 24, 0.11)");
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(-scale * 2.1, -scale * 2.05, scale * 4.2, scale * 4.2);

  drawPropShadow(0, scale * 0.58, scale * 0.82, scale * 0.28, 0.52);
  const metal = ctx.createLinearGradient(-scale * 0.58, 0, scale * 0.58, scale * 0.32);
  metal.addColorStop(0, "#1d1612");
  metal.addColorStop(0.5, "#6a5134");
  metal.addColorStop(1, "#120d0a");
  ctx.fillStyle = metal;
  ctx.beginPath();
  ctx.ellipse(0, scale * 0.32, scale * 0.7, scale * 0.26, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(7, 5, 4, 0.82)";
  ctx.lineWidth = Math.max(1, scale * 0.04);
  ctx.stroke();

  pathRoundRect(-scale * 0.38, -scale * 0.1, scale * 0.76, scale * 0.42, scale * 0.08);
  ctx.fillStyle = "#332417";
  ctx.fill();
  ctx.stroke();

  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = "rgba(206, 185, 137, 0.62)";
  ctx.lineWidth = Math.max(1, scale * 0.035);
  ctx.beginPath();
  ctx.ellipse(0, -scale * 0.45, scale * 0.36, scale * 0.74, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = 1;

  const flame = ctx.createRadialGradient(0, -scale * 0.45, 0, 0, -scale * 0.45, scale * 0.42);
  flame.addColorStop(0, "#fff3a5");
  flame.addColorStop(0.45, "#dd7d27");
  flame.addColorStop(1, "rgba(122, 29, 10, 0)");
  ctx.fillStyle = flame;
  ctx.beginPath();
  ctx.moveTo(0, -scale * 0.98);
  ctx.bezierCurveTo(-scale * 0.28, -scale * 0.58, -scale * 0.18, -scale * 0.22, 0, -scale * 0.08);
  ctx.bezierCurveTo(scale * 0.24, -scale * 0.24, scale * 0.22, -scale * 0.66, 0, -scale * 0.98);
  ctx.fill();
  ctx.restore();
}

function drawNagantRevolver(x, y, scale, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  drawPropShadow(scale * 0.2, scale * 0.16, scale * 1.35, scale * 0.32, 0.56);

  ctx.lineCap = "round";
  const steel = ctx.createLinearGradient(-scale * 1.15, -scale * 0.18, scale * 1.1, scale * 0.18);
  steel.addColorStop(0, "#0a0a09");
  steel.addColorStop(0.45, "#4e514b");
  steel.addColorStop(1, "#171614");
  ctx.fillStyle = steel;
  ctx.strokeStyle = "rgba(4, 4, 3, 0.9)";
  ctx.lineWidth = Math.max(1, scale * 0.055);

  pathRoundRect(-scale * 1.18, -scale * 0.12, scale * 1.58, scale * 0.19, scale * 0.04);
  ctx.fill();
  ctx.stroke();
  pathRoundRect(-scale * 1.25, -scale * 0.05, scale * 0.18, scale * 0.11, scale * 0.03);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "rgba(219, 219, 194, 0.24)";
  ctx.lineWidth = Math.max(1, scale * 0.025);
  ctx.beginPath();
  ctx.moveTo(-scale * 1.05, -scale * 0.08);
  ctx.lineTo(scale * 0.32, -scale * 0.08);
  ctx.stroke();
  ctx.fillStyle = "#0b0b09";
  ctx.beginPath();
  ctx.moveTo(-scale * 1.18, -scale * 0.18);
  ctx.lineTo(-scale * 1.08, -scale * 0.12);
  ctx.lineTo(-scale * 1.2, -scale * 0.1);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(scale * 0.22, -scale * 0.02, scale * 0.31, scale * 0.29, 0.05, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "rgba(11, 10, 8, 0.68)";
  ctx.lineWidth = Math.max(1, scale * 0.028);
  for (let i = 0; i < 6; i += 1) {
    const a = (Math.PI * 2 * i) / 6;
    ctx.beginPath();
    ctx.moveTo(scale * 0.22, -scale * 0.02);
    ctx.lineTo(scale * 0.22 + Math.cos(a) * scale * 0.22, -scale * 0.02 + Math.sin(a) * scale * 0.2);
    ctx.stroke();
  }

  ctx.fillStyle = steel;
  ctx.strokeStyle = "rgba(4, 4, 3, 0.9)";
  ctx.lineWidth = Math.max(1, scale * 0.046);
  ctx.beginPath();
  ctx.moveTo(scale * 0.42, -scale * 0.14);
  ctx.quadraticCurveTo(scale * 0.66, -scale * 0.3, scale * 0.78, -scale * 0.18);
  ctx.quadraticCurveTo(scale * 0.67, -scale * 0.06, scale * 0.48, -scale * 0.02);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "rgba(4, 4, 3, 0.88)";
  ctx.lineWidth = Math.max(1, scale * 0.055);
  ctx.beginPath();
  ctx.moveTo(scale * 0.42, scale * 0.02);
  ctx.quadraticCurveTo(scale * 0.68, scale * 0.04, scale * 0.78, scale * 0.28);
  ctx.quadraticCurveTo(scale * 0.58, scale * 0.5, scale * 0.35, scale * 0.38);
  ctx.stroke();
  ctx.lineWidth = Math.max(1, scale * 0.035);
  ctx.beginPath();
  ctx.moveTo(scale * 0.56, scale * 0.17);
  ctx.quadraticCurveTo(scale * 0.5, scale * 0.32, scale * 0.42, scale * 0.36);
  ctx.stroke();

  const grip = ctx.createLinearGradient(scale * 0.5, scale * 0.2, scale * 1.1, scale * 1.0);
  grip.addColorStop(0, "#261309");
  grip.addColorStop(0.55, "#6b3518");
  grip.addColorStop(1, "#160b06");
  ctx.fillStyle = grip;
  ctx.beginPath();
  ctx.moveTo(scale * 0.56, scale * 0.22);
  ctx.quadraticCurveTo(scale * 0.88, scale * 0.4, scale * 1.0, scale * 0.98);
  ctx.quadraticCurveTo(scale * 0.66, scale * 1.08, scale * 0.38, scale * 0.72);
  ctx.quadraticCurveTo(scale * 0.34, scale * 0.42, scale * 0.56, scale * 0.22);
  ctx.fill();
  ctx.stroke();

  ctx.globalAlpha = 0.32;
  ctx.strokeStyle = "rgba(233, 207, 146, 0.55)";
  ctx.lineWidth = Math.max(1, scale * 0.02);
  for (let i = 0; i < 4; i += 1) {
    ctx.beginPath();
    ctx.moveTo(scale * (0.52 + i * 0.08), scale * 0.42);
    ctx.lineTo(scale * (0.8 + i * 0.04), scale * 0.9);
    ctx.stroke();
  }
  ctx.globalAlpha = 0.42;
  ctx.fillStyle = "#050403";
  ctx.beginPath();
  ctx.ellipse(scale * 0.72, scale * 0.88, scale * 0.08, scale * 0.04, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawCartridges(x, y, scale, angle, count) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  for (let i = 0; i < count; i += 1) {
    ctx.save();
    ctx.translate((i - (count - 1) / 2) * scale * 0.28, (i % 2) * scale * 0.12);
    ctx.rotate((i - 2) * 0.12);
    drawPropShadow(0, scale * 0.13, scale * 0.13, scale * 0.05, 0.28);
    const brass = ctx.createLinearGradient(-scale * 0.06, -scale * 0.32, scale * 0.07, scale * 0.34);
    brass.addColorStop(0, "#5a3113");
    brass.addColorStop(0.35, "#d5a84a");
    brass.addColorStop(1, "#563014");
    pathRoundRect(-scale * 0.06, -scale * 0.34, scale * 0.12, scale * 0.58, scale * 0.04);
    ctx.fillStyle = brass;
    ctx.fill();
    ctx.strokeStyle = "rgba(23, 12, 5, 0.76)";
    ctx.lineWidth = Math.max(1, scale * 0.025);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-scale * 0.06, -scale * 0.34);
    ctx.lineTo(0, -scale * 0.5);
    ctx.lineTo(scale * 0.06, -scale * 0.34);
    ctx.fillStyle = "#8b4b20";
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

function drawCompass(x, y, scale, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  drawPropShadow(scale * 0.04, scale * 0.12, scale * 0.62, scale * 0.2, 0.48);
  const brass = ctx.createRadialGradient(-scale * 0.2, -scale * 0.18, scale * 0.06, 0, 0, scale * 0.58);
  brass.addColorStop(0, "#f1c978");
  brass.addColorStop(0.55, "#8b5a22");
  brass.addColorStop(1, "#21120a");
  ctx.fillStyle = brass;
  ctx.beginPath();
  ctx.arc(0, 0, scale * 0.46, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(8, 5, 3, 0.86)";
  ctx.lineWidth = Math.max(1, scale * 0.045);
  ctx.stroke();

  ctx.fillStyle = "rgba(40, 48, 43, 0.64)";
  ctx.beginPath();
  ctx.arc(0, 0, scale * 0.34, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(235, 211, 151, 0.45)";
  ctx.lineWidth = Math.max(1, scale * 0.02);
  ctx.stroke();
  ctx.strokeStyle = "rgba(219, 194, 131, 0.35)";
  for (let i = 0; i < 16; i += 1) {
    const a = (Math.PI * 2 * i) / 16;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * scale * 0.27, Math.sin(a) * scale * 0.27);
    ctx.lineTo(Math.cos(a) * scale * 0.31, Math.sin(a) * scale * 0.31);
    ctx.stroke();
  }
  ctx.fillStyle = "#9b2019";
  ctx.beginPath();
  ctx.moveTo(0, -scale * 0.29);
  ctx.lineTo(scale * 0.07, scale * 0.03);
  ctx.lineTo(0, scale * 0.08);
  ctx.lineTo(-scale * 0.07, scale * 0.03);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#d8d0b4";
  ctx.beginPath();
  ctx.moveTo(0, scale * 0.28);
  ctx.lineTo(scale * 0.07, -scale * 0.03);
  ctx.lineTo(0, -scale * 0.08);
  ctx.lineTo(-scale * 0.07, -scale * 0.03);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 0.36;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.ellipse(-scale * 0.13, -scale * 0.16, scale * 0.14, scale * 0.05, -0.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawGlass(x, y, scale, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  drawPropShadow(0, scale * 0.28, scale * 0.42, scale * 0.16, 0.42);
  ctx.globalAlpha = 0.62;
  ctx.strokeStyle = "rgba(219, 211, 184, 0.72)";
  ctx.lineWidth = Math.max(1, scale * 0.045);
  ctx.beginPath();
  ctx.ellipse(0, -scale * 0.22, scale * 0.35, scale * 0.13, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-scale * 0.35, -scale * 0.22);
  ctx.quadraticCurveTo(-scale * 0.25, scale * 0.34, -scale * 0.18, scale * 0.42);
  ctx.moveTo(scale * 0.35, -scale * 0.22);
  ctx.quadraticCurveTo(scale * 0.25, scale * 0.34, scale * 0.18, scale * 0.42);
  ctx.stroke();
  ctx.fillStyle = "rgba(57, 24, 13, 0.62)";
  ctx.beginPath();
  ctx.ellipse(0, scale * 0.04, scale * 0.28, scale * 0.11, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 0.38;
  ctx.fillStyle = "#f4e8c8";
  ctx.beginPath();
  ctx.ellipse(-scale * 0.14, -scale * 0.08, scale * 0.04, scale * 0.28, -0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawPropShadow(x, y, rx, ry, alpha) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(rx, ry);
  const shadow = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
  shadow.addColorStop(0, `rgba(0, 0, 0, ${alpha * 0.52})`);
  shadow.addColorStop(0.58, `rgba(0, 0, 0, ${alpha * 0.22})`);
  shadow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = shadow;
  ctx.beginPath();
  ctx.arc(0, 0, 1, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawPaperSheet() {
  const bounds = mapPixelBounds(state.layout.size * 1.25);
  const paper = paperEdgePoints(bounds);

  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.72)";
  ctx.shadowBlur = state.layout.size * 0.7;
  ctx.shadowOffsetX = state.layout.size * 0.28;
  ctx.shadowOffsetY = state.layout.size * 0.4;
  pathFromPoints(paper);
  ctx.fillStyle = "#a38f61";
  ctx.fill();
  ctx.restore();

  ctx.save();
  pathFromPoints(paper);
  const paperTone = ctx.createLinearGradient(bounds.left, bounds.top, bounds.right, bounds.bottom);
  paperTone.addColorStop(0, "#9b8d64");
  paperTone.addColorStop(0.38, "#786b49");
  paperTone.addColorStop(0.72, "#8c7d54");
  paperTone.addColorStop(1, "#55452f");
  ctx.fillStyle = paperTone;
  ctx.fill();
  ctx.clip();
  drawFieldPaperTexture(bounds);
  drawPaperBloodRust(bounds);
  drawPaperFolds(bounds);
  ctx.restore();

  ctx.save();
  pathFromPoints(paper);
  ctx.strokeStyle = "rgba(34, 23, 13, 0.76)";
  ctx.lineWidth = Math.max(2, state.layout.size * 0.03);
  ctx.stroke();
  ctx.restore();
}

function mapPixelBounds(padding) {
  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;
  for (const cell of state.map.cells) {
    for (const point of hexPoints(cell)) {
      left = Math.min(left, point.x);
      top = Math.min(top, point.y);
      right = Math.max(right, point.x);
      bottom = Math.max(bottom, point.y);
    }
  }
  return {
    left: left - padding,
    top: top - padding,
    right: right + padding,
    bottom: bottom + padding,
    width: right - left + padding * 2,
    height: bottom - top + padding * 2
  };
}

function paperEdgePoints(bounds) {
  const rng = createRng(`${state.map.seed}:paper-edge`);
  const points = [];
  const segments = 7;
  const jitter = Math.max(2, state.layout.size * 0.14);
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    points.push({ x: lerp(bounds.left, bounds.right, t), y: bounds.top + (rng() - 0.5) * jitter });
  }
  for (let i = 1; i <= segments; i += 1) {
    const t = i / segments;
    points.push({ x: bounds.right + (rng() - 0.5) * jitter, y: lerp(bounds.top, bounds.bottom, t) });
  }
  for (let i = 1; i <= segments; i += 1) {
    const t = i / segments;
    points.push({ x: lerp(bounds.right, bounds.left, t), y: bounds.bottom + (rng() - 0.5) * jitter });
  }
  for (let i = 1; i < segments; i += 1) {
    const t = i / segments;
    points.push({ x: bounds.left + (rng() - 0.5) * jitter, y: lerp(bounds.bottom, bounds.top, t) });
  }
  return points;
}

function drawFieldPaperTexture(bounds) {
  const { left, top, width, height } = bounds;
  const rng = createRng(`${state.map.seed}:field-paper`);
  const unit = state.layout.size;
  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  for (let i = 0; i < 44; i += 1) {
    const x = left + rng() * width;
    const y = top + rng() * height;
    const radius = unit * (0.85 + rng() * 4.5);
    const stain = ctx.createRadialGradient(x, y, 0, x, y, radius);
    const alpha = 0.045 + rng() * 0.075;
    stain.addColorStop(0, `rgba(46, 34, 20, ${alpha})`);
    stain.addColorStop(1, "rgba(46, 34, 20, 0)");
    ctx.fillStyle = stain;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.strokeStyle = "#f1dfb7";
  ctx.lineWidth = Math.max(1, unit * 0.025);
  for (let x = left + unit; x < left + width; x += unit * 2.3) {
    ctx.beginPath();
    ctx.moveTo(x + (rng() - 0.5) * unit * 0.2, top);
    ctx.bezierCurveTo(
      x + (rng() - 0.5) * unit * 0.55,
      top + height * 0.34,
      x + (rng() - 0.5) * unit * 0.55,
      top + height * 0.66,
      x + (rng() - 0.5) * unit * 0.2,
      top + height
    );
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.2;
  for (let i = 0; i < 130; i += 1) {
    ctx.fillStyle = rng() > 0.55 ? "#0b0a07" : "#e6d1a5";
    const fleck = Math.max(1, unit * (0.012 + rng() * 0.012));
    ctx.fillRect(left + rng() * width, top + rng() * height, fleck, fleck);
  }
  ctx.restore();
}

function drawPaperBloodRust(bounds) {
  const rng = createRng(`${state.map.seed}:paper-stains`);
  const unit = state.layout.size;
  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  for (let i = 0; i < 18; i += 1) {
    const x = bounds.left + rng() * bounds.width;
    const y = bounds.top + rng() * bounds.height;
    const radius = unit * (0.4 + rng() * 1.75);
    const isBlood = rng() < 0.28;
    const stain = ctx.createRadialGradient(x, y, 0, x, y, radius);
    stain.addColorStop(0, isBlood ? "rgba(83, 7, 5, 0.26)" : "rgba(112, 50, 12, 0.3)");
    stain.addColorStop(0.48, isBlood ? "rgba(64, 5, 5, 0.12)" : "rgba(124, 63, 18, 0.14)");
    stain.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = stain;
    ctx.beginPath();
    ctx.ellipse(x, y, radius * (0.7 + rng() * 0.9), radius * (0.28 + rng() * 0.55), rng() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawPaperFolds(bounds) {
  const rng = createRng(`${state.map.seed}:paper-folds`);
  const unit = state.layout.size;
  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.strokeStyle = "rgba(43, 28, 15, 0.8)";
  ctx.lineWidth = Math.max(1, unit * 0.025);
  for (let x = bounds.left + bounds.width * 0.18; x < bounds.right; x += bounds.width * 0.21) {
    ctx.beginPath();
    ctx.moveTo(x + (rng() - 0.5) * unit * 0.2, bounds.top);
    ctx.lineTo(x + (rng() - 0.5) * unit * 0.25, bounds.bottom);
    ctx.stroke();
  }
  for (let y = bounds.top + bounds.height * 0.22; y < bounds.bottom; y += bounds.height * 0.24) {
    ctx.beginPath();
    ctx.moveTo(bounds.left, y + (rng() - 0.5) * unit * 0.2);
    ctx.lineTo(bounds.right, y + (rng() - 0.5) * unit * 0.25);
    ctx.stroke();
  }

  ctx.globalAlpha = 0.18;
  ctx.strokeStyle = "rgba(236, 214, 160, 0.72)";
  for (let x = bounds.left + bounds.width * 0.18 + unit * 0.05; x < bounds.right; x += bounds.width * 0.21) {
    ctx.beginPath();
    ctx.moveTo(x, bounds.top);
    ctx.lineTo(x, bounds.bottom);
    ctx.stroke();
  }
  ctx.restore();
}

function drawSmokeLayer() {
  const bounds = mapPixelBounds(state.layout.size * 1.15);
  const rng = createRng(`${state.map.seed}:dead-sky-smoke`);
  const unit = state.layout.size;
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  for (let i = 0; i < 10; i += 1) {
    const x = bounds.left + rng() * bounds.width;
    const y = bounds.top + rng() * bounds.height;
    const rx = unit * (3 + rng() * 7);
    const ry = unit * (0.85 + rng() * 2.65);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((rng() - 0.5) * 0.75);
    const haze = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
    haze.addColorStop(0, `rgba(198, 190, 165, ${0.045 + rng() * 0.07})`);
    haze.addColorStop(1, "rgba(195, 190, 164, 0)");
    ctx.fillStyle = haze;
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.1;
  ctx.fillStyle = "#050504";
  for (let i = 0; i < 14; i += 1) {
    const x = bounds.left + rng() * bounds.width;
    const y = bounds.top + rng() * bounds.height;
    ctx.beginPath();
    ctx.ellipse(x, y, unit * (1.25 + rng() * 3), unit * (0.25 + rng() * 0.95), (rng() - 0.5) * 1.4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.16;
  ctx.strokeStyle = "rgba(218, 211, 185, 0.46)";
  ctx.lineCap = "round";
  for (let i = 0; i < 7; i += 1) {
    const x = bounds.left + rng() * bounds.width;
    const y = bounds.top + rng() * bounds.height;
    ctx.lineWidth = Math.max(5, state.layout.size * (0.13 + rng() * 0.1));
    ctx.beginPath();
    ctx.moveTo(x - state.layout.size * (1.1 + rng()), y);
    ctx.bezierCurveTo(
      x - state.layout.size * 0.35,
      y - state.layout.size * (0.3 + rng() * 0.4),
      x + state.layout.size * 0.42,
      y + state.layout.size * (0.25 + rng() * 0.5),
      x + state.layout.size * (1.2 + rng()),
      y + (rng() - 0.5) * state.layout.size * 0.7
    );
    ctx.stroke();
  }
  ctx.restore();
}

function drawBattlefieldGrime() {
  const bounds = mapPixelBounds(state.layout.size * 0.85);
  const paper = paperEdgePoints(bounds);
  const rng = createRng(`${state.map.seed}:battlefield-grime`);
  ctx.save();
  pathFromPoints(paper);
  ctx.clip();

  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  for (let i = 0; i < 24; i += 1) {
    const x = bounds.left + rng() * bounds.width;
    const y = bounds.top + rng() * bounds.height;
    const radius = state.layout.size * (0.24 + rng() * 0.72);
    const kind = rng();
    let color = "rgba(34, 22, 12, 0.28)";
    if (kind < 0.18) color = "rgba(73, 7, 5, 0.27)";
    else if (kind < 0.46) color = "rgba(111, 48, 14, 0.31)";
    const smear = ctx.createRadialGradient(x, y, 0, x, y, radius);
    smear.addColorStop(0, color);
    smear.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = smear;
    ctx.beginPath();
    ctx.ellipse(x, y, radius * (0.8 + rng() * 1.15), radius * (0.22 + rng() * 0.48), rng() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "rgba(29, 18, 10, 0.58)";
  ctx.lineCap = "round";
  for (let i = 0; i < 17; i += 1) {
    const x = bounds.left + rng() * bounds.width;
    const y = bounds.top + rng() * bounds.height;
    ctx.lineWidth = Math.max(1, state.layout.size * (0.018 + rng() * 0.03));
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(
      x + (rng() - 0.5) * state.layout.size * 0.9,
      y + (rng() - 0.5) * state.layout.size * 0.9,
      x + (rng() - 0.5) * state.layout.size * 1.4,
      y + (rng() - 0.5) * state.layout.size * 1.4,
      x + (rng() - 0.5) * state.layout.size * 1.9,
      y + (rng() - 0.5) * state.layout.size * 1.9
    );
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = "rgba(219, 198, 150, 0.58)";
  ctx.lineWidth = Math.max(1, state.layout.size * 0.018);
  for (let i = 0; i < 10; i += 1) {
    const x = bounds.left + rng() * bounds.width;
    const y = bounds.top + rng() * bounds.height;
    const length = state.layout.size * (1.8 + rng() * 2.8);
    const angle = (rng() - 0.5) * Math.PI;
    drawLongWire(x, y, length, angle, rng);
  }
  ctx.restore();

  ctx.restore();
}

function drawLongWire(x, y, length, angle, rng) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(-length / 2, 0);
  ctx.bezierCurveTo(-length * 0.2, -state.layout.size * 0.08, length * 0.18, state.layout.size * 0.08, length / 2, 0);
  ctx.stroke();
  const barbs = 9;
  for (let i = 0; i < barbs; i += 1) {
    const bx = lerp(-length / 2, length / 2, i / (barbs - 1));
    const by = (i % 2 === 0 ? -1 : 1) * state.layout.size * 0.025 + (rng() - 0.5) * state.layout.size * 0.02;
    ctx.beginPath();
    ctx.moveTo(bx - state.layout.size * 0.035, by - state.layout.size * 0.04);
    ctx.lineTo(bx + state.layout.size * 0.035, by + state.layout.size * 0.04);
    ctx.moveTo(bx - state.layout.size * 0.035, by + state.layout.size * 0.04);
    ctx.lineTo(bx + state.layout.size * 0.035, by - state.layout.size * 0.04);
    ctx.stroke();
  }
  ctx.restore();
}

function drawAtmosphericFinish() {
  const { width, height } = els.canvas;
  const bounds = mapPixelBounds(state.layout.size * 1.15);
  const paper = paperEdgePoints(bounds);
  const rng = createRng(`${state.map.seed}:soot-finish`);
  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  const edge = ctx.createRadialGradient(width * 0.5, height * 0.46, Math.min(width, height) * 0.22, width * 0.5, height * 0.5, Math.max(width, height) * 0.72);
  edge.addColorStop(0, "rgba(0, 0, 0, 0)");
  edge.addColorStop(1, "rgba(0, 0, 0, 0.42)");
  ctx.fillStyle = edge;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  ctx.save();
  pathFromPoints(paper);
  ctx.clip();
  ctx.globalAlpha = 0.14;
  ctx.strokeStyle = "#130f0b";
  ctx.lineWidth = Math.max(1, state.layout.size * 0.018);
  for (let i = 0; i < 20; i += 1) {
    const x = bounds.left + rng() * bounds.width;
    const y = bounds.top + rng() * bounds.height;
    const length = state.layout.size * (0.3 + rng() * 1.35);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (rng() - 0.5) * length, y + (rng() - 0.5) * length);
    ctx.stroke();
  }
  ctx.restore();
}

function drawHexBase(cell) {
  const points = hexPoints(cell);
  const terrain = TERRAIN[cell.terrain];
  const lite = isLiteMapRender();
  ctx.save();
  pathFromPoints(points);
  ctx.fillStyle = terrainFill(cell, terrain);
  ctx.fill();
  if (!lite) {
    ctx.clip();
    drawHexTexture(cell);
    drawTerrainMark(cell);
  }
  ctx.restore();

  ctx.save();
  pathFromPoints(points);
  ctx.lineWidth = Math.max(1, state.layout.size * 0.035);
  ctx.strokeStyle = "rgba(236, 226, 203, 0.22)";
  ctx.stroke();
  ctx.restore();
}

function terrainFill(cell, terrain) {
  if (cell.cultivated === "noMans") {
    return isAtmosphericMode() ? "#59442f" : "#665239";
  }
  return terrain.color;
}

function drawHexTexture(cell) {
  const rng = cellRng(cell, "texture");
  const center = centerOf(cell);
  const size = state.layout.size;
  ctx.globalAlpha = isAtmosphericMode() ? 0.22 : 0.14;
  const specks = isAtmosphericMode() ? 24 : 12;
  for (let i = 0; i < specks; i += 1) {
    const x = center.x + (rng() - 0.5) * size * 1.45;
    const y = center.y + (rng() - 0.5) * size * 1.35;
    const radius = size * (0.015 + rng() * 0.035);
    ctx.fillStyle = rng() > 0.55 ? "#f1dfb7" : "#070806";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  if (isAtmosphericMode()) {
    ctx.globalAlpha = 0.13;
    ctx.strokeStyle = rng() > 0.5 ? "#0a0906" : "#ead8ad";
    ctx.lineWidth = Math.max(1, size * 0.012);
    for (let i = 0; i < 5; i += 1) {
      const x = center.x + (rng() - 0.5) * size * 1.1;
      const y = center.y + (rng() - 0.5) * size * 0.95;
      ctx.beginPath();
      ctx.moveTo(x - size * (0.08 + rng() * 0.12), y);
      ctx.lineTo(x + size * (0.08 + rng() * 0.12), y + (rng() - 0.5) * size * 0.08);
      ctx.stroke();
    }
    drawAtmosphericHexScars(cell, center, size, rng);
  }
  ctx.globalAlpha = 1;
}

function drawAtmosphericHexScars(cell, center, size, rng) {
  ctx.save();
  ctx.globalCompositeOperation = "multiply";

  const mudCount = cell.cultivated === "noMans" ? 4 : 1 + Math.floor(rng() * 3);
  for (let i = 0; i < mudCount; i += 1) {
    const x = center.x + (rng() - 0.5) * size * 1.05;
    const y = center.y + (rng() - 0.5) * size * 0.9;
    const rx = size * (0.08 + rng() * 0.18);
    const ry = size * (0.025 + rng() * 0.08);
    ctx.fillStyle = `rgba(35, 23, 13, ${0.12 + rng() * 0.16})`;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, rng() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  const rustLikely = cell.rail || cell.road || cell.cultivated === "mines" || cell.feature;
  if (rustLikely || rng() < 0.11) {
    const streaks = rustLikely ? 2 : 1;
    for (let i = 0; i < streaks; i += 1) {
      const x = center.x + (rng() - 0.5) * size * 0.9;
      const y = center.y + (rng() - 0.5) * size * 0.75;
      ctx.strokeStyle = `rgba(116, 48, 16, ${0.2 + rng() * 0.18})`;
      ctx.lineWidth = Math.max(1, size * (0.018 + rng() * 0.018));
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(
        x + (rng() - 0.5) * size * 0.22,
        y + size * 0.08,
        x + (rng() - 0.5) * size * 0.28,
        y + size * 0.22,
        x + (rng() - 0.5) * size * 0.34,
        y + size * (0.28 + rng() * 0.16)
      );
      ctx.stroke();
    }
  }

  const bloodLikely = cell.cultivated === "noMans" || cell.feature || (cell.settlement && cell.settlement.abandoned);
  if (bloodLikely && rng() < 0.44) {
    const x = center.x + (rng() - 0.5) * size * 0.8;
    const y = center.y + (rng() - 0.5) * size * 0.65;
    ctx.fillStyle = `rgba(58, 4, 4, ${0.14 + rng() * 0.13})`;
    ctx.beginPath();
    ctx.ellipse(x, y, size * (0.06 + rng() * 0.12), size * (0.025 + rng() * 0.055), rng() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();

  const wireLikely = cell.cultivated === "noMans" || cell.feature === "Заросшие окопы" || rng() < 0.035;
  if (wireLikely) {
    drawBarbedWire(center, size, rng, cell.cultivated === "noMans" ? 2 : 1);
  }
}

function drawBarbedWire(center, size, rng, strands) {
  ctx.save();
  ctx.strokeStyle = "rgba(219, 198, 150, 0.54)";
  ctx.lineWidth = Math.max(1, size * 0.017);
  for (let s = 0; s < strands; s += 1) {
    const angle = (rng() - 0.5) * 0.9;
    const y = center.y + (rng() - 0.5) * size * 0.62;
    const start = center.x - size * 0.58;
    const end = center.x + size * 0.58;
    ctx.save();
    ctx.translate(center.x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(start - center.x, 0);
    ctx.bezierCurveTo(-size * 0.22, -size * 0.05, size * 0.16, size * 0.05, end - center.x, 0);
    ctx.stroke();
    for (let i = 0; i < 8; i += 1) {
      const x = lerp(start - center.x, end - center.x, i / 7);
      const dy = (i % 2 === 0 ? -1 : 1) * size * 0.025;
      ctx.beginPath();
      ctx.moveTo(x - size * 0.028, dy - size * 0.032);
      ctx.lineTo(x + size * 0.028, dy + size * 0.032);
      ctx.moveTo(x - size * 0.028, dy + size * 0.032);
      ctx.lineTo(x + size * 0.028, dy - size * 0.032);
      ctx.stroke();
    }
    ctx.restore();
  }
  ctx.restore();
}

function drawTerrainMark(cell) {
  const center = centerOf(cell);
  const size = state.layout.size;
  const rng = cellRng(cell, "mark");
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (cell.terrain === "mountain") {
    ctx.strokeStyle = "rgba(245, 234, 209, 0.45)";
    ctx.fillStyle = "rgba(25, 24, 22, 0.38)";
    for (let i = 0; i < 3; i += 1) {
      const x = center.x + (i - 1) * size * 0.32 + (rng() - 0.5) * size * 0.12;
      const y = center.y + (rng() - 0.5) * size * 0.22;
      ctx.beginPath();
      ctx.moveTo(x - size * 0.28, y + size * 0.25);
      ctx.lineTo(x, y - size * 0.32);
      ctx.lineTo(x + size * 0.3, y + size * 0.25);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }

  if (cell.terrain === "forest") {
    ctx.strokeStyle = "rgba(9, 13, 9, 0.76)";
    ctx.lineWidth = Math.max(1, size * 0.045);
    for (let i = 0; i < 6; i += 1) {
      const x = center.x + (rng() - 0.5) * size * 1.05;
      const y = center.y + (rng() - 0.48) * size * 0.85;
      ctx.beginPath();
      ctx.moveTo(x, y + size * 0.23);
      ctx.lineTo(x, y - size * 0.22);
      ctx.moveTo(x, y - size * 0.08);
      ctx.lineTo(x - size * 0.13, y + size * 0.04);
      ctx.moveTo(x, y - size * 0.02);
      ctx.lineTo(x + size * 0.14, y + size * 0.1);
      ctx.stroke();
    }
  }

  if (cell.terrain === "brush") {
    ctx.strokeStyle = "rgba(15, 17, 11, 0.58)";
    ctx.lineWidth = Math.max(1, size * 0.035);
    for (let i = 0; i < 8; i += 1) {
      const x = center.x + (rng() - 0.5) * size * 1.15;
      const y = center.y + (rng() - 0.5) * size * 0.95;
      ctx.beginPath();
      ctx.moveTo(x - size * 0.12, y + size * 0.1);
      ctx.quadraticCurveTo(x, y - size * 0.16, x + size * 0.16, y + size * 0.06);
      ctx.stroke();
    }
  }

  if (cell.terrain === "plains") {
    ctx.strokeStyle = "rgba(28, 29, 18, 0.45)";
    ctx.lineWidth = Math.max(1, size * 0.025);
    for (let i = 0; i < 7; i += 1) {
      const x = center.x + (rng() - 0.5) * size * 1.1;
      const y = center.y + (rng() - 0.5) * size * 0.9;
      ctx.beginPath();
      ctx.moveTo(x, y + size * 0.12);
      ctx.lineTo(x + (rng() - 0.5) * size * 0.16, y - size * 0.08);
      ctx.stroke();
    }
  }

  if (cell.terrain === "cultivated") {
    drawCultivatedMark(cell, center, size, rng);
  }
}

function drawCultivatedMark(cell, center, size, rng) {
  if (cell.cultivated === "fields" || cell.cultivated === "pasture") {
    ctx.strokeStyle = cell.cultivated === "fields"
      ? "rgba(236, 226, 203, 0.34)"
      : "rgba(20, 24, 14, 0.45)";
    ctx.lineWidth = Math.max(1, size * 0.028);
    for (let i = -2; i <= 2; i += 1) {
      ctx.beginPath();
      ctx.moveTo(center.x - size * 0.55, center.y + i * size * 0.16);
      ctx.lineTo(center.x + size * 0.55, center.y + i * size * 0.16 + size * 0.16);
      ctx.stroke();
    }
  }

  if (cell.cultivated === "mines") {
    ctx.fillStyle = "rgba(8, 8, 7, 0.72)";
    ctx.strokeStyle = "rgba(236, 226, 203, 0.3)";
    ctx.lineWidth = Math.max(1, size * 0.035);
    ctx.beginPath();
    ctx.arc(center.x, center.y, size * 0.22, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(center.x - size * 0.36, center.y - size * 0.27);
    ctx.lineTo(center.x + size * 0.36, center.y + size * 0.26);
    ctx.stroke();
  }

  if (cell.cultivated === "noMans") {
    drawNoMansLand(center, size, rng);
  }
}

function drawNoMansLand(center, size, rng) {
  ctx.save();
  ctx.strokeStyle = "rgba(31, 19, 14, 0.86)";
  ctx.fillStyle = "rgba(58, 28, 20, 0.66)";
  ctx.lineWidth = Math.max(1, size * 0.035);
  const craters = isAtmosphericMode() ? 7 : 4;
  for (let i = 0; i < craters; i += 1) {
    const x = center.x + (rng() - 0.5) * size * 0.98;
    const y = center.y + (rng() - 0.5) * size * 0.78;
    ctx.beginPath();
    ctx.ellipse(x, y, size * (0.11 + rng() * 0.09), size * (0.055 + rng() * 0.035), rng() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(16, 11, 9, 0.9)";
  ctx.lineWidth = Math.max(1.3, size * 0.055);
  const trenchCount = isAtmosphericMode() ? 3 : 2;
  for (let t = 0; t < trenchCount; t += 1) {
    const y = center.y + (t - (trenchCount - 1) / 2) * size * 0.28 + (rng() - 0.5) * size * 0.1;
    ctx.beginPath();
    for (let i = 0; i < 6; i += 1) {
      const x = center.x - size * 0.6 + i * size * 0.24;
      const yy = y + (i % 2 === 0 ? -1 : 1) * size * (0.045 + rng() * 0.035);
      if (i === 0) ctx.moveTo(x, yy);
      else ctx.lineTo(x, yy);
    }
    ctx.stroke();
  }

  if (isAtmosphericMode()) {
    ctx.strokeStyle = "rgba(225, 202, 151, 0.62)";
    ctx.lineWidth = Math.max(1, size * 0.022);
    for (let w = 0; w < 3; w += 1) {
      const y = center.y + (w - 1) * size * 0.22 + (rng() - 0.5) * size * 0.08;
      const startX = center.x - size * 0.48;
      const endX = center.x + size * 0.48;
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y + (rng() - 0.5) * size * 0.12);
      ctx.stroke();
      for (let i = 0; i < 7; i += 1) {
        const x = startX + (i / 6) * (endX - startX);
        const barbY = y + (rng() - 0.5) * size * 0.08;
        ctx.beginPath();
        ctx.moveTo(x - size * 0.035, barbY - size * 0.04);
        ctx.lineTo(x + size * 0.035, barbY + size * 0.04);
        ctx.moveTo(x - size * 0.035, barbY + size * 0.04);
        ctx.lineTo(x + size * 0.035, barbY - size * 0.04);
        ctx.stroke();
      }
    }
  }
  ctx.restore();
}

function drawLake(cell) {
  const center = centerOf(cell);
  const size = state.layout.size;
  ctx.save();
  ctx.fillStyle = "rgba(55, 88, 93, 0.82)";
  ctx.strokeStyle = "rgba(162, 184, 174, 0.42)";
  ctx.lineWidth = Math.max(1, size * 0.035);
  ctx.beginPath();
  ctx.ellipse(center.x, center.y, size * 0.48, size * 0.28, -0.25, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawEdgeSet(set, drawFn) {
  if (!state.map) return;
  const margin = state.layout.size * 2;
  for (const key of set) {
    const [a, b] = edgeCells(state.map, key);
    if (!a || !b || !edgeIsVisible(a, b, margin)) continue;
    drawFn(a, b);
  }
}

function edgeIsVisible(a, b, margin) {
  const ac = centerOf(a);
  const bc = centerOf(b);
  return Math.max(ac.x, bc.x) >= -margin
    && Math.min(ac.x, bc.x) <= els.canvas.width + margin
    && Math.max(ac.y, bc.y) >= -margin
    && Math.min(ac.y, bc.y) <= els.canvas.height + margin;
}

function drawRiverSegment(a, b) {
  const p1 = centerOf(a);
  const p2 = centerOf(b);
  const size = state.layout.size;
  ctx.save();
  ctx.lineCap = "round";
  ctx.strokeStyle = "rgba(12, 23, 25, 0.82)";
  ctx.lineWidth = Math.max(4, size * 0.25);
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
  ctx.strokeStyle = "rgba(87, 126, 132, 0.88)";
  ctx.lineWidth = Math.max(2, size * 0.14);
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
  ctx.restore();
}

function drawRoadSegment(a, b) {
  const p1 = centerOf(a);
  const p2 = centerOf(b);
  const size = state.layout.size;
  ctx.save();
  ctx.lineCap = "round";
  ctx.strokeStyle = "rgba(24, 17, 12, 0.78)";
  ctx.lineWidth = Math.max(3, size * 0.13);
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
  ctx.strokeStyle = "rgba(186, 153, 101, 0.82)";
  ctx.lineWidth = Math.max(1.5, size * 0.055);
  ctx.setLineDash([size * 0.16, size * 0.11]);
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
  ctx.restore();
}

function drawRailSegment(a, b) {
  const p1 = centerOf(a);
  const p2 = centerOf(b);
  const size = state.layout.size;
  ctx.save();
  ctx.lineCap = "butt";
  ctx.strokeStyle = "rgba(7, 7, 6, 0.92)";
  ctx.lineWidth = Math.max(3, size * 0.12);
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
  ctx.strokeStyle = "rgba(132, 78, 55, 0.94)";
  ctx.lineWidth = Math.max(1.5, size * 0.045);
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();

  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const length = Math.hypot(dx, dy);
  const nx = -dy / length;
  const ny = dx / length;
  const step = Math.max(8, size * 0.27);
  ctx.strokeStyle = "rgba(18, 12, 9, 0.9)";
  ctx.lineWidth = Math.max(1, size * 0.035);
  for (let d = step * 0.45; d < length; d += step) {
    const t = d / length;
    const x = p1.x + dx * t;
    const y = p1.y + dy * t;
    ctx.beginPath();
    ctx.moveTo(x - nx * size * 0.13, y - ny * size * 0.13);
    ctx.lineTo(x + nx * size * 0.13, y + ny * size * 0.13);
    ctx.stroke();
  }
  ctx.restore();
}

function drawCellOverlays(cell) {
  const center = centerOf(cell);
  const size = state.layout.size;
  if (isLiteMapRender()) {
    drawLiteCellOverlays(cell, center, size);
    return;
  }
  if (cell.settlement) drawSettlement(cell, center, size);
  if (cell.feature) drawFeature(cell, center, size);
  if (cell.bridge) drawBridge(center, size);
  drawCellLabel(cell, center, size);
}

function drawLiteCellOverlays(cell, center, size) {
  if (cell.settlement) {
    ctx.save();
    ctx.fillStyle = cell.settlement.abandoned ? "rgba(36, 31, 28, 0.86)" : "rgba(226, 193, 127, 0.88)";
    ctx.strokeStyle = cell.settlement.abandoned ? "rgba(236, 226, 203, 0.34)" : "rgba(42, 26, 17, 0.88)";
    ctx.lineWidth = Math.max(1, size * 0.08);
    ctx.beginPath();
    ctx.arc(center.x, center.y, Math.max(2.2, size * (cell.settlement.blocks >= 4 ? 0.28 : 0.2)), 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  if (cell.feature) {
    ctx.save();
    ctx.fillStyle = "rgba(221, 199, 148, 0.82)";
    ctx.strokeStyle = "rgba(31, 22, 15, 0.9)";
    ctx.lineWidth = Math.max(1, size * 0.07);
    ctx.beginPath();
    ctx.moveTo(center.x, center.y - size * 0.28);
    ctx.lineTo(center.x + size * 0.26, center.y);
    ctx.lineTo(center.x, center.y + size * 0.28);
    ctx.lineTo(center.x - size * 0.26, center.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  if (cell.bridge) {
    drawBridge(center, size);
  }
}

function drawSettlement(cell, center, size) {
  const blocks = cell.settlement.blocks;
  const live = !cell.settlement.abandoned;
  const rng = cellRng(cell, "painted-settlement");
  ctx.save();
  ctx.translate(center.x, center.y);
  ctx.rotate((rng() - 0.5) * 0.42);
  drawSettlementGround(rng, size, blocks, live);
  if (blocks >= 4) drawSettlementPerimeter(rng, size, live);

  const count = Math.min(11, Math.max(1, Math.round(blocks * 0.75 + (blocks >= 4 ? 1 : 0))));
  for (let i = 0; i < count; i += 1) {
    const angle = (Math.PI * 2 * i) / count - Math.PI / 2 + (rng() - 0.5) * 0.32;
    const radius = i === 0 ? size * 0.04 : size * (0.14 + Math.sqrt(i / count) * 0.33);
    const x = Math.cos(angle) * radius + (rng() - 0.5) * size * 0.08;
    const y = Math.sin(angle) * radius * 0.66 + (rng() - 0.5) * size * 0.08;
    const dense = count > 7;
    const w = size * (dense ? 0.19 : 0.23) * (0.8 + rng() * 0.5);
    const h = size * (dense ? 0.15 : 0.18) * (0.85 + rng() * 0.45);
    drawMiniSettlementBuilding(x, y, w, h, (rng() - 0.5) * 0.7, live, rng, i);
  }

  drawSettlementScatter(rng, size, live, blocks);
  ctx.restore();
}

function drawSettlementGround(rng, size, blocks, live) {
  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  ctx.fillStyle = live ? "rgba(74, 49, 26, 0.34)" : "rgba(30, 25, 21, 0.5)";
  ctx.beginPath();
  ctx.ellipse(0, size * 0.03, size * 0.46, size * 0.31, (rng() - 0.5) * 0.45, 0, Math.PI * 2);
  ctx.fill();
  if (blocks >= 5) {
    ctx.fillStyle = live ? "rgba(103, 78, 44, 0.3)" : "rgba(17, 15, 13, 0.32)";
    ctx.beginPath();
    ctx.ellipse(size * 0.08, -size * 0.01, size * 0.34, size * 0.2, (rng() - 0.5) * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  ctx.save();
  ctx.lineCap = "round";
  ctx.globalAlpha = live ? 0.62 : 0.48;
  ctx.strokeStyle = live ? "rgba(92, 61, 33, 0.78)" : "rgba(23, 19, 16, 0.8)";
  ctx.lineWidth = Math.max(1, size * 0.075);
  for (let i = 0; i < 2; i += 1) {
    const tilt = (rng() - 0.5) * size * 0.18;
    ctx.beginPath();
    ctx.moveTo(-size * 0.48, tilt + (i - 0.5) * size * 0.08);
    ctx.bezierCurveTo(
      -size * 0.22,
      -size * 0.13 + tilt,
      size * 0.12,
      size * 0.1 - tilt,
      size * 0.48,
      (i - 0.5) * size * 0.04 - tilt
    );
    ctx.stroke();
  }
  ctx.restore();
}

function drawSettlementPerimeter(rng, size, live) {
  ctx.save();
  ctx.strokeStyle = live ? "rgba(48, 30, 17, 0.78)" : "rgba(20, 17, 15, 0.74)";
  ctx.lineWidth = Math.max(1, size * 0.026);
  ctx.setLineDash([size * 0.055, size * 0.035]);
  ctx.beginPath();
  ctx.ellipse(0, size * 0.02, size * 0.49, size * 0.34, (rng() - 0.5) * 0.22, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 0.55;
  ctx.strokeStyle = live ? "rgba(219, 194, 132, 0.38)" : "rgba(174, 162, 137, 0.22)";
  ctx.beginPath();
  ctx.ellipse(size * 0.01, size * 0.02, size * 0.45, size * 0.3, (rng() - 0.5) * 0.18, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawMiniSettlementBuilding(x, y, w, h, angle, live, rng, index) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = "rgba(0, 0, 0, 0.34)";
  ctx.beginPath();
  ctx.ellipse(w * 0.1, h * 0.35, w * 0.72, h * 0.38, 0, 0, Math.PI * 2);
  ctx.fill();

  const wallTone = live
    ? ["#8c7a4c", "#9b8755", "#796840"][index % 3]
    : ["#4b4b42", "#5a554a", "#383a35"][index % 3];
  const roofTone = live
    ? ["#5d3820", "#6b4a29", "#49341f"][index % 3]
    : ["#1e1e1c", "#2f2d29", "#20231f"][index % 3];
  pathRoundRect(-w / 2, -h / 2, w, h, Math.max(1, w * 0.08));
  ctx.fillStyle = wallTone;
  ctx.fill();
  ctx.strokeStyle = live ? "rgba(33, 21, 12, 0.72)" : "rgba(9, 8, 7, 0.82)";
  ctx.lineWidth = Math.max(0.8, w * 0.09);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-w * 0.55, -h * 0.1);
  ctx.lineTo(0, -h * 0.58);
  ctx.lineTo(w * 0.55, -h * 0.1);
  ctx.lineTo(w * 0.42, h * 0.47);
  ctx.lineTo(-w * 0.42, h * 0.47);
  ctx.closePath();
  ctx.fillStyle = roofTone;
  ctx.fill();
  ctx.stroke();

  ctx.globalAlpha = live ? 0.34 : 0.2;
  ctx.strokeStyle = "#ead9a6";
  ctx.lineWidth = Math.max(0.7, w * 0.035);
  ctx.beginPath();
  ctx.moveTo(0, -h * 0.48);
  ctx.lineTo(0, h * 0.36);
  ctx.stroke();
  ctx.globalAlpha = 1;

  if (!live) {
    ctx.fillStyle = "rgba(5, 4, 3, 0.62)";
    ctx.beginPath();
    ctx.ellipse(w * (rng() - 0.5) * 0.34, h * (rng() - 0.3) * 0.22, w * 0.17, h * 0.13, rng() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(7, 6, 5, 0.58)";
    ctx.lineWidth = Math.max(0.7, w * 0.045);
    ctx.beginPath();
    ctx.moveTo(-w * 0.32, h * 0.42);
    ctx.lineTo(w * 0.28, -h * 0.28);
    ctx.stroke();
    if (rng() > 0.35) drawTinySmoke(w * 0.15, -h * 0.5, Math.max(w, h), rng);
  } else if (rng() > 0.55) {
    ctx.fillStyle = "rgba(229, 184, 82, 0.72)";
    ctx.fillRect(-w * 0.25, h * 0.05, Math.max(1, w * 0.12), Math.max(1, h * 0.12));
  }
  ctx.restore();
}

function drawTinySmoke(x, y, size, rng) {
  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = 0.22;
  ctx.strokeStyle = "rgba(216, 207, 181, 0.62)";
  ctx.lineWidth = Math.max(0.7, size * 0.035);
  for (let i = 0; i < 2; i += 1) {
    ctx.beginPath();
    ctx.moveTo((i - 0.5) * size * 0.14, 0);
    ctx.bezierCurveTo(
      size * (rng() - 0.5) * 0.28,
      -size * 0.22,
      size * (rng() - 0.5) * 0.34,
      -size * 0.42,
      size * (rng() - 0.5) * 0.18,
      -size * 0.58
    );
    ctx.stroke();
  }
  ctx.restore();
}

function drawSettlementScatter(rng, size, live, blocks) {
  ctx.save();
  ctx.lineCap = "round";
  ctx.strokeStyle = live ? "rgba(45, 28, 15, 0.62)" : "rgba(9, 8, 7, 0.58)";
  ctx.lineWidth = Math.max(0.8, size * 0.018);
  const fences = blocks >= 3 ? 5 : 3;
  for (let i = 0; i < fences; i += 1) {
    const x = (rng() - 0.5) * size * 0.78;
    const y = (rng() - 0.5) * size * 0.54;
    ctx.beginPath();
    ctx.moveTo(x - size * 0.07, y);
    ctx.lineTo(x + size * 0.07, y + (rng() - 0.5) * size * 0.04);
    ctx.stroke();
  }
  if (!live) {
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = "rgba(16, 12, 9, 0.42)";
    for (let i = 0; i < 3; i += 1) {
      ctx.beginPath();
      ctx.ellipse((rng() - 0.5) * size * 0.66, (rng() - 0.5) * size * 0.48, size * (0.05 + rng() * 0.05), size * (0.025 + rng() * 0.04), rng() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

function drawFeature(cell, center, size) {
  const roll = cell.rolls.feature || 0;
  ctx.save();
  ctx.translate(center.x + size * 0.38, center.y - size * 0.34);
  ctx.scale(size / 44, size / 44);
  drawFeatureBadge(roll);
  ctx.restore();
}

function drawFeatureBadge(roll) {
  const rng = createRng(`feature-token:${roll}`);
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.globalAlpha = 0.94;
  ctx.fillStyle = "rgba(0, 0, 0, 0.28)";
  ctx.beginPath();
  ctx.ellipse(1.5, 2.8, 10.2, 5.2, -0.12, 0, Math.PI * 2);
  ctx.fill();

  const tokenTone = ctx.createRadialGradient(-3, -3, 1, 0, 0, 12);
  tokenTone.addColorStop(0, "rgba(214, 191, 138, 0.78)");
  tokenTone.addColorStop(0.58, "rgba(115, 92, 57, 0.72)");
  tokenTone.addColorStop(1, "rgba(38, 27, 17, 0.82)");
  ctx.fillStyle = tokenTone;
  ctx.strokeStyle = "rgba(20, 13, 8, 0.92)";
  ctx.lineWidth = 1.15;
  ctx.beginPath();
  ctx.moveTo(-8.2, -5.5);
  ctx.bezierCurveTo(-4.6, -9.8, 3.8, -9.1, 8.1, -4.2);
  ctx.bezierCurveTo(11.1, -0.7, 8.1, 7.4, 2.2, 8.9);
  ctx.bezierCurveTo(-4.2, 10.1, -9.2, 5.1, -9.1, -0.6);
  ctx.bezierCurveTo(-9.1, -2.4, -9.1, -3.8, -8.2, -5.5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.globalAlpha = 0.28;
  ctx.fillStyle = "#120c07";
  for (let i = 0; i < 8; i += 1) {
    ctx.beginPath();
    ctx.arc((rng() - 0.5) * 15, (rng() - 0.5) * 13, 0.45 + rng() * 0.8, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 0.94;

  if (isUncannyFeature(roll)) {
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = "rgba(95, 16, 9, 0.36)";
    ctx.beginPath();
    ctx.ellipse(1.5, 1.5, 7.8, 3.6, -0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = "rgba(91, 36, 20, 0.78)";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(0.2, 0.2, 8.9, -0.35, Math.PI * 0.92);
    ctx.stroke();
  }

  ctx.shadowColor = "rgba(235, 216, 167, 0.22)";
  ctx.shadowBlur = 1.5;
  ctx.strokeStyle = "rgba(18, 12, 8, 0.96)";
  ctx.fillStyle = "rgba(18, 12, 8, 0.96)";
  ctx.lineWidth = 1.85;

  switch (roll) {
    case 1:
      iconHut();
      break;
    case 2:
      iconTank();
      break;
    case 3:
      iconPlane();
      break;
    case 4:
      iconChurch();
      break;
    case 5:
      iconDevice();
      break;
    case 6:
      iconTrench();
      break;
    case 7:
      iconGraves(2);
      break;
    case 8:
      iconCastle();
      break;
    case 9:
      iconHole();
      break;
    case 10:
      iconTree(false);
      break;
    case 11:
      iconSphere();
      break;
    case 12:
      iconStone();
      break;
    case 13:
      iconLightningTree();
      break;
    case 14:
      iconBurnt();
      break;
    case 15:
      iconPond();
      break;
    case 16:
      iconWall();
      break;
    case 17:
      iconCamp();
      break;
    case 18:
      iconFirepit();
      break;
    case 19:
      iconHanged();
      break;
    case 20:
      iconGraves(1);
      break;
    default:
      iconStone();
      break;
  }
  ctx.restore();
}

function isUncannyFeature(roll) {
  return [5, 7, 9, 11, 12, 13, 18, 19].includes(roll);
}

function iconHut() {
  ctx.beginPath();
  ctx.moveTo(-6, 1);
  ctx.lineTo(0, -5);
  ctx.lineTo(6, 1);
  ctx.moveTo(-4, 1);
  ctx.lineTo(-4, 6);
  ctx.lineTo(4, 6);
  ctx.lineTo(4, 1);
  ctx.stroke();
}

function iconTank() {
  ctx.fillRect(-7, -1, 10, 5);
  ctx.strokeRect(-7, -1, 10, 5);
  ctx.beginPath();
  ctx.moveTo(3, 0);
  ctx.lineTo(8, -4);
  ctx.moveTo(-6, 6);
  ctx.lineTo(5, 6);
  ctx.stroke();
}

function iconPlane() {
  ctx.beginPath();
  ctx.moveTo(0, -8);
  ctx.lineTo(0, 7);
  ctx.moveTo(-8, -1);
  ctx.lineTo(8, -1);
  ctx.moveTo(-5, 5);
  ctx.lineTo(5, 5);
  ctx.stroke();
}

function iconChurch() {
  ctx.strokeRect(-5, -1, 10, 7);
  ctx.beginPath();
  ctx.moveTo(0, -8);
  ctx.lineTo(0, 4);
  ctx.moveTo(-4, -5);
  ctx.lineTo(4, -5);
  ctx.stroke();
}

function iconDevice() {
  ctx.beginPath();
  ctx.arc(0, 0, 4, 0, Math.PI * 2);
  ctx.moveTo(0, -4);
  ctx.lineTo(0, -8);
  ctx.moveTo(0, 4);
  ctx.lineTo(0, 8);
  ctx.moveTo(-4, 0);
  ctx.lineTo(-8, 0);
  ctx.moveTo(4, 0);
  ctx.lineTo(8, 0);
  ctx.stroke();
}

function iconTrench() {
  ctx.beginPath();
  ctx.moveTo(-8, -5);
  ctx.lineTo(-3, -1);
  ctx.lineTo(-7, 3);
  ctx.lineTo(-1, 6);
  ctx.lineTo(4, 1);
  ctx.lineTo(8, 5);
  ctx.stroke();
}

function iconGraves(count) {
  ctx.beginPath();
  const xs = count === 1 ? [0] : [-3.5, 4];
  for (const x of xs) {
    ctx.moveTo(x, -6);
    ctx.lineTo(x, 6);
    ctx.moveTo(x - 3, -2);
    ctx.lineTo(x + 3, -2);
  }
  ctx.stroke();
}

function iconCastle() {
  ctx.beginPath();
  ctx.rect(-7, -2, 14, 8);
  ctx.moveTo(-7, -2);
  ctx.lineTo(-7, -7);
  ctx.lineTo(-3, -7);
  ctx.lineTo(-3, -2);
  ctx.moveTo(3, -2);
  ctx.lineTo(3, -7);
  ctx.lineTo(7, -7);
  ctx.lineTo(7, -2);
  ctx.stroke();
}

function iconHole() {
  ctx.fillStyle = "#110d0b";
  ctx.beginPath();
  ctx.ellipse(0, 1, 7, 4.5, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

function iconTree(split) {
  ctx.beginPath();
  ctx.moveTo(0, 7);
  ctx.lineTo(0, -7);
  ctx.moveTo(0, -3);
  ctx.lineTo(-6, 2);
  ctx.moveTo(0, -1);
  ctx.lineTo(6, 3);
  if (split) {
    ctx.moveTo(0, -7);
    ctx.lineTo(-2, -2);
    ctx.lineTo(2, 1);
  }
  ctx.stroke();
}

function iconSphere() {
  ctx.beginPath();
  ctx.arc(0, -1, 5.5, 0, Math.PI * 2);
  ctx.moveTo(-7, 7);
  ctx.lineTo(7, 7);
  ctx.stroke();
}

function iconStone() {
  ctx.beginPath();
  ctx.moveTo(0, -8);
  ctx.lineTo(7, -1);
  ctx.lineTo(3, 7);
  ctx.lineTo(-6, 5);
  ctx.lineTo(-8, -2);
  ctx.closePath();
  ctx.stroke();
}

function iconLightningTree() {
  iconTree(true);
  ctx.strokeStyle = "rgba(141, 43, 34, 0.95)";
  ctx.beginPath();
  ctx.moveTo(4, -8);
  ctx.lineTo(0, -1);
  ctx.lineTo(4, -1);
  ctx.lineTo(-1, 8);
  ctx.stroke();
}

function iconBurnt() {
  ctx.beginPath();
  ctx.moveTo(-5, 7);
  ctx.quadraticCurveTo(-8, 0, -2, -4);
  ctx.quadraticCurveTo(0, -8, 3, -3);
  ctx.quadraticCurveTo(8, 2, 4, 7);
  ctx.stroke();
}

function iconPond() {
  ctx.fillStyle = "#5f8790";
  ctx.beginPath();
  ctx.ellipse(0, 1, 8, 4.5, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

function iconWall() {
  ctx.beginPath();
  ctx.moveTo(-8, 4);
  ctx.lineTo(8, 4);
  ctx.moveTo(-7, 0);
  ctx.lineTo(1, 0);
  ctx.moveTo(4, 0);
  ctx.lineTo(8, 0);
  ctx.moveTo(-4, -4);
  ctx.lineTo(6, -4);
  ctx.stroke();
}

function iconCamp() {
  ctx.beginPath();
  ctx.moveTo(-7, 6);
  ctx.lineTo(0, -7);
  ctx.lineTo(7, 6);
  ctx.moveTo(-3, 6);
  ctx.lineTo(0, 0);
  ctx.lineTo(3, 6);
  ctx.stroke();
}

function iconFirepit() {
  ctx.beginPath();
  ctx.ellipse(0, 4, 8, 3, 0, 0, Math.PI * 2);
  ctx.moveTo(-2, 3);
  ctx.quadraticCurveTo(-5, -3, 0, -8);
  ctx.quadraticCurveTo(5, -2, 2, 3);
  ctx.stroke();
}

function iconHanged() {
  ctx.beginPath();
  ctx.moveTo(-5, 7);
  ctx.lineTo(-5, -8);
  ctx.lineTo(4, -8);
  ctx.lineTo(4, -4);
  ctx.arc(4, -1, 3, -Math.PI / 2, Math.PI * 1.5);
  ctx.moveTo(4, 2);
  ctx.lineTo(4, 7);
  ctx.stroke();
}

function drawBridge(center, size) {
  ctx.save();
  ctx.strokeStyle = "rgba(232, 211, 164, 0.96)";
  ctx.lineWidth = Math.max(1, size * 0.035);
  for (let i = -1; i <= 1; i += 1) {
    ctx.beginPath();
    ctx.moveTo(center.x - size * 0.18, center.y + i * size * 0.08);
    ctx.lineTo(center.x + size * 0.18, center.y + i * size * 0.08);
    ctx.stroke();
  }
  ctx.restore();
}

function drawCellLabel(cell, center, size) {
  if (size < 21) return;
  ctx.save();
  ctx.font = `${Math.max(9, size * 0.18)}px Segoe UI, Arial, sans-serif`;
  ctx.fillStyle = "rgba(255, 248, 226, 0.66)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(cell.label, center.x, center.y + size * 0.58);
  ctx.restore();
}

function drawSelection(cell) {
  const points = hexPoints(cell);
  ctx.save();
  pathFromPoints(points);
  ctx.lineWidth = Math.max(2, state.layout.size * 0.07);
  ctx.strokeStyle = "rgba(245, 234, 209, 0.95)";
  ctx.stroke();
  ctx.restore();
}

function drawEditorPendingSelection() {
  if (!isEdgeEditorTool() || !state.editor.edgeStart) return;
  const points = hexPoints(state.editor.edgeStart);
  ctx.save();
  pathFromPoints(points);
  ctx.lineWidth = Math.max(2, state.layout.size * 0.04);
  ctx.setLineDash([state.layout.size * 0.16, state.layout.size * 0.1]);
  ctx.strokeStyle = "rgba(239, 190, 112, 0.95)";
  ctx.stroke();
  ctx.restore();
}

function updatePanels() {
  updateStats();
  updateDetails();
  updateEditor();
}

function updateStats() {
  if (!state.map) return;
  const stats = state.map.stats;
  const labels = currentLocale().stats;
  const rows = [
    [labels.cells, stats.cells],
    [labels.settlements, stats.settlements],
    [labels.abandoned, stats.abandoned],
    [labels.largeSettlements, stats.largeSettlements],
    [labels.population, formatNumber(stats.population)],
    [labels.features, stats.features],
    [labels.rivers, stats.rivers],
    [labels.lakes, stats.lakes],
    [labels.roads, stats.roads],
    [labels.rails, stats.rails],
    [labels.bridges, stats.bridges]
  ];
  els.stats.innerHTML = rows.map(([name, value]) => {
    return `<dt>${escapeHtml(name)}</dt><dd>${escapeHtml(String(value))}</dd>`;
  }).join("");
}

function updateDetails() {
  const loc = currentLocale();
  const cell = state.selected;
  if (!cell) {
    els.details.innerHTML = `<p class="empty-note">${escapeHtml(loc.details.chooseHex)}</p>`;
    return;
  }

  const tags = [];
  if (cell.hasRiver) tags.push(loc.tags.river);
  if (cell.riverLake) tags.push(loc.tags.lake);
  if (cell.road) tags.push(loc.tags.road);
  if (cell.rail) tags.push(loc.tags.rail);
  if (cell.bridge) tags.push(loc.tags.bridge);
  if (cell.feature) tags.push(loc.tags.feature);

  const terrain = terrainText(cell);
  const details = [
    [loc.details.coordinates, `${cell.label} / q${cell.q}, r${cell.r}`],
    [loc.details.order, `#${cell.order}`],
    [loc.details.landscape, terrain],
    [loc.details.roll, formatRoll(cell.rolls.terrain)]
  ];
  if (cell.rolls.secondaryTerrain) {
    details.push([loc.details.secondary, formatRoll(cell.rolls.secondaryTerrain)]);
  }
  if (cell.cultivated) {
    details.push([loc.details.section, cultivatedLabel(cell.cultivated)]);
    const cultureRoll = cell.rolls.cultivated && cell.rolls.cultivated.manual
      ? currentLocale().editor.customRoll
      : `d6 = ${cell.rolls.cultivated}`;
    details.push([loc.details.culture, cultureRoll]);
  }
  if (cell.feature) {
    details.push([loc.details.find, `${featureLabel(cell.rolls.feature)} (${cell.rolls.feature} ${loc.details.d20})`]);
  }

  let html = `
    <div class="hex-title">
      <strong>${escapeHtml(cell.label)}</strong>
      <span>${escapeHtml(terrainLabel(cell.terrain, "short"))}</span>
    </div>
    <div class="tag-row">${tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
    ${detailList(details)}
  `;

  if (cell.settlement) {
    html += settlementHtml(cell.settlement);
  }

  els.details.innerHTML = html;
}

function updateEditor() {
  const loc = currentLocale().editor;
  const cell = state.selected;
  if (!cell) {
    els.editor.innerHTML = `<p class="empty-note">${escapeHtml(loc.noHex)}</p>`;
    return;
  }

  const terrainOptions = Object.keys(TERRAIN).map((key) => {
    return optionHtml(key, terrainLabel(key), cell.terrain === key);
  }).join("");
  const cultivatedOptions = [
    optionHtml("", loc.noCultivated, !cell.cultivated),
    ...Object.keys(CULTIVATED).map((key) => optionHtml(key, cultivatedLabel(key), cell.cultivated === key))
  ].join("");
  const featureOptions = [
    optionHtml("", loc.noFeature, !cell.feature),
    ...currentLocale().features.map((name, index) => {
      const roll = index + 1;
      return optionHtml(String(roll), `${roll}. ${name}`, cell.rolls.feature === roll);
    })
  ].join("");
  const settlement = cell.settlement;

  let settlementFields = "";
  if (settlement) {
    settlementFields = `
      <label class="field editor-field">
        <span>${escapeHtml(loc.blocks)}</span>
        <input name="settlementBlocks" type="number" min="1" max="60" step="1" value="${escapeHtml(String(settlement.blocks || 1))}">
      </label>
      <label class="field editor-field">
        <span>${escapeHtml(loc.peoplePerBlock)}</span>
        <select name="settlementPeople">${[10, 20, 50, 100, 200, 500].map((value) => {
          return optionHtml(String(value), String(value), Number(settlement.peoplePerBlock) === value);
        }).join("")}</select>
      </label>
      <label class="check-field">
        <input name="settlementAbandoned" type="checkbox" ${settlement.abandoned ? "checked" : ""}>
        <span>${escapeHtml(loc.abandoned)}</span>
      </label>
      ${settlement.abandoned ? "" : `
        <label class="field editor-field">
          <span>${escapeHtml(loc.government)}</span>
          <select name="settlementGovernment">${rolledOptions("governments", settlement.rolls.government)}</select>
        </label>
        <label class="field editor-field">
          <span>${escapeHtml(loc.wealth)}</span>
          <select name="settlementWealth">${rolledOptions("wealth", settlement.rolls.wealth)}</select>
        </label>
        <label class="field editor-field">
          <span>${escapeHtml(loc.hiddenPower)}</span>
          <select name="settlementHiddenPower">${rolledOptions("hiddenPower", settlement.rolls.hiddenPower)}</select>
        </label>
        <label class="field editor-field">
          <span>${escapeHtml(loc.venue)}</span>
          <select name="settlementVenue">${rolledOptions("venues", settlement.rolls.venue)}</select>
        </label>
      `}
    `;
  }

  els.editor.innerHTML = `
    <div class="editor-grid">
      <label class="field editor-field">
        <span>${escapeHtml(loc.terrain)}</span>
        <select name="terrain">${terrainOptions}</select>
      </label>
      <label class="field editor-field">
        <span>${escapeHtml(loc.cultivated)}</span>
        <select name="cultivated">${cultivatedOptions}</select>
      </label>
    </div>
    <div class="editor-checks">
      <label class="check-field">
        <input name="riverHex" type="checkbox" ${cell.hasRiver ? "checked" : ""}>
        <span>${escapeHtml(loc.riverHex)}</span>
      </label>
      <label class="check-field">
        <input name="riverLake" type="checkbox" ${cell.riverLake ? "checked" : ""}>
        <span>${escapeHtml(loc.lake)}</span>
      </label>
    </div>
    <label class="field editor-field">
      <span>${escapeHtml(loc.feature)}</span>
      <select name="feature">${featureOptions}</select>
    </label>
    <div class="editor-subsection">
      <label class="check-field">
        <input name="hasSettlement" type="checkbox" ${settlement ? "checked" : ""}>
        <span>${escapeHtml(loc.hasSettlement)}</span>
      </label>
      ${settlementFields}
    </div>
    <button class="subtle-action" type="button" data-editor-action="clearHex" title="${escapeHtml(loc.clearHexTitle)}">${escapeHtml(loc.clearHex)}</button>
  `;
}

function optionHtml(value, label, selected) {
  return `<option value="${escapeHtml(value)}" ${selected ? "selected" : ""}>${escapeHtml(label)}</option>`;
}

function rolledOptions(listName, selectedRoll) {
  return currentLocale()[listName].map((label, index) => {
    const roll = index + 1;
    return optionHtml(String(roll), `${roll}. ${label}`, selectedRoll === roll);
  }).join("");
}

function onEditorInput() {
  // Number fields are committed on change to avoid fighting the caret while typing.
}

function onEditorClick(event) {
  const action = event.target.dataset.editorAction;
  if (action !== "clearHex" || !state.selected) return;
  clearCellSpecials(state.selected);
  commitMapEdit("hexChanged");
}

function onEditorChange(event) {
  if (!state.selected) return;
  const target = event.target;
  if (!target.name) return;
  applyEditorField(state.selected, target);
}

function applyEditorField(cell, target) {
  const value = target.type === "checkbox" ? target.checked : target.value;
  switch (target.name) {
    case "terrain":
      setCellTerrain(cell, value);
      break;
    case "cultivated":
      setCellCultivated(cell, value);
      break;
    case "riverHex":
      cell.manualRiver = value;
      if (!value) cell.originalRiver = false;
      break;
    case "riverLake":
      cell.riverLake = value;
      if (value) cell.manualRiver = true;
      break;
    case "feature":
      setCellFeature(cell, value);
      break;
    case "hasSettlement":
      if (value) ensureCellSettlement(cell);
      else {
        cell.settlement = null;
        if (cell.cultivated === "settlement") {
          cell.cultivated = null;
          delete cell.rolls.cultivated;
        }
      }
      break;
    case "settlementBlocks":
      if (cell.settlement) cell.settlement.blocks = clamp(parseInt(value, 10) || 1, 1, 60);
      break;
    case "settlementPeople":
      if (cell.settlement) cell.settlement.peoplePerBlock = parseInt(value, 10) || 50;
      break;
    case "settlementAbandoned":
      if (cell.settlement) {
        cell.settlement.abandoned = value;
        if (!value) ensureSettlementDetails(cell.settlement);
      }
      break;
    case "settlementGovernment":
      if (cell.settlement) setSettlementRoll(cell.settlement, "government", parseInt(value, 10), GOVERNMENTS);
      break;
    case "settlementWealth":
      if (cell.settlement) setSettlementRoll(cell.settlement, "wealth", parseInt(value, 10), WEALTH);
      break;
    case "settlementHiddenPower":
      if (cell.settlement) setSettlementRoll(cell.settlement, "hiddenPower", parseInt(value, 10), HIDDEN_POWER);
      break;
    case "settlementVenue":
      if (cell.settlement) setSettlementRoll(cell.settlement, "venue", parseInt(value, 10), VENUES);
      break;
    default:
      return;
  }

  if (cell.settlement) updateSettlementPopulation(cell.settlement);
  commitMapEdit("hexChanged");
}

function setCellTerrain(cell, terrain) {
  if (!TERRAIN[terrain]) return;
  cell.terrain = terrain;
  cell.primaryTerrain = cell.originalRiver ? "river" : terrain;
  cell.rolls.terrain = manualRoll();
  if (terrain !== "cultivated") {
    cell.cultivated = null;
    delete cell.rolls.cultivated;
    return;
  }
  if (!cell.cultivated) {
    cell.cultivated = "fields";
    cell.rolls.cultivated = manualRoll();
  }
}

function setCellCultivated(cell, cultivated) {
  if (!cultivated) {
    cell.cultivated = null;
    delete cell.rolls.cultivated;
    return;
  }
  if (!CULTIVATED[cultivated]) return;
  cell.terrain = "cultivated";
  cell.primaryTerrain = cell.originalRiver ? "river" : "cultivated";
  cell.cultivated = cultivated;
  cell.rolls.cultivated = manualRoll();
  if (cultivated === "settlement") ensureCellSettlement(cell);
}

function setCellFeature(cell, value) {
  const roll = parseInt(value, 10);
  if (!roll) {
    cell.feature = null;
    delete cell.rolls.feature;
    return;
  }
  cell.rolls.feature = clamp(roll, 1, FEATURE_TABLE.length);
  cell.feature = FEATURE_TABLE[cell.rolls.feature - 1];
}

function ensureCellSettlement(cell) {
  if (!cell.settlement) {
    const rng = createRng(`${state.map.seed}:editor-settlement:${cell.key}`);
    cell.settlement = rollSettlement(rng);
  }
  if (cell.terrain !== "cultivated") setCellTerrain(cell, "cultivated");
  cell.cultivated = "settlement";
  cell.rolls.cultivated = manualRoll();
  updateSettlementPopulation(cell.settlement);
}

function ensureSettlementDetails(settlement) {
  if (!settlement.rolls) settlement.rolls = {};
  if (!settlement.rolls.government) setSettlementRoll(settlement, "government", 1, GOVERNMENTS);
  if (!settlement.rolls.wealth) setSettlementRoll(settlement, "wealth", 3, WEALTH);
  if (!settlement.rolls.hiddenPower) setSettlementRoll(settlement, "hiddenPower", 1, HIDDEN_POWER);
  if (!settlement.rolls.venue) setSettlementRoll(settlement, "venue", 1, VENUES);
}

function setSettlementRoll(settlement, field, roll, table) {
  const nextRoll = clamp(roll || 1, 1, table.length);
  if (!settlement.rolls) settlement.rolls = {};
  settlement.rolls[field] = nextRoll;
  settlement[field] = table[nextRoll - 1];
}

function updateSettlementPopulation(settlement) {
  settlement.blocks = clamp(parseInt(settlement.blocks, 10) || 1, 1, 60);
  settlement.peoplePerBlock = parseInt(settlement.peoplePerBlock, 10) || 50;
  settlement.potentialPopulation = settlement.blocks * settlement.peoplePerBlock;
  settlement.population = settlement.abandoned ? 0 : settlement.potentialPopulation;
}

function clearCellSpecials(cell) {
  cell.feature = null;
  cell.settlement = null;
  cell.cultivated = null;
  cell.riverLake = false;
  cell.manualRiver = false;
  cell.originalRiver = false;
  delete cell.rolls.feature;
  delete cell.rolls.cultivated;
}

function manualRoll() {
  return { manual: true };
}

function commitMapEdit(statusKey) {
  normalizeMapFlags(state.map);
  state.map.stats = computeStats(state.map);
  render();
  updatePanels();
  updateEditorTools();
  const message = currentLocale().editor[statusKey];
  if (message) flashStatus(message);
}

function normalizeMapFlags(map) {
  for (const cell of map.cells) {
    cell.road = false;
    cell.rail = false;
    cell.bridge = false;
    cell.hasRiver = Boolean(cell.originalRiver || cell.manualRiver || cell.riverLake);
  }
  for (const key of map.roadEdges) {
    const cells = edgeCells(map, key);
    if (!cells.every(Boolean)) continue;
    cells.forEach((cell) => { cell.road = true; });
  }
  for (const key of map.railEdges) {
    const cells = edgeCells(map, key);
    if (!cells.every(Boolean)) continue;
    cells.forEach((cell) => { cell.rail = true; });
  }
  for (const key of map.riverEdges) {
    const cells = edgeCells(map, key);
    if (!cells.every(Boolean)) continue;
    cells.forEach((cell) => { cell.hasRiver = true; });
  }
  markBridges(map);
}

function settlementHtml(settlement) {
  const loc = currentLocale();
  const rows = [
    [loc.details.blocks, settlement.blocks],
    [loc.details.inBlock, settlement.peoplePerBlock],
    [loc.details.residents, settlement.abandoned ? loc.details.abandoned : formatNumber(settlement.population)],
    [loc.details.potential, formatNumber(settlement.potentialPopulation)]
  ];

  if (!settlement.abandoned) {
    rows.push([loc.details.authority, rolledListLabel("governments", settlement.rolls.government, settlement.government)]);
    rows.push([loc.details.wealth, rolledListLabel("wealth", settlement.rolls.wealth, settlement.wealth)]);
    rows.push([loc.details.realPower, rolledListLabel("hiddenPower", settlement.rolls.hiddenPower, settlement.hiddenPower)]);
    rows.push([loc.details.venue, rolledListLabel("venues", settlement.rolls.venue, settlement.venue)]);
  }

  return `<h3>${escapeHtml(loc.details.settlement)}</h3>${detailList(rows)}`;
}

function detailList(rows) {
  return `<dl class="detail-list">${rows.map(([key, value]) => {
    return `<div><dt>${escapeHtml(String(key))}</dt><dd>${escapeHtml(String(value))}</dd></div>`;
  }).join("")}</dl>`;
}

function renderLegend() {
  const loc = currentLocale();
  const terrainItems = Object.entries(TERRAIN).map(([key, item]) => {
    return legendItem(terrainLegendIcon(item.color), terrainLabel(key));
  });
  const extra = [
    legendItem(symbolLegendIcon("river"), loc.legend.river),
    legendItem(symbolLegendIcon("road"), loc.legend.road),
    legendItem(symbolLegendIcon("rail"), loc.legend.rail),
    legendItem(symbolLegendIcon("bridge"), loc.legend.bridge),
    legendItem(symbolLegendIcon("noMans"), loc.legend.noMans),
    legendItem(symbolLegendIcon("settlement"), loc.legend.settlement),
    legendItem(symbolLegendIcon("largeSettlement"), loc.legend.largeSettlement),
    legendItem(symbolLegendIcon("abandonedSettlement"), loc.legend.abandonedSettlement),
    legendItem(symbolLegendIcon("feature"), loc.legend.feature)
  ];
  const featureItems = loc.features.map((name, index) => {
    return legendItem(featureLegendIcon(index + 1), `${index + 1}. ${name}`);
  });
  els.legend.innerHTML = [
    `<div class="legend-heading">${escapeHtml(loc.legend.terrain)}</div>`,
    ...terrainItems,
    `<div class="legend-heading">${escapeHtml(loc.legend.signs)}</div>`,
    ...extra,
    `<div class="legend-heading">${escapeHtml(loc.legend.finds)}</div>`,
    ...featureItems
  ].join("");
}

function legendItem(icon, text) {
  return `<div class="legend-item">${icon}<span>${escapeHtml(text)}</span></div>`;
}

function terrainLegendIcon(color) {
  return `<span class="legend-icon legend-terrain" style="background:${color}"></span>`;
}

function symbolLegendIcon(type) {
  const icons = {
    river: `
      <svg viewBox="0 0 44 28" aria-hidden="true">
        <path class="legend-river-shadow" d="M-2 24 L46 4"></path>
        <path class="legend-river" d="M-2 24 L46 4"></path>
      </svg>`,
    road: `
      <svg viewBox="0 0 44 28" aria-hidden="true">
        <path class="legend-road-shadow" d="M2 24 L42 4"></path>
        <path class="legend-road" d="M2 24 L42 4"></path>
      </svg>`,
    rail: `
      <svg viewBox="0 0 44 28" aria-hidden="true">
        <path class="legend-rail-shadow" d="M22 2 L22 26"></path>
        <path class="legend-rail" d="M22 2 L22 26"></path>
        <path class="legend-sleeper" d="M12 6 L32 6 M12 14 L32 14 M12 22 L32 22"></path>
      </svg>`,
    bridge: `
      <svg viewBox="0 0 44 28" aria-hidden="true">
        <path class="legend-river-shadow" d="M-2 24 L46 4"></path>
        <path class="legend-river" d="M-2 24 L46 4"></path>
        <path class="legend-bridge" d="M12 10 L32 10 M12 14 L32 14 M12 18 L32 18"></path>
      </svg>`,
    settlement: `
      <svg viewBox="0 0 44 28" aria-hidden="true">
        <rect class="legend-house-live" x="14" y="9" width="7" height="6"></rect>
        <rect class="legend-house-live" x="23" y="12" width="7" height="6"></rect>
        <rect class="legend-house-live" x="18" y="17" width="7" height="6"></rect>
      </svg>`,
    largeSettlement: `
      <svg viewBox="0 0 44 28" aria-hidden="true">
        <circle class="legend-large-ring" cx="22" cy="14" r="10"></circle>
        <rect class="legend-house-live" x="14" y="9" width="7" height="6"></rect>
        <rect class="legend-house-live" x="23" y="12" width="7" height="6"></rect>
        <rect class="legend-house-live" x="18" y="17" width="7" height="6"></rect>
      </svg>`,
    abandonedSettlement: `
      <svg viewBox="0 0 44 28" aria-hidden="true">
        <rect class="legend-house-dead" x="14" y="9" width="7" height="6"></rect>
        <rect class="legend-house-dead" x="23" y="12" width="7" height="6"></rect>
        <path class="legend-ruin-slash" d="M13 21 L31 7"></path>
      </svg>`,
    feature: `
      <svg viewBox="0 0 44 28" aria-hidden="true">
        <circle class="legend-feature-badge" cx="22" cy="14" r="9"></circle>
        <path class="legend-feature-line" d="M22 7 L29 14 L25 23 L15 21 L13 12 Z"></path>
      </svg>`,
    noMans: `
      <svg viewBox="0 0 44 28" aria-hidden="true">
        <ellipse class="legend-crater" cx="15" cy="18" rx="6" ry="3"></ellipse>
        <path class="legend-trench" d="M9 9 L15 13 L12 17 L20 21 L27 15 L34 20"></path>
        <path class="legend-wire" d="M9 7 L35 7 M13 4 L17 10 M21 4 L25 10 M29 4 L33 10"></path>
      </svg>`
  };
  return `<span class="legend-icon legend-symbol">${icons[type]}</span>`;
}

function featureLegendIcon(roll) {
  return `<span class="legend-icon legend-symbol">${featureLegendSvg(roll)}</span>`;
}

function featureLegendSvg(roll) {
  const body = {
    1: '<path class="legend-feature-line" d="M14 16 L22 9 L30 16 M17 16 L17 22 L27 22 L27 16"></path>',
    2: '<rect class="legend-feature-fill" x="13" y="13" width="13" height="6"></rect><path class="legend-feature-line" d="M26 14 L34 9 M14 22 L28 22"></path>',
    3: '<path class="legend-feature-line" d="M22 5 L22 23 M12 13 L32 13 M16 20 L28 20"></path>',
    4: '<rect class="legend-feature-line" x="16" y="14" width="12" height="8"></rect><path class="legend-feature-line" d="M22 5 L22 19 M17 9 L27 9"></path>',
    5: '<circle class="legend-feature-line" cx="22" cy="14" r="5"></circle><path class="legend-feature-line" d="M22 4 L22 9 M22 19 L22 24 M12 14 L17 14 M27 14 L32 14"></path>',
    6: '<path class="legend-feature-line" d="M13 8 L19 12 L14 17 L22 22 L28 16 L34 21"></path>',
    7: '<path class="legend-feature-line" d="M18 7 L18 23 M14 12 L22 12 M27 8 L27 23 M23 13 L31 13"></path>',
    8: '<path class="legend-feature-line" d="M14 22 L14 10 L18 10 L18 14 L26 14 L26 10 L30 10 L30 22 Z"></path>',
    9: '<ellipse class="legend-feature-dark" cx="22" cy="15" rx="9" ry="5"></ellipse>',
    10: '<path class="legend-feature-line" d="M22 23 L22 6 M22 10 L14 16 M22 13 L31 18"></path>',
    11: '<circle class="legend-feature-line" cx="22" cy="12" r="7"></circle><path class="legend-feature-line" d="M13 24 L31 24"></path>',
    12: '<path class="legend-feature-line" d="M22 5 L31 13 L27 23 L16 21 L13 12 Z"></path>',
    13: '<path class="legend-feature-line" d="M19 23 L20 6 M20 10 L13 16 M20 13 L28 18"></path><path class="legend-feature-fire" d="M29 5 L24 13 L29 13 L23 24"></path>',
    14: '<path class="legend-feature-fire" d="M17 23 C12 17 17 11 21 8 C22 4 28 9 27 14 C33 17 29 23 17 23 Z"></path>',
    15: '<ellipse class="legend-feature-water" cx="22" cy="15" rx="10" ry="5"></ellipse>',
    16: '<path class="legend-feature-line" d="M12 20 L32 20 M13 15 L23 15 M26 15 L32 15 M16 10 L29 10"></path>',
    17: '<path class="legend-feature-line" d="M13 22 L22 6 L31 22 M18 22 L22 14 L26 22"></path>',
    18: '<ellipse class="legend-feature-line" cx="22" cy="20" rx="10" ry="3"></ellipse><path class="legend-feature-fire" d="M19 19 C15 12 20 10 22 5 C27 11 29 15 25 20"></path>',
    19: '<path class="legend-feature-line" d="M16 23 L16 5 L27 5 L27 10 M27 10 A4 4 0 1 1 27 18 M27 18 L27 23"></path>',
    20: '<path class="legend-feature-line" d="M22 6 L22 23 M17 12 L27 12"></path>'
  }[roll] || '<path class="legend-feature-line" d="M22 5 L31 13 L27 23 L16 21 L13 12 Z"></path>';

  return `
    <svg viewBox="0 0 44 28" aria-hidden="true">
      <circle class="legend-feature-badge" cx="22" cy="14" r="10.5"></circle>
      ${body}
    </svg>`;
}

function terrainText(cell) {
  const loc = currentLocale();
  const base = terrainLabel(cell.terrain);
  if (cell.originalRiver) {
    return loc.details.riverSecondary(base);
  }
  if (cell.hasRiver) {
    return loc.details.riverBase(base);
  }
  return base;
}

function formatRoll(roll) {
  if (!roll) return currentLocale().details.noRoll;
  if (roll.manual) return currentLocale().editor.customRoll;
  return `${roll.dice.join(" + ")} = ${roll.total}`;
}

function exportPng() {
  if (!state.map) return;
  const link = document.createElement("a");
  link.download = `dead-land-map-${safeFilePart(state.map.seed)}.png`;
  link.href = els.canvas.toDataURL("image/png");
  link.click();
  setStatus("pngSaved");
}

function exportJson() {
  if (!state.map) return;
  const payload = {
    seed: state.map.seed,
    width: state.map.width,
    height: state.map.height,
    stats: state.map.stats,
    cells: state.map.cells.map((cell) => ({
      q: cell.q,
      r: cell.r,
      label: cell.label,
      terrain: cell.terrain,
      primaryTerrain: cell.primaryTerrain,
      hasRiver: cell.hasRiver,
      manualRiver: cell.manualRiver,
      originalRiver: cell.originalRiver,
      riverLake: cell.riverLake,
      cultivated: cell.cultivated,
      feature: cell.feature,
      settlement: cell.settlement,
      bridge: cell.bridge,
      road: cell.road,
      rail: cell.rail,
      rolls: cell.rolls
    })),
    rivers: [...state.map.riverEdges],
    roads: [...state.map.roadEdges],
    railways: [...state.map.railEdges]
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.download = `dead-land-map-${safeFilePart(state.map.seed)}.json`;
  link.href = URL.createObjectURL(blob);
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  setStatus("jsonSaved");
}

async function copySeed() {
  if (!state.map) return;
  try {
    await navigator.clipboard.writeText(state.map.seed);
    setStatus("seedCopied");
  } catch (error) {
    els.seed.select();
    setStatus("seedSelected");
  }
}

function onCanvasClick(event) {
  if (!state.map || !state.layout) return;
  if (event.button !== 0 || state.view.suppressClick) return;
  const point = canvasPointFromEvent(event);
  const cell = cellAtPoint(point);
  if (!cell) return;

  if (isEdgeEditorTool()) {
    handleEdgeToolClick(cell);
    return;
  }

  state.selected = cell;
  state.editor.edgeStart = null;
  render();
  updatePanels();
  updateEditorTools();
}

function cellAtPoint(point) {
  const layout = state.layout;
  const localX = (point.x - layout.offsetX) / layout.size;
  const localY = (point.y - layout.offsetY) / layout.size;
  const approxQ = Math.round(localX / 1.5);

  for (let dq = -2; dq <= 2; dq += 1) {
    const q = approxQ + dq;
    const approxR = Math.round((localY / Math.sqrt(3)) - 0.5 * (q & 1));
    for (let dr = -2; dr <= 2; dr += 1) {
      const cell = getCell(state.map, q, approxR + dr);
      if (cell && pointInPoly(point, hexPoints(cell))) {
        return cell;
      }
    }
  }
  return null;
}

function handleEdgeToolClick(cell) {
  const loc = currentLocale().editor;
  if (!state.editor.edgeStart) {
    state.editor.edgeStart = cell;
    state.selected = cell;
    render();
    updatePanels();
    updateEditorTools();
    return;
  }

  const start = state.editor.edgeStart;
  if (start.key === cell.key) {
    state.editor.edgeStart = null;
    state.selected = cell;
    render();
    updatePanels();
    updateEditorTools();
    return;
  }

  if (hexDistance(start, cell) !== 1) {
    state.editor.edgeStart = cell;
    state.selected = cell;
    state.editor.notice = loc.notNeighbor;
    render();
    updatePanels();
    updateEditorTools();
    return;
  }

  toggleEdgeSegment(state.editor.tool, start, cell);
  state.editor.edgeStart = cell;
  state.selected = cell;
  commitMapEdit(`${state.editor.tool}Changed`);
}

function toggleEdgeSegment(tool, a, b) {
  const set = edgeSetForTool(tool);
  if (!set) return;
  const key = edgeKey(a, b);
  if (set.has(key)) set.delete(key);
  else set.add(key);
}

function edgeSetForTool(tool) {
  if (tool === "road") return state.map.roadEdges;
  if (tool === "rail") return state.map.railEdges;
  if (tool === "river") return state.map.riverEdges;
  return null;
}

function onCanvasWheel(event) {
  if (!state.map) return;
  event.preventDefault();
  const point = canvasPointFromEvent(event);
  const oldScale = state.view.scale;
  const nextScale = clamp(oldScale * Math.exp(-event.deltaY * 0.0012), 0.35, 5.5);
  const baseX = (point.x - state.view.offsetX) / oldScale;
  const baseY = (point.y - state.view.offsetY) / oldScale;
  state.view.scale = nextScale;
  state.view.offsetX = point.x - baseX * nextScale;
  state.view.offsetY = point.y - baseY * nextScale;
  queueRender();
}

function onCanvasPointerDown(event) {
  if (event.button !== 2) return;
  event.preventDefault();
  const point = canvasPointFromEvent(event);
  state.view.isPanning = true;
  state.view.lastX = point.x;
  state.view.lastY = point.y;
  state.view.moved = false;
  els.canvas.classList.add("is-panning");
  els.canvas.setPointerCapture(event.pointerId);
}

function onCanvasPointerMove(event) {
  if (!state.view.isPanning) return;
  event.preventDefault();
  const point = canvasPointFromEvent(event);
  const dx = point.x - state.view.lastX;
  const dy = point.y - state.view.lastY;
  if (Math.abs(dx) + Math.abs(dy) > 0) {
    state.view.offsetX += dx;
    state.view.offsetY += dy;
    state.view.lastX = point.x;
    state.view.lastY = point.y;
    state.view.moved = true;
    queueRender();
  }
}

function onCanvasPointerUp(event) {
  if (!state.view.isPanning) return;
  const dragged = state.view.moved;
  state.view.isPanning = false;
  state.view.moved = false;
  els.canvas.classList.remove("is-panning");
  if (els.canvas.hasPointerCapture(event.pointerId)) {
    els.canvas.releasePointerCapture(event.pointerId);
  }
  if (dragged) {
    state.view.suppressClick = true;
    window.setTimeout(() => {
      state.view.suppressClick = false;
    }, 0);
  }
}

function canvasPointFromEvent(event) {
  const rect = els.canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * state.dpr,
    y: (event.clientY - rect.top) * state.dpr
  };
}

function offsetToPixel(q, r, size) {
  return {
    x: size * 1.5 * q,
    y: size * Math.sqrt(3) * (r + 0.5 * (q & 1))
  };
}

function centerOf(cell) {
  return {
    x: cell.rawX * state.layout.size + state.layout.offsetX,
    y: cell.rawY * state.layout.size + state.layout.offsetY
  };
}

function hexPoints(cell) {
  const center = centerOf(cell);
  const size = state.layout.size;
  const points = [];
  for (let i = 0; i < 6; i += 1) {
    const angle = (Math.PI / 180) * (60 * i);
    points.push({
      x: center.x + size * Math.cos(angle),
      y: center.y + size * Math.sin(angle)
    });
  }
  return points;
}

function pathFromPoints(points) {
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.closePath();
}

function pathRoundRect(x, y, width, height, radius) {
  const r = Math.min(Math.abs(radius), Math.abs(width) / 2, Math.abs(height) / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function pointInPoly(point, points) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i, i += 1) {
    const xi = points[i].x;
    const yi = points[i].y;
    const xj = points[j].x;
    const yj = points[j].y;
    const intersect = ((yi > point.y) !== (yj > point.y))
      && (point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

function coordKey(q, r) {
  return `${q},${r}`;
}

function edgeKey(a, b) {
  return [a.key, b.key].sort().join("|");
}

function edgeCells(map, key) {
  return key.split("|").map((part) => map.byKey.get(part));
}

function getCell(map, q, r) {
  return map.byKey.get(coordKey(q, r)) || null;
}

function neighbor(map, cell, dirIndex) {
  const dir = DIRS[dirIndex];
  const cube = offsetToCube(cell.q, cell.r);
  const next = cubeToOffset({
    x: cube.x + dir.cube.x,
    y: cube.y + dir.cube.y,
    z: cube.z + dir.cube.z
  });
  return getCell(map, next.q, next.r);
}

function neighbors(map, cell) {
  return DIRS.map((_, index) => neighbor(map, cell, index)).filter(Boolean);
}

function hexDistance(a, b) {
  const ac = offsetToCube(a.q, a.r);
  const bc = offsetToCube(b.q, b.r);
  return (Math.abs(ac.x - bc.x) + Math.abs(ac.y - bc.y) + Math.abs(ac.z - bc.z)) / 2;
}

function hexLine(map, a, b) {
  const distance = hexDistance(a, b);
  const results = [];
  const ac = offsetToCube(a.q, a.r);
  const bc = offsetToCube(b.q, b.r);
  for (let i = 0; i <= distance; i += 1) {
    const t = distance === 0 ? 0 : i / distance;
    const rounded = cubeRound({
      x: lerp(ac.x, bc.x, t),
      y: lerp(ac.y, bc.y, t),
      z: lerp(ac.z, bc.z, t)
    });
    const offset = cubeToOffset(rounded);
    const cell = getCell(map, offset.q, offset.r);
    if (cell && results[results.length - 1] !== cell) {
      results.push(cell);
    }
  }
  return results;
}

function offsetToCube(q, r) {
  const x = q;
  const z = r - Math.floor(q / 2);
  const y = -x - z;
  return { x, y, z };
}

function cubeToOffset(cube) {
  return {
    q: cube.x,
    r: cube.z + Math.floor(cube.x / 2)
  };
}

function cubeRound(cube) {
  let rx = Math.round(cube.x);
  let ry = Math.round(cube.y);
  let rz = Math.round(cube.z);
  const xDiff = Math.abs(rx - cube.x);
  const yDiff = Math.abs(ry - cube.y);
  const zDiff = Math.abs(rz - cube.z);
  if (xDiff > yDiff && xDiff > zDiff) rx = -ry - rz;
  else if (yDiff > zDiff) ry = -rx - rz;
  else rz = -rx - ry;
  return { x: rx, y: ry, z: rz };
}

function projection(cell, dirIndex) {
  const dir = DIRS[dirIndex];
  const cube = offsetToCube(cell.q, cell.r);
  return cube.x * dir.cube.x + cube.y * dir.cube.y + cube.z * dir.cube.z;
}

function isMapEdge(map, cell) {
  return cell.q === 0 || cell.r === 0 || cell.q === map.width - 1 || cell.r === map.height - 1;
}

function roll2d6(rng) {
  const dice = [die(rng, 6), die(rng, 6)];
  return { dice, total: dice[0] + dice[1] };
}

function die(rng, sides) {
  return 1 + Math.floor(rng() * sides);
}

function choice(items, rng) {
  return items[Math.floor(rng() * items.length)];
}

function shuffleInPlace(items, rng) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

function weightedChoice(items, rng) {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  let roll = rng() * total;
  for (const item of items) {
    roll -= item.weight;
    if (roll <= 0) return item;
  }
  return items[items.length - 1];
}

function createRng(seed) {
  return mulberry32(xmur3(seed)());
}

function cellRng(cell, salt) {
  const seed = `${state.map.seed}:${cell.q}:${cell.r}:${salt}`;
  return createRng(seed);
}

function xmur3(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i += 1) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function hash() {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

function mulberry32(seed) {
  return function random() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function freshSeed() {
  return `DLDS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

function safeFilePart(value) {
  return value.replace(/[^a-z0-9а-яё_-]+/gi, "-").slice(0, 48) || "map";
}

function cellLabel(q, r) {
  return `${letters(q)}-${r + 1}`;
}

function letters(index) {
  let value = index + 1;
  let label = "";
  while (value > 0) {
    value -= 1;
    label = String.fromCharCode(65 + (value % 26)) + label;
    value = Math.floor(value / 26);
  }
  return label;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
