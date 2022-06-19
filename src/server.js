import 'dotenv/config'
import { createServer } from 'http';
import { renderRoute } from './utils/render.js'
import { getErrorResponse } from './utils/helpers.js'

const PORT = process.env.PORT || 5000;

export const app = () => {
  const server = createServer(async (req, res) => {
    try {
      await renderRoute(req, res);
    } catch(err) {
      getErrorResponse(err, res);
    }
  });

  server.listen(PORT, () => {
    console.log(`Server starts listening port ${PORT}`);
  })
}