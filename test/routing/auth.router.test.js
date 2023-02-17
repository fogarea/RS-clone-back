import request from "supertest";
import { app, connection } from "../../index.js";

afterEach(() => {
  connection.close();
});

describe("API auth route", function () {
  it("Should return User info on correct Email and Password", async () => {
    const expected = {
      email: "elferno@inbox.ru",
      name: "Elijah"
    };
    const req = {
      email: expected.email,
      password: "qwerty"
    };

    const res = await request(app).post("/auth/login").send(req);

    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res?.body?.email).toEqual(expected.email);
    expect(res?.body?.name).toEqual(expected.name);
  });

  it("Should return Result with Error on incorrect Email or Password", async () => {
    const req = {
      email: "elferno@inbox.ru",
      password: "wrong password"
    };
    const expectedRes = {
      code: 403,
      message: "AUTHORIZATION ERROR",
      error: "wrong password"
    };

    const res = await request(app).post("/auth/login").send(req);

    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.body).toEqual(expectedRes);
  });
});
