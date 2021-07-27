module.exports = {
  createError: (message, status) => {
    if (!message) {
      message = "Internal server error";
      status = 500;
    }

    return { error: true, message, status };
  },
};
