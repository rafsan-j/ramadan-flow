import localforage from 'localforage';

// Configure localforage for offline-first storage
const storage = localforage.createInstance({
	name: 'RamadanFlow',
	version: 1.0,
	storeName: 'ramadan_data',
	description: 'Offline storage for Ramadan Flow spiritual tracking'
});

export const db = {
	// User Settings
	async getSettings() {
		return await storage.getItem('settings') || {
			language: 'en',
			location: { city: 'Dhaka', lat: 23.8103, lng: 90.4125 },
			calculationMethod: 'Karachi',
			track: 'consistent',
			quranGoal: 5,
			quranTime: 'after_fajr',
			mercyNudges: true,
			simpleMode: false,
			ramadanStartDate: null
		};
	},

	async saveSettings(settings) {
		await storage.setItem('settings', settings);
	},

	// Daily Logs
	async getDayLog(date) {
		const key = `day_${date}`;
		return await storage.getItem(key) || {
			date,
			prayers: {
				fajr: false,
				dhuhr: false,
				asr: false,
				maghrib: false,
				isha: false,
				taraweeh: false
			},
			quranPages: 0,
			duas: [],
			sadaqah: [],
			dhikr: 0,
			notes: '',
			lastUpdated: null
		};
	},

	async saveDayLog(date, log) {
		const key = `day_${date}`;
		log.lastUpdated = new Date().toISOString();
		await storage.setItem(key, log);
	},

	// Get all logs for the month
	async getAllLogs() {
		const keys = await storage.keys();
		const dayKeys = keys.filter(k => k.startsWith('day_'));
		const logs = [];
		
		for (const key of dayKeys) {
			const log = await storage.getItem(key);
			if (log) logs.push(log);
		}
		
		return logs.sort((a, b) => a.date.localeCompare(b.date));
	},

	// Sadaqah Ledger
	async addSadaqah(date, entry) {
		const log = await this.getDayLog(date);
		log.sadaqah.push({
			...entry,
			id: Date.now(),
			timestamp: new Date().toISOString()
		});
		await this.saveDayLog(date, log);
	},

	async getSadaqahTotal() {
		const logs = await this.getAllLogs();
		let total = 0;
		let count = 0;
		
		logs.forEach(log => {
			log.sadaqah.forEach(s => {
				if (s.amount && !s.hidden) {
					total += s.amount;
					count++;
				}
			});
		});
		
		return { total, count };
	},

	// Favorited Duas
	async getFavorites() {
		return await storage.getItem('favorites') || [];
	},

	async toggleFavorite(duaId) {
		const favorites = await this.getFavorites();
		const index = favorites.indexOf(duaId);
		
		if (index > -1) {
			favorites.splice(index, 1);
		} else {
			favorites.push(duaId);
		}
		
		await storage.setItem('favorites', favorites);
	},

	// Onboarding
	async isOnboarded() {
		return await storage.getItem('onboarded') || false;
	},

	async setOnboarded() {
		await storage.setItem('onboarded', true);
	},

	// Mercy Streak
	async getMercyStreak() {
		return await storage.getItem('mercy_streak') || {
			current: 0,
			longest: 0,
			mercyUsed: 0,
			lastActive: null
		};
	},

	async updateMercyStreak(streak) {
		await storage.setItem('mercy_streak', streak);
	},

	// Clear all data (for testing)
	async clearAll() {
		await storage.clear();
	}
};

export default db;