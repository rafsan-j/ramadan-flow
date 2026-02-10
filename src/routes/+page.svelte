<script>
	import { goto } from '$app/navigation';
	import { db } from '../lib/utils/db.js';
	
	let step = 1;
	let settings = {
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
	
	const cities = [
		{ name: 'Dhaka', lat: 23.8103, lng: 90.4125 },
		{ name: 'Chittagong', lat: 22.3569, lng: 91.7832 },
		{ name: 'Sylhet', lat: 24.8949, lng: 91.8687 },
		{ name: 'Rajshahi', lat: 24.3745, lng: 88.6042 },
		{ name: 'Khulna', lat: 22.8456, lng: 89.5403 }
	];
	
	const tracks = [
		{
			id: 'essential',
			title: { en: 'Essential', bn: 'প্রয়োজনীয়' },
			description: { en: '5 Prayers + 1 Dua/day', bn: '৫ ওয়াক্ত নামাজ + ১ দোয়া/দিন' }
		},
		{
			id: 'consistent',
			title: { en: 'Consistent', bn: 'নিয়মিত' },
			description: { en: 'Essential + 5 pages of Quran', bn: 'প্রয়োজনীয় + ৫ পৃষ্ঠা কুরআন' }
		},
		{
			id: 'devoted',
			title: { en: 'Devoted', bn: 'নিবেদিত' },
			description: { en: 'Consistent + Taraweeh + Sadaqah', bn: 'নিয়মিত + তারাবীহ + সাদাকা' }
		}
	];
	
	const quranTimes = [
		{ id: 'after_fajr', label: { en: 'After Fajr', bn: 'ফজরের পরে' } },
		{ id: 'after_dhuhr', label: { en: 'After Dhuhr', bn: 'যুহরের পরে' } },
		{ id: 'before_maghrib', label: { en: 'Before Maghrib', bn: 'মাগরিবের আগে' } },
		{ id: 'after_isha', label: { en: 'After Isha', bn: 'এশার পরে' } }
	];
	
	function selectLanguage(lang) {
		settings.language = lang;
		step = 2;
	}
	
	function selectLocation(city) {
		settings.location = city;
		step = 3;
	}
	
	function selectTrack(trackId) {
		settings.track = trackId;
		if (trackId === 'essential') {
			step = 5;
		} else {
			step = 4;
		}
	}
	
	function selectQuranTime(time) {
		settings.quranTime = time;
		step = 5;
	}
	
	function toggleMercy() {
		settings.mercyNudges = !settings.mercyNudges;
	}
	
	async function completeOnboarding() {
		settings.ramadanStartDate = new Date('2026-02-28').toISOString();
		
		await db.saveSettings(settings);
		await db.setOnboarded();
		goto('/dashboard');
	}
	
	$: lang = settings.language;
</script>

<div class="onboarding">
	<div class="container">
		{#if step === 1}
			<div class="onboarding-step animate-fade-in">
				<div class="crescent">🌙</div>
				<h1>Welcome to Ramadan Flow</h1>
				<p>Choose your language / আপনার ভাষা নির্বাচন করুন</p>
				
				<div class="button-group">
					<button class="btn btn-large btn-block" on:click={() => selectLanguage('en')}>
						English
					</button>
					<button class="btn btn-large btn-block" on:click={() => selectLanguage('bn')}>
						বাংলা
					</button>
				</div>
			</div>
		
		{:else if step === 2}
			<div class="onboarding-step animate-fade-in">
				<h2>{lang === 'en' ? 'Select Your Location' : 'আপনার অবস্থান নির্বাচন করুন'}</h2>
				<p>{lang === 'en' ? 'We\'ll show accurate prayer times for your city' : 'আমরা আপনার শহরের জন্য সঠিক নামাজের সময় দেখাব'}</p>
				
				<div class="location-grid">
					{#each cities as city}
						<button class="location-card" on:click={() => selectLocation(city)}>
							<span class="location-icon">📍</span>
							<span class="location-name">{city.name}</span>
						</button>
					{/each}
				</div>
			</div>
		
		{:else if step === 3}
			<div class="onboarding-step animate-fade-in">
				<h2>{lang === 'en' ? 'Choose Your Track' : 'আপনার ট্র্যাক নির্বাচন করুন'}</h2>
				<p>{lang === 'en' ? 'Pick the path that feels right for you' : 'আপনার জন্য সঠিক পথ বেছে নিন'}</p>
				
				<div class="track-list">
					{#each tracks as track}
						<button class="track-card" on:click={() => selectTrack(track.id)}>
							<h3>{track.title[lang]}</h3>
							<p>{track.description[lang]}</p>
						</button>
					{/each}
				</div>
			</div>
		
		{:else if step === 4}
			<div class="onboarding-step animate-fade-in">
				<h2>{lang === 'en' ? 'When will you read Quran?' : 'আপনি কখন কুরআন পড়বেন?'}</h2>
				<p>{lang === 'en' ? 'Setting a specific time doubles your success rate' : 'একটি নির্দিষ্ট সময় নির্ধারণ করলে সফলতার হার দ্বিগুণ হয়'}</p>
				
				<div class="time-grid">
					{#each quranTimes as time}
						<button class="time-card" on:click={() => selectQuranTime(time.id)}>
							{time.label[lang]}
						</button>
					{/each}
				</div>
			</div>
		
		{:else if step === 5}
			<div class="onboarding-step animate-fade-in">
				<div class="mercy-icon">✨</div>
				<h2>{lang === 'en' ? 'The Mercy Protocol' : 'রহমত প্রোটোকল'}</h2>
				<p class="mercy-text">
					{lang === 'en' 
						? 'Ramadan is about progress, not perfection. If you miss a day, we\'ll help you get back on track—no guilt, just growth.'
						: 'রমজান উন্নতি সম্পর্কে, পরিপূর্ণতা সম্পর্কে নয়। যদি আপনি একদিন মিস করেন, আমরা আপনাকে ফিরে আসতে সাহায্য করব—কোন অপরাধবোধ নেই, শুধু বৃদ্ধি।'
					}
				</p>
				
				<button class="mercy-toggle" class:active={settings.mercyNudges} on:click={toggleMercy}>
					<div class="toggle-switch">
						<div class="toggle-knob"></div>
					</div>
					<span>{lang === 'en' ? 'Enable Mercy Nudges' : 'রহমত নাজ সক্ষম করুন'}</span>
				</button>
				
				<button class="btn btn-primary btn-large btn-block" on:click={completeOnboarding}>
					{lang === 'en' ? 'Begin Your Journey 🌙' : 'আপনার যাত্রা শুরু করুন 🌙'}
				</button>
			</div>
		{/if}
		
		{#if step > 1}
			<button class="back-btn" on:click={() => step--}>
				← {lang === 'en' ? 'Back' : 'পিছনে'}
			</button>
		{/if}
	</div>
</div>

<style>
	.onboarding {
		min-height: 100vh;
		background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
		padding: var(--space-xl) var(--space-md);
	}
	
	.onboarding-step {
		text-align: center;
		max-width: 500px;
		margin: 0 auto;
	}
	
	.crescent {
		font-size: 4rem;
		margin-bottom: var(--space-lg);
	}
	
	.mercy-icon {
		font-size: 3rem;
		margin-bottom: var(--space-md);
	}
	
	h1 {
		font-size: 2rem;
		margin-bottom: var(--space-md);
		color: var(--color-text-primary);
	}
	
	h2 {
		font-size: 1.75rem;
		margin-bottom: var(--space-md);
		color: var(--color-text-primary);
	}
	
	p {
		color: var(--color-text-secondary);
		margin-bottom: var(--space-xl);
		font-size: 1.125rem;
	}
	
	.mercy-text {
		font-size: 1rem;
		line-height: 1.8;
		padding: var(--space-lg);
		background: white;
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
	}
	
	.button-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}
	
	.location-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: var(--space-md);
	}
	
	.location-card {
		background: white;
		border: 2px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		cursor: pointer;
		transition: all var(--transition-fast);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-sm);
	}
	
	.location-card:hover {
		border-color: var(--color-progress-50);
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}
	
	.location-icon {
		font-size: 2rem;
	}
	
	.location-name {
		font-weight: 600;
		color: var(--color-text-primary);
	}
	
	.track-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}
	
	.track-card {
		background: white;
		border: 2px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		cursor: pointer;
		text-align: left;
		transition: all var(--transition-fast);
	}
	
	.track-card:hover {
		border-color: var(--color-progress-50);
		box-shadow: var(--shadow-md);
	}
	
	.track-card h3 {
		margin: 0 0 var(--space-sm) 0;
		color: var(--color-text-primary);
		font-size: 1.25rem;
	}
	
	.track-card p {
		margin: 0;
		color: var(--color-text-secondary);
		font-size: 0.95rem;
	}
	
	.time-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: var(--space-md);
	}
	
	.time-card {
		background: white;
		border: 2px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-lg);
		cursor: pointer;
		font-weight: 600;
		transition: all var(--transition-fast);
	}
	
	.time-card:hover {
		border-color: var(--color-progress-50);
		box-shadow: var(--shadow-md);
	}
	
	.mercy-toggle {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		padding: var(--space-lg);
		background: white;
		border: 2px solid var(--color-border);
		border-radius: var(--radius-lg);
		cursor: pointer;
		width: 100%;
		margin-bottom: var(--space-xl);
		transition: all var(--transition-fast);
	}
	
	.mercy-toggle:hover {
		border-color: var(--color-progress-50);
	}
	
	.mercy-toggle.active {
		background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
		border-color: var(--color-mercy);
	}
	
	.toggle-switch {
		width: 52px;
		height: 28px;
		background: var(--color-border);
		border-radius: var(--radius-full);
		position: relative;
		transition: background var(--transition-fast);
	}
	
	.mercy-toggle.active .toggle-switch {
		background: var(--color-mercy);
	}
	
	.toggle-knob {
		width: 22px;
		height: 22px;
		background: white;
		border-radius: 50%;
		position: absolute;
		top: 3px;
		left: 3px;
		transition: transform var(--transition-fast);
	}
	
	.mercy-toggle.active .toggle-knob {
		transform: translateX(24px);
	}
	
	.back-btn {
		background: none;
		border: none;
		color: var(--color-text-secondary);
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		margin-top: var(--space-xl);
		padding: var(--space-sm);
	}
	
	.back-btn:hover {
		color: var(--color-text-primary);
	}
</style>