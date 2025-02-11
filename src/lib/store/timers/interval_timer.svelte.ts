import type { ExerciseInRoutineJoined } from '../../../types/db/exercise';
import { isSetLog } from '../../../types/db/routine_log';
import type { WorkoutFlow } from '../../../types/db/workout-flow';
import { videoBgElState } from '../../components/hero/video-hero/VideoBGState.svelte';
import { formatTime } from '../../helpers/formatTime';
import type { TimerBase } from './timer_abstract';

// need logic to control the current index of routine.
// calculate the
type Timer = {
	blockIndex: number;
	setIndex: number;
	exerciseIndex: number;
	timer: number;
	name: string;
};

type Pause = {
	start_at: Date;
	end_at: Date | undefined;
};
export class IntervalTimer implements TimerBase {
	start_time: Date | undefined = $state();
	currentIndex: number = $state(0);
	blockIndex: number = $state(0);
	setIndex: number = $state(0);
	exerciseIndex: number = $state(0);
	private pauses: Pause[] = [];
	isPaused: boolean = $state(true);
	/** all the timers(exercise, rest, set interval) */
	workoutFlows: WorkoutFlow[] = $state([]);
	/** whether rest, workout, set interval */
	currentFlow: WorkoutFlow = $derived(this.workoutFlows[this.currentIndex]);
	timers: Timer[] = $state([]);
	currentTimer: Timer = $derived(this.timers[this.currentIndex]);
	totalElapsedTimeNumber: number = $state(0);
	totalElapsedTimeString: string = $derived.by(() => formatTime(this.totalElapsedTimeNumber));
	private timerInterval: ReturnType<typeof setInterval> | null = null;

	constructor(data: any) {
		this.workoutFlows = data;
		this.timers = IntervalTimer.buildTimers(this.workoutFlows);
	}

	init() {
		this.start_time = new Date();
	}

	private startTimerInterval() {
		if (this.timerInterval) {
			console.log('Timer already running. Not starting a new one.', this.timerInterval);
			return; // Prevent duplicate intervals
		}
		this.timerInterval = setInterval(() => {
			this.updateElapsedTime();
		}, 1000);
	}

	handleNext(): void {
		// if (this.currentIndex < this.workoutFlows.length - 1) {
		if (this.currentIndex < this.timers.length - 1) {
			this.currentIndex++;
			this._updateIndexes();
		}
	}
	handlePrev(): void {
		if (this.currentIndex > 0) {
			this.currentIndex--;
			this._updateIndexes();
		}
	}

	togglePause(): void {
		if (this.isPaused) {
			this.handleResume();
		} else {
			this.handlePause();
		}
	}

	handlePause() {
		if (videoBgElState?.element) {
			this.isPaused = true;
			this.pauses.push({
				start_at: new Date(),
				end_at: undefined
			});
			videoBgElState.element.pause();
			if (this.timerInterval) {
				console.log('Clearing interval:', this.timerInterval); // Debugging
				clearInterval(this.timerInterval);
				this.timerInterval = null; // Reset to ensure it's cleared
			}
		} else {
			throw new Error('videoBgElState.element is not found');
		}
	}

	handleResume() {
		if (videoBgElState?.element) {
			videoBgElState.element.play();
			this.isPaused = false;
			if (this.pauses.length > 0) {
				this.pauses[this.pauses.length - 1].end_at = new Date();
			}
		}
		if (!this.start_time) {
			this.init();
		}
		// update the string right after resumed to get accurate time
		this.updateElapsedTime();
		// re-start the interval that runs from after 1 sec
		this.startTimerInterval();
	}

	private updateElapsedTime() {
		const milliSeconds = Math.round(Date.now() - (this.start_time?.getTime() ?? 0));
		const pausedMilliseconds = this.pauses.reduce((acc, pause) => {
			if (pause.end_at) {
				return acc + (pause.end_at.getTime() - pause.start_at.getTime());
			}
			return acc;
		}, 0);
		this.totalElapsedTimeNumber = Math.round((milliSeconds - pausedMilliseconds) * 0.001);
	}

	private _updateIndexes() {
		this.blockIndex = this.currentTimer.blockIndex;
		this.setIndex = this.currentTimer.setIndex;
		this.exerciseIndex = this.currentTimer.exerciseIndex;
	}

	printTimers() {
		console.log($state.snapshot(this.timers));
	}

	printIntervalPresetsWithExercise() {
		console.log(
			JSON.stringify(
				$state.snapshot(
					this.workoutFlows.map((flow) => ({
						intervalPresets: flow.interval_preset,
						exercise: 'exercise' in flow ? flow.exercise.name : 'rest'
					}))
				),
				null,
				2
			)
		);
	}

	/** the same thing as the currentFlow */
	get currentExercise(): ExerciseInRoutineJoined {
		// NOTE: test code

		if (isSetLog(this.currentFlow)) {
			return this.currentFlow.exercise;
		}
		const prevSet = this.workoutFlows[this.currentIndex - 1];
		if (isSetLog(prevSet)) {
			return prevSet.exercise;
		}

		// placeholder
		return {
			id: 0,
			repetition: {},
			name: 'Ready to workout?',
			slug: '',
			created_by_id: 0
		};
	}

	private static buildTimers(workoutFlows: WorkoutFlow[]) {
		return workoutFlows
			.flatMap((flow) => {
				const [activeTime, restTime] = Object.values(flow.interval_preset || []);
				if (!activeTime && !restTime) {
					return [
						{
							blockIndex: flow.block_index,
							setIndex: flow.set_index,
							exerciseIndex: flow.exercise_index,
							timer: 0,
							name: 'exercise' in flow ? flow.exercise.name : 'rest'
						}
					];
				}
				return [
					activeTime && {
						blockIndex: flow.block_index,
						setIndex: flow.set_index,
						exerciseIndex: flow.exercise_index,
						timer: activeTime,
						name: 'exercise' in flow ? flow.exercise.name : 'rest'
					},
					restTime && {
						blockIndex: flow.block_index,
						setIndex: flow.set_index,
						exerciseIndex: flow.exercise_index,
						timer: restTime,
						name: 'rest'
					}
				].filter((timer) => timer !== null && timer !== undefined);
			})
			.filter((time) => {
				return time !== null && time !== undefined;
			});
	}
}

let intervalTimer: IntervalTimer | null = null;

export const initializeIntervalTimer = (data: any) => {
	intervalTimer = new IntervalTimer(data);
};

export const getIntervalTimer = () => intervalTimer as IntervalTimer;

// interval factory creates interval out of RoutineJoined, Interval[], or RoutineBlockJoined[] etc
