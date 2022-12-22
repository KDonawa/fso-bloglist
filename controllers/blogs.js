const router = require("express").Router();
const Blog = require("../models/blog");

router.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    return res.json(blog);
  }
  res.status(404).end();
});

router.post("/", async (req, res) => {
  const { title, author, url, likes } = req.body;

  if (!title || !url) return res.status(400).send({ error: "missing data" });

  const newBlog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
  });
  const blog = await newBlog.save();
  res.status(201).json(blog);
});

router.delete("/:id", async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

router.put("/:id", async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { likes: req.body.likes },
    { new: true, runValidators: true, context: "query" }
  );
  res.json(updatedBlog);
});

module.exports = router;
