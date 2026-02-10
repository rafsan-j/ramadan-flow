export const duaLibrary = {
	// Suhoor & Fasting Intention
	suhoor_intention: {
		id: 'suhoor_intention',
		category: 'fasting',
		timing: 'suhoor',
		title: { en: 'Intention for Fasting', bn: 'রোজার নিয়ত' },
		arabic: 'وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ',
		transliteration: 'Wa bisawmi ghadin nawaiytu min shahri Ramadan',
		translation: {
			en: 'I intend to keep the fast for tomorrow in the month of Ramadan',
			bn: 'আমি আগামীকাল রমজান মাসের রোজা রাখার নিয়ত করছি'
		},
		audioUrl: null
	},

	// Iftar Duas
	iftar_dua: {
		id: 'iftar_dua',
		category: 'fasting',
		timing: 'iftar',
		title: { en: 'Dua for Breaking Fast', bn: 'ইফতারের দোয়া' },
		arabic: 'اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَيْكَ تَوَكَّلْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ',
		transliteration: 'Allahumma inni laka sumtu wa bika amantu wa \'alayka tawakkaltu wa \'ala rizqika aftartu',
		translation: {
			en: 'O Allah, I fasted for You and I believe in You and I put my trust in You and I break my fast with Your sustenance',
			bn: 'হে আল্লাহ, আমি তোমার জন্য রোজা রেখেছি এবং তোমার প্রতি বিশ্বাস রাখি এবং তোমার উপর ভরসা করি এবং তোমার রিজিক দিয়ে ইফতার করছি'
		},
		audioUrl: null
	},

	// Morning Protection
	morning_protection: {
		id: 'morning_protection',
		category: 'protection',
		timing: 'morning',
		title: { en: 'Morning Protection', bn: 'সকালের সুরক্ষা' },
		arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ',
		transliteration: 'Asbahna wa asbahal mulku lillah',
		translation: {
			en: 'We have entered morning and the dominion belongs to Allah',
			bn: 'আমরা সকালে প্রবেশ করেছি এবং সমস্ত কর্তৃত্ব আল্লাহর'
		},
		audioUrl: null
	},

	// Patience During Fast
	patience_dua: {
		id: 'patience_dua',
		category: 'patience',
		timing: 'afternoon',
		title: { en: 'Dua for Patience', bn: 'ধৈর্যের দোয়া' },
		arabic: 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا',
		transliteration: 'Rabbana afrigh \'alayna sabra',
		translation: {
			en: 'Our Lord, pour upon us patience',
			bn: 'হে আমাদের রব, আমাদের উপর ধৈর্য ঢেলে দাও'
		},
		audioUrl: null
	},

	// Gratitude at Iftar
	gratitude_iftar: {
		id: 'gratitude_iftar',
		category: 'gratitude',
		timing: 'iftar',
		title: { en: 'Gratitude After Iftar', bn: 'ইফতারের পর কৃতজ্ঞতা' },
		arabic: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ',
		transliteration: 'Dhahaba al-zama wa abtalat al-\'uruq wa thabata al-ajr in sha Allah',
		translation: {
			en: 'The thirst has gone, the veins are moistened and the reward is confirmed, if Allah wills',
			bn: 'তৃষ্ণা চলে গেছে, শিরাগুলো সিক্ত হয়েছে এবং পুরস্কার নিশ্চিত, ইনশাআল্লাহ'
		},
		audioUrl: null
	},

	// Laylatul Qadr
	laylatul_qadr: {
		id: 'laylatul_qadr',
		category: 'special',
		timing: 'last_ten',
		title: { en: 'Dua for Laylatul Qadr', bn: 'লাইলাতুল কদরের দোয়া' },
		arabic: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
		transliteration: 'Allahumma innaka \'afuwwun tuhibbul \'afwa fa\'fu \'anni',
		translation: {
			en: 'O Allah, You are Forgiving and love forgiveness, so forgive me',
			bn: 'হে আল্লাহ, তুমি ক্ষমাশীল এবং ক্ষমা ভালোবাস, তাই আমাকে ক্ষমা করো'
		},
		audioUrl: null
	},

	// Repentance
	repentance: {
		id: 'repentance',
		category: 'repentance',
		timing: 'anytime',
		title: { en: 'Seeking Forgiveness', bn: 'ক্ষমা প্রার্থনা' },
		arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ',
		transliteration: 'Astaghfirullah wa atubu ilayh',
		translation: {
			en: 'I seek forgiveness from Allah and repent to Him',
			bn: 'আমি আল্লাহর কাছে ক্ষমা চাই এবং তাঁর কাছে তওবা করি'
		},
		audioUrl: null
	},

	// Taraweeh
	taraweeh_dua: {
		id: 'taraweeh_dua',
		category: 'prayer',
		timing: 'night',
		title: { en: 'Before Taraweeh', bn: 'তারাবীর আগে' },
		arabic: 'سُبْحَانَ ذِي الْمُلْكِ وَالْمَلَكُوتِ',
		transliteration: 'Subhana dhil mulki wal malakut',
		translation: {
			en: 'Glory be to the Owner of the Kingdom and Dominion',
			bn: 'মহিমা তাঁর যিনি রাজত্ব ও কর্তৃত্বের মালিক'
		},
		audioUrl: null
	}
};

export const hadithLibrary = [
	{
		id: 'h1',
		category: 'fasting',
		text: {
			en: 'When Ramadan comes, the gates of Paradise are opened.',
			bn: 'রমজান এলে জান্নাতের দরজা খুলে দেওয়া হয়।'
		},
		source: 'Sahih Bukhari 1898'
	},
	{
		id: 'h2',
		category: 'charity',
		text: {
			en: 'Charity does not decrease wealth.',
			bn: 'দান করলে সম্পদ কমে না।'
		},
		source: 'Sahih Muslim 2588'
	},
	{
		id: 'h3',
		category: 'character',
		text: {
			en: 'The best among you are those with the best character.',
			bn: 'তোমাদের মধ্যে সর্বোত্তম তারা যাদের চরিত্র সবচেয়ে ভালো।'
		},
		source: 'Sahih Bukhari 3559'
	},
	{
		id: 'h4',
		category: 'forgiveness',
		text: {
			en: 'Whoever fasts Ramadan with faith, his past sins are forgiven.',
			bn: 'যে ঈমানের সাথে রমজানে রোজা রাখে, তার পূর্বের পাপ ক্ষমা করা হয়।'
		},
		source: 'Sahih Bukhari 38'
	},
	{
		id: 'h5',
		category: 'patience',
		text: {
			en: 'Ramadan is the month of patience, and patience\'s reward is Paradise.',
			bn: 'রমজান ধৈর্যের মাস, এবং ধৈর্যের পুরস্কার হলো জান্নাত।'
		},
		source: 'Musnad Ahmad'
	},
	{
		id: 'h6',
		category: 'quran',
		text: {
			en: 'The Quran will intercede for its companion on the Day of Judgment.',
			bn: 'কুরআন কিয়ামতের দিন তার সঙ্গীর জন্য সুপারিশ করবে।'
		},
		source: 'Sahih Muslim 804'
	},
	{
		id: 'h7',
		category: 'kindness',
		text: {
			en: 'Smiling in your brother\'s face is charity.',
			bn: 'তোমার ভাইয়ের মুখে হাসি দেওয়া সদকা।'
		},
		source: 'Jami\' at-Tirmidhi 1956'
	},
	{
		id: 'h8',
		category: 'dua',
		text: {
			en: 'The dua of a fasting person is not rejected.',
			bn: 'রোজাদারের দোয়া ফিরিয়ে দেওয়া হয় না।'
		},
		source: 'Sunan Ibn Majah 1753'
	}
];

export function getDuaForContext(focusState, isLastTen) {
	if (isLastTen) return duaLibrary.laylatul_qadr;
	
	switch (focusState) {
		case 'dawn':
			return duaLibrary.suhoor_intention;
		case 'preservation':
			return duaLibrary.patience_dua;
		case 'rejuvenation':
			return duaLibrary.iftar_dua;
		default:
			return duaLibrary.morning_protection;
	}
}

export function getRandomHadith() {
	return hadithLibrary[Math.floor(Math.random() * hadithLibrary.length)];
}