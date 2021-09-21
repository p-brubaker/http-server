import basicHtml from './utils/basicHtml.js';
import fetchStaticResource from './fetchStaticResource.js';
import catRoutes from './router.js';

const routes = {
    'cats': catRoutes
};

const app = async (req, res) =>  {

    const resourceRegex = new RegExp(/(?<=\/).*/g);
    const resource = req.url.match(resourceRegex)[0];
    const route = routes[resource];
    
    if (resource === '' || resource  === 'styles/main.css') {
        try {
            fetchStaticResource(res, resource);
        } catch (error) {
            res.statusCode = 500;
            res.end('Internal Server Error');
        }
    } else if (route) {
        try {
            const routeHandler = route[req.method.toLowerCase()];
            await routeHandler(req, res);
        } catch (error) {
            res.statusCode = 500;
            res.end('Internal Server Error');
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(basicHtml('<h1>Not Found</h1>'));
    }
    
};

export default app;
