const bodyParser = (req) => {
    const parsedBody = new Promise((resolve, reject) => {
        let result;
        if (!['POST', 'PUT', 'PATCH'].includes(req.method)) {
            resolve(null);
        } 
        if (req.contentType === 'application/json') {
            try {
                result = JSON.parse(req.body);
                resolve(result);
            } catch {
                reject('500 Internal Server Error');
            }
        } else {
            reject('400 Bad Request');
        }
    });
    return parsedBody.catch((err) => err);
};

export default bodyParser;
