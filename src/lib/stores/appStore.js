import { writable, derived, get } from 'svelte/store';
import { db } from '../utils/db.js';
import { getPrayerTimes, getFocusState, getNextPrayer, getRamadanDay } from '../utils/prayerTimes.js';

// Settings store
export const settings = writable(null);

// Current day log
export const currentLog = writable(null);

// Prayer times for today
export const prayerTimes = writable(null);

// Focus state (dawn, preservation, rejuvenation)
export const focusState = writable('preservation');

// Current date tracking
export const currentDate = writable(new Date().toISOString().split('T')[0]);

// Ramadan day (1-30)
export const ramadanDay = derived(settings, ($settings) => {
	if (!$settings || !$settings.ramadanStartDate) return 0;
	return getRamadanDay($settings.ramadanStartDate);
});

// Next prayer
export const nextPrayer = writable(null);

// Initialize stores
export async function initializeApp() {
	// Load settings
	const userSettings = await db.getSettings();
	settings.set(userSettings);

	// Calculate prayer times
	const today = new Date();
	const times = getPrayerTimes(
		today,
		userSettings.location.lat,
		userSettings.location.lng,
		userSettings.calculationMethod
	);
	prayerTimes.set(times);

	// Set focus state
	const state = getFocusState(times);
	focusState.set(state);

	// Set next prayer
	const next = getNextPrayer(times);
	nextPrayer.set(next);

	// Load today's log
	const todayDate = today.toISOString().split('T')[0];
	currentDate.set(todayDate);
	const log = await db.getDayLog(todayDate);
	currentLog.set(log);

	// Update focus state every minute
	setInterval(() => {
		const times = get(prayerTimes);
		if (times) {
			const state = getFocusState(times);
			focusState.set(state);
			
			const next = getNextPrayer(times);
			nextPrayer.set(next);
		}
	}, 60000);
}

// Actions
export async function togglePrayer(prayerName) {
	const log = get(currentLog);
	const date = get(currentDate);
	
	log.prayers[prayerName] = !log.prayers[prayerName];
	await db.saveDayLog(date, log);
	currentLog.set(log);
}

export async function updateQuranPages(pages) {
	const log = get(currentLog);
	const date = get(currentDate);
	
	log.quranPages = Math.max(0, pages);
	await db.saveDayLog(date, log);
	currentLog.set(log);
}

export async function addDhikr(count = 1) {
	const log = get(currentLog);
	const date = get(currentDate);
	
	log.dhikr += count;
	await db.saveDayLog(date, log);
	currentLog.set(log);
}

export async function addSadaqahEntry(entry) {
	const date = get(currentDate);
	await db.addSadaqah(date, entry);
	
	// Reload log
	const log = await db.getDayLog(date);
	currentLog.set(log);
}

export async function updateSettings(newSettings) {
	await db.saveSettings(newSettings);
	settings.set(newSettings);
	
	// Recalculate prayer times
	const today = new Date();
	const times = getPrayerTimes(
		today,
		newSettings.location.lat,
		newSettings.location.lng,
		newSettings.calculationMethod
	);
	prayerTimes.set(times);
}

// Calculate daily progress
export const dailyProgress = derived([currentLog, settings], ([$log, $settings]) => {
	if (!$log || !$settings) return { percentage: 0, items: [] };

	const items = [];
	let completed = 0;
	let total = 0;

	// Prayers (always tracked)
	const prayerCount = Object.values($log.prayers).filter(p => p === true).length;
	const totalPrayers = $settings.track === 'essential' ? 5 : 6; // Include Taraweeh for higher tracks
	items.push({ name: 'Prayers', current: prayerCount, goal: totalPrayers });
	completed += prayerCount;
	total += totalPrayers;

	// Quran
	if ($settings.track !== 'essential') {
		const quranGoal = $settings.quranGoal || 5;
		items.push({ name: 'Quran', current: Math.min($log.quranPages, quranGoal), goal: quranGoal });
		completed += Math.min($log.quranPages, quranGoal);
		total += quranGoal;
	}

	// Sadaqah (for devoted track)
	if ($settings.track === 'devoted') {
		const hasSadaqah = $log.sadaqah.length > 0 ? 1 : 0;
		items.push({ name: 'Sadaqah', current: hasSadaqah, goal: 1 });
		completed += hasSadaqah;
		total += 1;
	}

	const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

	return { percentage, items, completed, total };
});