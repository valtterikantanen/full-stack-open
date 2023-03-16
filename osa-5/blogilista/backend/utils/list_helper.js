const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.reduce((totalLikes, item) => totalLikes + item.likes, 0);
};

const favoriteBlog = blogs => {
  if (blogs.length === 0) return null;

  let blogWithMostLikes = blogs[0];

  blogs.forEach(blog => {
    if (blog.likes > blogWithMostLikes.likes) {
      blogWithMostLikes = blog;
    }
  });

  return {
    title: blogWithMostLikes.title,
    author: blogWithMostLikes.author,
    likes: blogWithMostLikes.likes
  };
};

const mostBlogs = blogs => {
  if (blogs.length === 0) return null;

  const blogsByAuthor = [];

  blogs.forEach(blog => {
    const blogAuthor = blog.author;
    const authorIndex = blogsByAuthor.findIndex(author => author.name === blogAuthor);
    // Author not found
    if (authorIndex === -1) {
      blogsByAuthor.push({ name: blogAuthor, blogs: 1 });
    } else {
      blogsByAuthor[authorIndex].blogs += 1;
    }
  });

  const maxAmountOfBlogs = Math.max(...blogsByAuthor.map(author => author.blogs));
  const writerWithMostBlogs = blogsByAuthor.find(author => author.blogs === maxAmountOfBlogs);

  return { author: writerWithMostBlogs.name, blogs: maxAmountOfBlogs };
};

const mostLikes = blogs => {
  if (blogs.length === 0) return null;

  const likesByAuthor = [];

  blogs.forEach(blog => {
    const blogAuthor = blog.author;
    const authorIndex = likesByAuthor.findIndex(author => author.name === blogAuthor);
    // Author not found
    if (authorIndex === -1) {
      likesByAuthor.push({ name: blogAuthor, likes: blog.likes });
    } else {
      likesByAuthor[authorIndex].likes += blog.likes;
    }
  });

  const maxAmountOfLikes = Math.max(...likesByAuthor.map(author => author.likes));
  const writerWithMostLikes = likesByAuthor.find(author => author.likes === maxAmountOfLikes);

  return { author: writerWithMostLikes.name, likes: maxAmountOfLikes };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
