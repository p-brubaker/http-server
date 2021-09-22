const bodyParser = (req) => {
    const parsedBody = new Promise((resolve, reject) => {
        let result;
        let body = '';
        if (!['POST', 'PUT', 'PATCH'].includes(req.method)) {
            resolve(null);
        } else if (req.headers['content-type'] === 'application/json') {
            try {
                req.on('data', (chunk) => (body += chunk));
                req.on('end', () => {
                    result = JSON.parse(body);
                    resolve(result);
                });
            } catch (error) {
                reject('500 Internal Server Error');
            }
        } else {
            reject('400 Bad Request');
        }
    });
    return parsedBody.catch((err) => err);
};

export default bodyParser;
