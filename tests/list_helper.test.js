const listHelper = require('../utils/list_helper');

describe('Dummy test', () => {
  test('Dummy returns one', () => {
    const blog = [];
    const result = listHelper.dummy(blog);
    expect(result).toBe(1);
  });
});

describe('Total Likes', () => {
  const listWithNoBlog = [];

  test('When list has no blog, total likes zero', () => {
    const result = listHelper.totalLikes(listWithNoBlog);
    expect(result).toBe(0);
  });

  const listWithOneBlog = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0,
    },
  ];

  test('When list has one blog, total likes same as blog like', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(7);
  });

  const listWithManyBlogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0,
    },
  ];

  test('When list has many blogs, total likes is sum of the blogs likes', () => {
    const result = listHelper.totalLikes(listWithManyBlogs);
    expect(result).toBe(34);
  });
});
