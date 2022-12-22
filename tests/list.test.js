const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test("list containing 1 blog has total likes equal to likes of that blog", () => {
    const listWithOneBlog = [{ likes: 5 }];
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("list with multiple entries is calculated correctly", () => {
    const blogs = [{ likes: 0 }, { likes: 1 }, { likes: 2 }, { likes: 3 }, { likes: 4 }];
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(10);
  });
});

describe("favorite blog", () => {
  test("empty list returns null", () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toBe(null);
  });

  test("list containing 1 blog returns that blog", () => {
    const expected = { title: "T1", likes: 5 };
    const listWithOneBlog = [expected];
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(expected);
  });

  test("list with multiple blogs returns blog with most likes", () => {
    const blogs = [
      { title: "T1", likes: 5 },
      { title: "T2", likes: 1 },
      { title: "T3", likes: 2 },
      { title: "T4", likes: 7 },
    ];
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({ title: "T4", likes: 7 });
  });
});

describe("most blogs", () => {
  test("empty list returns null", () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toBe(null);
  });

  test("list containing 1 blog returns object with author and number of blogs as 1", () => {
    const listWithOneBlog = [{ author: "T1" }];
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({ author: "T1", blogs: 1 });
  });

  test("list with multiple blogs returns author with most blogs", () => {
    const blogs = [
      { author: "T1" },
      { author: "T2" },
      { author: "T3" },
      { author: "T2" },
      { author: "T2" },
      { author: "T1" },
      { author: "T3" },
    ];
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({ author: "T2", blogs: 3 });
  });
});

describe("most likes", () => {
  test("empty list returns null", () => {
    const result = listHelper.mostLikes([]);
    expect(result).toBe(null);
  });

  test("list containing 1 blog returns object with author and same number of likes as blog", () => {
    const listWithOneBlog = [{ author: "T1", likes: 5 }];
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({ author: "T1", likes: 5 });
  });

  test("list with multiple blogs returns author with most likes", () => {
    const blogs = [
      { author: "T1", likes: 5 },
      { author: "T2", likes: 4 },
      { author: "T3", likes: 7 },
      { author: "T1", likes: 1 },
      { author: "T2", likes: 4 },
      { author: "T3", likes: 3 },
    ];
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({ author: "T3", likes: 10 });
  });
});
