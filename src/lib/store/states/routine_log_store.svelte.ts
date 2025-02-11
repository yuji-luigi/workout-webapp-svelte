import type { ExerciseLogJoined, RoutineLogJoinedInterface } from '../../../types/db/routine_log';
import type { IntervalTimer } from '../timers/interval_timer.svelte';

class SessionLogController {
	routineLog: RoutineLogJoinedInterface = $state({} as RoutineLogJoinedInterface);
	private intervalTimer!: IntervalTimer;
	constructor({
		routineLog,
		intervalTimer
	}: {
		routineLog: RoutineLogJoinedInterface;
		intervalTimer: IntervalTimer;
	}) {
		if (!routineLog) {
			throw new Error('routineLog is required');
		}
		if (!intervalTimer) {
			throw new Error('intervalTimer is required');
		}
		this.routineLog = routineLog;
		this.intervalTimer = intervalTimer;
	}

	setCurrentExerciseWeight({
		exerciseLog,
		weight
	}: {
		exerciseLog: ExerciseLogJoined | undefined;
		weight: number;
	}) {
		if (this._currentExerciseLog?.weight_done) {
			this._currentExerciseLog.weight_done.amount = weight;
		}
	}

	addSelectedExerciseReps({
		blockIndex,
		setIndex,
		exerciseIndex
	}: {
		blockIndex: number;
		setIndex: number;
		exerciseIndex: number;
	}) {
		this.addExerciseReps(this.getSelectedExerciseLog({ blockIndex, setIndex, exerciseIndex }));
	}

	addCurrentExerciseReps() {
		this.addExerciseReps(this._currentExerciseLog);
	}
	subCurrentExerciseReps() {
		this.subExerciseReps(this._currentExerciseLog);
	}

	addExerciseReps(targetExerciseLog: ExerciseLogJoined) {
		if (typeof targetExerciseLog.repetition_done.count === 'number') {
			targetExerciseLog.repetition_done.count++;
		}
	}

	subExerciseReps(targetExerciseLog: ExerciseLogJoined) {
		if (
			typeof targetExerciseLog.repetition_done.count === 'number' &&
			targetExerciseLog.repetition_done.count > 0
		) {
			targetExerciseLog.repetition_done.count--;
		}
	}

	getSelectedExerciseLog({
		blockIndex,
		setIndex,
		exerciseIndex
	}: {
		blockIndex: number;
		setIndex: number;
		exerciseIndex: number;
	}) {
		return this.getSelectedSetLog({ blockIndex, setIndex }).exerciseLogs[exerciseIndex];
	}

	getSelectedSetLog({ blockIndex, setIndex }: { blockIndex: number; setIndex: number }) {
		return this.getSelectedBlockLog({ blockIndex }).set_logs[setIndex];
	}

	getSelectedBlockLog({ blockIndex }: { blockIndex: number }) {
		return this.routineLog.block_logs[blockIndex];
	}

	// TODO: should be able to disable this feature?
	saveElapsedTimePerExercise(time_spent: number) {
		if (this._currentExerciseLog.time_spent) {
			this._currentExerciseLog.time_spent += time_spent;
		}
	}

	setElapsedTimePerSet(time_spent: number) {
		this._currentSetLog.time_spent = time_spent;
	}

	setElapsedTimePerBlock(time_spent: number) {
		this._currentBlockLog.time_spent = time_spent;
	}

	private get _currentExerciseLog(): ExerciseLogJoined {
		return this._currentSetLog.exerciseLogs[this.intervalTimer.exerciseIndex];
	}
	private get _currentBlockLog() {
		return this.routineLog?.block_logs[this.intervalTimer.blockIndex];
	}
	private get _currentSetLog() {
		return this._currentBlockLog.set_logs[this.intervalTimer.setIndex];
	}
}
