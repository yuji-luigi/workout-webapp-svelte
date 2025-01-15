let audio: HTMLAudioElement | null = null;

// Check if we're in the browser (client)
if (typeof window !== 'undefined') {
	audio = new Audio('/sounds/count-down-po.wav');
}

export function countDown() {
	if (audio) {
		audio.play();
	}
}
