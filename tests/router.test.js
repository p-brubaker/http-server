import app from '../lib/app.js';
import request from 'supertest';
import { mkdir, rm } from 'fs/promises';

describe('Resource Router', () => {
    const rootDir = 'tests/__test__store';

    beforeEach(() => {
        return rm(rootDir, { force: true, recursive: true }).then(() => {
            return mkdir(rootDir);
        });
    });

    it('should match POST /cats and GET /cats/:id', async () => {
        const postCatsResponse = await request(app).post('/cats').send((
            { 'name': 'furball', 'age': 13 }
        ));
        expect(postCatsResponse.body).toEqual({
            message: 'cat posted successfully',
            id: expect.any(String)
        });
        const catId = postCatsResponse.body.id;

        const getCatResponse = await request(app).get(`/cats/${catId}`);
        expect(JSON.parse(getCatResponse.body)).toEqual(
            { 'name': 'furball', 'age': 13, id: expect.any(String) }
        );
    });

    it('should PUT /cats/:id', async () => {
        const postCatsResponse = await request(app).post('/cats').send((
            { 'name': 'furball', 'age': 13 }
        ));
        const catId = postCatsResponse.body.id;
        await request(app).put(`/cats/${catId}`).send(
            { 'name': 'allergies', 'age': 14, id: catId }
        );
        const newCatObj = await request(app).get(`/cats/${catId}`);
        expect(JSON.parse(newCatObj.body)).toEqual(
            { 'name': 'allergies', 'age': 14, id: catId }
        );
    });
});
