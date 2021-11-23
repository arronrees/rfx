const axios = require('axios').default;
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
});

module.exports.getHomePage = async (req, res) => {
  const { data } = await axios.get(`${process.env.ADMIN_URL}/pages/1`);

  const pageLayout = {};

  data.PageLayout.forEach((layout) => {
    switch (layout.__component) {
      case 'components.cta-block':
        pageLayout.cta = layout;
        break;

      case 'components.intro-block':
        pageLayout.introBlock = layout;
        break;

      case 'components.info-block':
        pageLayout.infoBlock = layout;
        break;

      default:
        break;
    }
  });

  const blogData = await axios.get(`${process.env.ADMIN_URL}/blogs`);
  const blogs = [];

  blogData.data.forEach((blog, i) => {
    const c = md.render(blog.Content);
    const b = { ...blog, Content: c };

    if (i <= 5) {
      blogs.push(b);
    }
  });

  const newsPosts = await axios.get(`${process.env.ADMIN_URL}/news-posts`);
  const news = [];

  newsPosts.data.forEach((post, i) => {
    const c = md.render(post.Content);
    const n = { ...post, Content: c };

    if (1 < 3) {
      news.push(n);
    }
  });

  res.render('home.ejs', {
    heroSliders: data.hero_sliders,
    pageLayout,
    blogs,
    news,
  });
};
