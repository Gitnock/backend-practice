import NodeCache from 'node-cache';

const cache = new NodeCache();

export default duration => (req, res, next) => {
    // if not get request call next
    if(req.method !== 'GET') {
        console.error(`can't cache non-Get methods`);
        return next();
    }

    const key = req.originalUrl
    const cachedBody = cache.get(key);
    // if key exists in cache return catched data
    if(cachedBody) {
        console.log(`cache found for ${key}`);
        return res.send(cachedBody);
    }else {
        console.log(`cache lost for ${key}`);
        res.originalSend = res.send;
        res.send = (body) => {
            res.originalSend(body);
            cache.set(key, body, duration);
        };
        next();
    }
}

