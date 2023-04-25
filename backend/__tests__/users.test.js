const { describe, test, expect, afterAll } = require("@jest/globals");
const supertest = require("supertest");
const connection = require("../db/pool");
const app = require("../app");

describe("SIGNUP users endpoint", () => {
  const deleteQuery = "DELETE FROM users WHERE email=?;";
  connection.query(deleteQuery, ["test@user.com"], (err, result) => {
    if (err) {
      console.log(err);
    }
  });

  test("signup user with valid credentials", async () => {
    const data = {
      name: "test user",
      email: "test@user.com",
      password: "testuserpassword",
    };

    const response = await supertest(app)
      .post("/users/signup")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(data);

    expect(response.status).toEqual(201);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.email).toBeTruthy();
    expect(response.body.token).toBeTruthy();
  });

  test("login user with valid credentials", async () => {
    const data = {
      email: "test@user.com",
      password: "testuserpassword",
    };

    const response = await supertest(app)
      .post("/users/login")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(data);

    expect(response.status).toEqual(201);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.email).toBeTruthy();
    expect(response.body.token).toBeTruthy();
  });

  test("shouldn't login with invalid email", async () => {
    const data = {
      email: "test@userR.com",
      password: "testuserpassword",
    };

    const response = await supertest(app)
      .post("/users/login")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(data);

    expect(response.status).toEqual(401);
    expect(response.text).toContain("No user found - Check your credentials");
  });

  test("shouldn't login with invalid password", async () => {
    const data = {
      email: "test@user.com",
      password: "testUSER",
    };

    const response = await supertest(app)
      .post("/users/login")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(data);
    expect(response.status).toEqual(401);
    expect(response.text).toContain("No user found - Check your credentials");
  });
});
