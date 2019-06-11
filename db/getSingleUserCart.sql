select p.productname, p.productcode, p.price, p.image, c.quantity, dateadded from cart c inner join products p on c.productcode = p.productcode where c.cartid = $1 order by dateadded asc;