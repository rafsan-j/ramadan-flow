import { c as create_ssr_component, a as subscribe, e as escape, b as add_attribute } from "./ssr.js";
import { s as settings } from "./appStore.js";
import { d as db } from "./db.js";
const duaLibrary = {
  // Suhoor & Fasting Intention
  suhoor_intention: {
    id: "suhoor_intention",
    category: "fasting",
    timing: "suhoor",
    title: { en: "Intention for Fasting", bn: "রোজার নিয়ত" },
    arabic: "وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ",
    transliteration: "Wa bisawmi ghadin nawaiytu min shahri Ramadan",
    translation: {
      en: "I intend to keep the fast for tomorrow in the month of Ramadan",
      bn: "আমি আগামীকাল রমজান মাসের রোজা রাখার নিয়ত করছি"
    },
    audioUrl: null
  },
  // Iftar Duas
  iftar_dua: {
    id: "iftar_dua",
    category: "fasting",
    timing: "iftar",
    title: { en: "Dua for Breaking Fast", bn: "ইফতারের দোয়া" },
    arabic: "اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَيْكَ تَوَكَّلْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ",
    transliteration: "Allahumma inni laka sumtu wa bika amantu wa 'alayka tawakkaltu wa 'ala rizqika aftartu",
    translation: {
      en: "O Allah, I fasted for You and I believe in You and I put my trust in You and I break my fast with Your sustenance",
      bn: "হে আল্লাহ, আমি তোমার জন্য রোজা রেখেছি এবং তোমার প্রতি বিশ্বাস রাখি এবং তোমার উপর ভরসা করি এবং তোমার রিজিক দিয়ে ইফতার করছি"
    },
    audioUrl: null
  },
  // Morning Protection
  morning_protection: {
    id: "morning_protection",
    category: "protection",
    timing: "morning",
    title: { en: "Morning Protection", bn: "সকালের সুরক্ষা" },
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",
    transliteration: "Asbahna wa asbahal mulku lillah",
    translation: {
      en: "We have entered morning and the dominion belongs to Allah",
      bn: "আমরা সকালে প্রবেশ করেছি এবং সমস্ত কর্তৃত্ব আল্লাহর"
    },
    audioUrl: null
  },
  // Patience During Fast
  patience_dua: {
    id: "patience_dua",
    category: "patience",
    timing: "afternoon",
    title: { en: "Dua for Patience", bn: "ধৈর্যের দোয়া" },
    arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا",
    transliteration: "Rabbana afrigh 'alayna sabra",
    translation: {
      en: "Our Lord, pour upon us patience",
      bn: "হে আমাদের রব, আমাদের উপর ধৈর্য ঢেলে দাও"
    },
    audioUrl: null
  },
  // Gratitude at Iftar
  gratitude_iftar: {
    id: "gratitude_iftar",
    category: "gratitude",
    timing: "iftar",
    title: { en: "Gratitude After Iftar", bn: "ইফতারের পর কৃতজ্ঞতা" },
    arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ",
    transliteration: "Dhahaba al-zama wa abtalat al-'uruq wa thabata al-ajr in sha Allah",
    translation: {
      en: "The thirst has gone, the veins are moistened and the reward is confirmed, if Allah wills",
      bn: "তৃষ্ণা চলে গেছে, শিরাগুলো সিক্ত হয়েছে এবং পুরস্কার নিশ্চিত, ইনশাআল্লাহ"
    },
    audioUrl: null
  },
  // Laylatul Qadr
  laylatul_qadr: {
    id: "laylatul_qadr",
    category: "special",
    timing: "last_ten",
    title: { en: "Dua for Laylatul Qadr", bn: "লাইলাতুল কদরের দোয়া" },
    arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    transliteration: "Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'anni",
    translation: {
      en: "O Allah, You are Forgiving and love forgiveness, so forgive me",
      bn: "হে আল্লাহ, তুমি ক্ষমাশীল এবং ক্ষমা ভালোবাস, তাই আমাকে ক্ষমা করো"
    },
    audioUrl: null
  },
  // Repentance
  repentance: {
    id: "repentance",
    category: "repentance",
    timing: "anytime",
    title: { en: "Seeking Forgiveness", bn: "ক্ষমা প্রার্থনা" },
    arabic: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
    transliteration: "Astaghfirullah wa atubu ilayh",
    translation: {
      en: "I seek forgiveness from Allah and repent to Him",
      bn: "আমি আল্লাহর কাছে ক্ষমা চাই এবং তাঁর কাছে তওবা করি"
    },
    audioUrl: null
  },
  // Taraweeh
  taraweeh_dua: {
    id: "taraweeh_dua",
    category: "prayer",
    timing: "night",
    title: { en: "Before Taraweeh", bn: "তারাবীর আগে" },
    arabic: "سُبْحَانَ ذِي الْمُلْكِ وَالْمَلَكُوتِ",
    transliteration: "Subhana dhil mulki wal malakut",
    translation: {
      en: "Glory be to the Owner of the Kingdom and Dominion",
      bn: "মহিমা তাঁর যিনি রাজত্ব ও কর্তৃত্বের মালিক"
    },
    audioUrl: null
  }
};
function getDuaForContext(focusState, isLastTen) {
  if (isLastTen) return duaLibrary.laylatul_qadr;
  switch (focusState) {
    case "dawn":
      return duaLibrary.suhoor_intention;
    case "preservation":
      return duaLibrary.patience_dua;
    case "rejuvenation":
      return duaLibrary.iftar_dua;
    default:
      return duaLibrary.morning_protection;
  }
}
const css = {
  code: ".dua-card.svelte-l2bwii{background:var(--color-bg-card);border-radius:var(--radius-lg);padding:var(--space-lg);box-shadow:var(--shadow-md);border:1px solid var(--color-border)}.dua-card.compact.svelte-l2bwii{padding:var(--space-md)}.dua-header.svelte-l2bwii{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--space-md)}.dua-title.svelte-l2bwii{font-size:1.125rem;font-weight:600;color:var(--color-text-primary);margin:0}.favorite-btn.svelte-l2bwii{background:none;border:none;color:var(--color-mercy);cursor:pointer;padding:0.25rem;transition:transform var(--transition-fast)}.favorite-btn.svelte-l2bwii:hover{transform:scale(1.1)}.dua-arabic.svelte-l2bwii{font-size:1.5rem;line-height:2.5;margin-bottom:var(--space-md);padding:var(--space-md);background:var(--color-surface);border-radius:var(--radius-md);text-align:center}.dua-transliteration.svelte-l2bwii{font-size:0.9rem;color:var(--color-text-secondary);font-style:italic;margin-bottom:var(--space-md);text-align:center}.reveal-btn.svelte-l2bwii{width:100%;padding:var(--space-sm);background:var(--color-surface);border:1px solid var(--color-border);border-radius:var(--radius-sm);color:var(--color-text-secondary);font-size:0.875rem;font-weight:500;cursor:pointer;transition:all var(--transition-fast);margin-bottom:var(--space-sm)}.reveal-btn.svelte-l2bwii:hover{background:var(--color-bg-secondary);color:var(--color-text-primary)}.dua-translation.svelte-l2bwii{padding:var(--space-md);background:linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);border-radius:var(--radius-md);color:var(--color-text-primary);line-height:1.8;font-size:0.95rem}",
  map: `{"version":3,"file":"DuaCard.svelte","sources":["DuaCard.svelte"],"sourcesContent":["<script>\\n\\timport { settings } from '../stores/appStore.js';\\n\\timport { db } from '../utils/db.js';\\n\\t\\n\\texport let dua;\\n\\texport let compact = false;\\n\\t\\n\\tlet isFavorite = false;\\n\\tlet showTranslation = false;\\n\\t\\n\\t$: language = $settings?.language || 'en';\\n\\t\\n\\tasync function checkFavorite() {\\n\\t\\tconst favorites = await db.getFavorites();\\n\\t\\tisFavorite = favorites.includes(dua.id);\\n\\t}\\n\\t\\n\\tasync function toggleFavorite() {\\n\\t\\tawait db.toggleFavorite(dua.id);\\n\\t\\tawait checkFavorite();\\n\\t}\\n\\t\\n\\tfunction toggleTranslation() {\\n\\t\\tshowTranslation = !showTranslation;\\n\\t}\\n\\t\\n\\tcheckFavorite();\\n<\/script>\\n\\n<div class=\\"dua-card\\" class:compact>\\n\\t<div class=\\"dua-header\\">\\n\\t\\t<h3 class=\\"dua-title\\">{dua.title[language]}</h3>\\n\\t\\t<button class=\\"favorite-btn\\" on:click={toggleFavorite} aria-label=\\"Favorite\\">\\n\\t\\t\\t<svg width=\\"20\\" height=\\"20\\" viewBox=\\"0 0 20 20\\" fill={isFavorite ? 'currentColor' : 'none'}>\\n\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\td=\\"M10 3.5C10 3.5 6 1 3 4C0 7 2 11 10 16.5C18 11 20 7 17 4C14 1 10 3.5 10 3.5Z\\"\\n\\t\\t\\t\\t\\tstroke=\\"currentColor\\"\\n\\t\\t\\t\\t\\tstroke-width=\\"1.5\\"\\n\\t\\t\\t\\t\\tstroke-linejoin=\\"round\\"\\n\\t\\t\\t\\t/>\\n\\t\\t\\t</svg>\\n\\t\\t</button>\\n\\t</div>\\n\\t\\n\\t<div class=\\"dua-arabic arabic\\">\\n\\t\\t{dua.arabic}\\n\\t</div>\\n\\t\\n\\t{#if !compact}\\n\\t\\t<div class=\\"dua-transliteration\\">\\n\\t\\t\\t{dua.transliteration}\\n\\t\\t</div>\\n\\t{/if}\\n\\t\\n\\t<button class=\\"reveal-btn\\" on:click={toggleTranslation}>\\n\\t\\t{showTranslation ? '▲ Hide Translation' : '▼ Reveal Translation'}\\n\\t</button>\\n\\t\\n\\t{#if showTranslation}\\n\\t\\t<div class=\\"dua-translation animate-slide-up\\" class:bengali={language === 'bn'}>\\n\\t\\t\\t{dua.translation[language]}\\n\\t\\t</div>\\n\\t{/if}\\n</div>\\n\\n<style>\\n\\t.dua-card {\\n\\t\\tbackground: var(--color-bg-card);\\n\\t\\tborder-radius: var(--radius-lg);\\n\\t\\tpadding: var(--space-lg);\\n\\t\\tbox-shadow: var(--shadow-md);\\n\\t\\tborder: 1px solid var(--color-border);\\n\\t}\\n\\t\\n\\t.dua-card.compact {\\n\\t\\tpadding: var(--space-md);\\n\\t}\\n\\t\\n\\t.dua-header {\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: space-between;\\n\\t\\talign-items: flex-start;\\n\\t\\tmargin-bottom: var(--space-md);\\n\\t}\\n\\t\\n\\t.dua-title {\\n\\t\\tfont-size: 1.125rem;\\n\\t\\tfont-weight: 600;\\n\\t\\tcolor: var(--color-text-primary);\\n\\t\\tmargin: 0;\\n\\t}\\n\\t\\n\\t.favorite-btn {\\n\\t\\tbackground: none;\\n\\t\\tborder: none;\\n\\t\\tcolor: var(--color-mercy);\\n\\t\\tcursor: pointer;\\n\\t\\tpadding: 0.25rem;\\n\\t\\ttransition: transform var(--transition-fast);\\n\\t}\\n\\t\\n\\t.favorite-btn:hover {\\n\\t\\ttransform: scale(1.1);\\n\\t}\\n\\t\\n\\t.dua-arabic {\\n\\t\\tfont-size: 1.5rem;\\n\\t\\tline-height: 2.5;\\n\\t\\tmargin-bottom: var(--space-md);\\n\\t\\tpadding: var(--space-md);\\n\\t\\tbackground: var(--color-surface);\\n\\t\\tborder-radius: var(--radius-md);\\n\\t\\ttext-align: center;\\n\\t}\\n\\t\\n\\t.dua-transliteration {\\n\\t\\tfont-size: 0.9rem;\\n\\t\\tcolor: var(--color-text-secondary);\\n\\t\\tfont-style: italic;\\n\\t\\tmargin-bottom: var(--space-md);\\n\\t\\ttext-align: center;\\n\\t}\\n\\t\\n\\t.reveal-btn {\\n\\t\\twidth: 100%;\\n\\t\\tpadding: var(--space-sm);\\n\\t\\tbackground: var(--color-surface);\\n\\t\\tborder: 1px solid var(--color-border);\\n\\t\\tborder-radius: var(--radius-sm);\\n\\t\\tcolor: var(--color-text-secondary);\\n\\t\\tfont-size: 0.875rem;\\n\\t\\tfont-weight: 500;\\n\\t\\tcursor: pointer;\\n\\t\\ttransition: all var(--transition-fast);\\n\\t\\tmargin-bottom: var(--space-sm);\\n\\t}\\n\\t\\n\\t.reveal-btn:hover {\\n\\t\\tbackground: var(--color-bg-secondary);\\n\\t\\tcolor: var(--color-text-primary);\\n\\t}\\n\\t\\n\\t.dua-translation {\\n\\t\\tpadding: var(--space-md);\\n\\t\\tbackground: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);\\n\\t\\tborder-radius: var(--radius-md);\\n\\t\\tcolor: var(--color-text-primary);\\n\\t\\tline-height: 1.8;\\n\\t\\tfont-size: 0.95rem;\\n\\t}\\n</style>"],"names":[],"mappings":"AAkEC,uBAAU,CACT,UAAU,CAAE,IAAI,eAAe,CAAC,CAChC,aAAa,CAAE,IAAI,WAAW,CAAC,CAC/B,OAAO,CAAE,IAAI,UAAU,CAAC,CACxB,UAAU,CAAE,IAAI,WAAW,CAAC,CAC5B,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,cAAc,CACrC,CAEA,SAAS,sBAAS,CACjB,OAAO,CAAE,IAAI,UAAU,CACxB,CAEA,yBAAY,CACX,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,UAAU,CACvB,aAAa,CAAE,IAAI,UAAU,CAC9B,CAEA,wBAAW,CACV,SAAS,CAAE,QAAQ,CACnB,WAAW,CAAE,GAAG,CAChB,KAAK,CAAE,IAAI,oBAAoB,CAAC,CAChC,MAAM,CAAE,CACT,CAEA,2BAAc,CACb,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,aAAa,CAAC,CACzB,MAAM,CAAE,OAAO,CACf,OAAO,CAAE,OAAO,CAChB,UAAU,CAAE,SAAS,CAAC,IAAI,iBAAiB,CAC5C,CAEA,2BAAa,MAAO,CACnB,SAAS,CAAE,MAAM,GAAG,CACrB,CAEA,yBAAY,CACX,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,GAAG,CAChB,aAAa,CAAE,IAAI,UAAU,CAAC,CAC9B,OAAO,CAAE,IAAI,UAAU,CAAC,CACxB,UAAU,CAAE,IAAI,eAAe,CAAC,CAChC,aAAa,CAAE,IAAI,WAAW,CAAC,CAC/B,UAAU,CAAE,MACb,CAEA,kCAAqB,CACpB,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,IAAI,sBAAsB,CAAC,CAClC,UAAU,CAAE,MAAM,CAClB,aAAa,CAAE,IAAI,UAAU,CAAC,CAC9B,UAAU,CAAE,MACb,CAEA,yBAAY,CACX,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,UAAU,CAAC,CACxB,UAAU,CAAE,IAAI,eAAe,CAAC,CAChC,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,cAAc,CAAC,CACrC,aAAa,CAAE,IAAI,WAAW,CAAC,CAC/B,KAAK,CAAE,IAAI,sBAAsB,CAAC,CAClC,SAAS,CAAE,QAAQ,CACnB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,OAAO,CACf,UAAU,CAAE,GAAG,CAAC,IAAI,iBAAiB,CAAC,CACtC,aAAa,CAAE,IAAI,UAAU,CAC9B,CAEA,yBAAW,MAAO,CACjB,UAAU,CAAE,IAAI,oBAAoB,CAAC,CACrC,KAAK,CAAE,IAAI,oBAAoB,CAChC,CAEA,8BAAiB,CAChB,OAAO,CAAE,IAAI,UAAU,CAAC,CACxB,UAAU,CAAE,gBAAgB,MAAM,CAAC,CAAC,OAAO,CAAC,EAAE,CAAC,CAAC,OAAO,CAAC,IAAI,CAAC,CAC7D,aAAa,CAAE,IAAI,WAAW,CAAC,CAC/B,KAAK,CAAE,IAAI,oBAAoB,CAAC,CAChC,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,OACZ"}`
};
const DuaCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let language;
  let $settings, $$unsubscribe_settings;
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  let { dua } = $$props;
  let { compact = false } = $$props;
  let isFavorite = false;
  async function checkFavorite() {
    const favorites = await db.getFavorites();
    isFavorite = favorites.includes(dua.id);
  }
  checkFavorite();
  if ($$props.dua === void 0 && $$bindings.dua && dua !== void 0) $$bindings.dua(dua);
  if ($$props.compact === void 0 && $$bindings.compact && compact !== void 0) $$bindings.compact(compact);
  $$result.css.add(css);
  language = $settings?.language || "en";
  $$unsubscribe_settings();
  return `<div class="${["dua-card svelte-l2bwii", compact ? "compact" : ""].join(" ").trim()}"><div class="dua-header svelte-l2bwii"><h3 class="dua-title svelte-l2bwii">${escape(dua.title[language])}</h3> <button class="favorite-btn svelte-l2bwii" aria-label="Favorite"><svg width="20" height="20" viewBox="0 0 20 20"${add_attribute("fill", isFavorite ? "currentColor" : "none", 0)}><path d="M10 3.5C10 3.5 6 1 3 4C0 7 2 11 10 16.5C18 11 20 7 17 4C14 1 10 3.5 10 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"></path></svg></button></div> <div class="dua-arabic arabic svelte-l2bwii">${escape(dua.arabic)}</div> ${!compact ? `<div class="dua-transliteration svelte-l2bwii">${escape(dua.transliteration)}</div>` : ``} <button class="reveal-btn svelte-l2bwii">${escape("▼ Reveal Translation")}</button> ${``} </div>`;
});
export {
  DuaCard as D,
  duaLibrary as d,
  getDuaForContext as g
};
