import React from "react";
import { atom, useAtom } from "jotai";
import Product from "./Product";
import Cart from "./Cart";

export const productAtom = atom(Product);
export const priceAtom = atom(Cart);

export default function Home() {
  return (
    <div>
      <div>
        <h2>Shopping Cart Example</h2>
        <hr />
        <ProductsContainer />
        <hr />
        <CartContainer />
      </div>
    </div>
  );
}

const ProductsContainer = () => {
  const [product, setProduct] = useAtom(productAtom);
  const [price, setPrice] = useAtom(priceAtom);
  const handleClick = (val) => {
    // const value = product;
    // value[val.id].quantity = value[val.id].quantity + 1;
    // setPrice([...value]);
    const data = product;
    data[val.id].quantity = data[val.id].quantity - 1;
    console.log("data", data);
    setProduct([...data]);
  };

  return (
    <>
      <h3>Products</h3>
      {product &&
        product.map((val) => (
          <div key={val.id}>
            {val.title} - ${val.price} {val.quantity !== 0 ? `x ${val.quantity}` : ""}
            <br />
            <button disabled={val.quantity === 0} onClick={() => handleClick(val)}>
              {val.quantity !== 0 ? "Add to Cart" : "Sold Out"}
            </button>
            <br /> <br />
          </div>
        ))}
    </>
  );
};

const Container = () => {
  const [cart, setCart] = useAtom(priceAtom);
  console.log("cart", cart);
  return (
    <>
      <h3>Your Cart</h3>
      Please add some products to cart.
    </>
  );
};

const CartContainer = React.memo(Container);
