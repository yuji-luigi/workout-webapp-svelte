import type { ExerciseLogJoined, RoutineLogJoined } from '../../../types/db/routine_log';
import type { IntervalTimer } from '../timers/interval_timer.svelte';

class SessionLogController {
	routineLog: RoutineLogJoined | undefined = $state();
	private intervalTimer: IntervalTimer | undefined;
	constructor({
		routineLog,
		intervalTimer
	}: {
		routineLog: RoutineLogJoined;
		intervalTimer: IntervalTimer;
	}) {
		this.routineLog = routineLog;
		this.intervalTimer = intervalTimer;
	}
	addReps() {}

	private get _currentExerciseLog(): ExerciseLogJoined {
		return '';
	}
	private get _currentBlock() {
		return '';
	}
}
