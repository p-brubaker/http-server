import simpleDb from '../database/simpleDb.js';
import { basicHtml } from './utils/basicHtml.js';

const app = async (req, res) =>  {
    const [, resource] = req.url.split('/');
    if (resource === '/') {
        try {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            const html = simpleDb.get('public/index.html');
            res.end(html);
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
