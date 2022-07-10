const getSuccessResponse = (res, data, statusCode, message) => {
  return res.status(statusCode).json({
    data,
    statusCode,
    message
  });
};

const getErrorResponse = (res, error = null, statusCode, message) => {
  return res.status(statusCode).json({
    ...(error & { error: error }),
    statusCode,
    message
  });
};

const internalServerError = (res, error, message = "Internal server error") => {
  return res.status(500).json({
    ...(error & { error }),
    statusCode: 500,
    message
  });
};
export { getSuccessResponse, getErrorResponse, internalServerError };
