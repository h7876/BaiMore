insert into users(userid, email, firstname, lastname, phone, datejoined, cartid) values($1, $2, $3, $4, $5, current_timestamp, $6)
returning *;