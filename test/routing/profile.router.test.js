import request from "supertest";
import createToken from "../mock/jwt.js";
import { app, connection } from "../../index.js";

afterEach(() => {
  connection.close();
});

describe("API auth route", function () {
  it("Should return User info on correct Token", async () => {
    const token = createToken("63e60b26683736b3f269e517");
    const expectedResponse = {
      birthday: "1986-09-17T00:00:00.000Z",
      gender: "Male",
      height: 190,
      weight: 90,
      program: "63e3ca4403d35fe7bbb35e1c",
      id: "63e60b26683736b3f269e511"
    };

    const res = await request(app)
      .get(`/api/profile/63e60b26683736b3f269e511`)
      .set("Authorization", `Bearer: ${token}`);

    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.body).not.toEqual(undefined);
    expect(res.body).toEqual(expectedResponse);
  });

  it("Should return Result with Error on incorrect Token", async () => {
    const token = "incorrect token";
    const expectedResponse = {
      message: "NOT AUTHORIZED",
      error: "invalid token"
    };

    const res = await request(app)
      .get(`/api/profile/63e60b26683736b3f269e511`)
      .set("Authorization", `Bearer: ${token}`);

    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.body).toEqual(expectedResponse);
  });
});
