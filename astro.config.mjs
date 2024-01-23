import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import { astroExpressiveCode } from 'astro-expressive-code';
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: 'Intro to Command Line Tools StuCo',
            social: {
                github: 'https://github.com/jtledon'
            },
            sidebar: [
                {
                    label: 'Lessons',
                    autogenerate: {
                        directory: 'lessons'
                    }
                },
                {
                    label: 'General',
                    items: [
                        {
                            label: 'Frequently Asked Questions',
                            link: '/general/faq/'
                        },
                        {
                            label: 'About This Class & Assets',
                            link: '/general/about-this-class/'
                        }
                        // { label: 'About Me', link: '/general/about-me/' },
                    ]
                }
            ]
        }),

        // astroExpressiveCode(),
        // mdx(),
    ],

    // Process images with sharp: https://docs.astro.build/en/guides/assets/#using-sharp
    image: {
        service: {
            entrypoint: 'astro/assets/services/sharp'
        }
    }
});
