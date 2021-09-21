import app from '../lib/app.js';
import request from 'supertest';
import { readFile } from 'fs/promises';
import basicHtml from '../lib/utils/basicHtml.js';

describe('Serve static files from /public', () => {
    it('should return index.html from GET /', async () => {
        const res = await request(app).get('/');
        const text = res.text;
        const html = await readFile('public/index.html', 'utf-8');
        expect(text).toEqual(html);
    });

    it('should return main.css from GET /styles/css', async () => {
        const res = await request(app).get('/styles/main.css');
        const text = res.text;
        const css = await readFile('public/styles/main.css', 'utf-8');
        expect(text).toEqual(css);
    });

    it('should return 404 from GET /bad-file', async () => {
        const res = await request(app).get('/bad-file');
        const text = res.text;
        expect(text).toEqual(basicHtml('<h1>Not Found</h1>'));
    });

    it('should return 404 from GET /styles', async () => {
        const res = await request(app).get('/styles');
        const text = res.text;
        expect(text).toEqual(basicHtml('<h1>Not Found</h1>'));
    });
});
