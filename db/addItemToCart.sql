WITH upsert AS (
     UPDATE cart SET quantity=$1 
     WHERE cartid=$2 AND productcode=$3 
     RETURNING *
)
INSERT INTO cart (cartid, productcode, quantity, dateadded) 
SELECT $2, $3, $1, current_timestamp
WHERE NOT EXISTS (SELECT * FROM upsert)