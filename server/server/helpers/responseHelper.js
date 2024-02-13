const Boom = require('boom');

const responseSuccess = ( res, status, statusMessage, data ) => {
    return res.status(status).json({ isSucsess: true, status: statusMessage, result: data })
};

const responseError = ( res, status, statusMessage, error ) => {
    return res.status(status).json({ isSucsess: false, status: statusMessage, error: error })
};

const errorResponse = (error) => {
    if (error && error.output && error.output.payload && error.output.payload.statusCode) {
      const data = error.data && typeof error.data === 'string' ? error.data : null;
  
      if (error.data && typeof error.data === 'object') {
        switch (error.output.payload.statusCode) {
          case 400:
            return error;
          default:
            return Boom.badImplementation();
        }
      }
      
      switch (error.output.payload.statusCode) {
        case 422:
          return Boom.badData(error.output.payload.message, data);
        case 404:
          return Boom.notFound(error.output.payload.message, data);
        case 400:
          return Boom.badRequest(error.output.payload.message, data);
        case 401:
          return Boom.unauthorized(error.output.payload.message, data);
        default:
          return Boom.badImplementation();
      }
    }
  
    return Boom.badImplementation();
};

module.exports = ({ responseSuccess, responseError, errorResponse})