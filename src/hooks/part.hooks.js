module.exports = {
  async afterUpdate(user, options) {
    console.log("hook 1");
    console.log("hook 2");
  },
};
