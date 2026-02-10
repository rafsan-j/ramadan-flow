import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';

export function getPrayerTimes(date, lat, lng, calculationMethod = 'Karachi') {
	const coordinates = new Coordinates(lat, lng);
	const params = CalculationMethod[calculationMethod]();
	const prayers = new PrayerTimes(coordinates, date, params);

	return {
		fajr: prayers.fajr,
		sunrise: prayers.sunrise,
		dhuhr: prayers.dhuhr,
		asr: prayers.asr,
		maghrib: prayers.maghrib,
		isha: prayers.isha
	};
}

export function getNextPrayer(prayerTimes) {
	const now = new Date();
	const prayers = [
		{ name: 'fajr', time: prayerTimes.fajr },
		{ name: 'dhuhr', time: prayerTimes.dhuhr },
		{ name: 'asr', time: prayerTimes.asr },
		{ name: 'maghrib', time: prayerTimes.maghrib },
		{ name: 'isha', time: prayerTimes.isha }
	];

	for (const prayer of prayers) {
		if (prayer.time > now) {
			return prayer;
		}
	}

	// If all prayers have passed, return tomorrow's Fajr
	const tomorrow = new Date(now);
	tomorrow.setDate(tomorrow.getDate() + 1);
	return { name: 'fajr', time: tomorrow };
}

export function getCurrentPrayer(prayerTimes) {
	const now = new Date();
	const prayers = [
		{ name: 'fajr', time: prayerTimes.fajr },
		{ name: 'dhuhr', time: prayerTimes.dhuhr },
		{ name: 'asr', time: prayerTimes.asr },
		{ name: 'maghrib', time: prayerTimes.maghrib },
		{ name: 'isha', time: prayerTimes.isha }
	];

	let current = null;
	for (let i = 0; i < prayers.length; i++) {
		if (now >= prayers[i].time) {
			current = prayers[i];
		} else {
			break;
		}
	}

	return current;
}

export function getFocusState(prayerTimes) {
	const now = new Date();
	const hour = now.getHours();

	// Dawn State: Pre-dawn to 8 AM
	if (hour < 8 || now < prayerTimes.fajr) {
		return 'dawn';
	}

	// Rejuvenation State: 1 hour before Maghrib until midnight
	const oneHourBeforeMaghrib = new Date(prayerTimes.maghrib);
	oneHourBeforeMaghrib.setHours(oneHourBeforeMaghrib.getHours() - 1);

	if (now >= oneHourBeforeMaghrib) {
		return 'rejuvenation';
	}

	// Preservation State: Rest of the day
	return 'preservation';
}

export function getTimeUntil(targetTime) {
	const now = new Date();
	const diff = targetTime - now;

	if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };

	const hours = Math.floor(diff / (1000 * 60 * 60));
	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((diff % (1000 * 60)) / 1000);

	return { hours, minutes, seconds };
}

export function formatPrayerTime(time) {
	return time.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true
	});
}

export function isLastTenNights(ramadanDay) {
	return ramadanDay >= 21;
}

export function getRamadanDay(startDate) {
	if (!startDate) return 0;
	
	const start = new Date(startDate);
	const now = new Date();
	const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
	
	return Math.max(0, Math.min(30, diff + 1));
}