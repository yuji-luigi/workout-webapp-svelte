import { browser } from '$app/environment';
import { db } from '../../../../lib/db/dexie-db/dexie-db';

export const ssr = false; // Turn off SSR if you're using IndexDB in load

export async function load({ params }) {
	let routine = null;
	if (browser) {
		routine = await db.routine.get({ id: Number(params.id) });
	}
	return { routine };
}
