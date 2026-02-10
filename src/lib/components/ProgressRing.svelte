<script>
	export let percentage = 0;
	export let size = 120;
	export let strokeWidth = 8;
	export let label = '';
	export let color = 'var(--color-progress-75)';
	
	$: radius = (size - strokeWidth) / 2;
	$: circumference = radius * 2 * Math.PI;
	$: offset = circumference - (percentage / 100) * circumference;
	$: isComplete = percentage >= 100;
</script>

<div class="progress-ring" style="width: {size}px; height: {size}px;">
	<svg width={size} height={size} class="ring-svg">
		<!-- Background circle -->
		<circle
			cx={size / 2}
			cy={size / 2}
			r={radius}
			stroke="var(--color-border)"
			stroke-width={strokeWidth}
			fill="none"
		/>
		
		<!-- Progress circle -->
		<circle
			cx={size / 2}
			cy={size / 2}
			r={radius}
			stroke={color}
			stroke-width={strokeWidth}
			fill="none"
			stroke-dasharray={circumference}
			stroke-dashoffset={offset}
			stroke-linecap="round"
			class="progress-circle"
			class:complete={isComplete}
		/>
	</svg>
	
	<div class="ring-content">
		<div class="percentage" class:complete={isComplete}>
			{percentage}%
		</div>
		{#if label}
			<div class="label">{label}</div>
		{/if}
	</div>
</div>

<style>
	.progress-ring {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
	
	.ring-svg {
		transform: rotate(-90deg);
	}
	
	.progress-circle {
		transition: stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1),
		            stroke 0.3s ease;
	}
	
	.progress-circle.complete {
		animation: pulse-glow 2s ease-in-out infinite;
		filter: drop-shadow(0 0 8px currentColor);
	}
	
	.ring-content {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	
	.percentage {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-text-primary);
		transition: all 0.3s ease;
	}
	
	.percentage.complete {
		color: var(--color-progress-75);
		transform: scale(1.1);
	}
	
	.label {
		font-size: 0.75rem;
		color: var(--color-text-secondary);
		margin-top: 0.25rem;
		font-weight: 500;
	}
</style>