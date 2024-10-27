// import type { Actions } from '@sveltejs/kit';

// export const actions = {
// 	default: async (event) => {
// 		console.log(event.request.body);
// 		const data = await event.request.formData();
// 		data.entries().forEach(([key, value]) => {
// 			console.log(key, value);
// 		});
// 		return 'ok';
// 	}
// } satisfies Actions;

export const ssr = false;
