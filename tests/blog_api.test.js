const app = require("../app");
const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("Retrieving blogs", () => {
  test("all blogs are returned and response body is of type JSON", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("blogs returned should have an id property defined", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body[0].id).toBeDefined();
  });
});

describe("Viewing a specific blog", () => {
  test("succeeds with a valid id", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToView = blogsAtStart[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

    expect(resultBlog.body).toEqual(processedBlogToView);
  });

  // Don't have the middleware yet
  // test("fails with statuscode 404 if note does not exist", async () => {
  //   const validNonexistingId = await helper.nonExistingId();

  //   console.log(validNonexistingId);

  //   await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
  // });

  // test("fails with statuscode 400 if id is invalid", async () => {
  //   const invalidId = "5a3d5da59070081a82a3445";

  //   await api.get(`/api/blogs/${invalidId}`).expect(400);
  // });
});

describe("Addition of a new blog", () => {
  test("succeeds with valid data", async () => {
    const newBlog = {
      title: "Blog3",
      author: "Author3",
      url: "url3",
      likes: 3,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((n) => n.title);
    expect(titles).toContain("Blog3");
  });

  test("likes property missing from request will default to a value of zero", async () => {
    const newBlog = {
      title: "Blog With No Likes",
      author: "Author3",
      url: "url3",
    };
    await api.post("/api/blogs").send(newBlog);

    const blog = await Blog.findOne({ title: "Blog With No Likes" });
    expect(blog.likes).toBe(0);
  });

  test("fails with status code 400 if missing title or url", async () => {
    await api.post("/api/blogs").send({ author: "A", url: "/" }).expect(400);
    await api.post("/api/blogs").send({ title: "T", author: "A" }).expect(400);
    await api.post("/api/blogs").send({}).expect(400);
  });
});

describe("Deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
  });
});

describe("Updating an existing blog", () => {
  test("succeeds with status code 200 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const initialLikes = blogsAtStart[0].likes;
    const expectedLikes = initialLikes + 1;

    const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send({ likes: expectedLikes }).expect(200);
    const updatedBlog = response.body;
    expect(updatedBlog.likes).toBe(expectedLikes);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
