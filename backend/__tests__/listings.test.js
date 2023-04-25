const { describe, test, expect, afterAll } = require("@jest/globals");
const supertest = require("supertest");
const connection = require("../db/pool");
const app = require("../app");

describe("GET health", () => {
  test("should return 200", (done) => {
    supertest(app).get("/health").expect(200).end(done);
  });
});

describe("GET listings endpoint", () => {
  test("should return 200", (done) => {
    supertest(app).get("/listings").expect(200).end(done);
  });

  test("should return listing data", async () => {
    const response = await supertest(app)
      .get("/listings")
      .set("Accept", "application/json");
    expect(response.status).toEqual(200);
    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 1,
          user_id: "testuserid",
          user: "testuser",
          name: "testname",
          price: 420,
        }),
      ])
    );
  });
});
