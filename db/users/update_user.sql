update subscribed_user
set username = $1, firstname = $2, lastname = $3
where user_id = $4;