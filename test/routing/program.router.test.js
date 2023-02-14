import request from "supertest";
import { app, connection } from "../../index.js";

afterEach(() => {
  connection.close();
});

describe("API auth route", function () {
  it("Should return Programm list", async () => {
    const res = await request(app).get(`/api/programs`);
    const program = res.body[0];

    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(Array.isArray(res.body)).toBe(true);

    expect(typeof program).toBe("object");
    expect(program).toHaveProperty("media");
    expect(program).toHaveProperty("trainings");
    expect(program).toHaveProperty("id");
  });
});
