import request from 'supertest';
import app from './app.js';
import { getUnqiueItemsById } from './utils/format.js';
describe('GET /api/ping', () => {
  test('should have json content type', (done) => {
    request(app)
      .get('/api/ping')
      .set('Accept', 'application/json')
      .then((response) => {
        expect(response.type).toEqual('application/json');
        done();
      });
  });
  test('should return 200', async () => {
    const response = await request(app).get('/api/ping');
    expect(response.status).toEqual(200);
  });
});

describe('GET /api/posts', () => {
  describe('when no tags are provided', () => {
    test('should return 400', async () => {
      const response = await request(app).get('/api/posts');
      expect(response.status).toEqual(400);
    });
  });
  describe('when tags are provided', () => {
    test("should return an array of unique posts", async () => {
        const response = await request(app).get('/api/posts?tags=history,tech');
        expect(getUnqiueItemsById(response.body.posts).length).toEqual(response.body.posts.length);
    });
    test('should return 200', async () => {
      const response = await request(app).get('/api/posts?tags=history,tech');
      expect(response.status).toEqual(200);
    });
  });
  describe('when sortBy is invalid', () => {
    test('should return 400', async () => {
      const response = await request(app).get(
        '/api/posts?tags=history,tech&sortBy=likes4&direction=desc',
      );
      expect(response.status).toEqual(400);
    });
  });
  describe('when direction is invalid', () => {
    test('should return 400', async () => {
      const response = await request(app).get(
        '/api/posts?tags=history,tech&sortBy=likes&direction=desc4',
      );
      expect(response.status).toEqual(400);
    });
  });
  describe('when sortBy and direction are valid', () => {
    test('should return 200', async () => {
      const response = await request(app).get(
        '/api/posts?tags=history,tech&sortBy=likes&direction=desc',
      );
      expect(response.status).toEqual(200);
    });
  });
  describe('when tags are more than two', () => {
    test('should return 200', async () => {
      const response = await request(app).get(
        '/api/posts?tags=history,tech,health&sortBy=likes&direction=desc',
      );
      expect(response.status).toEqual(200);
    });
  });
  describe('when all tags are wrong', () => {
    test('should return empty array', async () => {
      const response = await request(app).get(
        '/api/posts?tags=histor2y,tec33h,healvvth,sporfts',
      );
      expect(response.body.posts).toEqual([]);
      expect(response.status).toEqual(200);
    });
  });

});
