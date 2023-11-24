const getMainPage = (req, res) => {
  res.send("hello from back-end");
};

const postSomething = (req, res) => {};

module.exports = {
  getMainPage,
  postSomething,
};
