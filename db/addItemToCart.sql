UPDATE cart SET productsincart = array_cat(productsincart, {{$1, $2}}) WHERE cartid = $3;