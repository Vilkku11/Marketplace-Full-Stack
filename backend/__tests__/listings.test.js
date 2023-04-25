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
});
