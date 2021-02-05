module.exports = {
  getArticle: async (req, res) => {
    const db = req.app.get("db");
    let articles = [];

    if (req.session.user.id) {
      articles = await db.articles
        .get_all_articles({
          article_title,
          article_body,
        })
        .then((articles) => res.status(200).send(articles))
        .catch((err) => res.status(500).send(err));
    } else {
      articles = await db.articles
        .get_free_articles({
          article_title,
          article_body,
        })
        .then((articles) => res.status(200).send(articles))
        .catch((err) => res.status(500).send(err));
    }
  },

  searchArticle: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    let articles = [];

    if (req.session.user_id) {
      articles = await db.articles
        .get_topic_articles(id)
        .then((articles) => res.status(200).send(articles))
        .catch((err) => res.status(500).send(err));
    } else {
      return;
    }
  },

  getTopics: async (req, res) => {
    const db = req.app.get("db");
    const topics = await db.articles.get_topics();
    res.status(200).send(topics);
  },

  updateUser: async (req, res) => {},

  deleteUser: async (req, res) => {},
};
