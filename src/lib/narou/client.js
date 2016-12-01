import * as httpClient from '../http-client';
import cheerio from 'cheerio';

const publisherType = 'narou';
const NCODE_URL_BASE = 'http://ncode.syosetu.com';

/**
 * load from `http://ncode.syosetu.com/:id/`
 * @param code
 * @returns {*|Promise.<T>}
 */
export function fetchStory(publisherCode) {
    const url = `${NCODE_URL_BASE}/${publisherCode}/`;

    return httpClient.fetchHTML(url).then(($) => {
        const storyId = `${publisherType}__${publisherCode}`;
        const title = $('.novel_title').text();
        const authorName = $('.novel_writername a').text();
        const description = $('#novel_ex').text();

        const episodes = $('.chapter_title, .novel_sublist2').map((index, element) => {
            const el = $(element);
            const type = el.attr('class') === 'chapter_title' ? 'header' : 'episode';
            if (type === 'header') {
                const title = el.text();
                return {
                    id: `${storyId}__header-${index}`,
                    storyId,
                    type,
                    title,
                    index
                };
            } else {
                const episodeId = el.find('.subtitle a').attr('href').replace(`/${publisherCode}/`, '').replace('/', '');
                const title = el.find('.subtitle').text();
                const luContents = el.find('.long_update').contents();
                const publishedAt = parseDateFromString(luContents[0].data);
                const revisedAt = luContents.length > 1 ? parseDateFromString($(luContents[1]).attr('title')) : publishedAt;
                return {
                    id: `${storyId}__${episodeId}`,
                    storyId,
                    type,
                    episodeId,
                    title,
                    publishedAt,
                    revisedAt,
                    index
                };
            }
        }).get();

        // 短編
        if ($('#novel_honbun').length > 0) {
            const publishedAt = new Date($('meta[name="WWWC"]').attr('content')).getTime();
            episodes.push({
                id: `${storyId}__0`,
                storyId,
                type: 'episode',
                episodeId: 0,
                title,
                publishedAt: publishedAt,
                revisedAt: publishedAt,
                index: 0
            });
        }

        return ({
            id: storyId,
            publisherType,
            publisherCode,
            title,
            authorName,
            description,
            icon: '',
            episodes
        });
    });
}

/**
 * load from `http://ncode.syosetu.com/:id/:episodeId/`
 * @param publisherCode
 * @param episodeId
 * @returns {*|Promise.<T>}
 */
export function fetchEpisode(publisherCode, episodeId) {
    const url = (() => {
        if (episodeId > 0) {
            return `${NCODE_URL_BASE}/${publisherCode}/${episodeId}/`;
        } else {
            return `${NCODE_URL_BASE}/${publisherCode}/`;
        }
    })();

    return httpClient.fetchHTML(url).then(($) => {
        const title = $('.novel_subtitle').text() || $('.novel_title').text();
        const body = [
            $('#novel_p'),
            $('#novel_honbun'),
            $('#novel_a')
        ]
            .map((el) => {
                el.find('a').replaceWith((_, tag) => $(tag).html());
                return el.html();
            })
            .filter((n) => !!n)
            .join('<hr class="border-comment">');
        return {title, body};
    }).then((result) => {
        const {title, body} = result;
        const $ = cheerio.load(body);
        const images = $('img');
        return Promise.all(images.map((_, image) => {
            const url = $(image).attr('src');
            return httpClient.fetchBlobBase64(url).then((base64) => {
                return `data:image/png;base64,${base64}`;
            });
        })).then((base64Urls) => {
            $('img').attr('src', (i) => base64Urls[i]);
            return {
                title,
                body: $.html()
            };
        });
    }).then((result) => {
        const {title, body} = result;
        return ({
            id: `${publisherType}__${publisherCode}__${episodeId}`,
            publisherType,
            publisherCode,
            episodeId,
            title,
            body
        });
    });
}

function parseDateFromString(str) {
    const m = str.match(/(\d+)年\s*(\d+)月\s*(\d+)日/);
    if (!m) return 0;
    return Date.parse(`${m[1]}/${m[2]}/${m[3]}`) + (60 * 60 * 9);
}
