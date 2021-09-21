import SimpleDb from '../database/simpleDb.js';
import basicHtml from './utils/basicHtml.js';

const app = async (req, res) =>  {
    
    const resourceRegex = new RegExp(/(?<=\/).*/g);
    const resource = req.url.match(resourceRegex)[0];
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
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(basicHtml('<h1>Not Found</h1>'));
    }
};

export default app;
