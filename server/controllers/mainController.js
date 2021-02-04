module.exports = {
  getArticle: async (req, res) => {
    const db = req.app.get("db");
    let articles = [];
    if (req.session.user.id) {
      articles = await db.articles.get_all();
    } else {
      articles = await db.articles.get_free();
    }
  },
};
