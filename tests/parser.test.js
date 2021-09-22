import bodyParser from '../lib/bodyParser';
import httpMocks from 'node-mocks-http';

describe('Body Parser takes a req obj and returns a promise for the pased body', () => {
    it('should return null if method is not POST, PUT, or PATCH', async () => {
        const request = { method: 'GET', url: '/' };
        const result = await bodyParser(request);
        expect(result).toEqual(null);
    });

    xit('should throw if content-type is not application/json', async () => {
        const request = {
            method: 'POST',
            url: '/cats',
            contentType: 'text/html',
        };
        expect(await bodyParser(request)).toEqual('400 Bad Request');
    });

    xit('should return deserialized body from req emitted events (using JSON.parse())', async () => {
        const request = httpMocks.createRequest({
            method: 'POST',
            url: '/cats',
            contentType: 'application/json',
            // eslint-disable-next-line quotes
            body: `[{"name": "furball"}, {"name": "other cat"}]`,
        });
        const parsedBody = [{ name: 'furball' }, { name: 'other cat' }];
        const result = await bodyParser(request);
        expect(result).toEqual(parsedBody);
    });

    xit('should throw if failure happens in deserialization', async () => {
        const request = httpMocks.createRequest({
            method: 'POST',
            url: '/cats',
            contentType: 'application/json',
            // eslint-disable-next-line quotes
            body: `[{"name': "furball"}, {"name": "other cat"}]`,
        });
        const result = await bodyParser(request);
        expect(result).toEqual('500 Internal Server Error');
    });
});
