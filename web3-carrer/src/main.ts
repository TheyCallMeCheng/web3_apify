// err ?
import { Actor } from 'apify';
import { CheerioCrawler } from 'crawlee';
import { router } from './routes.js';
import { BASE_URL, labels } from './constants.js';

// Initialize the Apify SDK
await Actor.init();

const crawler = new CheerioCrawler({
    requestHandler: router,
});

await crawler.addRequests([{
    url: `${BASE_URL}/remote-jobs`,
    label: labels.START,
}]);

await crawler.run();

// Exit successfully
await Actor.exit();
