import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Intro to Command Line Tools StuCo',
			social: {
				github: 'https://github.com/jtledon',
			},
			sidebar: [
				{
					label: 'Lessons',
					autogenerate: { directory: 'lessons' },
				},
				{
					label: 'Tips',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Frequently Asked Questions', link: '/tips/faq/' },
					],
				},
			],
		}),
	],

	// Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
	image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
