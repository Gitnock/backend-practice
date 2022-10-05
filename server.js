import app from './app.js';
const HTTP_PORT = 8080;

app.listen(HTTP_PORT, () => {
  console.log(`Server started at http://localhost:${HTTP_PORT}`);
});
