const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Blog1",
    author: "Author1",
    url: "url1",
    likes: 1,
  },
  {
    title: "Blog2",
    author: "Author2",
    url: "url2",
    likes: 2,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "Blog1",
    author: "Author1",
    url: "url1",
    likes: 1,
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs;
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
