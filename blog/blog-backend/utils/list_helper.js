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
export {dummy, totalLikes, favoriteBlog};
