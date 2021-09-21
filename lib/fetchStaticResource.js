import SimpleDb from '../database/simpleDb';
import basicHtml from './utils/basicHtml';

const fetchStaticResource = async (res, resource) => {
    const db = new SimpleDb('public');

    if (resource === '') {
        try {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            const html = await db.get('index.html');
            res.end(html);
        } catch (error) {
            res.statusCode = 500;
            res.end('Internal Server Error');
        }
    } else if (resource === 'styles/main.css') {
        try {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/css');
            const css = await db.get('styles/main.css');
            res.end(css);
        } catch (error) {
            res.statusCode = 500;
            res.end('Internal Server Error');
        }
    }
};

export default fetchStaticResource;
