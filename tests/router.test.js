import app from '../lib/app.js';
import request from 'supertest';
import { mkdir, rm } from 'fs/promises';

describe('Resource Router', () => {
    const rootDir = './tests/__test__store';

    beforeEach(() => {
        return rm(rootDir, { force: true, recursive: true }).then(() => {
            return mkdir(rootDir);
        });
    });

    it('should match POST /cats and GET /cats/:id', async () => {
        const postCatsResponse = await request(app)
            .post('/cats')
            .set('Content-Type', 'application/json')
            .send({ name: 'furball', age: 13 });
        expect(postCatsResponse.body).toEqual({
            message: 'cat posted successfully',
            id: expect.any(String),
        });
        const catId = postCatsResponse.body.id;

        const getCatResponse = await request(app).get(`/cats/${catId}`);
        expect(JSON.parse(getCatResponse.body)).toEqual({
            name: 'furball',
            age: 13,
            id: expect.any(String),
        });
    });

    it('should PUT /cats/:id', async () => {
        const postCatsResponse = await request(app)
            .post('/cats')
            .set('Content-Type', 'application/json')
            .send({ name: 'furball', age: 13 });
        const catId = postCatsResponse.body.id;
        await request(app)
            .put(`/cats/${catId}`)
            .set('Content-Type', 'application/json')
            .send({ name: 'allergies', age: 14, id: catId });
        const newCatObj = await request(app).get(`/cats/${catId}`);
        expect(JSON.parse(newCatObj.body)).toEqual({
            name: 'allergies',
            age: 14,
            id: catId,
        });
    });

    it('should DELETE /cats/:id', async () => {
        const cats = [
            { name: 'cat 1', age: 3 },
            { name: 'cat 2', age: 'old' },
        ];
        const cat1Res = await request(app).post('/cats').send(cats[0]);
        const cat2Res = await request(app).post('/cats').send(cats[1]);
        await request(app).delete(`/cats/${cat2Res.body.id}`);
        const cat1 = await request(app).get(`/cats/${cat1Res.body.id}`);
        const cat2 = await request(app).get(`/cats/${cat2Res.body.id}`);
        expect(JSON.parse(cat1.body)).toEqual({
            name: 'cat 1',
            age: 3,
            id: expect.any(String),
        });
        expect(cat2.statusCode).toEqual(404);
    });
});
