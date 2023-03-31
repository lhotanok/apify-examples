import { Actor } from 'apify';
import { createCheerioRouter } from 'crawlee';

export const router = createCheerioRouter();

router.addDefaultHandler(async ({ $, enqueueLinks, log }) => {
    log.info(`Enqueueing attraction detail pages from the current listing page`);

    const attractionRelLinks: string[] = $('[href^="/Attraction_Review"]')
        .map((_i, el) => $(el).attr('href') || '') // $(el).attr() can return undefined
        .toArray() // convert Cheerio collection to a regular array
        .filter((relLink) => relLink.length > 0); // remove empty strings

    const hostname = 'https://www.tripadvisor.com';
    const attractionLinks = attractionRelLinks.map((link) => hostname + link);

    await enqueueLinks({
        urls: attractionLinks,
        label: 'detail',
    });
});

router.addHandler('detail', async ({ request, $, log }) => {
    const title = $('header h1').text();
    log.info(`${title}`, { url: request.loadedUrl });

    const descriptionSelector = '[data-automation^="WebPresentation_AttractionAbout"] .fIrGe .biGQs.pZUbB.KxBGd';
    const description: string | null = $(descriptionSelector).text() || null;

    const ratingSelector = '#REVIEWS .biGQs.fiohW.hzzSG';
    const ratingText = $(ratingSelector).text();
    const rating: number | null = ratingText ? parseFloat(ratingText) : null;

    const nonDigitsRegex = /[^\d]+/g;

    const reviewsCountSelector = '#REVIEWS .jVDab .biGQs';
    const reviewsCountText = $(reviewsCountSelector).text().replace(nonDigitsRegex, '');
    const reviewsCount: number | null = reviewsCountText ? parseInt(reviewsCountText) : null;

    await Actor.pushData<Result>({
        url: request.loadedUrl || request.url,
        title,
        description,
        rating,
        reviewsCount,
    });
});

type Result = {
    url: string;
    title: string;
    description: string | null;
    rating: number | null;
    reviewsCount: number | null;
};
