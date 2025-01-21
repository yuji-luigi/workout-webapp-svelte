export abstract class TimerBase {
	abstract handleNext(): void;
	abstract handlePrev(): void;
	abstract handlePause(): void;
	abstract handleResume(): void;
}
