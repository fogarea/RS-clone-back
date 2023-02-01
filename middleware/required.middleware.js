export const withRequired = function (fields) {
  return (req, res, next) => {
    if (req.method === "OPTIONS") next();

    for (const field of fields) {
      if (!req.body[field]) {
        return res.status(400).json({
          message: `'${field}' IS REQUIRED`,
          error: `Registration error: field '${field}' is required`
        });
      }
    }

    next();
  };
};
