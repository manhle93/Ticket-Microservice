import request from "supertest";
import { app } from "../../app";

it("response with detail current user login", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "manh@email.com", password: "12345678" })
    .expect(201);
  const authResponse = await request(app)
    .post("/api/users/signin")
    .send({ email: "manh@email.com", password: "12345678" })
    .expect(200);
  const cookie = authResponse.get("Set-Cookie");
  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send({})
    .expect(200);
  expect(response.body?.currentUser?.email).toEqual("manh@email.com");
});

it("current user null when not login", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send({})
    .expect(200);
  expect(response.body.currentUser).toEqual(null);
});
