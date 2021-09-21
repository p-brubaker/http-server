import app from '../lib/app.js';
import request from 'supertest';

describe('Resource Router', () => {
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
});
