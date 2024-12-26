// Type for User table
export interface User {
	id: number; // primary key
	name: string;
	suname: string;
	address: string;
	birth_date: Date;
	locale: string;
}
