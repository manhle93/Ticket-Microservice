import request from "supertest";
import { app } from "../../app";

it("clear cookies when signout", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "manh@email.com", password: "12345678" })
    .expect(201);
  await request(app)
    .post("/api/users/signin")
    .send({ email: "manh@email.com", password: "12345678" })
    .expect(200);
  const response = request(app).post("/api/users/signout").send({}).expect(200);
  expect(response.get("Set-Cookie")).toBeUndefined();
});
