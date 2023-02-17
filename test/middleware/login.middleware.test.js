import { DB } from "../../config.js";
import mongoDB from "../../model/mongo.db.js";
import { res, next, success } from "../mock/express.js";
import { withUserExists, withValidPassword } from "../../middleware/login.middleware.js";

const mongo = new mongoDB(DB.MONGO_CFG);

afterAll(async () => {
  await mongo.close();
});

beforeEach(async () => {
  success.drop();
});

describe("withUserExists middleware", () => {
  it("Should fill `req.user` with User info on User exists", async () => {
    const req = {
      body: {
        email: "elferno@inbox.ru"
      }
    };

    await withUserExists(req, res, next);

    expect(success.result).toBe(true);
    expect(req?.user).not.toBe(undefined);
    expect(req?.user).toHaveProperty("achievements");
    expect(req?.user).toHaveProperty("email");
  });

  it("Should return Result with Error for not existed Email", async () => {
    const testEmail = "not existed email";

    const req = {
      body: {
        email: testEmail
      }
    };
    const expectedResult = {
      message: "USER NOT FOUND",
      error: `user with email '${testEmail}' not found`
    };

    const result = await withUserExists(req, res, next);

    expect(success.result).toBe(false);
    expect(result).toHaveProperty("error");
    expect(result).toEqual(expectedResult);
  });
});

describe("withValidPassword middleware", () => {
  it("Should pass with valid Password", async () => {
    const req = {
      body: {
        password: "qwerty"
      },
      user: {
        password: "$2b$10$SIxpnfAFYEULkf7weA6ycOIHtoTW6/OQiO8QTm9.Yz93Wmg70PaNO"
      }
    };

    await withValidPassword(req, res, next);

    expect(success.result).toBe(true);
  });

  it("Should return Result with Error for wrong password", async () => {
    const req = {
      body: {
        password: "wrong password"
      },
      user: {
        password: "$2b$10$SIxpnfAFYEULkf7weA6ycOIHtoTW6/OQiO8QTm9.Yz93Wmg70PaNO"
      }
    };
    const expectedResult = {
      message: "USER NOT FOUND",
      error: "user with email 'undefined' not found"
    };

    const result = await withUserExists(req, res, next);

    expect(success.result).toBe(false);
    expect(result).toHaveProperty("error");
    expect(result).toEqual(expectedResult);
  });
});
