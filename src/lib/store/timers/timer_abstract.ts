export abstract class TimerBase {
	abstract handleNext(): void;
	abstract handlePrev(): void;
	abstract togglePause(): void;
}
