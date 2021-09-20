import app from '../lib/app.js';
import { request } from 'supertest';
import basicHtml from '../lib/utils/basicHtml.js';

describe('Serve static files from /public', () => {
    it('should return index.html from GET /', async () => {
        const res = await request(app).get('/');
        expect(res.text).toEqual(basicHtml(''));
    });
});
