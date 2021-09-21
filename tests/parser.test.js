import bodyParser from '../lib/bodyParser';

describe('Body Parser takes a req obj and returns a promise for the pased body', () => {
    it('should return null if method is not POST, PUT, or PATCH', async () => {
        const rawRequest = `GET / HTTP/1.1
Host: developer.mozilla.org
Accept-Language: fr\r
\r
`;
        expect(bodyParser(rawRequest)).toEqual(null);
    });
});
