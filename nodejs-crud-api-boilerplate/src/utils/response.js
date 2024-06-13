exports.successResponse = (res, data, message = 'Operation successful') => {
    res.status(200).json({
      success: true,
      message,
      data,
    });
  };
  
  exports.errorResponse = (res, message = 'An error occurred', statusCode = 500) => {
    res.status(statusCode).json({
      success: false,
      message,
    });
  };
  