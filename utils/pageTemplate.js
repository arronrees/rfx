const axios = require('axios').default;

module.exports.pageTemplate = async (req, res, next) => {
  const pages = await axios.get(`${process.env.ADMIN_URL}/pages`);

  let nav = [];

  pages.data.forEach((page) => {
    if (!page.HasParentPage) {
      nav.push(page);
    }
  });

  res.locals.template = {
    nav,
  };

  next();
};
