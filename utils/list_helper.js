function dummy(blogs) {
  return 1;
}
function totalLikes(blogs) {
  return blogs.reduce((acc, curr) => acc + curr.likes, 0);
}
function favoriteBlog(blogs) {
  if (blogs.length === 0) return null;

  let favorite = blogs[0];
  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > favorite.likes) {
      favorite = blogs[i];
    }
  }
  return favorite;
}

function mostBlogs(blogs) {
  if (blogs.length === 0) return null;

  const map = new Map(); // {author, blogs}
  const result = { author: null, blogs: 0 };

  blogs.forEach(({ author }) => {
    let total = 1;

    if (map.has(author)) {
      total += map.get(author);
    }
    map.set(author, total);

    if (total > result.blogs) {
      result.author = author;
      result.blogs = total;
    }
  });

  return result;
}

function mostLikes(blogs) {
  if (blogs.length === 0) return null;

  const map = new Map(); // {author, likes}
  const result = { author: null, likes: 0 };

  blogs.forEach(({ author, likes }) => {
    let total = likes;

    if (map.has(author)) {
      total += map.get(author);
    }
    map.set(author, total);

    if (total > result.likes) {
      result.author = author;
      result.likes = total;
    }
  });

  return result;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
