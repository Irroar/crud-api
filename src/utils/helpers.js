import { invalidIdError, notFoundError, internalError, requredError, routeError, contentTypeJson } from './constants.js'

export const getReqData = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        resolve(body);
      });
    } catch(err) {
      reject(err);
    }
  });
};

export const isIdProvided = (url) => {
  return url.match(/\/api\/users\/\w+/);
}

export const getId = (url) => {
  return url.split('/')[3];
}

export const getErrorResponse = (err, res) => {
  switch(err.message) {
    case invalidIdError:
    case requredError:
      res.writeHead(400, contentTypeJson);
      res.end(JSON.stringify({ message: err.message }));
      break;
    case notFoundError:
    case routeError:
      res.writeHead(404, contentTypeJson);
      res.end(JSON.stringify({ message: err.message }));
      break;
    default:
      res.writeHead(500, contentTypeJson);
      res.end(JSON.stringify({ message: internalError }));
  }
}

export const getSuccessResponse = (data, res, code) => {
  res.writeHead(code, contentTypeJson);
  res.end(JSON.stringify(data));
}