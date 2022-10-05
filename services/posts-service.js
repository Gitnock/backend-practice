import { getUnqiueItemsById, orderBy } from '../utils/format.js';
import fetch from 'node-fetch';
/**
 * Returns posts by multiple tags from the hatchways api.
 *
 * @param {object} x { tags: [], sortBy: '', direction: '' }
 */
const getPostsByTags = (postFilter) => {
  return new Promise(async (resolve, reject) => {
    let posts = [];
    let promises = [];
    // save promise for each tag
    postFilter.tags.forEach((tag) => {
      promises.push(getPostsByTag(tag));
    });
    try {
      // wait for all promises to resolve
      const allPosts = await Promise.all(promises);
      // flatten array of arrays
      allPosts.forEach((post) => {
        posts = posts.concat(post.posts);
      });
    } catch (error) {
      reject(error);
    }
    // remove duplicate posts
    posts = getUnqiueItemsById(posts);
    posts = orderBy(posts, postFilter.sortBy, postFilter.direction);
    resolve({ posts });
  });
};

/**
 * Returns posts fatched by tag from the hatchways api.
 *
 * @param {string} tag The tag to search for.
 */
const getPostsByTag = (tag) => {
  return fetch(
    `https://api.hatchways.io/assessment/blog/posts?tag=${tag}`,
  ).then((response) => response.json());
};

export { getPostsByTags };
