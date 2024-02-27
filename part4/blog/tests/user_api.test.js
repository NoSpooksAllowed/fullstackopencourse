const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");

const User = require("../models/user");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  for (let user of helper.initialUsers) {
    const userObject = new User(user);
    await userObject.save();
  }
}, 100000);

test("users are returned as json", async () => {
  await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("all users are returned", async () => {
  const response = await api.get("/api/users");

  expect(response.body).toHaveLength(helper.initialUsers.length);
});

test("test that id property is defined", async () => {
  const response = await api.get("/api/users");

  const users = response.body;

  for (let user of users) {
    expect(user.id).toBeDefined();
  }
});

test("a valid user can be added", async () => {
  const newUser = {
    username: "hehe",
    name: "Robert",
    password: "raketa666",
  };

  await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await helper.usersInDb();
  expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1);

  const names = usersAtEnd.map((user) => user.name);
  expect(names).toContain("Robert");
}, 100000);

test("a user without password and username will not be added", async () => {
  const newUser = {
    name: "Robert",
  };

  await api.post("/api/users").send(newUser).expect(400);

  const usersAtEnd = await helper.usersInDb();

  expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
});

test("check is username is unique in database", async () => {
  const newUser = {
    username: "kommunist",
    name: "Robert",
    password: "raketa666",
  };

  await api.post("/api/users").send(newUser).expect(400);

  const usersAtEnd = await helper.usersInDb();

  expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
});

afterAll(async () => {
  await mongoose.connection.close();
}, 100000);
