/* eslint-disable no-undef */
const request = require("supertest");
const { faker } = require("@faker-js/faker");
const server = require("../../index");

describe("POST /users", () => {
  it("should create a user", async () => {
    const newUser = {
      email: faker.internet.email(),
      password: "1234",
      is_admin: false,
    };

    const response = await request(server)
      .post("/api/users/register")
      .send(newUser);
    expect(response.status).toBe(201);
    expect(response.body.id).toBeUndefined();
  });

  it("should return an error if email is not valid", async () => {
    const newUser = {
      email: "bad-email",
      password: "1234",
      is_admin: false,
    };

    const response = await request(server)
      .post("/api/users/register")
      .send(newUser);
    expect(response.status).toBe(409);
  });
});

describe("GET /users", () => {
  it("should return an error when not authenticated", async () => {
    const response = await request(server).get("/api/users");
    expect(response.status).toEqual(401);
  });
});
