import { res, success } from "../mock/express.js";
import authController from "../../controller/auth.controller.js";

let req;
beforeEach(async () => {
  success.drop();

  req = {
    body: {
      email: "elferno@inbox.ru",
      password: "qwerty"
    },
    user: {
      achievements: {},
      email: "elferno@inbox.ru",
      name: "Elijah",
      surname: "Ivanik",
      phone: "+7 (922) 021-08-05",
      avatar: 1,
      profile: "63e60b26683736b3f269e511",
      progress: "63e60b26683736b3f269e514",
      _id: "63e60b26683736b3f269e517",
      meditations: []
    }
  };
});

describe("authController", () => {
  it("Should return User with filled Profile and Progress", async () => {
    const user = await authController.login(req, res);

    expect(user?.profile?.id).not.toBe(undefined);
    expect(user?.progress?.id).not.toBe(undefined);
  });

  it("Should return correct Cookies and Headers", async () => {
    await authController.login(req, res);

    expect(typeof res.cookies["X-Refresh-Token"]).toBe("string");
    expect(res.cookies["X-Refresh-Token"]).toBeTruthy();
    expect(typeof res.headers["X-Access-Token"]).toBe("string");
    expect(res.headers["X-Access-Token"]).toBeTruthy();
  });

  it("Should return User with filled Profile, Progress and normalized id", async () => {
    const user = await authController.user(req, res);

    expect(user?.profile?.id).not.toBe(undefined);
    expect(user?.progress?.id).not.toBe(undefined);
    expect(user?.id).not.toBe(undefined);
  });
});
