import { w as writable, d as derived } from "./index.js";
import "./db.js";
import "adhan";
function isLastTenNights(ramadanDay2) {
  return ramadanDay2 >= 21;
}
function getRamadanDay(startDate) {
  if (!startDate) return 0;
  const start = new Date(startDate);
  const now = /* @__PURE__ */ new Date();
  const diff = Math.floor((now - start) / (1e3 * 60 * 60 * 24));
  return Math.max(0, Math.min(30, diff + 1));
}
const settings = writable(null);
const currentLog = writable(null);
const prayerTimes = writable(null);
const focusState = writable("preservation");
writable((/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
const ramadanDay = derived(settings, ($settings) => {
  if (!$settings || !$settings.ramadanStartDate) return 0;
  return getRamadanDay($settings.ramadanStartDate);
});
const nextPrayer = writable(null);
const dailyProgress = derived([currentLog, settings], ([$log, $settings]) => {
  if (!$log || !$settings) return { percentage: 0, items: [] };
  const items = [];
  let completed = 0;
  let total = 0;
  const prayerCount = Object.values($log.prayers).filter((p) => p === true).length;
  const totalPrayers = $settings.track === "essential" ? 5 : 6;
  items.push({ name: "Prayers", current: prayerCount, goal: totalPrayers });
  completed += prayerCount;
  total += totalPrayers;
  if ($settings.track !== "essential") {
    const quranGoal = $settings.quranGoal || 5;
    items.push({ name: "Quran", current: Math.min($log.quranPages, quranGoal), goal: quranGoal });
    completed += Math.min($log.quranPages, quranGoal);
    total += quranGoal;
  }
  if ($settings.track === "devoted") {
    const hasSadaqah = $log.sadaqah.length > 0 ? 1 : 0;
    items.push({ name: "Sadaqah", current: hasSadaqah, goal: 1 });
    completed += hasSadaqah;
    total += 1;
  }
  const percentage = total > 0 ? Math.round(completed / total * 100) : 0;
  return { percentage, items, completed, total };
});
export {
  currentLog as c,
  dailyProgress as d,
  focusState as f,
  isLastTenNights as i,
  nextPrayer as n,
  prayerTimes as p,
  ramadanDay as r,
  settings as s
};
