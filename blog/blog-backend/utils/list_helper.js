import lodash from 'lodash';
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((pre, cur) => pre + cur.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (favorite, current) =>
      current.likes > favorite.likes ? current : favorite,
    blogs[0],
  );
};

const mostBlogs = (blogs) => {
  const authorBlogsObj = lodash.countBy(blogs, 'author');
  const authorBlogsObjToArray = lodash.map(authorBlogsObj, (count, author) => ({
    author: author,
    blogs: count,
  }));
  const mostBlog = lodash.maxBy(authorBlogsObjToArray, 'author');
  return mostBlog;
};

const mostFavorite = (blogs) => {
  const authorBlogsObj = lodash.groupBy(blogs, 'author');
  const authorLikesArray = lodash.map(authorBlogsObj, (blog, author) => ({
    author: author,
    likes: lodash.sumBy(blog, 'likes'),
  }));
  const authorLikes = lodash.maxBy(authorLikesArray, 'likes');
  return authorLikes;
};

export {dummy, totalLikes, favoriteBlog, mostBlogs, mostFavorite};
