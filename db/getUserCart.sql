select p.productname, p.productcode, p.price, p.image, c.quantity from (select unnest(productsincart[1:array_length(productsincart,1)][2:2]) as quantity, unnest(productsincart[1:array_length(productsincart, 1)][1]) as productcode from cart) c inner join products p on c.productcode = p.productcode;