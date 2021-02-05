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
)

create table video (
    video_id serial primary key,top
    topic_id int references topic(topic_id),
    video_url text
)

create table messaging (
    message_id serial primary key,
    user_id int references subscribed_user(user_id),
    mentor_id int references mentor(mentor_id),
    message_url text
)

ALTER TABLE article
ADD COLUMN article_title text,
ADD COLUMN article_body text,
ADD COLUMN paid_content boolean;

 INSERT INTO article (
 article_title,
 article_body
 )
 values(
 'Your Image or Your Life: Accepting Chronic Illness',
'We are not bad people. We are physically ill people trying to pretend we’re not. This is how my client described wearing her social mask while living with chronic illness. She is a successful professional with a busy personal life, but she feels on the brink of despair every day. 
Can you relate? If you’re like many people with chronic illness, you’re sick enough to restrict your activities yet healthy enough to work or caregive, if barely. Living on disability may not be financially practical, especially if you are a breadwinner. The psychological and career fallout alone may deter you.
How do you handle this situation? Worn out from daily life, some people forego all but essential activities. Others play at normalcy in attempt to keep their jobs, relationships, and self-image. If this is you, then you know you’re paying a high price. Tackling too much burns energy you need to thrive. If you’re tired of living exhausted to satisfy expectations, then it’s time to change how you manage your energy.
e world.'
 
 );
 
ALTER TABLE mentor
DROP COLUMN username;

ALTER TABLE mentor
DROP COLUMN password;

ALTER TABLE mentor
DROP COLUMN is_admin; 

INSERT INTO mentor (
firstname,
lastname,
email,
specialty,
favorite_quote
)
VALUES (
'Karen',
'Thomas',
'karen@digestivesolutions',
'celiac disease',
'Healing begins with a healthy gut.'
);

INSERT INTO mentor (
firstname,
lastname,
email,
specialty,
favorite_quote
)
VALUES (
'Teresina',
'Goheen',
'teresina@balancefitness.com',
'personal training',
'Nutrition and movement go hand in hand.'

);

INSERT INTO topic (
topic_name,
mentor_id
)
VALUES (
'fitness',
2
);

UPDATE article
SET paid_content = TRUE
WHERE article_id = 1;


