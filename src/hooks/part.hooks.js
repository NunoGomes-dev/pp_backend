const { default: slugify } = require("slugify");

module.exports = {
  async beforeCreate(part, options) {
    part.slug = slugify(`${part.name}`, {
      lower: true,
      remove: /[*+~.()'&;"!:@//]/g,
    });
  },
  async beforeUpdate(part, options) {
    part.slug = slugify(`${part.name}`, {
      lower: true,
      remove: /[*+~.()'&;"!:@//]/g,
    });
  },
};
