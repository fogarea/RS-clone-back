import { res, next, success } from "../mock/express.js";
import {
  withRequired,
  withRequiredLength
} from "../../middleware/required.middleware.js";

beforeEach(() => {
  success.drop();
});

describe("withRequired fields middleware", () => {
  it("Should pass with existed Email and Password", () => {
    const req = {
      body: {
        email: "email",
        password: "password"
      }
    };
    const middleware = withRequired(["email", "password"]);
    middleware(req, res, next);

    expect(success.result).toBe(true);
  });

  it("Should return Result with Error for not existed Email or Password", () => {
    const req = {
      body: {
        email: "email"
      }
    };
    const expectedResult = {
      message: "'password' IS REQUIRED",
      error: "Registration error: field 'password' is required"
    };

    const middleware = withRequired(["email", "password"]);
    const result = middleware(req, res, next);

    expect(success.result).toBe(false);
    expect(result).toHaveProperty("error");
    expect(result).toEqual(expectedResult);
  });
});

describe("withRequiredLength fields middleware", () => {
  it("Should pass with Email length more than 4 and Password more than 3", () => {
    const req = {
      body: {
        email: "55555",
        password: "4444"
      }
    };
    const middleware = withRequiredLength(["email", "password"]);
    middleware(req, res, next);

    expect(success.result).toBe(true);
  });

  it("Should return Result with Error for Email shorter than 5 or Password than 4", () => {
    const req = {
      body: {
        email: "4444",
        password: "4444"
      }
    };
    const expectedResult = {
      message: "USER CREATION FAILED",
      error: "email must be at least 5 symbols"
    };

    const middleware = withRequiredLength(["email", "password"]);
    const result = middleware(req, res, next);

    expect(success.result).toBe(false);
    expect(result).toHaveProperty("error");
    expect(result).toEqual(expectedResult);
  });
});
