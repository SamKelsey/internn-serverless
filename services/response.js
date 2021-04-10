const response = (statusCode, message) => {
  return {
    statusCode,
    body: JSON.stringify(message),
  };
};

export default response;
