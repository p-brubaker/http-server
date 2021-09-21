import bodyParser from '../lib/bodyParser';

describe('Body Parser takes a req obj and returns a promise for the pased body', () => {
    it('should return null if method is not POST, PUT, or PATCH', async () => {
        const request = { method: 'GET', url: '/' };
        const result = await bodyParser(request);
        expect(result).toEqual(null);
    });
});
