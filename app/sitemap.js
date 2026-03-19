export default function sitemap() {
    const currentDate = new Date().toISOString();
    
    return [
        {
            url: 'https://middler.com/',
            lastModified: currentDate,
            priority: 1.00,
        },
        {
            url: 'https://middler.com/blog',
            lastModified: currentDate,
            priority: 0.80,
        },
        {
            url: 'https://middler.com/interior-painting-cost-calculator',
            lastModified: currentDate,
            priority: 0.90,
        },
        {
            url: 'https://middler.com/exterior-painting-cost-calculator',
            lastModified: currentDate,
            priority: 0.90,
        },
        {
            url: 'https://middler.com/cost-to-paint-a-house',
            lastModified: currentDate,
            priority: 0.90,
        },
        {
            url: 'https://middler.com/paint-estimator',
            lastModified: currentDate,
            priority: 0.80,
        },
        {
            url: 'https://middler.com/contact-us',
            lastModified: currentDate,
            priority: 0.50,
        },
        {
            url: 'https://middler.com/privacy-policy',
            lastModified: currentDate,
            priority: 0.50,
        },
        {
            url: 'https://middler.com/terms-of-service',
            lastModified: currentDate,
            priority: 0.50,
        }
    ];
}