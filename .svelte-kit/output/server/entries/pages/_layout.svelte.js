import { c as create_ssr_component, a as subscribe } from "../../chunks/ssr.js";
import { f as focusState } from "../../chunks/appStore.js";
import "../../chunks/db.js";
const css = {
  code: ".loading-screen.svelte-14l38sc.svelte-14l38sc{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;background:var(--color-bg-primary)}.loading-spinner.svelte-14l38sc.svelte-14l38sc{width:48px;height:48px;border:4px solid var(--color-border);border-top-color:var(--color-progress-75);border-radius:50%;animation:svelte-14l38sc-spin 1s linear infinite}@keyframes svelte-14l38sc-spin{to{transform:rotate(360deg)}}.loading-screen.svelte-14l38sc p.svelte-14l38sc{margin-top:var(--space-lg);color:var(--color-text-secondary);font-weight:500}",
  map: `{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script>\\n\\timport '../app.css';\\n\\timport { onMount } from 'svelte';\\n\\timport { initializeApp, focusState } from '../lib/stores/appStore.js';\\n\\timport { db } from '../lib/utils/db.js';\\n\\t\\n\\tlet isOnboarded = false;\\n\\tlet isLoading = true;\\n\\t\\n\\tonMount(async () => {\\n\\t\\tisOnboarded = await db.isOnboarded();\\n\\t\\t\\n\\t\\tif (isOnboarded) {\\n\\t\\t\\tawait initializeApp();\\n\\t\\t}\\n\\t\\t\\n\\t\\tisLoading = false;\\n\\t});\\n\\t\\n\\t$: if (typeof document !== 'undefined') {\\n\\t\\tdocument.body.setAttribute('data-focus-state', $focusState);\\n\\t}\\n<\/script>\\n\\n<svelte:head>\\n\\t<title>Ramadan Flow - Your Spiritual Companion</title>\\n</svelte:head>\\n\\n{#if isLoading}\\n\\t<div class=\\"loading-screen\\">\\n\\t\\t<div class=\\"loading-spinner\\"></div>\\n\\t\\t<p>Loading...</p>\\n\\t</div>\\n{:else}\\n\\t<slot />\\n{/if}\\n\\n<style>\\n\\t.loading-screen {\\n\\t\\tdisplay: flex;\\n\\t\\tflex-direction: column;\\n\\t\\talign-items: center;\\n\\t\\tjustify-content: center;\\n\\t\\tmin-height: 100vh;\\n\\t\\tbackground: var(--color-bg-primary);\\n\\t}\\n\\t\\n\\t.loading-spinner {\\n\\t\\twidth: 48px;\\n\\t\\theight: 48px;\\n\\t\\tborder: 4px solid var(--color-border);\\n\\t\\tborder-top-color: var(--color-progress-75);\\n\\t\\tborder-radius: 50%;\\n\\t\\tanimation: spin 1s linear infinite;\\n\\t}\\n\\t\\n\\t@keyframes spin {\\n\\t\\tto { transform: rotate(360deg); }\\n\\t}\\n\\t\\n\\t.loading-screen p {\\n\\t\\tmargin-top: var(--space-lg);\\n\\t\\tcolor: var(--color-text-secondary);\\n\\t\\tfont-weight: 500;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsCC,6CAAgB,CACf,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,MAAM,CACvB,UAAU,CAAE,KAAK,CACjB,UAAU,CAAE,IAAI,kBAAkB,CACnC,CAEA,8CAAiB,CAChB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,cAAc,CAAC,CACrC,gBAAgB,CAAE,IAAI,mBAAmB,CAAC,CAC1C,aAAa,CAAE,GAAG,CAClB,SAAS,CAAE,mBAAI,CAAC,EAAE,CAAC,MAAM,CAAC,QAC3B,CAEA,WAAW,mBAAK,CACf,EAAG,CAAE,SAAS,CAAE,OAAO,MAAM,CAAG,CACjC,CAEA,8BAAe,CAAC,gBAAE,CACjB,UAAU,CAAE,IAAI,UAAU,CAAC,CAC3B,KAAK,CAAE,IAAI,sBAAsB,CAAC,CAClC,WAAW,CAAE,GACd"}`
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $focusState, $$unsubscribe_focusState;
  $$unsubscribe_focusState = subscribe(focusState, (value) => $focusState = value);
  $$result.css.add(css);
  {
    if (typeof document !== "undefined") {
      document.body.setAttribute("data-focus-state", $focusState);
    }
  }
  $$unsubscribe_focusState();
  return `${$$result.head += `<!-- HEAD_svelte-arx5h9_START -->${$$result.title = `<title>Ramadan Flow - Your Spiritual Companion</title>`, ""}<!-- HEAD_svelte-arx5h9_END -->`, ""} ${`<div class="loading-screen svelte-14l38sc" data-svelte-h="svelte-jdwsww"><div class="loading-spinner svelte-14l38sc"></div> <p class="svelte-14l38sc">Loading...</p></div>`}`;
});
export {
  Layout as default
};
