import SimpleDb from '../database/simpleDb';
import bodyParser from './bodyParser';

const catRoutes = {
    async get(req, res) {
        const db = new SimpleDb('./tests/__test__store');
        const [, , id] = req.url.split('/');

        const response = await db.get(id);
        if (response) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response));
        } else {
            res.statusCode = 404;
            res.end('404: Cat Not Found');
        }
    },

    async post(req, res) {
        const db = new SimpleDb('./tests/__test__store');
        const requestObject = await bodyParser(req);

        const catId = await db.save(requestObject);
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(
            JSON.stringify({
                id: catId,
                message: 'cat posted successfully',
            })
        );
    },

    async put(req, res) {
        const db = new SimpleDb('./tests/__test__store');
        const [, , id] = req.url.split('/');

        const requestObject = await bodyParser(req);
        const catId = await db.update(id, requestObject);
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(
            JSON.stringify({
                id: catId,
                message: 'cat updated successfully',
            })
        );
    },

    async delete(req, res) {
        const db = new SimpleDb('./tests/__test__store');
        const [, , id] = req.url.split('/');
        await db.remove(id);
        res.end();
    },
};

export default catRoutes;
