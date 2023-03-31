// For more information, see https://docs.apify.com/sdk/js
import { Actor } from 'apify';
// For more information, see https://crawlee.dev
import { CheerioCrawler } from 'crawlee';
import { router } from './routes.js';

// Initialize the Apify SDK
await Actor.init();

type Input = {
    startUrls: string[];
};

const {
    startUrls = []
} = await Actor.getInput<Input>() ?? {};

// Proxy will only work while being logged into an Apify account
// const proxyConfiguration = await Actor.createProxyConfiguration();

const crawler = new CheerioCrawler({
    // proxyConfiguration,
    requestHandler: router,
});

await crawler.run(startUrls);

// Exit successfully
await Actor.exit();
