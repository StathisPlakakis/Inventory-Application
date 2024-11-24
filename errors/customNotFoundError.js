class CustomNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = '404 Eerror';
  };
};

module.exports =  {CustomNotFoundError};