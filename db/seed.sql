create table subscribed_user (
    user_id serial primary key,
    username varchar(25) not null,
    email varchar(150) not null,
    password varchar(250) not null,
    profile_picture text
)

create table mentor (
    mentor_id serial primary key,
    firstname varchar(30) not null,
    lastname varchar(50) not null,
    email varchar(150) not null,
    username varchar(25) not null,
    password varchar(250) not null,
    profile_picture text,
    is_admin BOOL,
    specialty varchar(250) not null,
    favorite_quote varchar(250)
)

create table topic (
    topic_id serial primary key,
    topic_name varchar(50) not null,
    mentor_id int references mentor(mentor_id)
)
 
create table article (
    article_id serial primary key,
    topic_id int references topic(topic_id),
    article_url text,
    article_title text,
    article_body text,
    paid_content boolean
);

create table video (
    video_id serial primary key,
    topic_id int references topic(topic_id),
    video_url text
)

create table messaging (
    message_id serial primary key,
    user_id int references subscribed_user(user_id),
    mentor_id int references mentor(mentor_id),
    message_url text
)