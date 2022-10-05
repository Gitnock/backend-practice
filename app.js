import express  from 'express';
import compression from 'compression';
import pingRoutes from './routes/ping.js';
import postsRoutes from './routes/posts.js';

const app = express();


app.use(compression());
app.use(express.json());
app.use('/api/ping', pingRoutes);
app.use('/api/posts', postsRoutes);

export default app;