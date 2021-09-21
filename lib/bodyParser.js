const bodyParser = (req) => {
    return new Promise((resolve, reject) => {
        let result;
        if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
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
        } else return null;
    });
};

export default bodyParser;
