import request from "supertest";
import { app } from "../../app";

it("fails when email does not exits", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({ email: "231@email.com", password: "11111111" })
    .expect(400);
});

it("fails when password is not correct", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "manh@email.com", password: "11111111" })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({ email: "manh@email.com", password: "312321" })
    .expect(400);
});

it("response with coookie when login success", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "manh@email.com", password: "11111111" })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({ email: "manh@email.com", password: "11111111" })
    .expect(200);
  expect(response.get("Set-Cookie")).toBeDefined();
});
