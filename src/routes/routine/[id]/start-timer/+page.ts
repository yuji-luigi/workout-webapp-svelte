// import { browser } from '$app/environment';
// import { db } from '../../../../lib/db/dexie-db/dexie-db';
// export const ssr = false; // No server-side rendering for this page

// export async function load({ params }) {
// 	let data;

// 	if (browser) {
// 		// Browser-only logic — e.g., read from IndexDB
// 		data = await db.routine.get({ id: Number(params.id) });
// 	} else {
// 		// Server-only or fallback logic
// 		data = null;
// 	}

// 	return { data };
// }
