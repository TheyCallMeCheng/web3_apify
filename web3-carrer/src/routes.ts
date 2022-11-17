import { createCheerioRouter } from 'crawlee';
import { Actor } from 'apify';
import { BASE_URL, labels } from './constants.js';

export const router = createCheerioRouter();

router.addDefaultHandler(async ({ log }) => {
    log.info(`Router reached...`);
});

router.addHandler(labels.START, async ({ $, crawler }) => {
    const jobs = $('tr');

    for (const job of jobs) {
        const element = $(job);
        const titleElement = $(element.find('a[href]'));

        const urlJob = BASE_URL + titleElement.attr('href');
        console.log(urlJob);

        await crawler.addRequests([{
            url: urlJob,
            label: labels.JOB,
            userData: {
                data: {
                    title: titleElement.first().text().trim(),
                    company: element.find('h3').first().text().trim(),
                    salaryRange: element.find('.text-salary').first().text().trim(),
                    location: element.find('.job-location-mobile').first().text().trim()
                },
            },
        }]);
    }
});

router.addHandler(labels.JOB, async ({ $, request }) => {
    const { data } = request.userData;
    // console.log(data.title, data.company, data.salaryRange);

    const element = $('div.text-dark-grey-text');
    const titleElement = element.find('h4');
    console.log(titleElement.first().text().trim());

    // await Dataset.pushData({
    //     ...data,
    // });

    await Actor.pushData({
        ...data,
    });
});
