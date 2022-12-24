const router = require("express").Router();
const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");

router.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1, id: 1 });
  res.json(blogs);
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("user", { username: 1, name: 1, id: 1 });
  if (blog) {
    return res.json(blog);
  }
  res.status(404).end();
});

router.post("/", userExtractor, async (req, res) => {
  const user = req.user;

  req.body.user = user._id;
  const newBlog = new Blog(req.body);
  await newBlog.validate();
  const savedBlog = await newBlog.save();

  user.blogs.push(savedBlog._id);
  user.save();

  res.status(201).json(savedBlog);
});

router.delete("/:id", userExtractor, async (req, res) => {
  const user = req.user;
  const deletedBlog = await Blog.findByIdAndRemove(req.params.id);

  user.blogs = user.blogs.filter((blogObjId) => blogObjId.toString() !== deletedBlog.id);
  user.save();

  res.status(204).end();
});

router.put("/:id", async (req, res) => {
  res.json({ message: "Not implemented" });
});

module.exports = router;
