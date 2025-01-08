/**
 * Timer collection. But one timer is only used by one workout_set. so it is one to one relationship.
 */
interface Timer {
	id: number; // primary key
	rest_time: number;
	active_time: number;
}
