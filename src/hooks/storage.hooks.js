const { default: slugify } = require("slugify");

module.exports = {
  async beforeCreate(storage, options) {
    storage.slug = slugify(`${storage.name}`, {
      lower: true,
      remove: /[*+~.()'&;"!:@//]/g,
    });
  },
  async beforeUpdate(storage, options) {
    storage.slug = slugify(`${storage.name}`, {
      lower: true,
      remove: /[*+~.()'&;"!:@//]/g,
    });
  },
};
