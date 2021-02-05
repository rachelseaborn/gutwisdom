select * from article 
where topic_id = $1;

returning article_title, article_body