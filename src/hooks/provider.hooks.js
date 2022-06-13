const { default: slugify } = require("slugify");

module.exports = {
  async beforeCreate(provider, options) {
    provider.slug = slugify(`${provider.name}`, {
      lower: true,
      remove: /[*+~.()'&;"!:@//]/g,
    });
  },
  async beforeUpdate(provider, options) {
    provider.slug = slugify(`${provider.name}`, {
      lower: true,
      remove: /[*+~.()'&;"!:@//]/g,
    });
  },
};
