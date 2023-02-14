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

export const withRequiredLength = function (fields) {
  return (req, res, next) => {
    if (req.method === "OPTIONS") next();

    for (const field of fields) {
      const value = req.body[field];

      switch (field) {
        case "email":
          if (value.length < 5)
            return res.status(411).json({
              message: `USER CREATION FAILED`,
              error: `email must be at least 5 symbols`
            });
          break;

        case "password":
          if (value.length < 3 || value.length > 15)
            return res.status(411).json({
              message: `USER CREATION FAILED`,
              error: `password must be in between 3 and 15 symbols`
            });
          break;
      }
    }

    next();
  };
};
