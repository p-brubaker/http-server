import app from '../lib/app.js';
import request from 'supertest';
import { readFile } from 'fs/promises';

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
});
