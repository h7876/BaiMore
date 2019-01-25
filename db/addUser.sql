insert into users(userid, email, firstname, lastname, phone, datejoined) values($1, $2, $3, $4, $5, current_timestamp)
returning *;