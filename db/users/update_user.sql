update subscribed_user
set username = $1 
where user_id = $2;

select user_id, username, email, profile_picture from subscribed_user where user_id = $2;