import express from 'express';
import cache from '../utils/routeCache.js';
const router = express.Router();
import { isSortByValid, isDirectionValid } from '../utils/validation.js';
import { getPostsByTags } from '../services/posts-service.js';

router.use(function (req, res, next) {
  const startTime = new Date().getTime();
  res.on('finish', () => {
    const endTime = new Date().getTime();
    const duration = endTime - startTime;
    console.log(`${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
  });
  next();
});

router.get('/', cache(300), async function (req, res) {
  const { tags, sortBy, direction } = req.query;
  // http://localhost:8080/api/posts?tags=history,tech&sortBy=likes&direction=desc
  if (!tags) {
    res.status(400).json({
      error: 'Tags parameter is required',
    });
  } else {
    if (isSortByValid(sortBy) && isDirectionValid(direction)) {
      const tagsArray = tags.split(',');
      let posts = [];
      try {
        posts = await getPostsByTags({ tags: tagsArray, sortBy, direction });
      } catch (error) {
        res.status(500).json({ error: error });
      }
      res.status(200).json(posts);
    } else {
      res.status(400).json({
        error: 'Invalid sortBy or direction',
      });
    }
  }
});

export default router;
