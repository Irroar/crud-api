import 'dotenv/config'
import { createServer } from 'http';

const PORT = process.env.PORT || 8000;

export const app = () => {
  const server = createServer((req, res) => {});
  server.listen(PORT, () => {
    console.log(`Server starts listening port ${PORT}`);
  })
}