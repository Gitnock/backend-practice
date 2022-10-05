import express from 'express';
import cache from '../utils/routeCache.js';
const router = express.Router();

router.get('/', cache(300), (_req, res) => {
  res.status(200).json({
    success: true,
  });
});

export default router;
