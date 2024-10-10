// Type for Organization table
interface Organization {
	id: number; // primary key
	name: string;
	plan: 'basic' | 'premium' | 'enterprise'; // assuming 'plan' is an enum
}
