import request from "supertest";
import { app, connection } from "../../index.js";

afterEach(() => {
  connection.close();
});

describe("API auth route", function () {
  it("Should return Training list", async () => {
    const res = await request(app).get(`/api/trainings`);
    const training = res.body[0];

    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(Array.isArray(res.body)).toBe(true);
    expect(typeof training).toBe("object");

    expect(training).toHaveProperty("id");
    expect(training).toHaveProperty("tag");
    expect(training).toHaveProperty("media");
    expect(training).toHaveProperty("calories");
    expect(training).toHaveProperty("program");
    expect(training).toHaveProperty("icon");
  });
});
