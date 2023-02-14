import createToken from "../mock/jwt.js";
import { res, next, success } from "../mock/express.js";
import withAuth from "../../middleware/auth.middleware.js";

beforeEach(async () => {
  success.drop();
});

describe("withAuth middleware", () => {
  it("Should fill `req.userId` if correct Token is provided with request", async () => {
    const expectedId = "63e60b26683736b3f269e517";
    const token = createToken(expectedId);
    const req = {
      headers: {
        authorization: `Bearer: ${token}`
      }
    };

    const middleware = withAuth(true);
    middleware(req, res, next);

    expect(success.result).toBe(true);
    expect(req?.userId).not.toBe(undefined);
    expect(req?.userId).toEqual(expectedId);
  });

  it("Should return Result with Error if no Token is provided with request", async () => {
    const req = {};
    const expectedResult = {
      message: "NOT AUTHORIZED",
      error: "Cannot read properties of undefined (reading 'authorization')"
    };

    const middleware = withAuth(true);
    const result = middleware(req, res, next);

    expect(success.result).toBe(false);
    expect(result).toHaveProperty("error");
    expect(result).toEqual(expectedResult);
  });

  it("Should return Result with Error if incorrect Token is provided with request", async () => {
    const req = {
      headers: {
        authorization: "Bearer: wrong token"
      }
    };
    const expectedResult = {
      message: "NOT AUTHORIZED",
      error: "invalid token"
    };

    const middleware = withAuth(true);
    const result = middleware(req, res, next);

    expect(success.result).toBe(false);
    expect(result).toHaveProperty("error");
    expect(result).toEqual(expectedResult);
  });
});
