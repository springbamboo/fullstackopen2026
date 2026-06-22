const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((pre, cur) => pre + cur.likes, 0);
};
export {dummy, totalLikes};
