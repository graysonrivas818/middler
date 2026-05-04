export default function sitemap() {
    const currentDate = new Date().toISOString();
    
   return [
        {
            url: 'https://middler.com/',
            lastModified,
            changeFrequency: 'always',
            priority: 1.0,
        },
        {
            url: 'https://middler.com/contact-us',
            lastModified,
            changeFrequency: 'always',
            priority: 0.9,
        },
        {
            url: 'https://middler.com/paint-estimator',
            lastModified,
            changeFrequency: 'always',
            priority: 0.9,
        },
        {
            url: 'https://middler.com/interior-painting-cost-calculator',
            lastModified,
            changeFrequency: 'always',
            priority: 0.9,
        },
        {
            url: 'https://middler.com/exterior-painting-cost-calculator',
            lastModified,
            changeFrequency: 'always',
            priority: 0.9,
        },
        {
            url: 'https://middler.com/cost-to-paint-a-house',
            lastModified,
            changeFrequency: 'always',
            priority: 0.9,
        },
        {
            url: 'https://middler.com/blog',
            lastModified,
            changeFrequency: 'always',
            priority: 0.9,
        },
        {
            url: 'https://middler.com/privacy-policy',
            lastModified,
            changeFrequency: 'always',
            priority: 0.9,
        },
        {
            url: 'https://middler.com/terms-of-service',
            lastModified,
            changeFrequency: 'always',
            priority: 0.9,
        },

        // State pages
        {
            url: 'https://middler.com/cost-to-paint-a-house-texas',
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://middler.com/cost-to-paint-a-house-illinois',
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://middler.com/cost-to-paint-a-house-georgia',
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://middler.com/cost-to-paint-a-house-florida',
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://middler.com/cost-to-paint-a-house-arizona',
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://middler.com/cost-to-paint-a-house-california',
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://middler.com/cost-to-paint-a-house-north-carolina',
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://middler.com/cost-to-paint-a-house-ohio',
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://middler.com/cost-to-paint-a-house-new-york',
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://middler.com/cost-to-paint-a-house-pennsylvania',
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];
}
