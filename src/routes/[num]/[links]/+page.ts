import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return {
		num: parseInt(params.num),
		links: (params.links == "true"),
	};
};
